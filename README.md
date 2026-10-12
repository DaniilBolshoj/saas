# LinkOps

LinkOps AI susirašinėjimo analizatoriaus, nuorodų išsaugojimo API ir savaitinio broken-link tikrintuvo MVP.

## Paleidimo prielaidos

Šiame workspace nėra Next.js karkaso (`package.json` ir konfigūracijos), todėl šiems šaltinio failams paleisti sukurkite Next.js App Router projektą. Jame įdiekite:

```bash
npm install @supabase/ssr @supabase/supabase-js openai zod undici
```

Nustatykite `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
CRON_SECRET=
```

`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY` ir `CRON_SECRET` laikykite tik serverio aplinkoje. Niekada nenaudokite jų `NEXT_PUBLIC_` kintamuosiuose.

1. Supabase SQL Editor'yje paleiskite esamą bazinę schemą ir tada `supabase/migrations/20261012000000_ai_analyses.sql`.
2. Supabase Auth nustatymuose įjunkite Google OAuth ir nustatykite callback URL.
3. Paleiskite Next.js aplikaciją įprasta `npm run dev` komanda.
4. Vercel projekte pridėkite tuos pačius aplinkos kintamuosius. GitHub Actions `APP_URL` nurodykite kaip GitHub repository secret, pvz. `https://linkops.vercel.app`.

## Maršrutai ir UI

- `POST /api/ai/analyze` analizuoja tekstą ir išsaugo analizę.
- `POST /api/links` išsaugo AI rastą nuorodą į organizacijos projektą.
- `GET /api/cron/check-links` patikrina seniausiai tikrintas nuorodas; apsaugotas `CRON_SECRET`.
- `components/ai-analysis-explorer.tsx` yra klientinis analizės UI; jam perduokite aktyvios organizacijos `organizationId`.

AI analizė siunčia įvestą susirašinėjimą OpenAI API ir išsaugo jo kopiją `ai_analyses.original_text` stulpelyje. API riboja vieną naudotoją iki 5 analizės užklausų per minutę ir 50 per parą. Prieš naudojimą su realiais klientais aprašykite duomenų tvarkymą, prieigos kontrolę ir saugojimo laikotarpį. Vercel nemokamo plano funkcijų vykdymo laikas yra ribotas (šiame MVP numatyta iki 10 s); maršrutai sąmoningai trumpina AI timeout'ą ir cron partiją. Jei analizė ar tikrinimas dažnai artėja prie šios ribos, perkelkite juos į atskirą eilę/worker'į arba naudokite ilgesnį vykdymą palaikantį planą.