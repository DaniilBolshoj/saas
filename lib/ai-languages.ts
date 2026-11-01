export const aiLanguages = [
  { code: "lt", name: "Lietuvių", nameInLithuanian: "lietuvių" },
  { code: "en", name: "English", nameInLithuanian: "anglų" },
  { code: "ru", name: "Русский", nameInLithuanian: "rusų" },
  { code: "pl", name: "Polski", nameInLithuanian: "lenkų" },
  { code: "fr", name: "Français", nameInLithuanian: "prancūzų" },
  { code: "de", name: "Deutsch", nameInLithuanian: "vokiečių" },
  { code: "es", name: "Español", nameInLithuanian: "ispanų" },
  { code: "uk", name: "Українська", nameInLithuanian: "ukrainiečių" },
  { code: "it", name: "Italiano", nameInLithuanian: "italų" },
  { code: "pt", name: "Português", nameInLithuanian: "portugalų" },
  { code: "nl", name: "Nederlands", nameInLithuanian: "olandų" },
  { code: "sv", name: "Svenska", nameInLithuanian: "švedų" },
  { code: "ja", name: "日本語", nameInLithuanian: "japonų" },
  { code: "zh", name: "中文", nameInLithuanian: "kinų" },
] as const;

export const aiLanguageCodes = aiLanguages.map(({ code }) => code) as [
  (typeof aiLanguages)[number]["code"],
  ...(typeof aiLanguages)[number]["code"][],
];

export function getAiLanguageName(code: string) {
  return aiLanguages.find((language) => language.code === code)?.name;
}

export function getAiLanguageNameInLithuanian(code: string) {
  return aiLanguages.find((language) => language.code === code)?.nameInLithuanian;
}
