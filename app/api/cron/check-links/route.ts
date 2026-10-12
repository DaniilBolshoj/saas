import { lookup as dnsLookup } from "node:dns/promises";
import { timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { Agent, fetch as undiciFetch } from "undici";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const maxDuration = 10;

const BATCH_SIZE = 6;
const CONCURRENCY = 6;
const REQUEST_TIMEOUT_MS = 3_000;
const DNS_TIMEOUT_MS = 1_500;
const MAX_REDIRECTS = 5;

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || !supplied) return false;

  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length
    && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

function ipv4Number(address: string): number {
  return address.split(".").reduce((result, octet) => (result * 256) + Number(octet), 0) >>> 0;
}

function inCidr(address: string, network: string, prefix: number): boolean {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return (ipv4Number(address) & mask) === (ipv4Number(network) & mask);
}

function isPublicIpv4(address: string): boolean {
  if (isIP(address) !== 4) return false;
  const blockedRanges: Array<[string, number]> = [
    ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
    ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24],
    ["192.88.99.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24],
    ["203.0.113.0", 24], ["224.0.0.0", 4], ["240.0.0.0", 4],
  ];
  return !blockedRanges.some(([network, prefix]) => inCidr(address, network, prefix));
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error("DNS lookup timed out")), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function resolvePublicIpv4(hostname: string) {
  const literalIpVersion = isIP(hostname);
  if (literalIpVersion === 6) throw new Error("IPv6 destinations are not allowed.");
  if (literalIpVersion === 4) {
    if (!isPublicIpv4(hostname)) throw new Error("Private IP destinations are not allowed.");
    return [{ address: hostname, family: 4 as const }];
  }

  const normalizedHost = hostname.toLowerCase().replace(/\.$/, "");
  if (
    normalizedHost === "localhost"
    || normalizedHost.endsWith(".localhost")
    || normalizedHost.endsWith(".local")
    || normalizedHost === "metadata.google.internal"
  ) {
    throw new Error("Local destinations are not allowed.");
  }

  const records = await withTimeout(
    dnsLookup(normalizedHost, { all: true, verbatim: true }),
    DNS_TIMEOUT_MS,
  );
  const ipv4Records = records.filter((record) => record.family === 4);
  if (ipv4Records.length === 0 || ipv4Records.some((record) => !isPublicIpv4(record.address))) {
    throw new Error("Destination did not resolve to public IPv4 addresses.");
  }
  return ipv4Records.map((record) => ({ address: record.address, family: 4 as const }));
}

async function checkUrl(input: string): Promise<number | null> {
  let currentUrl: URL;
  try {
    currentUrl = new URL(input);
  } catch {
    return null;
  }

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    if (
      (currentUrl.protocol !== "http:" && currentUrl.protocol !== "https:")
      || currentUrl.username
      || currentUrl.password
    ) return null;

    try {
      const addresses = await resolvePublicIpv4(currentUrl.hostname);
      const agent = new Agent({
        connect: {
          lookup(hostname, options, callback) {
            void resolvePublicIpv4(hostname).then((resolved) => {
              const pinned = resolved.filter((address) =>
                addresses.some((allowed) => allowed.address === address.address));
              if (pinned.length === 0) throw new Error("DNS result changed during connection.");
              if (options.all) callback(null, pinned);
              else callback(null, pinned[0].address, pinned[0].family);
            }).catch((error: unknown) => {
              callback(error instanceof Error ? error : new Error("DNS lookup failed"), "", 4);
            });
          },
        },
      });

      let response;
      try {
        response = await undiciFetch(currentUrl, {
          method: "HEAD",
          redirect: "manual",
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          dispatcher: agent,
          headers: { "user-agent": "LinkOps-Link-Checker/1.0" },
        });
      } finally {
        await agent.close();
      }

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location || redirectCount === MAX_REDIRECTS) return response.status;
        currentUrl = new URL(location, currentUrl);
        continue;
      }
      return response.status;
    } catch {
      return null;
    }
  }

  return null;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let supabase;
  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    console.error("Cron Supabase configuration error:", error);
    return NextResponse.json({ error: "Serverio konfigūracijos klaida." }, { status: 500 });
  }

  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: links, error: queryError } = await supabase
    .from("links")
    .select("id, url")
    .or(`last_checked_at.is.null,last_checked_at.lt.${cutoff}`)
    .order("last_checked_at", { ascending: true, nullsFirst: true })
    .limit(BATCH_SIZE);

  if (queryError) {
    console.error("Cron link query failed:", queryError.code);
    return NextResponse.json({ error: "Nepavyko gauti tikrintinų nuorodų." }, { status: 500 });
  }

  const checkedAt = new Date().toISOString();
  for (let offset = 0; offset < (links?.length ?? 0); offset += CONCURRENCY) {
    const batch = links!.slice(offset, offset + CONCURRENCY);
    const results = await Promise.all(batch.map(async (link) => ({
      id: link.id,
      status: await checkUrl(link.url),
    })));
    const updates = await Promise.all(results.map(({ id, status }) =>
      supabase.from("links").update({
        last_checked_at: checkedAt,
        last_status_code: status,
      }).eq("id", id),
    ));

    const failedUpdate = updates.find((result) => result.error);
    if (failedUpdate?.error) {
      console.error("Cron link update failed:", failedUpdate.error.code);
      return NextResponse.json({ error: "Nepavyko išsaugoti tikrinimo rezultatų." }, { status: 500 });
    }
  }

  return NextResponse.json({ processed: links?.length ?? 0, hasMore: (links?.length ?? 0) === BATCH_SIZE });
}