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
    scaleRisk: (from, to) => `Katalogo apimtis auga nuo ${from} iki ${to} prekių – tai keičia darbų apimtį, našumo reikalavimus ir sąmatą.`,
    scaleRequirement: (from, to) => `Katalogas turi augti nuo ${from} iki ${to} prekių`,
    scaleAction: "Įvertinti katalogo, paieškos ir krepšelio veikimą",
    scaleDescription: (from, to) => `Įvertinti, kaip katalogas, paieška ir krepšelis veiks su ${to} prekėmis (numatyta augti nuo ${from}).`,
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
    scaleRisk: (from, to) => `The catalog is growing from ${from} to ${to} products, substantially changing scope, performance requirements, and the estimate.`,
    scaleRequirement: (from, to) => `The catalog must grow from ${from} to ${to} products`,
    scaleAction: "Assess catalog, search, and cart behavior",
    scaleDescription: (from, to) => `Assess how the catalog, search, and cart will perform with ${to} products (up from ${from}).`,
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
    scaleRisk: (from, to) => `Каталог растёт с ${from} до ${to} товаров, что существенно меняет объём работ, требования к производительности и оценку.`,
    scaleRequirement: (from, to) => `Каталог должен вырасти с ${from} до ${to} товаров`,
    scaleAction: "Оценить каталог, поиск и корзину",
    scaleDescription: (from, to) => `Оценить работу каталога, поиска и корзины с ${to} товарами (сейчас ${from}).`,
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
  pl: {
    risk: "Budżet i warunki wynagrodzenia są niejasne: nie uzgodniono stałej kwoty, a procent lub tantiemy są warunkowe.",
    action: "Uzgodnić stałą kwotę i zaliczkę",
    actionDescription: "Podpisać umowę, uzgodnić płatności etapami i dokładne warunki dodatkowych procentów lub tantiem.",
    question: "Jaką dokładną stałą kwotę Państwo proponują, jaka zaliczka i płatności etapami są przewidziane oraz jak będą naliczane dodatkowe 20% lub tantiemy od sprzedaży?",
    rationale: "Nie rozpoczynać bez pisemnie uzgodnionej stałej kwoty i zaliczki.",
    securityRisk: "Przechowywanie kodów SMS w postaci jawnej to krytyczne ryzyko bezpieczeństwa i prywatności.",
    securityAction: "Zrezygnować z przechowywania kodów w postaci jawnej",
    securityDescription: "To krytyczne ryzyko bezpieczeństwa i prywatności.",
    scaleRisk: (from, to) => `Katalog rośnie z ${from} do ${to} produktów, co istotnie zmienia zakres, wymagania wydajnościowe i wycenę.`,
    scaleRequirement: (from, to) => `Katalog ma wzrosnąć z ${from} do ${to} produktów`,
    scaleAction: "Ocenić działanie katalogu, wyszukiwania i koszyka",
    scaleDescription: (from, to) => `Ocenić działanie katalogu, wyszukiwania i koszyka przy ${to} produktach (wzrost z ${from}).`,
    accessRisk: "Dostęp do obecnego kodu i serwera nie został potwierdzony, więc nie można rzetelnie ocenić systemu ani prac.",
    accessAction: "Uzyskać dostęp do kodu i serwera",
    accessDescription: "Poprosić o dostęp do obecnego kodu, serwera i powiązanych kont.",
    accessQuestion: "Czy przed rozpoczęciem prac zapewnią Państwo dostęp do obecnego kodu, serwera i powiązanych kont?",
    estimateRequirement: "Przedstawić pull request lub wycenę w podziale na godziny",
    estimateAction: "Przygotować wycenę w podziale na godziny",
    estimateDescription: "Przedstawić pull request lub przynajmniej wycenę rozbitą na godziny.",
    specRequirement: "Ustalić, która wersja starej lub nowej specyfikacji obowiązuje",
    beforeStart: "Przed rozpoczęciem",
    beforeEstimate: "Przed wyceną",
  },
  fr: {
    risk: "Le budget et les conditions de rémunération ne sont pas définis : aucun montant fixe n'est convenu et les pourcentages ou redevances restent conditionnels.",
    action: "Convenir d'un montant fixe et d'un acompte",
    actionDescription: "Signer un contrat, convenir des paiements par étapes et préciser les conditions des pourcentages ou redevances.",
    question: "Quel montant fixe précis proposez-vous, quel acompte et quels paiements par étapes prévoyez-vous, et comment seraient calculés les 20 % supplémentaires ou les redevances sur les ventes ?",
    rationale: "Ne commencez pas sans montant fixe et acompte convenus par écrit.",
    securityRisk: "Le stockage des codes SMS en clair constitue un risque critique pour la sécurité et la confidentialité.",
    securityAction: "Cesser de stocker les codes en clair",
    securityDescription: "Cela constitue un risque critique pour la sécurité et la confidentialité.",
    scaleRisk: (from, to) => `Le catalogue passe de ${from} à ${to} produits, ce qui modifie fortement le périmètre, les exigences de performance et le devis.`,
    scaleRequirement: (from, to) => `Le catalogue doit passer de ${from} à ${to} produits`,
    scaleAction: "Évaluer le catalogue, la recherche et le panier",
    scaleDescription: (from, to) => `Évaluer le fonctionnement du catalogue, de la recherche et du panier avec ${to} produits (contre ${from} actuellement).`,
    accessRisk: "L'accès au code et au serveur actuels n'est pas confirmé ; le système et le travail ne peuvent pas être évalués de manière fiable.",
    accessAction: "Obtenir l'accès au code et au serveur",
    accessDescription: "Demander l'accès au code actuel, au serveur et aux comptes associés.",
    accessQuestion: "Fournirez-vous l'accès au code actuel, au serveur et aux comptes associés avant le début du travail ?",
    estimateRequirement: "Fournir une pull request ou un devis détaillé en heures",
    estimateAction: "Préparer un devis détaillé en heures",
    estimateDescription: "Fournir une pull request ou, au minimum, un devis détaillé en heures.",
    specRequirement: "Confirmer quelle version de l'ancienne ou de la nouvelle spécification fait foi",
    beforeStart: "Avant de commencer",
    beforeEstimate: "Avant le devis",
  },
  de: {
    risk: "Budget und Vergütung sind unklar: Es wurde kein Festbetrag vereinbart, und prozentuale Anteile oder Tantiemen sind bedingt.",
    action: "Festbetrag und Anzahlung vereinbaren",
    actionDescription: "Vertrag abschließen, Meilensteinzahlungen vereinbaren und Bedingungen für zusätzliche Prozente oder Tantiemen festlegen.",
    question: "Welchen genauen Festbetrag schlagen Sie vor, welche Anzahlung und Meilensteinzahlungen sind vorgesehen, und wie würden zusätzliche 20 % oder Umsatzbeteiligungen berechnet?",
    rationale: "Ohne schriftlich vereinbarten Festbetrag und Anzahlung nicht beginnen.",
    securityRisk: "SMS-Bestätigungscodes im Klartext zu speichern, ist ein kritisches Sicherheits- und Datenschutzrisiko.",
    securityAction: "Bestätigungscodes nicht im Klartext speichern",
    securityDescription: "Dies ist ein kritisches Sicherheits- und Datenschutzrisiko.",
    scaleRisk: (from, to) => `Der Katalog wächst von ${from} auf ${to} Produkte. Das verändert Umfang, Leistungsanforderungen und Kostenschätzung erheblich.`,
    scaleRequirement: (from, to) => `Der Katalog soll von ${from} auf ${to} Produkte wachsen`,
    scaleAction: "Katalog, Suche und Warenkorb bewerten",
    scaleDescription: (from, to) => `Bewerten, wie Katalog, Suche und Warenkorb mit ${to} Produkten funktionieren (bisher ${from}).`,
    accessRisk: "Der Zugriff auf den bestehenden Code und Server ist unbestätigt; das System und der Aufwand lassen sich daher nicht verlässlich einschätzen.",
    accessAction: "Zugriff auf Code und Server anfordern",
    accessDescription: "Zugriff auf den bestehenden Code, Server und zugehörige Konten anfordern.",
    accessQuestion: "Stellen Sie vor Arbeitsbeginn Zugriff auf den bestehenden Code, Server und die zugehörigen Konten bereit?",
    estimateRequirement: "Pull Request oder Stundenschätzung vorlegen",
    estimateAction: "Stundenschätzung erstellen",
    estimateDescription: "Einen Pull Request oder zumindest eine nach Stunden aufgeschlüsselte Schätzung vorlegen.",
    specRequirement: "Klären, welche alte oder neue Spezifikation maßgeblich ist",
    beforeStart: "Vor Arbeitsbeginn",
    beforeEstimate: "Vor dem Angebot",
  },
  es: {
    risk: "El presupuesto y las condiciones de pago no están claros: no hay una cantidad fija acordada y los porcentajes o regalías son condicionales.",
    action: "Acordar una cantidad fija y un anticipo",
    actionDescription: "Firmar un contrato, acordar pagos por hitos y definir las condiciones de porcentajes o regalías.",
    question: "¿Qué cantidad fija exacta propone, qué anticipo y pagos por hitos prevé, y cómo se calcularían el 20 % adicional o las regalías por ventas?",
    rationale: "No empezar sin una cantidad fija y un anticipo acordados por escrito.",
    securityRisk: "Guardar códigos SMS de verificación en texto plano es un riesgo crítico de seguridad y privacidad.",
    securityAction: "Dejar de guardar códigos en texto plano",
    securityDescription: "Esto supone un riesgo crítico de seguridad y privacidad.",
    scaleRisk: (from, to) => `El catálogo crece de ${from} a ${to} productos, lo que cambia sustancialmente el alcance, el rendimiento y el presupuesto.`,
    scaleRequirement: (from, to) => `El catálogo debe crecer de ${from} a ${to} productos`,
    scaleAction: "Evaluar catálogo, búsqueda y carrito",
    scaleDescription: (from, to) => `Evaluar cómo funcionarán el catálogo, la búsqueda y el carrito con ${to} productos (antes ${from}).`,
    accessRisk: "No se ha confirmado el acceso al código y al servidor actuales, por lo que no se puede evaluar el sistema ni el trabajo con fiabilidad.",
    accessAction: "Solicitar acceso al código y al servidor",
    accessDescription: "Solicitar acceso al código actual, al servidor y a las cuentas relacionadas.",
    accessQuestion: "¿Proporcionará acceso al código actual, al servidor y a las cuentas relacionadas antes de empezar?",
    estimateRequirement: "Entregar una pull request o un presupuesto por horas",
    estimateAction: "Preparar un presupuesto por horas",
    estimateDescription: "Entregar una pull request o, al menos, un presupuesto desglosado por horas.",
    specRequirement: "Aclarar qué versión de la especificación, antigua o nueva, es válida",
    beforeStart: "Antes de empezar",
    beforeEstimate: "Antes del presupuesto",
  },
  uk: {
    risk: "Бюджет і умови оплати не визначені: фіксовану суму не погоджено, а відсоток або роялті є умовними.",
    action: "Погодити фіксовану суму й аванс",
    actionDescription: "Підписати договір, погодити оплату за етапами та точні умови додаткових відсотків або роялті.",
    question: "Яку точну фіксовану суму ви пропонуєте, який аванс та оплату за етапами передбачаєте і як рахуватимуть додаткові 20 % або роялті з продажів?",
    rationale: "Не починайте без письмово погоджених фіксованої суми й авансу.",
    securityRisk: "Зберігання SMS-кодів підтвердження у відкритому вигляді — критичний ризик безпеки та приватності.",
    securityAction: "Відмовитися від зберігання кодів у відкритому вигляді",
    securityDescription: "Це критичний ризик безпеки та приватності.",
    scaleRisk: (from, to) => `Каталог зростає з ${from} до ${to} товарів, що суттєво змінює обсяг робіт, вимоги до продуктивності та кошторис.`,
    scaleRequirement: (from, to) => `Каталог має зрости з ${from} до ${to} товарів`,
    scaleAction: "Оцінити каталог, пошук і кошик",
    scaleDescription: (from, to) => `Оцінити роботу каталогу, пошуку й кошика з ${to} товарами (зараз ${from}).`,
    accessRisk: "Доступ до поточного коду й сервера не підтверджено, тому систему та обсяг робіт неможливо надійно оцінити.",
    accessAction: "Отримати доступ до коду й сервера",
    accessDescription: "Запросити доступ до поточного коду, сервера та пов'язаних облікових записів.",
    accessQuestion: "Чи надасте ви доступ до поточного коду, сервера та пов'язаних облікових записів до початку робіт?",
    estimateRequirement: "Надати pull request або кошторис із розбивкою за годинами",
    estimateAction: "Підготувати кошторис за годинами",
    estimateDescription: "Надати pull request або щонайменше кошторис із розбивкою за годинами.",
    specRequirement: "Уточнити, яка версія старої чи нової специфікації є чинною",
    beforeStart: "До початку робіт",
    beforeEstimate: "До оцінювання",
  },
  it: {
    risk: "Budget e compenso non sono definiti: non è stato concordato un importo fisso e le percentuali o royalty sono condizionali.",
    action: "Concordare un importo fisso e un anticipo",
    actionDescription: "Firmare un contratto, concordare i pagamenti per fase e definire le condizioni di percentuali o royalty.",
    question: "Quale importo fisso preciso propone, quale anticipo e pagamenti per fase prevede e come verrebbero calcolati il 20% aggiuntivo o le royalty sulle vendite?",
    rationale: "Non iniziare senza un importo fisso e un anticipo concordati per iscritto.",
    securityRisk: "Memorizzare i codici SMS in chiaro è un rischio critico per la sicurezza e la privacy.",
    securityAction: "Non memorizzare i codici in chiaro",
    securityDescription: "È un rischio critico per la sicurezza e la privacy.",
    scaleRisk: (from, to) => `Il catalogo cresce da ${from} a ${to} prodotti, modificando sostanzialmente ambito, prestazioni e preventivo.`,
    scaleRequirement: (from, to) => `Il catalogo deve crescere da ${from} a ${to} prodotti`,
    scaleAction: "Valutare catalogo, ricerca e carrello",
    scaleDescription: (from, to) => `Valutare il funzionamento di catalogo, ricerca e carrello con ${to} prodotti (da ${from}).`,
    accessRisk: "L'accesso al codice e al server esistenti non è confermato, quindi non è possibile valutare il sistema e il lavoro in modo affidabile.",
    accessAction: "Richiedere accesso al codice e al server",
    accessDescription: "Richiedere l'accesso al codice esistente, al server e agli account correlati.",
    accessQuestion: "Fornirà accesso al codice esistente, al server e agli account correlati prima dell'inizio?",
    estimateRequirement: "Fornire una pull request o un preventivo dettagliato per ore",
    estimateAction: "Preparare un preventivo per ore",
    estimateDescription: "Fornire una pull request o almeno un preventivo dettagliato per ore.",
    specRequirement: "Chiarire quale specifica, vecchia o nuova, è valida",
    beforeStart: "Prima di iniziare",
    beforeEstimate: "Prima del preventivo",
  },
  pt: {
    risk: "O orçamento e as condições de pagamento não estão definidos: não há valor fixo acordado e as percentagens ou royalties são condicionais.",
    action: "Acordar um valor fixo e um adiantamento",
    actionDescription: "Assinar um contrato, acordar pagamentos por etapas e definir as condições de percentagens ou royalties.",
    question: "Qual é o valor fixo exato que propõe, que adiantamento e pagamentos por etapas prevê e como seriam calculados os 20% adicionais ou royalties sobre as vendas?",
    rationale: "Não iniciar sem um valor fixo e um adiantamento acordados por escrito.",
    securityRisk: "Armazenar códigos SMS de verificação em texto simples é um risco crítico de segurança e privacidade.",
    securityAction: "Deixar de armazenar códigos em texto simples",
    securityDescription: "Isto representa um risco crítico de segurança e privacidade.",
    scaleRisk: (from, to) => `O catálogo cresce de ${from} para ${to} produtos, alterando significativamente o escopo, o desempenho e o orçamento.`,
    scaleRequirement: (from, to) => `O catálogo deve crescer de ${from} para ${to} produtos`,
    scaleAction: "Avaliar catálogo, pesquisa e carrinho",
    scaleDescription: (from, to) => `Avaliar como o catálogo, a pesquisa e o carrinho funcionarão com ${to} produtos (antes ${from}).`,
    accessRisk: "O acesso ao código e ao servidor atuais não foi confirmado, por isso não é possível avaliar o sistema e o trabalho com confiança.",
    accessAction: "Solicitar acesso ao código e ao servidor",
    accessDescription: "Solicitar acesso ao código atual, ao servidor e às contas relacionadas.",
    accessQuestion: "Fornecerá acesso ao código atual, ao servidor e às contas relacionadas antes do início?",
    estimateRequirement: "Entregar um pull request ou um orçamento detalhado por horas",
    estimateAction: "Preparar um orçamento por horas",
    estimateDescription: "Entregar um pull request ou, pelo menos, um orçamento detalhado por horas.",
    specRequirement: "Confirmar qual versão da especificação, antiga ou nova, é válida",
    beforeStart: "Antes de começar",
    beforeEstimate: "Antes do orçamento",
  },
  nl: {
    risk: "Budget en vergoeding zijn onduidelijk: er is geen vast bedrag afgesproken en percentages of royalty's zijn voorwaardelijk.",
    action: "Een vast bedrag en voorschot afspreken",
    actionDescription: "Een contract ondertekenen, betalingen per fase afspreken en voorwaarden voor percentages of royalty's vastleggen.",
    question: "Welk exact vaste bedrag stelt u voor, welk voorschot en welke deelbetalingen verwacht u, en hoe worden eventuele extra 20% of verkooproyalty's berekend?",
    rationale: "Begin niet zonder schriftelijk afgesproken vast bedrag en voorschot.",
    securityRisk: "Sms-verificatiecodes in platte tekst opslaan is een kritiek beveiligings- en privacyrisico.",
    securityAction: "Stop met codes opslaan in platte tekst",
    securityDescription: "Dit is een kritiek beveiligings- en privacyrisico.",
    scaleRisk: (from, to) => `De catalogus groeit van ${from} naar ${to} producten, wat de scope, prestaties en raming aanzienlijk verandert.`,
    scaleRequirement: (from, to) => `De catalogus moet groeien van ${from} naar ${to} producten`,
    scaleAction: "Catalogus, zoeken en winkelwagen beoordelen",
    scaleDescription: (from, to) => `Beoordelen hoe catalogus, zoeken en winkelwagen werken met ${to} producten (nu ${from}).`,
    accessRisk: "Toegang tot de bestaande code en server is niet bevestigd, waardoor het systeem en de werkzaamheden niet betrouwbaar kunnen worden beoordeeld.",
    accessAction: "Toegang tot code en server aanvragen",
    accessDescription: "Toegang vragen tot de bestaande code, server en bijbehorende accounts.",
    accessQuestion: "Verstrekt u vóór de start toegang tot de bestaande code, server en bijbehorende accounts?",
    estimateRequirement: "Een pull request of een raming uitgesplitst in uren leveren",
    estimateAction: "Een raming per uur voorbereiden",
    estimateDescription: "Een pull request of ten minste een raming uitgesplitst in uren leveren.",
    specRequirement: "Vaststellen welke oude of nieuwe specificatie leidend is",
    beforeStart: "Voor aanvang",
    beforeEstimate: "Voor de raming",
  },
  sv: {
    risk: "Budget och ersättningsvillkor är oklara: inget fast belopp har avtalats och procent eller royalty är villkorade.",
    action: "Kom överens om ett fast belopp och förskott",
    actionDescription: "Skriv avtal, kom överens om delbetalningar och definiera villkoren för eventuella procent eller royalty.",
    question: "Vilket exakt fast belopp föreslår du, vilket förskott och vilka delbetalningar planerar du, och hur beräknas eventuella extra 20 % eller royalty på försäljning?",
    rationale: "Börja inte utan ett skriftligt överenskommet fast belopp och förskott.",
    securityRisk: "Att lagra SMS-koder i klartext är en kritisk säkerhets- och integritetsrisk.",
    securityAction: "Sluta lagra koder i klartext",
    securityDescription: "Detta är en kritisk säkerhets- och integritetsrisk.",
    scaleRisk: (from, to) => `Katalogen växer från ${from} till ${to} produkter, vilket väsentligt ändrar omfattning, prestandakrav och kostnadsförslag.`,
    scaleRequirement: (from, to) => `Katalogen ska växa från ${from} till ${to} produkter`,
    scaleAction: "Bedöm katalog, sökning och varukorg",
    scaleDescription: (from, to) => `Bedöm hur katalog, sökning och varukorg fungerar med ${to} produkter (från ${from}).`,
    accessRisk: "Åtkomst till befintlig kod och server är inte bekräftad, så systemet och arbetet kan inte bedömas tillförlitligt.",
    accessAction: "Begär åtkomst till kod och server",
    accessDescription: "Begär åtkomst till befintlig kod, server och relaterade konton.",
    accessQuestion: "Kommer du att ge åtkomst till befintlig kod, server och relaterade konton innan arbetet börjar?",
    estimateRequirement: "Lämna en pull request eller en uppskattning per timme",
    estimateAction: "Ta fram en uppskattning per timme",
    estimateDescription: "Lämna en pull request eller åtminstone en uppskattning uppdelad per timme.",
    specRequirement: "Klargöra vilken äldre eller ny specifikation som gäller",
    beforeStart: "Innan arbetet börjar",
    beforeEstimate: "Före offert",
  },
  ja: {
    risk: "予算と報酬条件が不明確です。固定金額は合意されておらず、割合報酬やロイヤリティは条件付きです。",
    action: "固定金額と前払いを合意する",
    actionDescription: "契約を締結し、段階払いと追加割合報酬・ロイヤリティの条件を明確にします。",
    question: "提示する固定金額はいくらですか。前払いと段階払いの条件、および追加20%や売上ロイヤリティの計算方法を教えてください。",
    rationale: "固定金額と前払いを書面で合意するまで着手しないでください。",
    securityRisk: "SMS認証コードを平文で保存することは、重大なセキュリティおよびプライバシーリスクです。",
    securityAction: "認証コードの平文保存をやめる",
    securityDescription: "これは重大なセキュリティおよびプライバシーリスクです。",
    scaleRisk: (from, to) => `商品カタログが${from}件から${to}件に増えるため、作業範囲、性能要件、見積もりが大きく変わります。`,
    scaleRequirement: (from, to) => `商品カタログを${from}件から${to}件に増やす`,
    scaleAction: "カタログ・検索・カートを評価する",
    scaleDescription: (from, to) => `${to}件（現在${from}件）の商品で、カタログ・検索・カートがどう動作するか評価します。`,
    accessRisk: "既存コードとサーバーへのアクセスが確認されておらず、現状や作業量を正確に評価できません。",
    accessAction: "コードとサーバーへのアクセスを得る",
    accessDescription: "作業開始前に既存コード、サーバー、関連アカウントへのアクセスを依頼します。",
    accessQuestion: "作業開始前に既存コード、サーバー、関連アカウントへのアクセスを提供できますか。",
    estimateRequirement: "プルリクエストまたは時間単位の見積もりを提出する",
    estimateAction: "時間単位の見積もりを作成する",
    estimateDescription: "プルリクエスト、または少なくとも時間単位の内訳付き見積もりを提出します。",
    specRequirement: "旧仕様と新仕様のどちらが有効か確認する",
    beforeStart: "作業開始前",
    beforeEstimate: "見積もり前",
  },
  zh: {
    risk: "预算和报酬条款不明确：尚未商定固定金额，额外比例或销售提成也只是有条件的。",
    action: "商定固定金额和预付款",
    actionDescription: "签订合同，商定分阶段付款，并明确额外比例或销售提成的条件。",
    question: "您提出的确切固定金额是多少？预付款和阶段付款如何安排？额外20%或销售提成如何计算？",
    rationale: "未书面商定固定金额和预付款前不要开始工作。",
    securityRisk: "以明文存储短信验证码是严重的安全与隐私风险。",
    securityAction: "停止以明文存储验证码",
    securityDescription: "这是严重的安全与隐私风险。",
    scaleRisk: (from, to) => `商品目录从${from}件增长到${to}件，将显著改变工作范围、性能要求和报价。`,
    scaleRequirement: (from, to) => `商品目录需要从${from}件增长到${to}件`,
    scaleAction: "评估目录、搜索和购物车",
    scaleDescription: (from, to) => `评估目录、搜索和购物车在${to}件商品（当前${from}件）时的运行情况。`,
    accessRisk: "尚未确认是否能访问现有代码和服务器，因此无法可靠评估现有系统和工作量。",
    accessAction: "申请代码和服务器访问权限",
    accessDescription: "开始前申请现有代码、服务器及相关账户的访问权限。",
    accessQuestion: "开始工作前，您能否提供现有代码、服务器及相关账户的访问权限？",
    estimateRequirement: "提交 pull request 或按小时拆分的报价",
    estimateAction: "准备按小时拆分的报价",
    estimateDescription: "提交 pull request，或至少提供按小时拆分的报价。",
    specRequirement: "确认旧版与新版规格中哪一版有效",
    beforeStart: "开始前",
    beforeEstimate: "报价前",
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
  const normalized = languageName.toLowerCase();
  const languageCodes = {
    "lietuvių": "lt",
    english: "en",
    русский: "ru",
    polski: "pl",
    français: "fr",
    deutsch: "de",
    español: "es",
    українська: "uk",
    italiano: "it",
    português: "pt",
    nederlands: "nl",
    svenska: "sv",
    日本語: "ja",
    中文: "zh",
  };
  return languageCodes[normalized] ?? "en";
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
    normalized = normalized.replace(/\b(?:language|kalba|kalbos|язык)\s*[:=]\s*CN\b/giu, (match) => match.replace(/\bCN\b/i, "ZH"));
  }
  normalized = normalized.replace(/\b(?:Chinese|Kinų|中文)\s*\(\s*CN\s*\)/giu, (match) => `${match.replace(/\s*\(.*$/, "")} (ZH)`);
  normalized = normalized.replace(/\bCN\b(?=\s*(?:ir|and|или|и|kalb|language|lang|[/,]))/giu, "ZH");

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
    /budget|price|cost|fee|payment|advance|pay|minimum|fixed amount|bonus|royalt(?:y|ies)|biudžet|kain|avans|apmok|atlyg|rojal|процент|роялт|оплат|стоим|минимал|бюджет/iu.test(sentence)
    || /(?:[$€£₽]\s*\d|\d[\d\s,.]*\s?(?:€|EUR|USD|GBP|PLN|RUB|SEK|JPY|CNY|CAD|AUD|UAH|KZT|BYN|zł)|\d\s*%)/iu.test(sentence)
  ));
}

function makeRequirement(requirement, clarity, evidence) {
  return { requirement, clarity, evidence: shortEvidence(evidence, /./) };
}

function parseQuantity(value) {
  const parsed = Number(value.replace(/[ ,. ]/g, ""));
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function formatCount(value, languageCode) {
  const locale = {
    lt: "lt-LT", en: "en-US", ru: "ru-RU", pl: "pl-PL", fr: "fr-FR",
    de: "de-DE", es: "es-ES", uk: "uk-UA", it: "it-IT", pt: "pt-PT",
    nl: "nl-NL", sv: "sv-SE", ja: "ja-JP", zh: "zh-CN",
  }[languageCode];
  return new Intl.NumberFormat(locale).format(value);
}

function findProductCountChange(sentences) {
  for (const sentence of sentences) {
    if (!/(?:catalog|product|item|товар|каталог|preki|katalog)/iu.test(sentence)) continue;
    const quantities = [...sentence.matchAll(/\d{1,3}(?:[ ,.\u00a0]\d{3})+|\d+/gu)];
    for (let index = 0; index < quantities.length - 1; index += 1) {
      const current = quantities[index];
      const next = quantities[index + 1];
      const before = sentence.slice(Math.max(0, current.index - 32), current.index);
      const between = sentence.slice(current.index + current[0].length, next.index);
      const explicitTransition = /(?:from|с|от|со|nuo)\s*$/iu.test(before)
        && /^(?:\s*(?:to|into|до|на|iki|į)(?:\s|$)|\s*(?:->|→|⇒))/iu.test(between);
      const arrowTransition = /^\s*(?:->|→|⇒)\s*$/u.test(between);
      if (!explicitTransition && !arrowTransition) continue;
      const from = parseQuantity(current[0]);
      const to = parseQuantity(next[0]);
      if (from && to && from !== to) return { from, to, evidence: sentence };
    }
  }
  return null;
}

function hasCompensationUncertainty(sentences) {
  const uncertainty = String.raw`(?:maybe|perhaps|possibly|if\s+(?:possible|feasible)|might|could|gal(?:būt)?|jei\s+(?:įmanoma|pavyks)|может\s+быть|возможно|если\s+(?:получится|возможно))`;
  const compensationMarker = String.raw`(?:\+\s*\d+(?:[.,]\d+)?\s*%|\d+(?:[.,]\d+)?\s*%|royalt(?:y|ies|i|č)|роялт\p{L}*|[$€£₽]\s*\d[\d,.]*)`;
  const conditionalMarker = new RegExp(
    String.raw`(?:${uncertainty}.{0,35}${compensationMarker}|${compensationMarker}.{0,35}${uncertainty})`,
    "iu",
  );
  const remunerationCue = /(?:\+\s*\d|bonus|commission|royalt|revenue\s+share|sales\s+percentage|additional\s+\d|extra\s+\d|compensation|payment|fee|бонус|комисс|роялт|дополнительн\p{L}*\s+\d|процент\p{L}*\s+(?:от\s+)?(?:продаж|выручк)|procent\p{L}*\s+(?:nuo\s+)?pardav|atlyg|premij|prowizj|dodatkow\p{L}*\s+\d|prime|commission|umsatzbeteilig|royalt|regal|regalía)/iu;
  const budgetContext = /budget|price|cost|fee|payment|compensation|amount|sum|minimum|bonus|royalt|commission|biudžet|kain|atlyg|suma|avans|rojal|процент|роялт|оплат|стоим|минимал|бюджет/iu;
  return sentences.some((sentence) => sentence.split(/[;:\n]+/u).some((clause) => (
    conditionalMarker.test(clause)
    && (remunerationCue.test(clause) || budgetContext.test(clause) && /\+\s*\d/u.test(clause))
  )));
}

function isExplicitUnknownBudget(text) {
  return /(?:no\s+(?:fixed\s+)?budget|budget\s+(?:is\s+)?(?:not\s+specified|unknown|tbd)|amount\s+(?:is\s+)?(?:not\s+specified|unknown|tbd)|biudžet(?:as)?\s*(?:nenurodytas|neaiškus)|suma\s*(?:nenurodyta|neaiški)|бюджет\s*(?:не\s+указан|неизвестен)|сумма\s*(?:не\s+указана|неизвестна))/iu.test(text);
}

export function applyDeterministicAssessmentRules(analysis, sourceText, languageName) {
  const languageCode = getLanguageCode(languageName);
  const guidance = budgetGuidance[languageCode];
  const financialSentences = getFinancialSentences(sourceText);
  const sentences = getSentences(sourceText);
  const financialContext = [
    ...financialSentences,
    ...(analysis.budget.evidence && sourceText.includes(analysis.budget.evidence) ? [analysis.budget.evidence] : []),
  ].join(" ");
  const hasFixedCurrencyAmount = /(?:[$€£₽]\s*\d[\d\s,.]*|\d[\d\s,.]*\s?(?:€|EUR|USD|GBP|PLN|RUB|SEK|JPY|CNY|CAD|AUD|UAH|KZT|BYN|руб(?:\.|лей)?|zł))/iu.test(financialContext)
    || /(?:fixed|agreed|budget|price|amount|suma|biudžet|fiksuot|pinig|сумм|бюджет|фиксир)\D{0,30}\b\d{2,}\b(?!\s*%)/iu.test(financialContext);
  const hasConditionalCompensation = hasCompensationUncertainty(financialSentences);
  const needsBudgetAgreement = isExplicitUnknownBudget(sourceText)
    || !hasFixedCurrencyAmount
    || hasConditionalCompensation;
  const plaintextCodeSentence = sentences.find((sentence) => (
    /(?:sms|text message|sms[- ]?(?:verification|confirmation)?\s*code|sms kod|sms patvirtinimo kod|код(?:ы)? подтверждения|смс)/iu.test(sentence)
    && /(?:plain\s*text|unhashed|atvir(?:u|uoju)\s+tekst(?:u|e)|открыт(?:ом|ым)\s+текст(?:е|ом)|в открытом виде)/iu.test(sentence)
  ));
  const hasPlaintextSmsCodes = Boolean(plaintextCodeSentence);
  const productCountChange = findProductCountChange(sentences);
  const accessSentences = sentences.filter((sentence) => (
    /(?:access|prieig|доступ)/iu.test(sentence)
    && /(?:source\s+code|existing\s+code|codebase|server|kodo|kodų|serverio|исходн\w*\s+код\w*|сервер)/iu.test(sentence)
    && /(?:\?|whether|will\s+(?:you|they)|provide|send|later|ar\s+\w+|bus\s+\w+|vėliau|atsiųs|suteik|предостав|будет|позже|есть ли|будут ли)/iu.test(sentence)
  ));
  const hasUnconfirmedCodeOrServerAccess = accessSentences.length > 0;
  const specSentences = sentences.filter((sentence) => {
    const namesOldSpec = /(?:\bold\b.{0,35}\b(?:spec|specification|requirements|brief|ТЗ)\b|\bprevious\b.{0,25}\b(?:specification|ТЗ)\b|\bsen(?:as|o|ą|ieji|ų|esni)\s+(?:ТЗ|specifikacij\p{L}*|technin\p{L}*\s+apraš\p{L}*)|стар(?:ое|ый|ые|ого|ую)\s+(?:ТЗ|спецификаци\p{L}*))/iu.test(sentence);
    const saysIgnore = /(?:\bignore\b|\bdisregard\b|\bdo\s+not\s+consider\b|\bdo\s+not\s+use\b|не\s+учитыва\p{L}*|не\s+смотр\p{L}*|neatsižvelk\p{L}*|nežiūrėk\p{L}*|neatsižvelg\p{L}*)/iu.test(sentence);
    const saysFollow = /(?:\bbut\s+(?:consider|use|follow|account\s+for)\b|\balthough\b.{0,40}\b(?:consider|use|follow)\b|\bbut\s+(?:actually\s+)?(?:do|please)\s+(?:consider|use)\b|но\s+(?:нужно\s+)?учитыва\p{L}*|хотя\s+(?:нужно\s+)?учитыва\p{L}*|bet\s+(?:reikia\s+)?atsižvelg\p{L}*|nors\s+(?:reikia\s+)?atsižvelg\p{L}*)/iu.test(sentence);
    return namesOldSpec && saysIgnore && saysFollow;
  });
  const hourlyEstimatePattern = /\b(?:hourly\s+(?:rate|estimate|quote)|estimate\s+(?:(?:broken\s+down|itemi[sz]ed)\s+by|in|per)\s+hours|estimate\s+by\s+the\s+hour|quote\s+(?:by|in)\s+hours)\b|(?:смет\p{L}*|оценк\p{L}*)\s+(?:по\s+часам|в\s+часах)|(?:sąmat\p{L}*|įkain\p{L}*)\s+(?:pagal\s+valand\p{L}*|valandomis)/iu;
  const hourlyEstimateRequest = hourlyEstimatePattern.test(sourceText);
  const explicitPullRequestPattern = /(?:\b(?:please\s+)?(?:send|submit|provide|prepare|open)\s+(?:a\s+)?pull\s+request\b|\b(?:need|request(?:ed)?|asked\s+for)\s+(?:a\s+)?pull\s+request\b|(?:нужен|нужно|сделайте|предоставьте)\s+pull\s+request|(?:prašau\s+)?(?:pateikti|parengti)\s+pull\s+request)/iu;
  const explicitPullRequestRequest = explicitPullRequestPattern.test(sourceText);
  const explicitPullRequestOrEstimate = /pull\s+request.{0,80}(?:or\s+(?:at\s+least|at\s+minimum)\s+(?:an?\s+)?(?:hourly\s+)?estimate|или\s+(?:хотя\s+бы\s+)?смет\p{L}*|arba\s+(?:bent\s+)?sąmat\p{L}*)/iu.test(sourceText)
    || /(?:pull\s+request).{0,80}(?:estimate\s+(?:broken\s+down|by)\s+hours|смет\p{L}*\s+по\s+часам|sąmat\p{L}*\s+pagal\s+valand\p{L}*)/iu.test(sourceText);
  const hasEstimateRequest = hourlyEstimateRequest || (explicitPullRequestRequest && explicitPullRequestOrEstimate);

  const requirements = [...analysis.requirements];
  if (productCountChange) {
    const from = formatCount(productCountChange.from, languageCode);
    const to = formatCount(productCountChange.to, languageCode);
    const item = makeRequirement(
      guidance.scaleRequirement(from, to),
      "clear",
      productCountChange.evidence,
    );
    const existingIndex = requirements.findIndex((item) => (
      /(?:catalog|product|item|товар|каталог|preki|katalog)/iu.test(item.requirement)
      && /(?:scale|grow|increase|expand|capacity|performance|volume|scope|apim|aug|did|раст|увелич|масштаб|количеств|catalog.{0,20}\d|каталог.{0,20}\d|katalog.{0,20}\d)/iu.test(item.requirement)
    ));
    if (existingIndex >= 0) requirements[existingIndex] = item;
    else requirements.push(item);
  }
  if (hasEstimateRequest) {
    const evidence = sentences.find((sentence) => hourlyEstimatePattern.test(sentence) || explicitPullRequestPattern.test(sentence)) ?? sourceText;
    if (!requirements.some((item) => /(?:hourly|hours|broken down by hours|valandom|valandų|часам|часах|по часам|в часах|godzin|godzinach|heures|stunden|horas|ore|uren|timmar|時間|小时|годин)/iu.test(item.requirement))) {
      requirements.push(makeRequirement(guidance.estimateRequirement, "clear", evidence));
    }
  }
  if (specSentences.length > 0 && !requirements.some((item) => (
    /(?:specification|requirements|technin.*apraš|тз|спецификац)/iu.test(item.requirement)
    && item.clarity === "unclear"
  ))) {
    requirements.push(makeRequirement(guidance.specRequirement, "unclear", specSentences.join(" ")));
  }

  const risks = [...analysis.risks];
  if (needsBudgetAgreement) {
    const budgetRiskIndex = risks.findIndex((risk) => /(?:budget|biudžet|payment|fee|apmok|atlyg|оплат|стоим|бюджет|процент|royalt|роялт)/iu.test(risk.risk));
    const budgetEvidence = analysis.budget.evidence && sourceText.includes(analysis.budget.evidence)
      ? analysis.budget.evidence
      : financialSentences.find((sentence) => /budget|price|cost|fee|payment|minimum|royalt|biudžet|kain|atlyg|rojal|роялт|оплат|стоим|бюджет/i.test(sentence)) ?? "";
    const budgetRisk = {
      risk: guidance.risk,
      severity: "high",
      evidence: shortEvidence(budgetEvidence, /minimum|minimal|gal|maybe|роялт|royalt|procent|%/iu),
    };
    if (budgetRiskIndex >= 0) risks[budgetRiskIndex] = budgetRisk;
    else risks.push(budgetRisk);
  }
  if (hasPlaintextSmsCodes) {
    const evidence = plaintextCodeSentence ?? "";
    const securityRisk = {
      risk: guidance.securityRisk,
      severity: "critical",
      evidence: shortEvidence(evidence, /sms|plain\s*text|atvir|открыт/iu),
    };
    const securityIndex = risks.findIndex((risk) => /sms|verification code|patvirtinimo kod|подтверждения/iu.test(risk.risk));
    if (securityIndex >= 0) risks[securityIndex] = securityRisk;
    else risks.push(securityRisk);
  }
  if (productCountChange) {
    const scaleRisk = {
      risk: guidance.scaleRisk(formatCount(productCountChange.from, languageCode), formatCount(productCountChange.to, languageCode)),
      severity: "high",
      evidence: shortEvidence(productCountChange.evidence, /\d/u),
    };
    const scaleRiskIndex = risks.findIndex((risk) => (
      /(?:catalog|product|item|товар|каталог|preki|katalog)/iu.test(risk.risk)
      && /(?:scale|grow|increase|expand|capacity|performance|scope|volume|apim|aug|did|раст|увелич|масштаб|количеств)/iu.test(risk.risk)
    ));
    if (scaleRiskIndex >= 0) risks[scaleRiskIndex] = scaleRisk;
    else risks.push(scaleRisk);
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    const accessRisk = {
      risk: guidance.accessRisk,
      severity: "high",
      evidence: shortEvidence(accessSentences[0], /access|prieig|доступ/iu),
    };
    const accessRiskIndex = risks.findIndex((risk) => /(?:access|prieig|доступ)/iu.test(risk.risk)
      && /(?:code|server|kodo|сервер|исходн)/iu.test(risk.risk));
    if (accessRiskIndex >= 0) risks[accessRiskIndex] = accessRisk;
    else risks.push(accessRisk);
  }
  const sortedRisks = risks.sort((left, right) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[left.severity] - severityOrder[right.severity];
  }).slice(0, 30);

  let actionItems = [...analysis.action_items].sort((left, right) => left.order - right.order);
  const requiredActions = [];
  if (hasPlaintextSmsCodes) {
    const hasSecurityAction = actionItems.some((item) => (
      /(?:sms|verification|patvirtinimo|подтверждени)/iu.test(`${item.title} ${item.description}`)
      && /(?:plaintext|plain text|atvir|clear text|открыт)/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasSecurityAction) requiredActions.push({ order: 1, title: guidance.securityAction, description: guidance.securityDescription, timing: guidance.beforeStart });
  }
  if (needsBudgetAgreement) {
    const hasBudgetAction = actionItems.some((item) => (
      /(?:budget|biudžet|fixed amount|fixed price|amount|sum|suma|fiksuot|contract|sutart|договор|сумм|zaliczk|acompte|anzahlung|anticipo|adiantamento|voorschot|förskott|前払い|预付款)/iu.test(`${item.title} ${item.description}`)
      && /(?:agree|confirm|settle|sutart|sutar|suder|соглас|определ|uzgod|convenir|vereinbar|acordar|vastlegg|bestäm|合意|商定)/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasBudgetAction) requiredActions.push({ order: 1, title: guidance.action, description: guidance.actionDescription, timing: guidance.beforeStart });
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    const hasAccessAction = actionItems.some((item) => (
      /(?:code|server|kodo|serverio|сервер|исходн|dostęp|accès|zugriff|acceso|доступ|accesso|toegang|åtkomst|アクセス|访问)/iu.test(`${item.title} ${item.description}`)
      && /(?:access|request|ask|obtain|get|prieig|praš|papraš|gauti|получ|запрос|uzysk|demander|anfordern|solicitar|richiedere|aanvragen|begär|依頼|申请)/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasAccessAction) requiredActions.push({ order: 1, title: guidance.accessAction, description: guidance.accessDescription, timing: guidance.beforeStart });
  }
  if (productCountChange) {
    const hasScaleAction = actionItems.some((item) => (
      /(?:catalog|product|item|каталог|товар|preki|katalog)/iu.test(`${item.title} ${item.description}`)
      && /(?:scale|capacity|performance|load|volume|масштаб|нагруз|производительност|apim|našum|(?:with|at|for|su|при|с|avec|mit|con|com|met|med)\s+\d[\d ,.]*\s*(?:products|items|preki|товар)|(?:support|handle|serve|palaik|aptarna|обслуж|поддерж)\s+\d[\d ,.]*\s*(?:products|items|preki|товар))/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasScaleAction) {
      requiredActions.push({
        order: 1,
        title: guidance.scaleAction,
        description: guidance.scaleDescription(formatCount(productCountChange.from, languageCode), formatCount(productCountChange.to, languageCode)),
        timing: guidance.beforeEstimate,
      });
    }
  }
  if (hasEstimateRequest && !actionItems.some((item) => /(?:hour|valand|час|godzin|heure|stund|hora|ore|uur|timme|時間|小时)/iu.test(`${item.title} ${item.description}`))) {
    requiredActions.push({ order: 1, title: guidance.estimateAction, description: guidance.estimateDescription, timing: guidance.beforeEstimate });
  }
  actionItems = [...requiredActions, ...actionItems]
    .map((item, index) => {
      const timingPrefix = /^(?:prieš pradedant(?: darbus)?|prieš teikiant sąmatą|before starting(?: work)?|before quoting|до начала(?: работ)?|до оценки|przed rozpoczęciem|przed wyceną|avant de commencer|avant le devis|vor arbeitsbeginn|vor dem angebot|antes de empezar|antes del presupuesto|до початку робіт|до оцінювання|prima di iniziare|prima del preventivo|antes de começar|voor aanvang|före offert|作業開始前|报价前)\s*[:,—-]?\s*/iu;
      return { ...item, title: item.title.replace(timingPrefix, "").trim(), order: index + 1 };
    })
    .slice(0, 30);

  const clientQuestions = [...analysis.client_questions];
  if (needsBudgetAgreement) {
    const hasBudgetQuestion = clientQuestions.some((question) => /(?:budget|biudžet|amount|price|sum|apmok|avans|payment|fee|atlyg|оплат|сумм|роялт|wynagrodz|zaliczk|presupuesto|compens|pagamento|anticipo|acompte|budget|betrag|zahlung|ersatz|acconto|compenso|adiantamento|vergoeding|belopp|ersättning|前払い|预算|报酬)/iu.test(question));
    if (!hasBudgetQuestion) clientQuestions.unshift(guidance.question);
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    const hasAccessQuestion = clientQuestions.some((question) => /(?:code|server|kodo|serverio|код|сервер|código|servidor|code|server|コード|代码|сервер|сервер)/iu.test(question));
    if (!hasAccessQuestion) clientQuestions.splice(needsBudgetAgreement ? 1 : 0, 0, guidance.accessQuestion);
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
    risks: sortedRisks.map((risk) => ({ ...risk, evidence: shortEvidence(risk.evidence, /urgent|yesterday|вчера|сроч|skub|urgente|gestern|вчера/iu) })),
    action_items: actionItems,
    client_questions: clientQuestions.slice(0, 20),
    recommendation,
  }, languageCode);
}
