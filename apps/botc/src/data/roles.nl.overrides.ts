/**
 * Dutch translations for Blood on the Clocktower roles.
 * AI-generated from English source data covering Trouble Brewing, Sects and Violets,
 * Bad Moon Rising, and additional roles.
 *
 * Only roles with Dutch translations are included here — other roles
 * fall back to the base English text from `roles.en.ts`.
 */

import { RoleTranslation } from './types'

export const roleTranslationsNl: Record<string, RoleTranslation> = {
  // ── Trouble Brewing ──────────────────────────────────────────────────────────

  washerwoman: {
    name: 'Wasvrouw',
    ability:
      'Je begint met de wetenschap dat 1 van 2 spelers een specifiek dorpsbewoner is.',
    reminders: ['Dorpsbewoner', 'Fout'],
    firstNightReminder:
      'Toon het karaktertoken van een dorpsbewoner die in het spel is. Wijs op twee spelers, waarvan één dat karakter speelt.',
  },
  librarian: {
    name: 'Bibliothecaris',
    ability:
      'Je begint met de wetenschap dat 1 van 2 spelers een specifieke buitenstaander is. (Of dat er 0 in het spel zijn.)',
    reminders: ['Buitenstaander', 'Fout'],
    firstNightReminder:
      'Toon het karaktertoken van een buitenstaander die in het spel is. Wijs op twee spelers, waarvan één dat karakter speelt.',
  },
  investigator: {
    name: 'Onderzoeker',
    ability:
      'Je begint met de wetenschap dat 1 van 2 spelers een specifieke handlanger is.',
    reminders: ['Handlanger', 'Fout'],
    firstNightReminder:
      'Toon het karaktertoken van een handlanger die in het spel is. Wijs op twee spelers, waarvan één die handlanger speelt.',
  },
  chef: {
    name: 'Kok',
    ability:
      'Je begint met de wetenschap hoeveel paren van slechte spelers naast elkaar zitten.',
    firstNightReminder:
      'Toon met je vingers het aantal (0, 1, 2, ...) aangrenzende slechte spelers.',
  },
  empath: {
    name: 'Empath',
    ability:
      'Elke nacht verneem je hoeveel van je twee levende buren slecht zijn.',
    firstNightReminder:
      'Toon met je hand (0, 1, 2) hoeveel levende buren van de Empath slecht zijn.',
    otherNightReminder:
      'Toon met je hand (0, 1, 2) hoeveel levende buren van de Empath slecht zijn.',
  },
  fortuneteller: {
    name: 'Waarzegster',
    ability:
      'Elke nacht kies je 2 spelers: je verneem of er een demon onder hen is. Er is echter één goede speler die ook als demon registreert voor jou.',
    reminders: ['Lokaas'],
    firstNightReminder:
      'De Waarzegster wijst op twee spelers. Als één van deze spelers de demon is, knik dan; anders schud je hoofd.',
    otherNightReminder:
      'De Waarzegster wijst op twee spelers. Als één van deze spelers de demon is, knik dan; anders schud je hoofd.',
  },
  undertaker: {
    name: 'Lijkbezorger',
    ability:
      'Elke nacht* verneem je welk karakter gisteren werd geëxecuteerd.',
    reminders: ['Geëxecuteerd'],
    otherNightReminder:
      'Als een speler vandaag werd geëxecuteerd: Toon de Lijkbezorger het karaktertoken van die speler.',
  },
  monk: {
    name: 'Monnik',
    ability:
      'Elke nacht* kies je 1 speler (niet jezelf): die speler is beschermd tegen de demon.',
    reminders: ['Beschermd'],
    otherNightReminder:
      'De eerder beschermde speler is niet langer beschermd. De speler wijst op een speler (niet zichzelf). Markeer die speler als "beschermd".',
  },
  ravenkeeper: {
    name: 'Ravenhoeder',
    ability:
      'Als je sterft in de nacht, word je wakker om een speler te kiezen: je verneem het karakter van die speler.',
    otherNightReminder:
      'Als de Ravenhoeder vanavond is gestorven: De Ravenhoeder wijst op een speler. Toon de Ravenhoeder het karaktertoken van die speler.',
  },
  virgin: {
    name: 'Maagd',
    ability:
      'De eerste keer dat je wordt genomineerd voor executie, als de nomineerder een dorpsbewoner is, wordt die direct geëxecuteerd.',
    reminders: ['Geen vermogen'],
  },
  slayer: {
    name: 'Doder',
    ability:
      'Eén keer per spel, overdag, kies je publiekelijk een speler: als die speler de demon is, sterft hij.',
    reminders: ['Geen vermogen'],
  },
  soldier: {
    name: 'Soldaat',
    ability: 'Je bent beschermd tegen de demon.',
  },
  mayor: {
    name: 'Burgemeester',
    ability:
      'Als er nog maar 3 spelers leven en er overdag geen executie plaatsvindt, wint jouw team. Als je door de nacht zou sterven, kan een andere speler in jouw plaats sterven.',
  },
  butler: {
    name: 'Knecht',
    ability:
      'Elke nacht kies je 1 speler (niet jezelf): de volgende dag kun je alleen stemmen als die speler ook stemt.',
    reminders: ['Meester'],
    firstNightReminder:
      "De Knecht wijst op een speler. Markeer die speler als 'Meester'.",
    otherNightReminder:
      "De Knecht wijst op een speler. Markeer die speler als 'Meester'.",
  },
  drunk: {
    name: 'Dronkaard',
    ability:
      'Je weet niet dat je de Dronkaard bent. Je denkt een dorpsbewoner te zijn, maar je vermogen werkt niet.',
  },
  recluse: {
    name: 'Kluizenaar',
    ability:
      'Je kunt registreren als slecht, of als handlanger of demon, zelfs als je dood bent.',
  },
  saint: {
    name: 'Heilige',
    ability: 'Als je wordt geëxecuteerd, verliest jouw team.',
  },
  poisoner: {
    name: 'Vergiftigster',
    ability:
      'Elke nacht kies je 1 speler: die speler is vergiftigd tot zonsondergang.',
    reminders: ['Vergiftigd'],
    firstNightReminder:
      'De Vergiftigster wijst op een speler. Die speler is vergiftigd.',
    otherNightReminder:
      'De eerder vergiftigde speler is niet langer vergiftigd. De Vergiftigster wijst op een speler. Die speler is vergiftigd.',
  },
  spy: {
    name: 'Spion',
    ability:
      'Je mag elke nacht het Grimoire bekijken. Je kunt registreren als goed, of als dorpsbewoner of buitenstaander, zelfs als je dood bent.',
    firstNightReminder:
      'Toon de Spion het Grimoire zo lang als hij nodig heeft.',
    otherNightReminder:
      'Toon de Spion het Grimoire zo lang als hij nodig heeft.',
  },
  scarletwoman: {
    name: 'Scharlakenrode Vrouw',
    ability:
      'Als er 5 of meer spelers leven en de demon sterft, word jij de demon. (Reizigers tellen niet mee.)',
    reminders: ['Demon'],
    otherNightReminder:
      "Als de Scharlakenrode Vrouw vanavond de demon is geworden: Toon haar het 'Jij bent'-token en dan het demontoken.",
  },
  baron: {
    name: 'Baron',
    ability: 'Er zijn extra buitenstaanders in het spel. [+2 Buitenstaanders]',
  },
  imp: {
    name: 'Imp',
    ability:
      'Elke nacht* kies je 1 speler: die speler sterft. Als je jezelf zo doodt, wordt een handlanger de Imp.',
    reminders: ['Dood'],
    otherNightReminder:
      "De Imp wijst op een speler. Die speler sterft. Als de Imp zichzelf kiest: Vervang het karakter van een levende handlanger door een overgebleven Imp-token. Toon hem het 'Jij bent'-token en dan het Imp-token.",
  },

  // ── Sects and Violets ────────────────────────────────────────────────────────

  clockmaker: {
    name: 'Uurwerkmaker',
    ability:
      'Je begint met de wetenschap hoeveel plaatsen de demon verwijderd is van zijn dichtstbijzijnde handlanger.',
    firstNightReminder:
      'Toon met je hand het aantal plaatsen tussen de demon en de dichtstbijzijnde handlanger.',
  },
  dreamer: {
    name: 'Dromer',
    ability:
      'Elke nacht kies je 1 speler (niet jezelf): je verneem 1 goed en 1 slecht karakter, waarvan er één correct is.',
    firstNightReminder:
      'De Dromer wijst op een speler. Toon 1 goed en 1 slecht karaktertoken: één van de tokens is correct.',
    otherNightReminder:
      'De Dromer wijst op een speler. Toon 1 goed en 1 slecht karaktertoken: één van de tokens is correct.',
  },
  snakecharmer: {
    name: 'Slangentemmer',
    ability:
      'Elke nacht kies je 1 levende speler: als je de demon kiest, wissel je karakter en gezindheid met hem en hij wordt vergiftigd.',
    reminders: ['Vergiftigd'],
    firstNightReminder:
      'De Slangentemmer wijst op een speler. Als die speler de demon is: Wissel het karakter en de gezindheid van de Slangentemmer en de demon. Wek beide spelers en informeer hen over hun nieuwe rol en gezindheid. De nieuwe Slangentemmer is vergiftigd.',
    otherNightReminder:
      'De Slangentemmer wijst op een speler. Als die speler de demon is: Wissel het karakter en de gezindheid van de Slangentemmer en de demon. Wek beide spelers en informeer hen over hun nieuwe rol en gezindheid. De nieuwe Slangentemmer is vergiftigd.',
  },
  mathematician: {
    name: 'Wiskundige',
    ability:
      'Elke nacht verneem je hoeveel vermogens (sinds zonsopgang) niet functioneerden zoals ze zouden moeten, door het vermogen van een ander karakter.',
    reminders: ['Abnormaal'],
    firstNightReminder:
      'Toon met je hand het aantal spelers wiens vermogens zijn beïnvloed.',
    otherNightReminder:
      'Toon met je hand het aantal spelers wiens vermogens zijn beïnvloed.',
  },
  flowergirl: {
    name: 'Bloemenmeisje',
    ability: 'Elke nacht* verneem je of een demon overdag heeft gestemd.',
    reminders: ['Demon stemde', 'Demon stemde niet'],
    otherNightReminder:
      "Knik (ja) als de demon overdag heeft gestemd, anders schud je hoofd (nee). Plaats de 'Demon stemde niet'-marker, of verwijder deze.",
  },
  towncrier: {
    name: 'Stadsomroeper',
    ability:
      'Elke nacht* verneem je of een handlanger overdag iemand heeft genomineerd.',
    reminders: ['Handlanger nomineerde niet', 'Handlanger nomineerde'],
    otherNightReminder:
      "Knik (ja) of schud je hoofd (nee) om aan te geven of een handlanger vandaag heeft genomineerd. Plaats de 'Handlanger nomineerde niet'- of 'Handlanger nomineerde'-marker.",
  },
  oracle: {
    name: 'Orakel',
    ability: 'Elke nacht* verneem je hoeveel dode spelers slecht zijn.',
    otherNightReminder:
      'Toon met je vingers het aantal slechte spelers dat is gestorven.',
  },
  savant: {
    name: 'Geleerde',
    ability:
      'Je kunt elke dag privé naar de verteller gaan en 2 mededelingen ontvangen: 1 is waar, 1 is onwaar.',
  },
  seamstress: {
    name: 'Naaister',
    ability:
      "Eén keer per spel, 's nachts, kies je 2 spelers (niet jezelf): je verneem of zij dezelfde gezindheid hebben.",
    reminders: ['Geen vermogen'],
    firstNightReminder:
      'De Naaister schudt haar hoofd (Nee) of wijst op twee spelers. Als de Naaister spelers kiest, knik (Ja) of schud je hoofd (Nee) als de twee spelers dezelfde gezindheid hebben.',
    otherNightReminder:
      'Als de Naaister haar vermogen nog niet heeft gebruikt: De Naaister schudt haar hoofd (Nee) of wijst op twee spelers. Als de Naaister spelers kiest, knik (Ja) of schud je hoofd (Nee) als de twee spelers dezelfde gezindheid hebben.',
  },
  philosopher: {
    name: 'Filosoof',
    ability:
      "Eén keer per spel, 's nachts, kies je 1 goed karakter: je krijgt diens vermogen. Als je echter een karakter kiest dat al in het spel is, wordt die dronken.",
    firstNightReminder:
      'De Filosoof schudt zijn hoofd (Nee) of wijst op een goed karakter op het karakterblad. Als hij een karakter heeft gekozen: Wissel het karaktertoken van de Filosoof met het nieuwe karaktertoken. Als het karakter al in het spel was, wordt de originele speler dronken.',
    otherNightReminder:
      'Als de Filosoof zijn vermogen nog niet heeft gebruikt: De Filosoof schudt zijn hoofd (Nee) of wijst op een goed karakter op het karakterblad. Als hij een karakter heeft gekozen: Wissel het karaktertoken van de Filosoof met het nieuwe karaktertoken. Als het karakter al in het spel was, wordt de originele speler dronken.',
  },
  artist: {
    name: 'Kunstenaar',
    ability:
      'Eén keer per spel, overdag, stel je de verteller privé 1 willekeurige ja/nee-vraag.',
    reminders: ['Geen vermogen'],
  },
  juggler: {
    name: 'Jongleur',
    ability:
      'Op je eerste dag probeer je publiekelijk de karakters van maximaal 5 spelers te raden. De volgende nacht verneem je hoeveel je er correct had.',
    reminders: ['Correct'],
    otherNightReminder:
      'Als vandaag de eerste dag van de Jongleur was: Toon met je hand hoeveel karakters de Jongleur correct heeft geraden.',
  },
  sage: {
    name: 'Wijze',
    ability:
      'Als de demon jou doodt, verneem je dat 1 van 2 spelers de demon is.',
    otherNightReminder:
      'Als de Wijze door de demon is gedood: Wijs op twee spelers, waarvan er één de demon is.',
  },
  mutant: {
    name: 'Mutant',
    ability:
      'Als je "bezeten" bent van het zijn van een buitenstaander, kun je worden geëxecuteerd.',
  },
  sweetheart: {
    name: 'Lieveling',
    ability:
      'Als je sterft, is er vanaf dat moment 1 speler dronken.',
    reminders: ['Dronken'],
    otherNightReminder: 'Kies een speler die dronken wordt.',
  },
  klutz: {
    name: 'Klungel',
    ability:
      'Als je hoort dat je bent gestorven, kies je publiekelijk 1 levende speler. Als die speler slecht is, verliest jouw team.',
  },
  eviltwin: {
    name: 'Slechte Tweeling',
    ability:
      'Jij en een speler van het andere team kennen elkaar. Als de goede speler wordt geëxecuteerd, wint het slechte team. Het goede team kan niet winnen als jullie beiden nog leven.',
    reminders: ['Tweeling'],
    firstNightReminder:
      'Wek de Slechte Tweeling en de Tweeling. Zorg ervoor dat ze elkaar hebben gevonden. Wijs op de Slechte Tweeling en toon de andere Tweeling de speelkaart van de Slechte Tweeling. Wijs op de andere Tweeling en toon zijn kaart aan de speler van de Slechte Tweeling.',
  },
  cerenovus: {
    name: 'Cerenovus',
    ability:
      'Elke nacht kies je 1 speler en 1 goed karakter: de volgende dag is de speler "bezeten" van het zijn van dat karakter, anders kan hij worden geëxecuteerd.',
    reminders: ['Gek'],
    firstNightReminder:
      "De Cerenovus wijst op een speler, dan op een karakter op het karakterblad. Wek die speler. Toon hem het 'Dit karakter heeft je gekozen'-token en het Cerenovus-token. Toon het gekozen karaktertoken. Als de speler de volgende dag niet bezeten is van dat karakter, kan hij worden geëxecuteerd.",
    otherNightReminder:
      "De Cerenovus wijst op een speler, dan op een karakter op het karakterblad. Wek die speler. Toon hem het 'Dit karakter heeft je gekozen'-token en het Cerenovus-token. Toon het gekozen karaktertoken. Als de speler de volgende dag niet bezeten is van dat karakter, kan hij worden geëxecuteerd.",
  },
  pithag: {
    name: 'Heksenketel',
    ability:
      'Elke nacht* kies je 1 speler en 1 karakter waarnaar hij verandert (als dat niet al in het spel is). Als je zo een demon maakt, zijn sterfgevallen die nacht willekeurig. Spelers veranderen alleen van karakter, niet van gezindheid.',
    otherNightReminder:
      "De Heksenketel wijst op een speler en op een karakter op het karakterblad. Als dat karakter niet in het spel is, wek de speler en toon hem het 'Jij bent'-token en het karaktertoken. Als het karakter in het spel is, gebeurt er niets.",
  },
  fearmonger: {
    name: 'Angstverspreider',
    ability:
      'Elke nacht kies je een speler. Als je hem nomineert en executeert, verliest zijn team. Alle spelers weten wanneer je een nieuwe speler kiest.',
    reminders: ['Angst'],
    firstNightReminder:
      'De Angstverspreider wijst op een speler. Plaats de Angst-marker en kondig aan dat een nieuwe speler is gekozen met het Angstverspreider-vermogen.',
    otherNightReminder:
      'De Angstverspreider wijst op een speler. Als dat anders is dan vorige nacht, plaats de Angst-marker en kondig aan dat een nieuwe speler is gekozen.',
  },
  fanggu: {
    name: 'Fang Gu',
    ability:
      'Elke nacht* kies je 1 speler: hij sterft. De eerste buitenstaander die je zo doodt wordt de slechte Fang Gu en jij sterft in zijn plaats. [+1 Buitenstaander]',
    reminders: ['Eenmalig', 'Dood'],
    otherNightReminder:
      "De Fang Gu wijst op een speler. Die speler sterft. Als die speler een buitenstaander was en er is geen andere Fang Gu in het spel: De Fang Gu sterft in zijn plaats. De gekozen speler wordt de nieuwe Fang Gu. Wek de nieuwe Fang Gu. Toon hem het 'Jij bent'-token en het Fang Gu-token. Toon daarna het 'Jij bent'-token en een duim omlaag (slecht).",
  },
  vigormortis: {
    name: 'Vigormortis',
    ability:
      'Elke nacht* kies je 1 speler: hij sterft. Handlangers die je doodt behouden hun vermogen en vergiftigen 1 van hun dorpsbewoners-buren. [-1 Buitenstaander]',
    reminders: ['Dood', 'Heeft vermogen', 'Vergiftigd'],
    otherNightReminder:
      'De Vigormortis wijst op een speler. Die speler sterft. Als het een handlanger is, behoudt hij zijn vermogen en wordt een dorpsbewoner vergiftigd.',
  },
  nodashii: {
    name: 'No Dashii',
    ability:
      'Elke nacht* kies je 1 speler: hij sterft. Jouw twee dorpsbewoners-buren zijn vergiftigd.',
    reminders: ['Dood', 'Vergiftigd'],
    otherNightReminder: 'De No Dashii wijst op een speler. Die speler sterft.',
  },
  vortox: {
    name: 'Vortox',
    ability:
      'Elke nacht* kies je 1 speler: hij sterft. Dorpsbewoners-vermogens leveren uitsluitend onjuiste informatie. Elke dag, als niemand wordt geëxecuteerd, wint het slechte team.',
    reminders: ['Dood'],
    otherNightReminder: 'De Vortox wijst op een speler. Die speler sterft.',
  },

  // ── Bad Moon Rising ──────────────────────────────────────────────────────────

  grandmother: {
    name: 'Grootmoeder',
    ability:
      'Je begint met de wetenschap dat een bepaalde goede speler een bepaald karakter is. Als die speler door de demon wordt gedood, sterf jij ook.',
    reminders: ['Kleinkind'],
    firstNightReminder:
      'Toon het als kleinkind gemarkeerde karaktertoken. Wijs op de gemarkeerde speler.',
    otherNightReminder:
      'Als het kleinkind van de Grootmoeder vanavond sterft: De Grootmoeder sterft.',
  },
  sailor: {
    name: 'Zeeman',
    ability:
      'Elke nacht kies je 1 levende speler: ofwel jij ofwel hij is tot zonsondergang dronken. Je kunt niet sterven.',
    reminders: ['Dronken'],
    firstNightReminder:
      'De Zeeman wijst op een levende speler. Ofwel de Zeeman ofwel de gekozen speler is dronken.',
    otherNightReminder:
      'De eerder dronken speler is nu nuchter. De Zeeman wijst op een levende speler. Ofwel de Zeeman ofwel de gekozen speler is dronken.',
  },
  chambermaid: {
    name: 'Kamermeisje',
    ability:
      'Elke nacht kies je 2 levende spelers (niet jezelf): je verneem hoeveel van hen vanavond wakker zijn geworden door hun karaktervermogen.',
    firstNightReminder:
      'Het Kamermeisje wijst op twee spelers. Toon de speler hoeveel (0, 1 of 2) van deze spelers afgelopen nacht wakker zijn geworden om hun vermogen te gebruiken.',
    otherNightReminder:
      'Het Kamermeisje wijst op twee spelers. Toon de speler hoeveel (0, 1 of 2) van deze spelers afgelopen nacht wakker zijn geworden om hun vermogen te gebruiken.',
  },
  exorcist: {
    name: 'Exorcist',
    ability:
      'Elke nacht* kies je 1 speler (niet dezelfde als de vorige nacht): de demon, als gekozen, verneem wie je bent en wordt die nacht niet wakker.',
    reminders: ['Gekozen'],
    otherNightReminder:
      'De Exorcist wijst op een speler (een andere dan de vorige nacht). Als die speler de demon is: Wek de demon. Toon hem het Exorcist-token. Wijs op de Exorcist-speler. De demon mag vanavond geen actie uitvoeren.',
  },
  innkeeper: {
    name: 'Herbergier',
    ability:
      'Elke nacht* kies je 2 spelers: beiden kunnen die nacht niet sterven, maar 1 van hen is tot zonsondergang dronken.',
    reminders: ['Beschermd', 'Dronken'],
    otherNightReminder:
      'De eerder beschermde en dronken spelers verliezen hun markers. De Herbergier wijst op twee spelers. Die spelers zijn beschermd. Één van hen is dronken.',
  },
  gambler: {
    name: 'Gokker',
    ability:
      'Elke nacht* kies je 1 speler en probeer zijn karakter te raden: raad je fout, dan sterf je.',
    reminders: ['Dood'],
    otherNightReminder:
      'De Gokker wijst op een speler en een karakter op het karakterblad. Als hij fout is, sterft de Gokker.',
  },
  gossip: {
    name: 'Kletskous',
    ability:
      'Je mag elke dag een publieke bewering doen. De volgende nacht, als de bewering klopte, sterft een speler.',
    reminders: ['Dood'],
    otherNightReminder:
      'Als de publieke bewering van de Kletskous klopte: Kies een speler die niet beschermd is tegen de dood. Die speler sterft.',
  },
  courtier: {
    name: 'Hoveling',
    ability:
      "Eén keer per spel, 's nachts, kies je 1 karakter: als dat in het spel is, is het 3 nachten en 3 dagen dronken.",
    reminders: ['Dronken 1', 'Dronken 2', 'Dronken 3', 'Geen vermogen'],
    firstNightReminder:
      'De Hoveling schudt zijn hoofd (Nee) of wijst op een karakter op het karakterblad. Als de Hoveling zijn vermogen gebruikt: Het gekozen karakter is drie dagen en nachten dronken, als het in het spel is.',
    otherNightReminder:
      'Verminder het aantal dagen dat de gekozen speler dronken is. Als de Hoveling zijn vermogen nog niet heeft gebruikt: De Hoveling schudt zijn hoofd (Nee) of wijst op een karakter op het karakterblad. Als de Hoveling zijn vermogen gebruikt: Het gekozen karakter is drie dagen en nachten dronken, als het in het spel is.',
  },
  professor: {
    name: 'Professor',
    ability:
      "Eén keer per spel, 's nachts*, kies je 1 dode speler: als die speler een dorpsbewoner is, wordt hij herleefd.",
    reminders: ['Levend', 'Geen vermogen'],
    otherNightReminder:
      'Als de Professor zijn vermogen nog niet heeft gebruikt: De Professor schudt zijn hoofd (Nee) of wijst op een dode speler: Als de speler een dorpsbewoner is, wordt hij herleefd.',
  },
  minstrel: {
    name: 'Minstreel',
    ability:
      'Als een handlanger overdag door executie sterft, zijn alle andere spelers (behalve reizigers) tot zonsondergang de volgende dag dronken.',
    reminders: ['Iedereen is dronken'],
  },
  tealady: {
    name: 'Theedame',
    ability:
      'Als beide levende buren van je goed zijn, kunnen zij niet sterven.',
    reminders: ['Kan niet sterven'],
  },
  pacifist: {
    name: 'Pacifist',
    ability: 'Geëxecuteerde goede spelers kunnen overleven.',
  },
  fool: {
    name: 'Nar',
    ability: 'De eerste keer dat je zou moeten sterven, sterf je niet.',
    reminders: ['Geen vermogen'],
  },
  goon: {
    name: 'Dommerd',
    ability:
      'Elke nacht: de eerste speler die jou met zijn vermogen kiest, is dronken tot zonsondergang. Je neemt zijn gezindheid over (goed of slecht).',
    reminders: ['Dronken'],
  },
  lunatic: {
    name: 'Krankzinnige',
    ability:
      'Je weet niet dat je de Krankzinnige bent. Je denkt een demon te zijn, maar dat ben je niet. De demon weet wie je bent en wie je aanvalt.',
    reminders: ['Aanval 1', 'Aanval 2', 'Aanval 3'],
    firstNightReminder:
      "Bij 7 of meer spelers: Toon de Krankzinnige het aantal valse 'handlangers' dat in het spel is. Als de demon die de Krankzinnige ziet een demon is die 's nachts wakker wordt: Sta de Krankzinnige toe demonenacties uit te voeren. Plaats de 'Aanval'-marker. Als de Krankzinnige een speler kiest: Wek de demon. Toon hem de 'Aanval'-marker, dan wijs op elke door de Krankzinnige gemarkeerde speler. Verwijder de aanvalmarkers van de Krankzinnige.",
    otherNightReminder:
      "Sta de Krankzinnige toe demonenacties uit te voeren. Plaats de 'Aanval'-marker. Als de Krankzinnige een speler kiest: Wek de demon. Toon hem de 'Aanval'-marker, dan wijs op elke door de Krankzinnige gemarkeerde speler. Verwijder de aanvalmarkers van de Krankzinnige.",
  },
  tinker: {
    name: 'Knutselaar',
    ability: 'Je kunt op elk moment sterven.',
    reminders: ['Dood'],
    otherNightReminder: 'De Knutselaar kan sterven.',
  },
  moonchild: {
    name: 'Maankind',
    ability:
      'Als je hoort dat je bent gestorven, kies je publiekelijk 1 levende speler. De volgende nacht, als die speler goed was, sterft hij.',
    reminders: ['Dood'],
    otherNightReminder:
      'Als het Maankind overdag sterft en zijn vermogen gebruikt om een speler te kiezen: Als die speler goed is, sterft hij.',
  },
  godfather: {
    name: 'Peetvader',
    ability:
      'Je begint met de wetenschap welke buitenstaanders in het spel zijn. Als er één overdag is gestorven, kies je de volgende nacht 1 speler: hij sterft. [+1 of -1 Buitenstaander]',
    reminders: ['Stierf vandaag', 'Dood'],
    firstNightReminder:
      'Toon alle buitenstaander-speltokens die in het spel zijn.',
    otherNightReminder:
      'Als vandaag een buitenstaander is gestorven: De Peetvader wijst op een speler, die speler sterft.',
  },
  devilsadvocate: {
    name: 'Duivels Advocaat',
    ability:
      'Elke nacht kies je 1 levende speler (niet dezelfde als de vorige nacht): als die speler morgen wordt geëxecuteerd, sterft hij niet.',
    reminders: ['Overleeft executie'],
    firstNightReminder:
      'De Duivels Advocaat wijst op een levende speler. Die speler overleeft morgen de executie.',
    otherNightReminder:
      'De Duivels Advocaat wijst op een (andere) levende speler. Die speler overleeft morgen de executie.',
  },
  assassin: {
    name: 'Assassijn',
    ability:
      "Eén keer per spel, 's nachts*, kies je 1 speler: die speler sterft, zelfs als hij om welke reden dan ook zou moeten overleven.",
    reminders: ['Geen vermogen', 'Dood'],
    otherNightReminder:
      "Als de Assassijn zijn vermogen nog niet heeft gebruikt: De Assassijn schudt zijn hoofd (Nee) of wijst op een speler. Die speler sterft.",
  },
  mastermind: {
    name: 'Meesterbrein',
    ability:
      'Als de demon door executie sterft (en het spel zou beëindigen), speel dan nog één dag verder. Als de volgende dag een speler wordt geëxecuteerd, verliest het team met dezelfde gezindheid als die speler.',
  },
  zombuul: {
    name: 'Zombuul',
    ability:
      'Elke nacht*, als er overdag niemand is gestorven, kies je 1 speler: hij sterft. De eerste keer dat je zou moeten sterven, sterf je niet, maar registreer je wel als dood.',
    reminders: ['Dood', 'Stierf vandaag'],
    otherNightReminder:
      'Als er niemand overdag is gestorven: De Zombuul wijst op een speler. Die speler sterft.',
  },
  pukka: {
    name: 'Pukka',
    ability:
      'Elke nacht kies je 1 speler: hij is vergiftigd. De eerder vergiftigde speler sterft en wordt dan gezond.',
    reminders: ['Dood', 'Vergiftigd'],
    firstNightReminder:
      'De Pukka wijst op een speler. Die speler is vergiftigd.',
    otherNightReminder:
      'De Pukka wijst op een speler. Die speler is vergiftigd. De eerder vergiftigde speler sterft.',
  },
  shabaloth: {
    name: 'Shabaloth',
    ability:
      'Elke nacht* kies je 2 spelers: zij sterven. Een dode speler die je de vorige nacht hebt gekozen, kan worden herleefd.',
    reminders: ['Geen vermogen', 'Dood'],
    otherNightReminder:
      'Één van de spelers die de Shabaloth de vorige nacht heeft gekozen kan herleven. De Shabaloth wijst op twee spelers. Die spelers sterven.',
  },
  po: {
    name: 'Po',
    ability:
      'Elke nacht* kun je 1 speler kiezen: hij sterft. Als je de vorige nacht niemand hebt gekozen, kies je deze nacht 3 spelers.',
    reminders: ['3 aanvallen', 'Dood'],
    otherNightReminder:
      'Als de Po de vorige nacht niemand heeft gekozen: De Po wijst op drie spelers. Anders: De Po schudt zijn hoofd (Nee) of wijst op een speler. Gekozen spelers sterven.',
  },

  // ── Additional roles ─────────────────────────────────────────────────────────

  alchemist: {
    name: 'Alchemist',
    ability:
      'Je hebt het vermogen van een niet in het spel zijnde handlanger.',
    firstNightReminder:
      'Toon de Alchemist een niet in het spel zijnde handlanger-marker.',
  },
  alsaahir: {
    name: 'Al-Saahir',
    ability:
      'Elke dag, als je publiekelijk raadt welke spelers handlangers en welke demonen zijn, wint Goed.',
  },
  amnesiac: {
    name: 'Amnesiac',
    ability:
      'Je weet niet wat je vermogen is. Raad elke dag privé wat het is: je verneem hoe dicht je er bij zit.',
    reminders: ['?'],
    firstNightReminder:
      'Beslis het vermogen van de Amnesiac. Als het vermogen van de Amnesiac hem vanavond wakker maakt: Wek de Amnesiac en voer zijn vermogen uit.',
    otherNightReminder:
      'Als het vermogen van de Amnesiac hem vanavond wakker maakt: Wek de Amnesiac en voer zijn vermogen uit.',
  },
  atheist: {
    name: 'Atheïst',
    ability:
      'De verteller kan de spelregels overtreden. Als je wordt geëxecuteerd, wint Goed, zelfs als je dood bent. [Geen slechte karakters]',
  },
  balloonist: {
    name: 'Ballonvaarder',
    ability:
      'Elke nacht verneem je 1 speler van elk karaktertype, totdat er geen nieuwe typen meer zijn. [+1 Buitenstaander]',
    reminders: [
      'Dorpsbewoner gezien',
      'Buitenstaander gezien',
      'Handlanger gezien',
      'Demon gezien',
      'Reiziger gezien',
    ],
    firstNightReminder:
      'Kies een karaktertype. Wijs op een speler wiens karakter van dat type is. Plaats de Ballonvaarder-herinneringsmarker.',
    otherNightReminder:
      "Kies een karaktertype dat nog geen 'Gezien'-marker heeft. Wijs op een speler van dat type, als die er is. Plaats de Ballonvaarder-herinneringsmarker.",
  },
  bountyhunter: {
    name: 'Premiejager',
    ability:
      'Je verneem aan het begin 1 slechte speler. Als die speler sterft, verneem je vanavond een andere slechte speler. [1 dorpsbewoner is slecht]',
    reminders: ['Bekend'],
    firstNightReminder:
      "Wijs op 1 slechte speler. Wek de slechte dorpsbewoner en toon hem het 'Jij bent'-teken.",
    otherNightReminder:
      'Als de bekende slechte speler is gestorven, wijs op een andere slechte speler.',
  },
  cannibal: {
    name: 'Kannibaal',
    ability:
      'Je hebt het vermogen van de meest recent geëxecuteerde speler. Als die slecht was, ben je vergiftigd totdat een goede speler door executie sterft.',
    reminders: ['Vergiftigd', 'Stierf vandaag'],
  },
  choirboy: {
    name: 'Koorknaap',
    ability:
      'Als de demon de King doodt, verneem je welke speler de demon is. [+ de King]',
    otherNightReminder:
      'Als de King door de demon is gedood, wek de Koorknaap en wijs op de demonspeler.',
  },
  cultleader: {
    name: 'Cultleider',
    ability:
      'Elke nacht neem je de gezindheid over van een levende buur. Als alle goede spelers lid worden van jouw cult, wint jouw team.',
    firstNightReminder:
      'Als de Cultleider van gezindheid is gewisseld, toon hem het duim-omhoog-teken voor Goed of het duim-omlaag-teken voor Slecht.',
    otherNightReminder:
      'Als de Cultleider van gezindheid is gewisseld, toon hem het duim-omhoog-teken voor Goed of het duim-omlaag-teken voor Slecht.',
  },
  engineer: {
    name: 'Ingenieur',
    ability:
      'Eén keer per spel, \'s nachts, kies je welke handlangers of welke demon in het spel zijn.',
    reminders: ['Geen vermogen'],
    firstNightReminder: 'De Ingenieur wijst op een karakter.',
    otherNightReminder: 'De Ingenieur wijst op een karakter.',
  },
  farmer: {
    name: 'Boer',
    ability:
      "Als je 's nachts sterft, wordt een levende goede speler de Boer.",
    otherNightReminder:
      "Als vanavond een Boer is gestorven, kies een andere goede speler en maak hem tot Boer. Wek die speler en toon hem de Boer-marker.",
  },
  fisherman: {
    name: 'Visser',
    ability:
      'Eén keer per spel, overdag, bezoek je de verteller voor een advies dat je helpt winnen.',
    reminders: ['Geen vermogen'],
  },
  general: {
    name: 'Generaal',
    ability:
      'Elke nacht verneem je welke gezindheid de verteller denkt dat wint: Goed, Slecht of geen van beide.',
    firstNightReminder:
      'Toon de Generaal duim omhoog voor Goed wint, duim omlaag voor Slecht wint of duim opzij voor geen van beide.',
    otherNightReminder:
      'Toon de Generaal duim omhoog voor Goed wint, duim omlaag voor Slecht wint of duim opzij voor geen van beide.',
  },
  huntsman: {
    name: 'Jager',
    ability:
      "Eén keer per spel, 's nachts, kies je een levende speler: de Freule wordt, als gekozen, een niet in het spel zijnde dorpsbewoner. [+ de Freule]",
    reminders: ['Geen vermogen'],
    firstNightReminder: 'De Jager schudt zijn hoofd.',
    otherNightReminder: 'De Jager schudt zijn hoofd.',
  },
  king: {
    name: 'Koning',
    ability:
      'Elke nacht, als de doden de levenden overtreffen, verneem je 1 levend karakter. De demon weet wie je bent.',
    firstNightReminder: 'Wek de demon en toon hem de Koning-marker.',
    otherNightReminder:
      'Als er meer doden dan levenden zijn, toon de Koning een karaktermarker van een levende speler.',
  },
  lycanthrope: {
    name: 'Weerwolf',
    ability:
      'Elke nacht* kies je een levende speler: als hij goed is, sterft hij, maar hij is de enige speler die vanavond kan sterven.',
    reminders: ['Dood'],
    otherNightReminder:
      'De Weerwolf wijst op een levende speler: Als goed, sterft hij en kan niemand anders vanavond sterven.',
  },
  magician: {
    name: 'Magiër',
    ability:
      'De demon denkt dat jij een handlanger bent. Handlangers denken dat jij een demon bent.',
  },
  nightwatchman: {
    name: 'Nachtwaker',
    ability:
      "Eén keer per spel, 's nachts, kies je een speler: hij verneem wie jij bent.",
    reminders: ['Geen vermogen'],
    firstNightReminder:
      'De Nachtwaker kan op een speler wijzen. Wek die speler en toon hem de Nachtwaker-marker.',
    otherNightReminder:
      'De Nachtwaker kan op een speler wijzen. Wek die speler en toon hem de Nachtwaker-marker.',
  },
  noble: {
    name: 'Edele',
    ability:
      'Je verneem aan het begin 3 spelers, waarvan er 1 en slechts 1 slecht is.',
    reminders: ['Gezien'],
    firstNightReminder:
      'Wijs op 3 spelers, inclusief één slechte speler, in willekeurige volgorde.',
  },
  pixie: {
    name: 'Elfje',
    ability:
      'Je verneem aan het begin 1 in het spel zijnde dorpsbewoner. Als je gek was dat jij dat karakter bent, krijg je zijn vermogen als hij sterft.',
    reminders: ['Gek', 'Heeft vermogen'],
    firstNightReminder: 'Toon het Elfje 1 in het spel zijnde dorpsbewoner-marker.',
  },
  poppygrower: {
    name: 'Klaproozkweker',
    ability:
      "Handlangers en demonen kennen elkaar niet. Als je sterft, vernemen zij die nacht wie ze zijn.",
    reminders: ['Slecht wakker'],
    firstNightReminder: 'Informeer demon/handlangers niet over wie ze zijn.',
    otherNightReminder:
      'Als de Klaproozkweker is gestorven, toon de handlangers/demon wie ze zijn.',
  },
  preacher: {
    name: 'Predikant',
    ability:
      'Elke nacht kies je een speler: een handlanger verneem dit, als gekozen. Alle gekozen handlangers hebben geen vermogen.',
    reminders: ['In de preek'],
    firstNightReminder:
      'De Predikant kiest een speler. Als een handlanger is gekozen, wek de handlanger en toon de Predikant-marker.',
    otherNightReminder:
      'De Predikant kiest een speler. Als een handlanger is gekozen, wek de handlanger en toon de Predikant-marker.',
  },
  princess: {
    name: 'Prinses',
    ability:
      'Op je 1e dag, als je een speler hebt genomineerd en geëxecuteerd, doodt de demon vanavond niet.',
    reminders: ['Doodt niet'],
    otherNightReminder:
      'Als het de eerste dag van de Prinses was en ze heeft genomineerd en geëxecuteerd, doodt de demon niet.',
  },
  knight: {
    name: 'Ridder',
    ability: 'Je verneem aan het begin 2 spelers die niet de demon zijn.',
    reminders: ['Weet', 'Weet'],
    firstNightReminder: 'Wijs op de 2 gemarkeerde spelers.',
  },
  shugenja: {
    name: 'Shugenja',
    ability:
      'Je verneem aan het begin of jouw dichtstbijzijnde slechte speler met de klok mee of tegen de klok in is. Bij gelijke afstand is deze info willekeurig.',
    firstNightReminder:
      'Als de dichtstbijzijnde slechte speler met de klok mee is, wijs horizontaal in die richting. Als tegen de klok in, wijs horizontaal in die richting. Als gelijk, wijs horizontaal in een willekeurige richting.',
  },
  banshee: {
    name: 'Banshee',
    ability:
      'Als de demon jou doodt, vernemen alle spelers dit. Vanaf dan kun je twee keer per dag nomineren en twee keer per nominatie stemmen.',
    reminders: ['Heeft vermogen'],
    otherNightReminder:
      'Als de Banshee door de demon is gedood, kondig aan dat de Banshee is gestorven.',
  },
  steward: {
    name: 'Rentmeester',
    ability: 'Je verneem aan het begin 1 goede speler.',
    reminders: ['Weet'],
    firstNightReminder: 'Wijs op de gemarkeerde speler.',
  },
  highpriestess: {
    name: 'Hogepriesteres',
    ability:
      'Elke nacht verneem je met welke speler de verteller denkt dat jij het meest zou moeten praten.',
    firstNightReminder: 'Wijs op een speler.',
    otherNightReminder: 'Wijs op een speler.',
  },
  villageidiot: {
    name: 'Dorpsgek',
    ability:
      'Elke nacht kies je een speler: je verneem zijn gezindheid. [+0 tot +2 Dorpsgekken. 1 van de extra\'s is dronken]',
    reminders: ['Dronken'],
    firstNightReminder:
      'De Dorpsgek wijst op een speler; toon duim omhoog als die speler goed is, of duim omlaag als hij slecht is.',
    otherNightReminder:
      'De Dorpsgek wijst op een speler; toon duim omhoog als die speler goed is, of duim omlaag als hij slecht is.',
  },
  acrobat: {
    name: 'Acrobaat',
    ability:
      'Elke nacht*, als één van jouw goede levende buren dronken of vergiftigd is, sterf je.',
    reminders: ['Dood'],
    otherNightReminder:
      'Als een goede levende buur dronken of vergiftigd is, sterft de Acrobaat.',
  },
  damsel: {
    name: 'Freule',
    ability:
      'Alle handlangers weten dat jij in het spel bent. Als een handlanger jou publiekelijk raadt (eenmaal), verliest jouw team.',
    reminders: ['Raden gebruikt'],
    firstNightReminder: 'Wek alle handlangers en toon hen de Freule-marker.',
    otherNightReminder:
      'Als gekozen door de Jager, wek de Freule en toon het nieuwe karakter.',
  },
  golem: {
    name: 'Golem',
    ability:
      'Je mag maar eenmaal per spel nomineren. Als je dat doet en de genomineerde is niet de demon, sterft hij.',
    reminders: ['Kan niet nomineren'],
  },
  hatter: {
    name: 'Hoedenmaker',
    ability:
      'Als je vandaag of vanavond bent gestorven, kunnen handlanger- en demonspelers nieuwe handlanger- en demonkarakters kiezen.',
    reminders: ['Theefeest vanavond'],
    otherNightReminder:
      "Wek handlangers en demon. Elke speler schudt zijn hoofd of wijst op een ander karakter van hetzelfde type. Verander elke speler naar het gekozen karakter.",
  },
  heretic: {
    name: 'Ketter',
    ability:
      'Wie wint, verliest en wie verliest, wint, zelfs als je dood bent.',
  },
  plaguedoctor: {
    name: 'Pestdokter',
    ability:
      'Als je sterft, krijgt de verteller een handlanger-vermogen.',
    reminders: ['Verteller-vermogen'],
  },
  politician: {
    name: 'Politicus',
    ability:
      'Als jij de speler was die het meest verantwoordelijk is voor het verlies van jouw team, wissel je van gezindheid en win je, zelfs als dood.',
  },
  hermit: {
    name: 'Kluizenaar',
    ability: 'Je hebt alle buitenstaander-vermogens. [-0 of -1 Buitenstaander]',
    reminders: ['1', '2', '3'],
  },
  puzzlemaster: {
    name: 'Puzzelmeester',
    ability:
      '1 speler is dronken, zelfs als je sterft. Als je (eenmaal) raadt wie het is, verneem je de demonspeler, maar raad je fout dan ontvang je onjuiste info.',
    reminders: ['Dronken', 'Raden gebruikt'],
  },
  snitch: {
    name: 'Verklikker',
    ability:
      'Handlangers vernemen aan het begin 3 niet in het spel zijnde karakters.',
    firstNightReminder:
      'Na handlanger-info wek elke handlanger en toon hem drie niet in het spel zijnde karakter-markers.',
  },
  zealot: {
    name: 'IJveraar',
    ability:
      'Als er 5 of meer spelers leven, moet je voor elke nominatie stemmen.',
  },
  ogre: {
    name: 'Ogre',
    ability:
      'In je 1e nacht kies je een speler (niet jezelf): je neemt zijn gezindheid over (je weet het niet). Als hij goed is, wint hij ook als jij wint.',
    reminders: ['Vriend'],
    firstNightReminder:
      'De Ogre wijst op een speler (niet zichzelf) en neemt diens gezindheid over.',
  },
  boffin: {
    name: 'Boffin',
    ability:
      'De demon (zelfs als dronken of vergiftigd) heeft een niet in het spel zijnd goed vermogen.',
    firstNightReminder:
      'Wek de Boffin en toon de marker van het goede vermogen dat de demon heeft. Wek de demon, toon de Boffin-marker, dan de marker van het goede vermogen.',
  },
  boomdandy: {
    name: 'Boomdandy',
    ability:
      'Als je wordt geëxecuteerd, sterven alle behalve 3 spelers. 1 minuut later sterft de speler met de meeste vingers die op hem wijzen.',
  },
  wizard: {
    name: 'Tovenaar',
    ability:
      'Eén keer per spel kies je een wens te uiten. Als toegekend, kan het een prijs hebben en een hint over zijn aard achterlaten.',
    reminders: ['?', '?'],
    firstNightReminder:
      'Als de Tovenaar een wens heeft geuit, verwerk die.',
    otherNightReminder:
      'Als de Tovenaar een wens heeft geuit, verwerk die.',
  },
  organgrinder: {
    name: 'Orgeldraier',
    ability:
      'Alle spelers houden hun ogen dicht bij het stemmen en de stemuitslag is geheim. Elke nacht kies je of je tot zonsondergang dronken bent.',
    reminders: ['Gaat sterven', 'Dronken'],
    firstNightReminder:
      'Wek de Orgeldraier. Als hij duim omhoog geeft, is hij dronken.',
    otherNightReminder:
      'Wek de Orgeldraier. Als hij duim omhoog geeft, is hij dronken.',
  },
  goblin: {
    name: 'Goblin',
    ability:
      'Als je publiekelijk beweert de Goblin te zijn wanneer je wordt genomineerd, en op die dag wordt geëxecuteerd, wint jouw team.',
    reminders: ['Beweerd'],
  },
  harpy: {
    name: 'Harpij',
    ability:
      'Elke nacht kies je 2 spelers: morgen is de 1e speler gek dat de 2e slecht is, of één of beiden kunnen sterven.',
    reminders: ['Gek', '2e'],
    firstNightReminder:
      'De Harpij wijst op twee spelers. Wek de 1e speler en toon hem de Harpij- en de 2e speler-marker.',
    otherNightReminder:
      'De Harpij wijst op twee spelers. Wek de 1e speler en toon hem de Harpij- en de 2e speler-marker.',
  },
  marionette: {
    name: 'Marionet',
    ability:
      'Je denkt een goed karakter te zijn, maar dat ben je niet. De demon weet wie je bent. [Je bent de buur van de demon]',
    firstNightReminder:
      'Kies één van de goede spelers naast de demon en plaats de Marionet-marker. Wek de demon en toon hem de Marionet.',
  },
  mezepheles: {
    name: 'Mezepheles',
    ability:
      'Je verneem aan het begin een geheim woord. De 1e goede speler die dit woord zegt, wordt die nacht slecht.',
    reminders: ['Wordt slecht', 'Geen vermogen'],
    firstNightReminder: 'Toon de Mezepheles zijn geheime woord.',
    otherNightReminder:
      'Wek de 1e goede speler die het woord van de Mezepheles heeft gezegd en toon hem dat hij slecht is.',
  },
  wraith: {
    name: 'Schim',
    ability:
      "Je kunt kiezen 's nachts je ogen te openen. Je wordt wakker als andere slechte spelers wakker worden.",
    firstNightReminder:
      'Wek de Schim altijd wanneer andere slechte spelers wakker worden.',
    otherNightReminder:
      'Wek de Schim altijd wanneer andere slechte spelers wakker worden.',
  },
  psychopath: {
    name: 'Psychopaat',
    ability:
      'Elke dag, vóór nominaties, kun je publiekelijk een speler kiezen: hij sterft. Als geëxecuteerd, sterf je alleen als je Steen-Papier-Schaar verliest.',
  },
  summoner: {
    name: 'Bezweerder',
    ability:
      'Je ontvangt 3 bluffs. In de 3e nacht kies je een speler: hij wordt een slechte demon naar jouw keuze. [Geen demon]',
    reminders: ['Nacht 1', 'Nacht 2', 'Nacht 3'],
    firstNightReminder:
      'Toon de Bezweerder 3 niet in het spel zijnde karakters.',
    otherNightReminder:
      'Als het de 3e nacht is, wek de Bezweerder. Hij wijst op een speler en een demon. Die speler wordt die demon.',
  },
  vizier: {
    name: 'Vizier',
    ability:
      'Alle spelers weten dat jij de Vizier bent. Je kunt overdag niet sterven. Als goede spelers hebben gestemd, kun je kiezen direct te executeren.',
    firstNightReminder: 'Kondig de Vizier-speler aan.',
  },
  widow: {
    name: 'Weduwe',
    ability:
      'In je 1e nacht zie je het Grimoire en kies je een speler: hij is vergiftigd. 1 goede speler weet dat er een Weduwe in het spel is.',
    reminders: ['Vergiftigd'],
    firstNightReminder:
      'Toon de Weduwe het Grimoire. De Weduwe wijst op een speler. Die speler is vergiftigd. Wek een goede speler en toon de Weduwe-marker.',
  },
  xaan: {
    name: 'Xaan',
    ability:
      'In nacht X zijn alle dorpsbewoners tot zonsondergang vergiftigd. [X Buitenstaanders]',
    reminders: ['Nacht 1', 'Nacht 2', 'Nacht 3', 'X'],
    firstNightReminder: 'Voeg de Xaan-nachtmarker toe.',
    otherNightReminder: 'Verander de Xaan-nachtmarker.',
  },
  alhadikhia: {
    name: 'Al-Hadikhia',
    ability:
      'Elke nacht* kies je 3 spelers (alle spelers vernemen wie): elk kiest stil te leven of te sterven, maar als allen leven, sterven allen.',
    reminders: ['1', '2', '3', 'Koos dood', 'Koos leven'],
    otherNightReminder:
      'Al-Hadikhia kiest 3 spelers. Kondig de eerste speler aan, wek hem om te knikken (leven) of hoofd te schudden (sterven), dood of herleef overeenkomstig, dan laten slapen en volgende aankondigen. Als alle 3 daarna leven, sterven alle 3.',
  },
  yaggababble: {
    name: 'Yaggababble',
    ability:
      'Je verneem aan het begin een geheime zin. Voor elke keer dat je die overdag publiekelijk zegt, kan een speler sterven.',
    reminders: ['Dood', 'Dood', 'Dood'],
    firstNightReminder: 'Toon de Yaggababble zijn geheime zin.',
    otherNightReminder:
      'Kies een aantal spelers tot het totaal gelijk aan het aantal keren dat de Yaggababble zijn geheime zin vandaag publiekelijk heeft gezegd. Die spelers sterven.',
  },
  kazali: {
    name: 'Kazali',
    ability:
      'Elke nacht* kies je een speler: hij sterft. [Jij kiest welke spelers welke handlangers zijn. -? tot +? Buitenstaanders]',
    reminders: ['Dood'],
    firstNightReminder:
      'De Kazali wijst op een speler en een handlanger. Dit voor zoveel handlangers als er in het spel zouden moeten zijn. Verander deze spelers naar handlangers.',
    otherNightReminder: 'De Kazali wijst op een speler. Die speler sterft.',
  },
  legion: {
    name: 'Legion',
    ability:
      'Elke nacht* kan een speler sterven. Executies mislukken als alleen slechte spelers hebben gestemd. Je telt ook als handlanger. [De meeste spelers zijn Legion]',
    reminders: ['Dood', 'Gaat sterven'],
    otherNightReminder: 'Kies een speler, die speler sterft.',
  },
  leviathan: {
    name: 'Leviathan',
    ability:
      'Als meer dan 1 goede speler wordt geëxecuteerd, win je. Alle spelers weten dat je in het spel bent. Na dag 5 wint Slecht.',
    reminders: [
      'Dag 1',
      'Dag 2',
      'Dag 3',
      'Dag 4',
      'Dag 5',
      'Goede speler geëxecuteerd',
    ],
    firstNightReminder: 'Plaats de Leviathan-dagmarker.',
    otherNightReminder: 'Verander de Leviathan-dagmarker voor de volgende dag.',
  },
  lilmonsta: {
    name: "Lil' Monsta",
    ability:
      "Elke nacht kiezen handlangers wie Lil' Monsta babysit. Eén speler is Lil' Monsta. Babysitters sterven als Lil' Monsta een dorpsbewoner is. [+1 Handlanger]",
    firstNightReminder:
      "Wek alle handlangers samen, sta hen toe te kiezen wie Lil' Monsta babysit.",
    otherNightReminder:
      "Wek alle handlangers samen, sta hen toe te kiezen wie Lil' Monsta babysit.",
  },
  lleech: {
    name: 'Lleech',
    ability:
      'Elke nacht* kies je een speler: hij sterft. Je begint met het kiezen van een levende speler: hij is vergiftigd — je sterft alleen als hij sterft.',
    reminders: ['Dood', 'Vergiftigd'],
    firstNightReminder:
      'De Lleech wijst op een speler. Plaats de Vergiftigd-marker.',
    otherNightReminder: 'De Lleech wijst op een speler. Die speler sterft.',
  },
  ojo: {
    name: 'Ojo',
    ability:
      'Elke nacht* kies je een karakter: hij sterft. Als hij niet in het spel is, kiest de verteller wie sterft.',
    reminders: ['Dood'],
    otherNightReminder:
      'De Ojo wijst op een karakter. Als dat in het spel is, sterft die speler. Als niet in het spel, kiest de verteller wie in zijn plaats sterft.',
  },
  lordoftyphon: {
    name: 'Heer van Typhon',
    ability:
      'Elke nacht* kies je een speler: hij sterft. [Slechte karakters staan op een rij. Jij staat in het midden. +1 Handlanger. -? tot +? Buitenstaanders]',
    reminders: ['Dood'],
    firstNightReminder:
      "Wek de spelers aan beide kanten van de demon. Toon hen de 'Dit zijn jouw handlangers'-marker.",
    otherNightReminder:
      'De Heer van Typhon wijst op een speler. Die speler sterft.',
  },
  riot: {
    name: 'Riot',
    ability:
      'Genomineerden sterven, maar kunnen direct opnieuw nomineren (op dag 3 moeten ze). Na dag 3 wint Slecht. [Alle handlangers zijn Riot]',
  },
  apprentice: {
    name: 'Leerling',
    ability:
      'In je 1e nacht ontvang je een dorpsbewoner-vermogen (als goed) of een handlanger-vermogen (als slecht).',
    reminders: ['Is de Leerling'],
    firstNightReminder:
      "Toon de Leerling de 'Je hebt'-marker en een karakter-marker.",
  },
  barista: {
    name: 'Barista',
    ability:
      'Elke nacht, tot zonsondergang, 1) wordt een speler nuchter, gezond en ontvangt hij ware info, of 2) werkt zijn vermogen twee keer. Hij verneem welke.',
    reminders: ['Nuchter & Gezond', 'Vermogen twee keer'],
    firstNightReminder:
      'Kies een speler, wek hem en vertel hem welke Barista-kracht hem treft. Behandel hem dienovereenkomstig.',
    otherNightReminder:
      'Kies een speler, wek hem en vertel hem welke Barista-kracht hem treft. Behandel hem dienovereenkomstig.',
  },
  beggar: {
    name: 'Bedelaar',
    ability:
      'Je moet een stemtoken gebruiken om te stemmen. Dode spelers kunnen jou dat geven. Als ze dat doen, verneem je hun gezindheid. Je bent nuchter en gezond.',
  },
  bishop: {
    name: 'Bisschop',
    ability:
      'Alleen de verteller kan nomineren. Elke dag moet minstens 1 tegenstander worden genomineerd.',
    reminders: ['Nomineer Goed', 'Nomineer Slecht'],
  },
  bonecollector: {
    name: 'Bottenraper',
    ability:
      'Eén keer per spel, \'s nachts, kies je een dode speler: hij krijgt zijn vermogen terug tot zonsondergang.',
    reminders: ['Geen vermogen', 'Heeft vermogen'],
    otherNightReminder:
      'De Bottenraper schudt zijn hoofd of wijst op een dode speler. Als op een dode speler gewezen, plaats de Bottenraper-marker.',
  },
  bureaucrat: {
    name: 'Bureaucraat',
    ability:
      'Elke nacht kies je een speler (niet jezelf): zijn stem telt morgen als 3 stemmen.',
    reminders: ['3 stemmen'],
    firstNightReminder:
      'De Bureaucraat wijst op een speler. Plaats de Bureaucraat-marker.',
    otherNightReminder:
      'De Bureaucraat wijst op een speler. Plaats de Bureaucraat-marker.',
  },
  butcher: {
    name: 'Slager',
    ability: 'Elke dag, na de 1e executie, kun je opnieuw nomineren.',
  },
  cacklejack: {
    name: 'Cacklejack',
    ability:
      'Elke dag kies je een speler: een andere speler wisselt vanavond van karakter.',
    reminders: ['Niet ik'],
    otherNightReminder:
      'Vervang de karakter-marker van een speler (behalve die van de Cacklejack vandaag gekozen) door een andere. Wek die speler en toon het nieuwe karakter.',
  },
  deviant: {
    name: 'Afwijkeling',
    ability:
      'Als je vandaag grappig was, kun je niet door ballingschap sterven.',
  },
  gangster: {
    name: 'Gangster',
    ability:
      'Eén keer per dag kun je kiezen een levende buur te doden als jouw andere levende buur instemt.',
  },
  gnome: {
    name: 'Kabouter',
    ability:
      'Alle spelers vernemen aan het begin een speler van jouw gezindheid. Je kunt kiezen iedereen te doden die hem nomineert.',
    reminders: ['Vriend'],
  },
  gunslinger: {
    name: 'Scherpschutter',
    ability:
      'Elke dag, nadat de 1e stem is geteld, kun je een speler kiezen die heeft gestemd: hij sterft.',
  },
  harlot: {
    name: 'Harlot',
    ability:
      'Elke nacht* kies je een levende speler: als hij instemt, verneem je zijn karakter, maar jullie kunnen allebei sterven.',
    reminders: ['Dood'],
    otherNightReminder:
      'De Harlot wijst op een speler. Wek de gekozen speler en toon de Harlot-marker.',
  },
  judge: {
    name: 'Rechter',
    ability:
      'Eén keer per spel, als een andere speler heeft genomineerd, kun je kiezen de huidige executie te laten slagen of mislukken.',
    reminders: ['Geen vermogen'],
  },
  matron: {
    name: 'Matrone',
    ability:
      'Elke dag kun je maximaal 3 sets van 2 spelers kiezen om van plaats te wisselen. Spelers mogen hun plaatsen niet verlaten om privé te spreken.',
  },
  scapegoat: {
    name: 'Zondebok',
    ability:
      'Als een speler van jouw gezindheid wordt geëxecuteerd, kun jij in zijn plaats worden geëxecuteerd.',
  },
  thief: {
    name: 'Dief',
    ability:
      'Elke nacht kies je een speler (niet jezelf): zijn stem telt morgen negatief.',
    reminders: ['Negatieve stem'],
    firstNightReminder:
      'De Dief wijst op een speler. Plaats de Dief-marker.',
    otherNightReminder:
      'De Dief wijst op een speler. Plaats de Dief-marker.',
  },
  voudon: {
    name: 'Voudon',
    ability:
      'Alleen jij en de doden kunnen stemmen. Zij weten het niet. Een dode kan maar eenmaal per nominatie stemmen.',
  },
  tor: {
    name: 'Tor',
    ability:
      'Spelers weten niet wanneer ze sterven. Als ze \'s nachts sterven, verneem de Tor dit morgen. Doden stemmen.',
    otherNightReminder:
      "Als een speler 's nachts sterft, wek hem, toon het 'Jij bent'-teken, zijn karakter-marker, en duim omhoog of omlaag voor gezindheid.",
  },
  bigwig: {
    name: 'Grote Meneer',
    ability:
      'Elke genomineerde kiest een speler: tot de stemming mag alleen die spreken en hij is gek dat de genomineerde goed is, of hij kan sterven.',
  },
  bootlegger: {
    name: 'Smokkelaar',
    ability: 'Dit script heeft zelfgemaakte karakters of regels.',
  },
  gardener: {
    name: 'Tuinier',
    ability:
      'De verteller wijst 1 of meer spelers taken toe. Als ze worden volbracht, ontvangt die speler een sterk vermogen.',
  },
  stormcatcher: {
    name: 'Stormvanger',
    ability:
      'Noem een goed karakter. Als dat in het spel is, kan hij alleen door executie sterven, maar slechte spelers vernemen welke speler het is.',
    firstNightReminder:
      "Kondig aan het begin van de nacht aan welk karakter stormgevangen is. Als dat in het spel is, markeer die speler als STORMGEVANGEN. Wek elke slechte speler en toon de karakter-marker, dan de gemarkeerde speler. Als niet in het spel, wek elke slechte speler, toon 'Deze karakters zijn niet in het spel' en de relevante karakter-marker.",
  },
  zenomancer: {
    name: 'Zenomancer',
    ability:
      'Een of meer spelers hebben elk een doel. Als bereikt, verneem die speler ware informatie.',
  },
  doomsayer: {
    name: 'Onheilsprofeet',
    ability:
      'Als er 4 of meer spelers leven, kan elke levende speler publiekelijk kiezen (eenmaal per spel) dat een speler van zijn eigen gezindheid sterft.',
  },
  angel: {
    name: 'Engel',
    ability:
      'Degene die het meest verantwoordelijk is voor de dood van een nieuwe speler, kan iets ergs overkomen.',
    reminders: ['Bescherm', 'Iets Ergs'],
  },
  buddhist: {
    name: 'Boeddhist',
    ability:
      'In de eerste 2 minuten van elke dag mogen ervaren spelers niet spreken.',
  },
  hellslibrarian: {
    name: "Hels Bibliothecaris",
    ability:
      'Degene die spreekt wanneer de verteller om stilte heeft gevraagd, kan iets ergs overkomen.',
    reminders: ['Iets Ergs'],
  },
  revolutionary: {
    name: 'Revolutionair',
    ability:
      '2 naburige spelers zijn bekend als zijnde van dezelfde gezindheid. Eenmaal per spel telt één van hen fout.',
    reminders: ['Gebruikt'],
  },
  fiddler: {
    name: 'Violist',
    ability:
      'Eén keer per spel kiest de demon in het geheim een tegenstander: alle spelers stemmen welke van deze 2 spelers wint.',
  },
  toymaker: {
    name: 'Speelgoedmaker',
    ability:
      'De demon kan kiezen niet aan te vallen en moet dit minstens eenmaal per spel doen. Slechte spelers ontvangen normale startinfo.',
    reminders: ['Laatste nacht: Geen aanval'],
    otherNightReminder:
      "Als het een nacht is waarop een demonen-aanval het spel zou beëindigen, en de demon is gemarkeerd met 'Laatste nacht: Geen aanval', handelt de demon vanavond niet.",
  },
  fibbin: {
    name: 'Leugentje',
    ability:
      'Eén keer per spel kan 1 goede speler onjuiste informatie ontvangen.',
    reminders: ['Gebruikt'],
  },
  duchess: {
    name: 'Hertogin',
    ability:
      'Elke dag kunnen 3 spelers kiezen jou te bezoeken. Elke nacht* verneem elke bezoeker hoeveel bezoekers slecht zijn, maar 1 ontvangt onjuiste info.',
    reminders: ['Bezoeker', 'Onjuiste info'],
    otherNightReminder:
      "Wek elke met 'Bezoeker' of 'Onjuiste info' gemarkeerde speler afzonderlijk. Toon de Hertogin-marker, dan vingers (1, 2, 3) gelijk aan het aantal slechte spelers met 'Bezoeker' of, als 'Onjuiste info', toon een ander aantal vingers.",
  },
  sentinel: {
    name: 'Schildwacht',
    ability: 'Er kunnen 1 meer of minder buitenstaanders in het spel zijn.',
  },
  spiritofivory: {
    name: 'Geest van Ivoor',
    ability: 'Er kunnen geen extra slechte spelers zijn.',
    reminders: ['Geen extra Slecht'],
  },
  djinn: {
    name: 'Djinn',
    ability: 'Gebruik het Djinn-vermogen.',
  },
  deusexfiasco: {
    name: 'Deus Ex Fiasco',
    ability:
      'Minstens eenmaal per spel zal de verteller een fout maken, deze corrigeren en publiekelijk toegeven.',
  },
  ferryman: {
    name: 'Veerman',
    ability:
      'Op de laatste dag ontvangen alle dode spelers hun stemtoken terug.',
  },
  hindu: {
    name: 'Hindoe',
    ability:
      'De eerste 4 spelers die sterven worden onmiddellijk gereïncarneerd als reizigers van dezelfde gezindheid.',
  },
  pope: {
    name: 'Paus',
    ability:
      'Er zijn dubbele goede karakters in het spel. Ze kunnen ook bluffs zijn.',
  },
  witch: {
    name: 'Heks',
    ability:
      'Elke nacht kies je 1 speler: als die speler de volgende dag iemand nomineert, sterft hij. Als er nog maar 3 spelers leven, verlies je dit vermogen.',
    reminders: ['Vervloekt'],
    firstNightReminder:
      'De Heks wijst op een speler. Als die speler morgen iemand nomineert, sterft hij ter plekke.',
    otherNightReminder:
      'Als vier of meer spelers leven: De Heks wijst op een speler. Als die speler morgen iemand nomineert, sterft hij ter plekke.',
  },
  barber: {
    name: 'Kapper',
    ability:
      'Als je overdag of vanavond bent gestorven, kan de demon 2 spelers kiezen (niet een andere demon) die van karakter wisselen.',
    reminders: ['Kapbeurt vanavond'],
    otherNightReminder:
      "Als de Kapper vandaag is gestorven: Wek de demon. Toon hem de 'Dit karakter koos jou'-kaart en dan de Kapper-kaart. De demon geeft een 'Nee'-signaal of wijst op twee spelers. Als hij spelers heeft gekozen: Wissel de karakterkaarten. Wek de spelers. Toon hen: 'Jij bent' en daarna hun nieuwe karakter.",
  },
}
