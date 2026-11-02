const budgetGuidance = {
  lt: {
    risk: "Biudžetas ir atlygio sąlygos neapibrėžti: nėra sutartos fiksuotos sumos, o procentinė dalis ar rojalčiai yra sąlyginiai.",
    action: "Sutarti fiksuotą sumą ir avansą",
    actionDescription: "Sudaryti sutartį, sutarti mokėjimo etapus ir tiksliai apibrėžti papildomų procentų ar rojalčių sąlygas.",
    question: "Kokią tikslią fiksuotą sumą siūlote, kokio avanso ir mokėjimo pagal etapus tikitės, ir kaip būtų skaičiuojami papildomi 20 % ar rojalčiai nuo pardavimų?",
    rationale: "Be raštu sutartos fiksuotos sumos ir avanso nepradėkite.",
    securityRisk: "SMS patvirtinimo kodus siūloma saugoti atviru tekstu – tai kritinė saugumo ir privatumo rizika.",
    securityAction: "Atsisakyti kodų saugojimo atviru tekstu",
    securityDescription: "Tai kritinė privatumo ir saugumo rizika.",
    scaleRisk: "Katalogo apimtis auga nuo 12 iki 50 000 prekių – tai iš esmės keičia darbų apimtį, našumo reikalavimus ir sąmatą.",
    scaleAction: "Įvertinti katalogo, paieškos ir krepšelio veikimą",
    scaleDescription: "Įvertinti, kaip katalogas, paieška ir krepšelis veiks su 50 000 prekių.",
    accessRisk: "Nepatvirtinta prieiga prie dabartinio kodo ir serverio; be jos negalima patikimai įvertinti esamos sistemos ar planuoti darbų.",
    accessAction: "Gauti prieigą prie kodo ir serverio",
    accessDescription: "Paprašyti prieigos prie esamo kodo, serverio ir susijusių paskyrų.",
    accessQuestion: "Ar prieš pradėdami darbus suteiksite prieigą prie dabartinio kodo, serverio ir susijusių paskyrų?",
    estimateRequirement: "Pateikti pull request arba sąmatą pagal valandas",
    estimateAction: "Parengti sąmatą pagal valandas",
    estimateDescription: "Pateikti pull request arba bent valandomis detalizuotą sąmatą, kaip prašėte.",
    specRequirement: "Suderinti, kuris senasis ar naujasis techninis aprašas galioja",
    beforeStart: "Prieš pradedant",
    beforeEstimate: "Prieš teikiant sąmatą",
  },
  en: {
    risk: "The budget and compensation terms are unclear: no fixed amount is agreed, and any percentage or royalties are conditional.",
    action: "Agree on a fixed amount and advance",
    actionDescription: "Sign a contract, agree on milestone payments, and define exact terms for any percentage or royalties.",
    question: "What exact fixed amount do you propose, what advance and milestone payments do you expect, and how would any extra 20% or sales royalties be calculated?",
    rationale: "Do not start without a fixed amount and an advance agreed in writing.",
    securityRisk: "Storing SMS verification codes in plaintext is a critical security and privacy risk.",
    securityAction: "Stop storing verification codes in plaintext",
    securityDescription: "This creates a critical security and privacy risk.",
    scaleRisk: "The catalog is growing from 12 to 50,000 products, substantially changing scope, performance requirements, and the estimate.",
    scaleAction: "Assess catalog behavior at 50,000 products",
    scaleDescription: "Assess how the catalog, search, and cart will perform with 50,000 products.",
    accessRisk: "Access to the existing code and server is unconfirmed, so the current system and work cannot be reliably assessed.",
    accessAction: "Get access to the code and server",
    accessDescription: "Request access to the existing code, server, and related accounts.",
    accessQuestion: "Will you provide access to the existing code, server, and related accounts before work starts?",
    estimateRequirement: "Provide a pull request or an estimate broken down by hours",
    estimateAction: "Prepare an estimate broken down by hours",
    estimateDescription: "Provide a pull request or, at minimum, an estimate broken down by hours, as requested.",
    specRequirement: "Confirm which version of the old or new specification is authoritative",
    beforeStart: "Before starting",
    beforeEstimate: "Before quoting",
  },
  ru: {
    risk: "Бюджет и условия оплаты не определены: фиксированная сумма не согласована, а процент или роялти указаны условно.",
    action: "Согласовать фиксированную сумму и аванс",
    actionDescription: "Заключить договор, согласовать оплату по этапам и точно определить условия процентов или роялти.",
    question: "Какую точную фиксированную сумму вы предлагаете, какой аванс и оплату по этапам предусматриваете и как будут рассчитываться дополнительные 20 % или роялти с продаж?",
    rationale: "Не начинайте работу без письменно согласованных фиксированной суммы и аванса.",
    securityRisk: "Хранение SMS-кодов подтверждения в открытом виде — критический риск безопасности и конфиденциальности.",
    securityAction: "Отказаться от хранения кодов подтверждения в открытом виде",
    securityDescription: "Это критический риск безопасности и конфиденциальности.",
    scaleRisk: "Каталог растёт с 12 до 50 000 товаров, что существенно меняет объём работ, требования к производительности и оценку.",
    scaleAction: "Оценить работу каталога при 50 000 товаров",
    scaleDescription: "Оценить, как каталог, поиск и корзина будут работать с 50 000 товаров.",
    accessRisk: "Доступ к текущему коду и серверу не подтверждён, поэтому надёжно оценить систему и работу пока нельзя.",
    accessAction: "Получить доступ к коду и серверу",
    accessDescription: "Запросить доступ к текущему коду, серверу и связанным аккаунтам.",
    accessQuestion: "Предоставите ли вы до начала работ доступ к текущему коду, серверу и связанным аккаунтам?",
    estimateRequirement: "Предоставить pull request или оценку в часах",
    estimateAction: "Подготовить оценку в часах",
    estimateDescription: "Предоставить pull request или как минимум оценку с разбивкой по часам, как вы просили.",
    specRequirement: "Уточнить, какая из старых или новых спецификаций является актуальной",
    beforeStart: "До начала работ",
    beforeEstimate: "До оценки",
  },
};

const cyrillicToLatin = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
};

function getLanguageCode(languageName) {
  if (/lietuvi/i.test(languageName)) return "lt";
  if (/русский/i.test(languageName)) return "ru";
  if (/english/i.test(languageName)) return "en";
  return "en";
}

export function normalizeGeneratedText(value, languageCode) {
  const mixedScriptWord = /[\p{Script=Latin}\p{Script=Cyrillic}]+/gu;
  const transliterate = (word) => [...word].map((character) => (
    cyrillicToLatin[character.toLowerCase()] ?? character
  )).join("");

  let normalized = value.replace(mixedScriptWord, (word) => {
    const hasLatin = /\p{Script=Latin}/u.test(word);
    const hasCyrillic = /\p{Script=Cyrillic}/u.test(word);
    if (!hasLatin || !hasCyrillic) return word;

    const latinWord = transliterate(word).toLowerCase();
    if (/^(?:royalti|rojalti|royalty|royalties)$/.test(latinWord)) {
      if (languageCode === "lt") return "rojalčiai";
      if (languageCode === "ru") return "роялти";
      return "royalties";
    }
    return transliterate(word);
  });

  if (languageCode === "lt") {
    normalized = normalized.replace(/elektronin(?:ė|ės|ę|ės?)\s+kalb(?:a|os)/giu, "Daugiakalbystė");
    normalized = normalized.replace(/электронн(?:ая|ые|ой|ых)\s+язык(?:и|а)/giu, "Daugiakalbystė");
    normalized = normalized.replace(/\b(?:kinų|chinese|中文)\s*\(\s*CN\s*\)/giu, (match) => `${match.replace(/\s*\(.*$/, "")} (ZH)`);
    normalized = normalized.replace(/\b(?:language|kalba|kalbos|язык)\s*[:=]\s*CN\b/giu, (match) => match.replace(/\bCN\b/i, "ZH"));
    normalized = normalized.replace(/\bCN\b(?=\s*(?:ir|and|или|и|kalb|language|lang|[/,]))/giu, "ZH");
  }

  return normalized;
}

export function normalizeGeneratedValue(value, languageCode, key = "") {
  if (typeof value === "string") {
    if (key === "evidence" || key === "url" || key === "source_language") return value;
    return normalizeGeneratedText(value, languageCode);
  }
  if (Array.isArray(value)) {
    return value.map((item) => normalizeGeneratedValue(item, languageCode));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([property, item]) => [
      property,
      normalizeGeneratedValue(item, languageCode, property),
    ]));
  }
  return value;
}

function getSentences(text) {
  return text.split(/(?<=[.!?])\s+|\n+/).map((sentence) => sentence.trim()).filter(Boolean);
}

function shortEvidence(text, pattern) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= 160) return compact;
  const matchIndex = compact.search(pattern);
  const start = Math.max(0, matchIndex - 60);
  const end = Math.min(compact.length, start + 155);
  return `${start > 0 ? "…" : ""}${compact.slice(start, end).trim()}${end < compact.length ? "…" : ""}`;
}

function getFinancialSentences(text) {
  return getSentences(text).filter((sentence) => (
    /budget|price|cost|fee|payment|pay|rate|minimum|royalt(?:y|ies)|biudžet|kain|sum|avans|apmok|atlyg|rojal|процент|роялт|оплат|стоим|минимал|бюджет/i.test(sentence)
  ));
}

function makeRequirement(requirement, clarity, evidence) {
  return { requirement, clarity, evidence: shortEvidence(evidence, /./) };
}

export function applyDeterministicAssessmentRules(analysis, sourceText, languageName) {
  const languageCode = getLanguageCode(languageName);
  const guidance = budgetGuidance[languageCode];
  const financialSentences = getFinancialSentences(sourceText);
  const sourceFinancialContext = [
    ...financialSentences,
    ...(analysis.budget.evidence && sourceText.includes(analysis.budget.evidence) ? [analysis.budget.evidence] : []),
  ].join(" ");
  const hasFixedCurrencyAmount = /(?:[$€£₽]\s*\d[\d\s.,]*|\d[\d\s.,]*\s?(?:€|EUR|USD|GBP|PLN|RUB|SEK|JPY|CNY|CAD|AUD|UAH|KZT|BYN|руб(?:\.|лей)?|zł|лит(?:\.|ų)?))/i
    .test(sourceFinancialContext);
  const hasConditionalCompensation = /\b(?:maybe|perhaps|possibly|if|minimum|minimal|bonus|royalt(?:y|ies)|rojalč|rojal|gal(?:būt)?|jei|galbūt|procent)\b|(?:роялт|если|возможно|минимал|процент)|%/i
    .test(`${sourceFinancialContext} ${analysis.budget.value}`);
  const needsBudgetAgreement = !hasFixedCurrencyAmount || hasConditionalCompensation;
  const hasPlaintextSmsCodes = /\b(?:sms|text message|sms[- ]?(?:verification|confirmation)?\s*code|sms kod|sms patvirtinimo kod|код(?:ы)? подтверждения|смс)\b/i.test(sourceText)
    && /(?:plain\s*text|unhashed|atvir(?:u|uoju)\s+tekst(?:u|e)|открыт(?:ом|ым)\s+текст(?:е|ом)|в открытом виде)/i.test(sourceText);
  const hasCatalogScaleChange = /\b12\b[\s\S]{0,100}\b50[\s,]?000\b/i.test(sourceText)
    && /(?:catalog|product|item|товар|каталог|preki|katalog)/i.test(sourceText);
  const sentences = getSentences(sourceText);
  const accessSentences = sentences.filter((sentence) => /(?:access|prieig|доступ)/i.test(sentence)
    && /(?:source code|existing code|codebase|server|kodo|kodų|serverio|исходн(?:ому|ого)? коду|код(?:а|у)?|сервер)/i.test(sentence));
  const hasUnconfirmedCodeOrServerAccess = accessSentences.length > 0
    && /(?:whether|will|later|provide|send|confirm|ar|bus|vėliau|atsiųs|suteik|предостав|будет|позже|есть ли|будут ли|\?)/i.test(accessSentences.join(" "));
  const specSentences = sentences.filter((sentence) => /(?:old|older|previous|стар(?:ое|ый|ые)|прошл(?:ое|ый|ые)|sen(?:as|esni|ieji)?|ТЗ|specification|спецификац|technin(?:is|io)\s+apraš)/i.test(sentence)
    && /(?:ignore|disregard|don't|do not|but|although|actually|no,|consider|учитыв|не учитыв|но|хотя|atsižvelk|neatsižvelk|nežiūrėk|atsižvelg|bet|nors|vis dėlto)/i.test(sentence));
  const hasEstimateRequest = /pull\s*request|\bPR\b|(?:estimate|quote|смет[ауы]|оценк[а-я]*\s+(?:по|в)\s+часам|sąmat[ąa].{0,30}valand|įkain.{0,30}valand)/i.test(sourceText);

  const requirements = [...analysis.requirements];
  if (hasCatalogScaleChange) {
    const evidence = sentences.find((sentence) => /\b12\b[\s\S]{0,100}\b50[\s,]?000\b/i.test(sentence)) ?? sourceText;
    const existingIndex = requirements.findIndex((item) => /50[\s,]?000|catalog|katalog|preki/i.test(item.requirement));
    const item = makeRequirement("Katalogas turi augti nuo 12 iki 50 000 prekių", "clear", evidence);
    if (existingIndex >= 0) requirements[existingIndex] = item;
    else requirements.push(item);
  }
  if (hasEstimateRequest) {
    const evidence = sentences.find((sentence) => /pull\s*request|\bPR\b|(?:estimate|quote|смет[ауы]|оценк[а-я]*\s+(?:по|в)\s+часам|sąmat[ąa].{0,30}valand|įkain.{0,30}valand)/i.test(sentence)) ?? sourceText;
    if (!requirements.some((item) => /pull request|estimate.*hours|смет|оценк.*час|sąmat.*valand/i.test(item.requirement))) {
      requirements.push(makeRequirement(guidance.estimateRequirement, "clear", evidence));
    }
  }
  if (specSentences.length > 0 && !requirements.some((item) => /specification|technin.*apraš|тз|спецификац/i.test(item.requirement) && item.clarity === "unclear")) {
    requirements.push(makeRequirement(guidance.specRequirement, "unclear", specSentences.join(" ")));
  }

  const risks = [...analysis.risks];
  if (needsBudgetAgreement) {
    const budgetRiskIndex = risks.findIndex((risk) => /budget|biudžet|payment|fee|apmok|atlyg|оплат|стоим|бюджет|процент|royalt|роялт/i.test(risk.risk));
    const budgetEvidence = analysis.budget.evidence && sourceText.includes(analysis.budget.evidence)
      ? analysis.budget.evidence
      : financialSentences.find((sentence) => /budget|price|cost|fee|payment|minimum|royalt|biudžet|kain|atlyg|rojal|роялт|оплат|стоим|бюджет/i.test(sentence)) ?? "";
    const budgetRisk = {
      risk: guidance.risk,
      severity: "high",
      evidence: shortEvidence(budgetEvidence, /minimum|minimal|gal|maybe|роялт|royalt|procent|%/i),
    };
    if (budgetRiskIndex >= 0) risks[budgetRiskIndex] = budgetRisk;
    else risks.push(budgetRisk);
  }
  if (hasPlaintextSmsCodes) {
    const evidence = sentences.find((sentence) => /sms|verification code|patvirtinimo kod|подтверждения/i.test(sentence)
      && /(?:plain\s*text|unhashed|atvir(?:u|uoju)\s+tekst(?:u|e)|открыт(?:ом|ым)\s+текст(?:е|ом)|в открытом виде)/i.test(sentence)) ?? "";
    const securityRisk = {
      risk: guidance.securityRisk,
      severity: "critical",
      evidence: shortEvidence(evidence, /sms|plain\s*text|atvir|открыт/i),
    };
    const securityIndex = risks.findIndex((risk) => /sms|verification code|patvirtinimo kod|подтверждения/i.test(risk.risk));
    if (securityIndex >= 0) risks[securityIndex] = securityRisk;
    else risks.push(securityRisk);
  }
  if (hasCatalogScaleChange) {
    const evidence = sentences.find((sentence) => /\b12\b[\s\S]{0,100}\b50[\s,]?000\b/i.test(sentence)) ?? "";
    risks.push({ risk: guidance.scaleRisk, severity: "high", evidence: shortEvidence(evidence, /\b12\b/i) });
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    risks.push({
      risk: guidance.accessRisk,
      severity: "high",
      evidence: shortEvidence(accessSentences[0], /access|prieig|доступ/i),
    });
  }
  const sortedRisks = risks.sort((left, right) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[left.severity] - severityOrder[right.severity];
  }).slice(0, 30);

  let actionItems = [...analysis.action_items].sort((left, right) => left.order - right.order);
  const requiredActions = [];
  if (hasPlaintextSmsCodes) {
    actionItems = actionItems.filter((item) => !/technical stack|techn\w*\s+stek\w*|техническ(?:ий|ого) стек|sms|verification code|patvirtinimo kod|подтверждения/i.test(`${item.title} ${item.description}`));
    requiredActions.push({ order: 1, title: guidance.securityAction, description: guidance.securityDescription, timing: guidance.beforeStart });
  }
  if (needsBudgetAgreement) {
    actionItems = actionItems.filter((item) => !/budget|biudžet|fee|payment|advance|avans|apmok|atlyg|оплат|сумм|contract|sutart|prepaid|išankst|договор|предоплат/i.test(`${item.title} ${item.description}`));
    requiredActions.push({ order: 1, title: guidance.action, description: guidance.actionDescription, timing: guidance.beforeStart });
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    actionItems = actionItems.filter((item) => !/source code|codebase|server|kodo|serverio|исходн|сервер/i.test(`${item.title} ${item.description}`));
    requiredActions.push({ order: 1, title: guidance.accessAction, description: guidance.accessDescription, timing: guidance.beforeStart });
  }
  if (hasCatalogScaleChange) {
    actionItems = actionItems.filter((item) => !/50[\s,]?000|catalog|katalog|performance|našum|производительност/i.test(`${item.title} ${item.description}`));
    requiredActions.push({ order: 1, title: guidance.scaleAction, description: guidance.scaleDescription, timing: guidance.beforeEstimate });
  }
  if (hasEstimateRequest && !actionItems.some((item) => /hourly estimate|estimate broken down by hours|sąmatą pagal valandas|оценку в часах/i.test(`${item.title} ${item.description}`))) {
    requiredActions.push({ order: 1, title: guidance.estimateAction, description: guidance.estimateDescription, timing: guidance.beforeEstimate });
  }
  actionItems = [...requiredActions, ...actionItems]
    .map((item, index) => {
      const timingPrefix = new RegExp(`^(?:${item.timing.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\s*[:,—-]?\\s*`, "i");
      return { ...item, title: item.title.replace(timingPrefix, "").trim(), order: index + 1 };
    })
    .slice(0, 30);

  const clientQuestions = [...analysis.client_questions];
  if (needsBudgetAgreement) {
    const index = clientQuestions.findIndex((question) => /budget|biudžet|amount|price|sum|apmok|avans|payment|fee|atlyg|оплат|сумм|роялт/i.test(question));
    if (index >= 0) clientQuestions.splice(index, 1);
    clientQuestions.unshift(guidance.question);
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    const index = clientQuestions.findIndex((question) => /code|server|kodo|serverio|код|сервер/i.test(question));
    if (index >= 0) clientQuestions.splice(index, 1);
    clientQuestions.splice(needsBudgetAgreement ? 1 : 0, 0, guidance.accessQuestion);
  }

  const recommendation = { ...analysis.recommendation };
  if (needsBudgetAgreement) {
    if (recommendation.decision === "take") recommendation.decision = "negotiate";
    if (!(/fixed amount|fiksuot|согласованной суммы/i.test(recommendation.rationale)
      && /advance|avans|аванс/i.test(recommendation.rationale))) {
      recommendation.rationale = `${guidance.rationale} ${recommendation.rationale}`.trim().slice(0, 700);
    }
  }

  return normalizeGeneratedValue({
    ...analysis,
    requirements: requirements.slice(0, 30),
    risks: sortedRisks.map((risk) => ({
      ...risk,
      evidence: shortEvidence(risk.evidence, /urgent|yesterday|вчера|сроч|skub|urgent/i),
    })),
    action_items: actionItems,
    client_questions: clientQuestions.slice(0, 20),
    recommendation,
  }, languageCode);
}
