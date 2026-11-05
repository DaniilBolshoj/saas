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

const plainBudgetCopy = {
  lt: {
    risk: "Biudžetas nenurodytas: nėra sutartos kainos ar mokėjimo pagrindo, todėl darbų negalima patikimai įvertinti.",
    actionDescription: "Sudaryti sutartį ir raštu sutarti kainą, avansą bei mokėjimo etapus prieš pradedant darbus.",
    question: "Koks jūsų biudžetas šiam projektui ir kokią fiksuotą sumą, avansą bei mokėjimo grafiką laikytumėte priimtinais?",
  },
  en: {
    risk: "The budget is not specified: there is no agreed price or payment basis, so the work cannot be reliably estimated.",
    actionDescription: "Agree the price, advance, and milestone payments in writing before work starts.",
    question: "What is your budget for this project, and what fixed amount, advance, and payment schedule would work for you?",
  },
  ru: {
    risk: "Бюджет не указан: нет согласованной цены или основы для оплаты, поэтому работу нельзя надёжно оценить.",
    actionDescription: "Письменно согласовать цену, аванс и этапы оплаты до начала работы.",
    question: "Каков ваш бюджет на этот проект, и какая фиксированная сумма, аванс и график платежей вас устроят?",
  },
  pl: {
    risk: "Budżet nie został określony: brak uzgodnionej ceny lub podstawy płatności, więc nie można rzetelnie wycenić pracy.",
    actionDescription: "Uzgodnić na piśmie cenę, zaliczkę i etapy płatności przed rozpoczęciem pracy.",
    question: "Jaką kwotę budżetu przewidują Państwo na ten projekt oraz jaka stała kwota, zaliczka i harmonogram płatności byłyby dla Państwa akceptowalne?",
  },
  fr: {
    risk: "Le budget n'est pas précisé : aucun prix ni base de paiement convenus, le travail ne peut donc pas être estimé de façon fiable.",
    actionDescription: "Convenir par écrit du prix, de l'acompte et des étapes de paiement avant de commencer.",
    question: "Quel est votre budget pour ce projet, et quels montant fixe, acompte et calendrier de paiement vous conviendraient ?",
  },
  de: {
    risk: "Das Budget ist nicht angegeben: Es gibt keinen vereinbarten Preis oder keine Zahlungsgrundlage, daher lässt sich der Aufwand nicht verlässlich einschätzen.",
    actionDescription: "Preis, Anzahlung und Zahlungsetappen vor Arbeitsbeginn schriftlich vereinbaren.",
    question: "Wie hoch ist Ihr Budget für dieses Projekt, und welcher Festbetrag, welche Anzahlung und welcher Zahlungsplan wären für Sie akzeptabel?",
  },
  es: {
    risk: "El presupuesto no está indicado: no hay un precio ni una base de pago acordados, por lo que el trabajo no puede estimarse con fiabilidad.",
    actionDescription: "Acordar por escrito el precio, el anticipo y las etapas de pago antes de empezar.",
    question: "¿Cuál es su presupuesto para este proyecto y qué importe fijo, anticipo y calendario de pagos le resultarían aceptables?",
  },
  uk: {
    risk: "Бюджет не вказано: немає погодженої ціни чи основи для оплати, тому роботу не можна надійно оцінити.",
    actionDescription: "Письмово погодити ціну, передоплату та етапи оплати до початку роботи.",
    question: "Який ваш бюджет на цей проєкт і яка фіксована сума, передоплата та графік платежів вас влаштують?",
  },
  it: {
    risk: "Il budget non è indicato: non c'è un prezzo né una base di pagamento concordati, quindi il lavoro non può essere stimato in modo affidabile.",
    actionDescription: "Concordare per iscritto prezzo, acconto e tappe di pagamento prima di iniziare.",
    question: "Qual è il vostro budget per questo progetto e quali importo fisso, acconto e calendario di pagamento sarebbero accettabili?",
  },
  pt: {
    risk: "O orçamento não está indicado: não há preço nem base de pagamento acordados, por isso o trabalho não pode ser estimado com fiabilidade.",
    actionDescription: "Acordar por escrito o preço, o adiantamento e as etapas de pagamento antes de começar.",
    question: "Qual é o seu orçamento para este projeto e que valor fixo, adiantamento e calendário de pagamentos seriam aceitáveis?",
  },
  nl: {
    risk: "Het budget is niet vermeld: er is geen afgesproken prijs of betalingsbasis, dus het werk kan niet betrouwbaar worden ingeschat.",
    actionDescription: "Leg prijs, aanbetaling en betalingsfasen vóór de start schriftelijk vast.",
    question: "Wat is uw budget voor dit project en welk vast bedrag, welke aanbetaling en welk betalingsschema zijn voor u acceptabel?",
  },
  sv: {
    risk: "Budgeten anges inte: det finns inget överenskommet pris eller betalningsunderlag, så arbetet kan inte uppskattas tillförlitligt.",
    actionDescription: "Kom överens skriftligt om pris, förskott och betalningsetapper innan arbetet startar.",
    question: "Vilken budget har du för projektet, och vilket fast belopp, förskott och betalningsschema skulle fungera för dig?",
  },
  ja: {
    risk: "予算が示されていません。合意された価格や支払いの基準がないため、作業を確実に見積もれません。",
    actionDescription: "作業開始前に、価格・前払い・支払い段階を書面で合意します。",
    question: "このプロジェクトのご予算はいくらですか。固定金額、前払い、支払いスケジュールはどのようなものが可能ですか？",
  },
  zh: {
    risk: "未说明预算：没有约定价格或付款依据，因此无法可靠地评估工作量。",
    actionDescription: "开工前以书面形式约定价格、预付款和付款阶段。",
    question: "您这个项目的预算是多少？可接受的固定金额、预付款和付款安排是怎样的？",
  },
};

const budgetCardCopy = {
  lt: "Paminėta minimali suma, galimas procentinis priedas ir rojalčiai; tiksli bazinė suma nenurodyta.",
  en: "A minimum, a possible percentage bonus, and royalties are mentioned; the exact base amount is not specified.",
  ru: "Упомянуты минимальная сумма, возможный процент и роялти; точная базовая сумма не указана.",
  pl: "Wspomniano minimalną kwotę, możliwy dodatek procentowy i tantiemy; dokładna kwota podstawowa nie została podana.",
  fr: "Un minimum, un complément en pourcentage et des redevances sont mentionnés ; le montant de base exact n'est pas précisé.",
  de: "Ein Mindestbetrag, ein möglicher prozentualer Zuschlag und Tantiemen werden erwähnt; der genaue Grundbetrag ist nicht angegeben.",
  es: "Se mencionan un mínimo, un posible porcentaje adicional y regalías; no se especifica el importe base exacto.",
  uk: "Згадано мінімальну суму, можливий відсоток і роялті; точну базову суму не вказано.",
  it: "Sono menzionati un importo minimo, una possibile percentuale aggiuntiva e royalty; l'importo base esatto non è specificato.",
  pt: "São mencionados um valor mínimo, uma possível percentagem adicional e royalties; o valor base exato não foi especificado.",
  nl: "Er worden een minimumbedrag, een mogelijke procentuele toeslag en royalty's genoemd; het exacte basisbedrag is niet vermeld.",
  sv: "Ett minimibelopp, ett möjligt procentuellt tillägg och royalty nämns; det exakta grundbeloppet anges inte.",
  ja: "最低額、追加の割合報酬、ロイヤリティへの言及がありますが、基準となる正確な金額は示されていません。",
  zh: "提到了最低金额、可能的额外比例和销售提成，但未说明确切的基础金额。",
};

const deadlineRiskCopy = {
  lt: "Visą prašomą apimtį reikia atlikti iki kliento nurodyto termino; būtina susitarti dėl MVP.",
  en: "The entire stated scope is requested by a specific deadline, creating a high schedule and scope risk.",
  ru: "Весь указанный объём требуется выполнить к конкретному сроку — это высокий риск по срокам и объёму.",
  pl: "Cały wskazany zakres ma być wykonany do konkretnego terminu, co stanowi wysokie ryzyko harmonogramu i zakresu.",
  fr: "L'ensemble du périmètre indiqué est demandé pour une échéance précise, ce qui présente un risque élevé de délai et de charge.",
  de: "Der gesamte angegebene Umfang soll bis zu einem konkreten Termin erledigt sein – ein hohes Termin- und Umfangsrisiko.",
  es: "Se solicita completar todo el alcance indicado para una fecha concreta, lo que supone un alto riesgo de plazo y alcance.",
  uk: "Увесь зазначений обсяг потрібно виконати до конкретного терміну — це високий ризик щодо строків і обсягу.",
  it: "L'intero ambito indicato è richiesto entro una scadenza precisa: ciò comporta un rischio elevato per tempi e volume di lavoro.",
  pt: "Todo o âmbito indicado deve ser concluído até um prazo específico, o que representa um elevado risco de prazo e escopo.",
  nl: "De volledige genoemde omvang moet vóór een concrete deadline klaar zijn; dit vormt een hoog risico voor planning en scope.",
  sv: "Hela den angivna omfattningen ska vara klar till en bestämd deadline, vilket innebär en hög tids- och omfattningsrisk.",
  ja: "記載された作業全体に具体的な期限が設定されており、納期と作業範囲に大きなリスクがあります。",
  zh: "要求在具体期限前完成全部所述工作，存在较高的工期和范围风险。",
};

const deadlineActionCopy = {
  lt: { title: "Suderinti MVP apimtį iki termino", description: "Su klientu sutarti, kuriuos darbus būtina užbaigti iki nurodyto termino, o ką perkelti į kitą etapą." },
  en: { title: "Agree on an MVP for the deadline", description: "Agree with the client which items must be completed by the stated deadline and which can move to a later phase." },
  ru: { title: "Согласовать MVP к сроку", description: "Согласовать с клиентом, что необходимо завершить к указанному сроку, а что перенести на следующий этап." },
  pl: { title: "Uzgodnić MVP na termin", description: "Uzgodnić z klientem, które elementy muszą być gotowe do wskazanego terminu, a które można przenieść na kolejny etap." },
  fr: { title: "Définir un MVP pour l'échéance", description: "Convenez avec le client des éléments indispensables pour l'échéance indiquée et de ceux à reporter à une phase ultérieure." },
  de: { title: "MVP für den Termin vereinbaren", description: "Mit dem Kunden abstimmen, welche Punkte bis zum genannten Termin fertig sein müssen und welche in eine spätere Phase verschoben werden." },
  es: { title: "Acordar un MVP para la fecha límite", description: "Acordar con el cliente qué elementos deben estar listos para la fecha indicada y cuáles pueden pasar a una fase posterior." },
  uk: { title: "Узгодити MVP до терміну", description: "Узгодити з клієнтом, що потрібно завершити до зазначеного терміну, а що перенести на наступний етап." },
  it: { title: "Concordare un MVP per la scadenza", description: "Concordare con il cliente quali elementi devono essere pronti entro la scadenza indicata e quali possono passare a una fase successiva." },
  pt: { title: "Acordar um MVP para o prazo", description: "Acordar com o cliente quais itens precisam estar prontos até o prazo indicado e quais podem passar para uma etapa posterior." },
  nl: { title: "Een MVP voor de deadline afspreken", description: "Spreek met de klant af welke onderdelen voor de genoemde deadline af moeten zijn en welke naar een volgende fase kunnen." },
  sv: { title: "Kom överens om en MVP till deadline", description: "Kom överens med kunden om vad som måste vara klart till den angivna tidsfristen och vad som kan flyttas till en senare fas." },
  ja: { title: "期限に向けたMVPを合意する", description: "指定された期限までに必須の項目と、後の段階に回せる項目を顧客と合意します。" },
  zh: { title: "协商期限内的最小可行范围", description: "与客户确认哪些事项必须在指定期限前完成，哪些可以放到后续阶段。" },
};

const deadlineQuestionCopy = {
  lt: "Kuriuos darbus iš šio sąrašo būtina užbaigti iki nurodyto termino, o kuriuos galima perkelti į kitą etapą?",
  en: "Which items from this list must be completed by the stated deadline, and which can move to a later phase?",
  ru: "Какие пункты из списка необходимо завершить к указанному сроку, а какие можно перенести на следующий этап?",
  pl: "Które elementy z tej listy muszą być gotowe do wskazanego terminu, a które można przenieść na kolejny etap?",
  fr: "Quels éléments de cette liste doivent être terminés pour l'échéance indiquée et lesquels peuvent être reportés à une phase ultérieure ?",
  de: "Welche Punkte aus dieser Liste müssen bis zum genannten Termin fertig sein und welche können in eine spätere Phase verschoben werden?",
  es: "¿Qué elementos de esta lista deben estar terminados para la fecha indicada y cuáles pueden pasar a una fase posterior?",
  uk: "Які пункти з цього списку потрібно завершити до зазначеного терміну, а які можна перенести на наступний етап?",
  it: "Quali elementi dell'elenco devono essere completati entro la scadenza indicata e quali possono passare a una fase successiva?",
  pt: "Quais itens desta lista precisam estar concluídos até o prazo indicado e quais podem passar para uma etapa posterior?",
  nl: "Welke onderdelen van deze lijst moeten vóór de genoemde deadline af zijn en welke kunnen naar een volgende fase?",
  sv: "Vilka delar av listan måste vara klara till den angivna tidsfristen och vilka kan flyttas till en senare fas?",
  ja: "この一覧のうち、指定された期限までに必須の項目と、後の段階に回せる項目はどれですか？",
  zh: "清单中的哪些事项必须在指定期限前完成，哪些可以安排到后续阶段？",
};

const deadlineRecommendationCopy = {
  lt: "Derėkitės dėl MVP apimties: susitarkite, kuriuos darbus būtina atlikti iki nurodyto termino. Neskaičiuokite termino trukmės dienomis, jei ji nenurodyta.",
  en: "Negotiate an MVP scope: agree which items must be completed by the stated deadline. Do not infer a number of days when none is specified.",
  ru: "Согласуйте объём MVP: определите, что необходимо завершить к указанному сроку. Не рассчитывайте длительность в днях, если она не указана.",
  pl: "Uzgodnij zakres MVP: ustalcie, które elementy muszą być gotowe do wskazanego terminu. Nie wyliczaj liczby dni, jeśli jej nie podano.",
  fr: "Négociez le périmètre du MVP : convenez des éléments indispensables pour l'échéance indiquée. Ne calculez pas un nombre de jours qui n'est pas précisé.",
  de: "Verhandeln Sie den MVP-Umfang: Vereinbaren Sie, welche Punkte bis zum genannten Termin fertig sein müssen. Leiten Sie keine Anzahl von Tagen ab, wenn sie nicht angegeben ist.",
  es: "Negocie el alcance del MVP: acuerde qué elementos deben estar listos para la fecha indicada. No calcule un número de días si no se especifica.",
  uk: "Узгодьте обсяг MVP: визначте, що потрібно завершити до зазначеного терміну. Не обчислюйте кількість днів, якщо її не вказано.",
  it: "Negozia l'ambito dell'MVP: concorda quali elementi devono essere completati entro la scadenza indicata. Non dedurre un numero di giorni se non è specificato.",
  pt: "Negocie o escopo do MVP: combine quais itens precisam estar concluídos até o prazo indicado. Não calcule um número de dias se ele não foi informado.",
  nl: "Onderhandel over de MVP-scope: spreek af wat vóór de genoemde deadline af moet zijn. Leid geen aantal dagen af als dat niet is vermeld.",
  sv: "Förhandla om MVP-omfattningen: kom överens om vad som måste vara klart till den angivna tidsfristen. Beräkna inte ett antal dagar om det inte anges.",
  ja: "MVPの範囲を交渉し、指定期限までに必須の項目を合意してください。記載がない日数を推測しないでください。",
  zh: "协商最小可行范围，确认指定期限前必须完成的事项。未明确说明时不要推算天数。",
};

const budgetQuestionCopy = {
  lt: "Kokią fiksuotą sumą siūlote už šią darbų apimtį, koks būtų avansas ir mokėjimo grafikas? Kaip skaičiuotumėte galimą procentinį priedą ir rojalčius?",
  en: "What fixed amount do you propose for this scope, what advance would you pay, and how would the remaining payments be scheduled?",
  ru: "Какую фиксированную сумму вы предлагаете за этот объём, какой будет аванс и как будут проходить дальнейшие платежи?",
  pl: "Jaką stałą kwotę proponują Państwo za ten zakres, jaka będzie zaliczka i jak zostaną ustalone kolejne płatności?",
  fr: "Quel montant fixe proposez-vous pour ce périmètre, quel acompte prévoyez-vous et comment seront organisés les paiements suivants ?",
  de: "Welchen Festbetrag schlagen Sie für diesen Umfang vor, wie hoch ist die Anzahlung und wie werden die weiteren Zahlungen vereinbart?",
  es: "¿Qué importe fijo propone para este alcance, qué anticipo prevé y cómo se organizarían los pagos restantes?",
  uk: "Яку фіксовану суму ви пропонуєте за цей обсяг, якою буде передоплата та як відбуватимуться подальші платежі?",
  it: "Quale importo fisso propone per questo ambito, quale sarà l'acconto e come saranno organizzati i pagamenti successivi?",
  pt: "Qual valor fixo propõe para este escopo, qual será o adiantamento e como serão organizados os pagamentos seguintes?",
  nl: "Welk vast bedrag stelt u voor deze omvang voor, welke aanbetaling doet u en hoe worden de overige betalingen geregeld?",
  sv: "Vilket fast belopp föreslår du för denna omfattning, vilket förskott betalas och hur planeras de återstående betalningarna?",
  ja: "この作業範囲に対して提示する固定金額はいくらですか。前払いと残りの支払いはどのように設定しますか？",
  zh: "您为这项工作提出的固定金额是多少？预付款和后续付款如何安排？",
};

const formUxRiskCopy = {
  lt: "Formos naudojimo patogumas: neaišku, kaip turi veikti laukų išvalymas.",
  en: "Form usability: the expected behavior when clearing fields is unclear.",
  ru: "Удобство формы: неясно, как должны вести себя поля при очистке.",
  pl: "Użyteczność formularza: nie określono, jak pola mają zachowywać się po wyczyszczeniu.",
  fr: "Ergonomie du formulaire : le comportement attendu lors de l'effacement des champs n'est pas précisé.",
  de: "Formular-Bedienbarkeit: Das erwartete Verhalten beim Leeren der Felder ist unklar.",
  es: "Usabilidad del formulario: no se especifica qué debe ocurrir al borrar los campos.",
  uk: "Зручність форми: не визначено, як мають поводитися поля під час очищення.",
  it: "Usabilità del modulo: non è chiaro il comportamento previsto quando si svuotano i campi.",
  pt: "Usabilidade do formulário: não está definido o comportamento esperado ao limpar os campos.",
  nl: "Formuliergebruik: het verwachte gedrag bij het wissen van velden is onduidelijk.",
  sv: "Formulärets användbarhet: det är oklart hur fälten ska fungera när de rensas.",
  ja: "フォームの使いやすさ：入力欄を消去したときの動作が不明確です。",
  zh: "表单易用性：未明确清空字段时应有的行为。",
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

function verbatimEvidence(text, pattern = /./u, maxLength = 160) {
  const startIndex = text.search(pattern);
  if (text.length <= maxLength || startIndex < 0) return text.slice(0, maxLength).trim();
  const start = Math.max(0, startIndex - 48);
  return text.slice(start, start + maxLength).trim();
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

function isBroadDeadlineSentence(sentence) {
  const hasDeadline = /(?:\bby\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|tonight|evening)|\bbefore\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|tonight)|\buntil\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|до\s+(?:понедельник\p{L}*|вторник\p{L}*|сред\p{L}*|четверг\p{L}*|пятниц\p{L}*|суббот\p{L}*|воскресень\p{L}*|завтра|вечер\p{L}*)|к\s+(?:сред\p{L}*|завтра)|\biki\s+(?:pirmadien\p{L}*|antradien\p{L}*|trečiadien\p{L}*|ketvirtadien\p{L}*|penktadien\p{L}*|rytoj|vakaro)|\bprieš\s+(?:trečiadien\p{L}*|rytoj)|до\s+\d+\s+дн\p{L}*|\bwithin\s+\d+\s+days?\b|\bin\s+\d+\s+days?\b|\bper\s+\d+\s+dien\p{L}*)/iu.test(sentence);
  const requestsEntireScope = /(?:\b(?:the\s+)?(?:whole|entire|full)\s+(?:list|scope|project|set)|\ball\s+(?:of\s+)?(?:this|the\s+)?(?:list|scope|work|tasks|features|requirements)|весь\s+(?:этот\s+)?(?:список|объём|проект)|все\s+(?:задачи|пункты|требования)|всё\s+это|всю\s+работу|\bvis(?:ą|us|as)\s+(?:šį\s+)?(?:sąrašą|darbus|užduotis)|\bviską\s+(?:padaryti|atlikti)|\bvisas\s+(?:užduotis|funkcijas))/iu.test(sentence);
  return hasDeadline && requestsEntireScope;
}

function normalizeForQuote(text) {
  return String(text).toLowerCase().replace(/[„“”"«»'’]/gu, "").replace(/\s+/gu, " ").trim();
}

// Evidence must be a real fragment of the client's text; otherwise it is model commentary and is dropped.
function sourceEvidenceOrEmpty(evidence, sourceText) {
  if (!evidence) return "";
  return normalizeForQuote(sourceText).includes(normalizeForQuote(evidence)) ? evidence : "";
}

export function applyDeterministicAssessmentRules(analysis, sourceText, languageName) {
  const languageCode = getLanguageCode(languageName);
  const guidance = budgetGuidance[languageCode];
  const financialSentences = getFinancialSentences(sourceText);
  const sentences = getSentences(sourceText);
  const financialContext = financialSentences.join(" ");
  const hasFixedCurrencyAmount = /(?:[$€£₽]\s*\d[\d\s,.]*|\d[\d\s,.]*\s?(?:€|EUR|USD|GBP|PLN|RUB|SEK|JPY|CNY|CAD|AUD|UAH|KZT|BYN|руб(?:\.|лей)?|zł))/iu.test(financialContext)
    || /(?:fixed|agreed|budget|price|amount|suma|biudžet|fiksuot|pinig|сумм|бюджет|фиксир)\D{0,30}\b\d{2,}\b(?!\s*%)/iu.test(financialContext);
  const hasConditionalCompensation = hasCompensationUncertainty(financialSentences);
  const mentionsVariableCompensation = hasConditionalCompensation
    || /(?:royalt|rojal|роялт|tantiem|redevance|regal|\d+(?:[.,]\d+)?\s*%)/iu.test(financialContext);
  const budgetCopy = mentionsVariableCompensation
    ? { risk: guidance.risk, actionDescription: guidance.actionDescription, question: budgetQuestionCopy[languageCode] }
    : plainBudgetCopy[languageCode];
  const needsBudgetAgreement = isExplicitUnknownBudget(sourceText)
    || !hasFixedCurrencyAmount
    || hasConditionalCompensation;
  const incompleteCompensationTerms = !hasFixedCurrencyAmount
    && /(?:minimum|minimal|минимал|минимальн|minimali|minimalią|minimalną)/iu.test(financialContext)
    && /\d+(?:[.,]\d+)?\s*%/u.test(financialContext)
    && /(?:royalt|rojal|роялт|tantiem|redevance|royalty|tantieme|regal)/iu.test(financialContext);
  const budgetEvidenceSentence = financialSentences.find((sentence) => (
    /(?:minimum|minimal|минимал|minimali|минимальн)/iu.test(sentence)
    && (/\d+(?:[.,]\d+)?\s*%/u.test(sentence) || /(?:royalt|rojal|роялт|tantiem|redevance|regal)/iu.test(sentence))
  )) ?? financialSentences.find((sentence) => (
    /(?:royalt|rojal|роялт|tantiem|redevance|regal|\d+(?:[.,]\d+)?\s*%)/iu.test(sentence)
  )) ?? "";
  const plaintextCodeSentence = sentences.find((sentence) => (
    /(?:sms|text message|sms[- ]?(?:verification|confirmation)?\s*code|sms kod|sms patvirtinimo kod|код(?:ы)? подтверждения|смс)/iu.test(sentence)
    && /(?:plain\s*text|unhashed|atvir(?:u|uoju)\s+tekst(?:u|e)|открыт(?:ом|ым)\s+текст(?:е|ом)|в открытом виде)/iu.test(sentence)
  ));
  const hasPlaintextSmsCodes = Boolean(plaintextCodeSentence);
  const productCountChange = findProductCountChange(sentences);
  const deadlineEvidenceSentence = sentences.find(isBroadDeadlineSentence) ?? "";
  const accessSentences = sentences.filter((sentence) => (
    /(?:access|prieig|доступ)/iu.test(sentence)
    && /(?:source\s+code|existing\s+code|codebase|server|kodo|kodų|serverio|исходн\w*\s+код\w*|сервер)/iu.test(sentence)
    && /(?:\?|whether|will\s+(?:you|they)|provide|send|later|ar\s+\w+|bus\s+\w+|vėliau|atsiųs|suteik|предостав|будет|позже|есть ли|будут ли)/iu.test(sentence)
  ));
  const hasUnconfirmedCodeOrServerAccess = accessSentences.length > 0;
  const specSentences = sentences.filter((sentence) => {
    const namesOldSpec = /(?:\bold\b.{0,35}\b(?:spec|specification|requirements|brief|ТЗ)\b|\bprevious\b.{0,25}\b(?:specification|ТЗ)\b|\bsen(?:as|o|ą|ieji|ų|esni)\s+(?:ТЗ|specifikacij\p{L}*|technin\p{L}*\s+apraš\p{L}*)|стар\p{L}*\s+(?:ТЗ|спецификаци\p{L}*))/iu.test(sentence);
    const saysIgnore = /(?:\bignore\b|\bdisregard\b|\bdo\s+not\s+consider\b|\bdo\s+not\s+use\b|не\s+учитыва\p{L}*|не\s+смотр\p{L}*|neatsižvelk\p{L}*|nežiūrėk\p{L}*|neatsižvelg\p{L}*)/iu.test(sentence);
    const saysFollow = /(?:\bbut\s+(?:consider|use|follow|account\s+for)\b|\balthough\b.{0,40}\b(?:consider|use|follow)\b|\bbut\s+(?:actually\s+)?(?:do|please)\s+(?:consider|use)\b|\bno[, ]+\s*(?:please\s+)?(?:consider|use|follow)\b|но\s+(?:нужно\s+)?учитыва\p{L}*|хотя\s+(?:(?:нет|наоборот)[, ]*)?(?:нужно\s+)?учитыва\p{L}*|bet\s+(?:reikia\s+)?atsižvelg\p{L}*|nors\s+(?:(?:ne)[, ]*)?(?:reikia\s+)?atsižvelg\p{L}*)/iu.test(sentence);
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
  if (specSentences.some((sentence) => /(?:logo|logotip|логотип)/iu.test(sentence))) {
    for (const requirement of requirements) {
      if (/(?:logo|logotip|логотип)/iu.test(`${requirement.requirement} ${requirement.evidence}`)) {
        requirement.clarity = "unclear";
      }
    }
  }
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
    && !/(?:logo|logotip|логотип)/iu.test(item.requirement)
  ))) {
    requirements.push(makeRequirement(guidance.specRequirement, "unclear", specSentences.join(" ")));
  }

  const risks = [...analysis.risks];
  if (needsBudgetAgreement) {
    const budgetRiskIndex = risks.findIndex((risk) => /(?:budget|biudžet|payment|fee|apmok|atlyg|оплат|стоим|бюджет|процент|royalt|роялт)/iu.test(risk.risk));
    const budgetRisk = {
      risk: budgetCopy.risk,
      severity: "high",
      evidence: verbatimEvidence(budgetEvidenceSentence, /minimum|minimal|gal|maybe|роялт|royalt|procent|%/iu),
    };
    if (budgetRiskIndex >= 0) risks[budgetRiskIndex] = budgetRisk;
    else risks.push(budgetRisk);
  }
  if (deadlineEvidenceSentence) {
    const deadlineRisk = {
      risk: deadlineRiskCopy[languageCode],
      severity: "high",
      evidence: verbatimEvidence(deadlineEvidenceSentence, /by|before|until|до|к\s|iki|prieš/iu),
    };
    const deadlineRiskIndex = risks.findIndex((risk) => (
      /(?:deadline|schedule|termin|срок|сроки|plazo|frist|termine|prazo|納期|期限|工期)/iu.test(risk.risk)
      || /(?:less\s+than|under|shorter\s+than|trump|menk|менее|короче|mniej\s+niż|weniger\s+als|menos\s+de|meno\s+di)\s+\d+\s*(?<![\p{L}])(?:days?|дн\p{L}*|dien\p{L}*|tage|giorn\p{L}*|días|jours|dagen)(?![\p{L}])/iu.test(risk.risk)
    ));
    if (deadlineRiskIndex >= 0) risks[deadlineRiskIndex] = deadlineRisk;
    else risks.push(deadlineRisk);
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
  const normalizedRisks = risks.map((risk) => (
    /(?:logical contradiction|login(?:is|iai)\s+prieštarav|логическ\p{L}*\s+противореч|sprzecznoś|contradiction|Widerspruch|contradicción|протиріч|contraddizion|tegenstrijdig|motsägelse|矛盾|逻辑冲突)/iu.test(risk.risk)
      && /(?:form|forma|formular|formulaire|formularz|форма|formulario|modulo|フォーム|表单)/iu.test(risk.risk)
      && /(?:clear|reset|empty|valym|išval|ištryn|очист|сброс|wyczy|effac|leeren|borrar|svuot|wissen|rensa|消去|清空)/iu.test(risk.risk)
      ? { ...risk, risk: formUxRiskCopy[languageCode] }
      : risk
  ));
  const sortedRisks = normalizedRisks.sort((left, right) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const priority = (risk) => {
      if (risk.risk === guidance.risk) return 0;
      if (risk.risk === deadlineRiskCopy[languageCode]) return 1;
      if (risk.risk === guidance.accessRisk) return 2;
      if (productCountChange && risk.risk === guidance.scaleRisk(
        formatCount(productCountChange.from, languageCode),
        formatCount(productCountChange.to, languageCode),
      )) return 3;
      return 4;
    };
    return severityOrder[left.severity] - severityOrder[right.severity]
      || priority(left) - priority(right);
  }).slice(0, 30);

  let actionItems = [...analysis.action_items].sort((left, right) => left.order - right.order);
  if (hasPlaintextSmsCodes) {
    let keptSecurityAction = false;
    actionItems = actionItems.flatMap((item) => {
      if (!/(?:sms|verification|patvirtinimo kod|auth(?:entication|orization)?|autorizacij|kod\p{L}*)/iu.test(`${item.title} ${item.description}`)) {
        return [item];
      }
      if (keptSecurityAction) return [];
      keptSecurityAction = true;
      return [{
        ...item,
        title: guidance.securityAction,
        description: guidance.securityDescription,
        timing: guidance.beforeStart,
      }];
    });
  }
  const requiredActions = [];
  if (hasPlaintextSmsCodes) {
    const hasSecurityAction = actionItems.some((item) => (
      /(?:sms|verification|patvirtinimo kod|auth(?:entication|orization)?|autorizacij|kod\p{L}*)/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasSecurityAction) requiredActions.push({ order: 1, title: guidance.securityAction, description: guidance.securityDescription, timing: guidance.beforeStart });
  }
  if (needsBudgetAgreement) {
    const hasBudgetAction = actionItems.some((item) => (
      /(?:budget|biudžet|fixed amount|fixed price|amount|sum|suma|fiksuot|contract|sutart|договор|сумм|zaliczk|acompte|anzahlung|anticipo|adiantamento|voorschot|förskott|前払い|预付款)/iu.test(`${item.title} ${item.description}`)
      && /(?:agree|confirm|settle|sutart|sutar|suder|соглас|определ|uzgod|convenir|vereinbar|acordar|vastlegg|bestäm|合意|商定)/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasBudgetAction) requiredActions.push({ order: 1, title: guidance.action, description: budgetCopy.actionDescription, timing: guidance.beforeStart });
  }
  if (deadlineEvidenceSentence) {
    const hasDeadlineAction = actionItems.some((item) => (
      /(?:mvp|scope|apimt|darbų|объём|этап|zakres|umfang|alcance|ambito|omvang|omfattning|範囲|范围)/iu.test(`${item.title} ${item.description}`)
      && /(?:deadline|termin|срок|date|échéance|frist|plazo|scadenza|prazo|期限)/iu.test(`${item.title} ${item.description}`)
    ));
    if (!hasDeadlineAction) {
      requiredActions.push({
        order: 1,
        ...deadlineActionCopy[languageCode],
        timing: guidance.beforeStart,
      });
    }
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
      && /(?:scale|capacity|performance|load|volume|масштаб|нагруз|производительност|apim|našum|(?:with|at|for|su|при|с|avec|mit|con|com|met|med)\s+\d[\d ,.]*\s*(?:products|items|preki|товар\p{L}*)|(?:support|handle|serve|palaik|aptarna|обслуж|поддерж)\s+\d[\d ,.]*\s*(?:products|items|preki|товар\p{L}*)|\d[\d ,.]*\s*(?:products|items|preki|товар\p{L}*))/iu.test(`${item.title} ${item.description}`)
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
    const budgetQuestionIndex = clientQuestions.findIndex((question) => /(?:budget|biudžet|amount|price|sum|apmok|avans|payment|fee|atlyg|оплат|сумм|роялт|wynagrodz|zaliczk|presupuesto|compens|pagamento|anticipo|acompte|budget|betrag|zahlung|ersatz|acconto|compenso|adiantamento|vergoeding|belopp|ersättning|前払い|预算|报酬)/iu.test(question));
    if (budgetQuestionIndex >= 0) clientQuestions[budgetQuestionIndex] = budgetCopy.question;
    else clientQuestions.unshift(budgetCopy.question);
  }
  if (deadlineEvidenceSentence) {
    const hasDeadlineQuestion = clientQuestions.some((question) => (
      /(?:by|before|until|deadline|termin|срок|do\s+\w+|до\s+\w+|iki\s+\w+|date limite|fecha límite|frist|termine|deadline|期限|截止)/iu.test(question)
      && /(?:must|required|priorit|scope|apimt|būtina|prival|что|необходимо|объём|zakres|muss|welche|qué|quali|quais|welke|vad|何|哪些)/iu.test(question)
    ));
    if (!hasDeadlineQuestion) {
      clientQuestions.splice(needsBudgetAgreement ? 1 : 0, 0, deadlineQuestionCopy[languageCode]);
    }
  }
  if (hasUnconfirmedCodeOrServerAccess) {
    const hasAccessQuestion = clientQuestions.some((question) => /(?:code|server|kodo|serverio|код|сервер|código|servidor|code|server|コード|代码|сервер|сервер)/iu.test(question));
    if (!hasAccessQuestion) clientQuestions.splice(needsBudgetAgreement ? 1 : 0, 0, guidance.accessQuestion);
  }

  const recommendation = { ...analysis.recommendation };
  if (deadlineEvidenceSentence) {
    if (recommendation.decision === "take") recommendation.decision = "negotiate";
    recommendation.rationale = deadlineRecommendationCopy[languageCode];
  }
  if (needsBudgetAgreement) {
    if (recommendation.decision === "take") recommendation.decision = "negotiate";
    if (!(/fixed amount|fiksuot|согласованной суммы/i.test(recommendation.rationale)
      && /advance|avans|аванс/i.test(recommendation.rationale))) {
      recommendation.rationale = `${guidance.rationale} ${recommendation.rationale}`.trim().slice(0, 700);
    }
  }

  return normalizeGeneratedValue({
    ...analysis,
    budget: incompleteCompensationTerms
      ? { value: budgetCardCopy[languageCode], evidence: verbatimEvidence(budgetEvidenceSentence, /minimum|minimal|gal|maybe|роялт|royalt|procent|%/iu) }
      : { ...analysis.budget, evidence: sourceEvidenceOrEmpty(analysis.budget.evidence, sourceText) },
    deadline: { ...analysis.deadline, evidence: sourceEvidenceOrEmpty(analysis.deadline.evidence, sourceText) },
    requirements: requirements.slice(0, 30).map((item) => ({ ...item, evidence: sourceEvidenceOrEmpty(item.evidence, sourceText) })),
    risks: sortedRisks.map((risk) => ({
      ...risk,
      evidence: risk.evidence && sourceText.includes(risk.evidence)
        ? verbatimEvidence(risk.evidence, /urgent|yesterday|вчера|сроч|skub|urgente|gestern|вчера/iu)
        : "",
    })),
    action_items: actionItems,
    client_questions: clientQuestions.slice(0, 20),
    recommendation,
  }, languageCode);
}
