export const aiLanguages = [
  { code: "lt", name: "Lietuvių" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "pl", name: "Polski" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "uk", name: "Українська" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "nl", name: "Nederlands" },
  { code: "sv", name: "Svenska" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
] as const;

export const aiLanguageCodes = aiLanguages.map(({ code }) => code) as [
  (typeof aiLanguages)[number]["code"],
  ...(typeof aiLanguages)[number]["code"][],
];

export function getAiLanguageName(code: string) {
  return aiLanguages.find((language) => language.code === code)?.name;
}
