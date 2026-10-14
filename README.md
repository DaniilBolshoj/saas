# LinkOps

Nuorodų ir skaitmeninių išteklių komandinis centras. MVP apima Google OAuth, komandos onboarding, nuorodų CRUD/kategorijas, fuzzy paiešką, Chat-to-Resource Explorer ir savaitinį broken-link tikrintuvą.

## Reikalavimai

- Node.js 20.9 arba naujesnis
- Supabase projektas su Auth ir PostgreSQL
- OpenAI API raktas AI analizei (mokamas API naudojimas)
- Vercel projektas arba kitas Next.js 16 serverio hostas

## Vietinis paleidimas

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Užpildykite `.env.local` reikšmes. `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY` ir `CRON_SECRET` privalo likti tik serverio aplinkoje; nedėkite jų į `NEXT_PUBLIC_` kintamuosius.

## Supabase nustatymas

1. Supabase SQL Editor'yje iš eilės paleiskite `supabase/migrations/20261011000000_core.sql` ir `supabase/migrations/20261012000000_ai_analyses.sql`.
2. Supabase Auth → Providers įjunkite Google OAuth ir užregistruokite Google OAuth client ID/secret.
3. Supabase Auth URL Configuration pridėkite `http://localhost:3000/auth/callback` ir produkcinį `https://<domenas>/auth/callback` į Redirect URLs; Site URL nustatykite aplikacijos adresu.
4. Į `.env.local` įrašykite Supabase Project URL, anon/public key ir service role key. Service role naudojamas tik serverio cron maršrute.

Šios migracijos yra pradinis setup naujai DB. Prieš paleisdami jas prieš jau egzistuojančią schemą, palyginkite lenteles ir policies; nekartokite `create table` migracijų virš jau esančių lentelių.

## Aplinkos kintamieji

| Kintamasis | Naudojimas |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase projekto URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Naršyklės ir SSR klientas; prieigą riboja RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Tik cron/retention serverio operacijoms; apeina RLS |
| `OPENAI_API_KEY` | Server-side Chat-to-Resource analizė |
| `CRON_SECRET` | Atsitiktinė ilga paslaptis cron autorizacijai |

Vercel projekte sukurkite tuos pačius environment variables. GitHub repository secrets pridėkite `APP_URL` (pvz., `https://linkops.vercel.app`) ir `CRON_SECRET`. Link checker kviečiamas kartą per savaitę; viena užklausa tikrina iki 6 seniausių nuorodų, workflow kartoja kvietimus, kol partija mažesnė. Jei per savaitę yra daugiau nei 600 nuorodų, didinkite workflow bandymų skaičių arba vykdykite dažniau. Atskirai kasdien paleidžiamas AI duomenų retention workflow.

## Maršrutai

- `GET /` produkto pristatymas; `/login` Google OAuth; `/auth/callback` keičia OAuth kodą į sesiją.
- `/onboarding` sukuria organizaciją ir pirmąjį `owner` per transakcinę RPC funkciją.
- `/dashboard` pateikia komandos nuorodas, kategorijas, fuzzy paiešką ir AI Explorer.
- `POST /api/ai/analyze` reikalauja aiškaus sutikimo, siunčia tekstą į OpenAI ir saugo analizę.
- `DELETE /api/ai/analyze` leidžia autoriui ištrinti analizę ir originalų tekstą.
- `GET/POST /api/links`, `PATCH/DELETE /api/links/[id]` valdo nuorodas; `GET/POST /api/categories` valdo kategorijas.
- `GET /api/cron/check-links` tikrina seniausius URL (HEAD, tada 403/405/501 atveju GET su Range).
- `GET /api/cron/cleanup` kasdien ištrina AI analizes, senesnes nei 90 dienų, ir nebereikalingas kvotas.

AI tekstas siunčiamas OpenAI API ir saugomas Supabase iki 90 dienų; sąsajoje prašomas sutikimas prieš siuntimą. Naudotojas gali analizę ištrinti iškart. Prieš realų klientų naudojimą pridėkite privatumo politiką, duomenų tvarkymo sutartis, eksportavimo/ištrynimo procesą ir patikrinkite OpenAI duomenų saugojimo sąlygas. AI API kainodara priklauso nuo OpenAI naudojimo; kvota riboja vieną naudotoją iki 5 analizių per minutę ir 50 per parą.

## Vykdymo laikas ir billing

API route eksportai nenaudoja `runtime` ar `maxDuration`, nes projekte įjungtas Next.js `cacheComponents` režimas. Serverless timeout nustatomas hostingo platformoje; patikrinkite aktualų limito dydį deployment nustatymuose. Jei AI ar cron darbas viršija jį, perkelkite apdorojimą į foninį worker'į. Vercel nemokamo plano limitai gali keistis.

Šis MVP neturi Stripe ar mokamų planų. Nemokamo plano žymuo UI ir AI kvotos yra produkto ribojimai, ne prenumeratos sistema. Prieš įjungiant mokėjimus reikia apsispręsti dėl planų, seat/link limitų, būsenų, webhook'ų ir atšaukimo politikos.

## Patikros

```bash
npm run lint
npm run build
```