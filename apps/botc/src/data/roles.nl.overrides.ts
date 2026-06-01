/**
 * Dutch translations and overrides for Blood on the Clocktower roles.
 */

import { RoleTranslation } from './types'

export const roleTranslationsNl: Record<string, RoleTranslation> = {
  alchemist: {
    firstNightReminder:
      "Toon de 'Jij bent' kaart en het personagefiche van een Volgeling.",
    remindersGlobal: ['Is de Alchemist'],
    ability:
      'Je hebt de eigenschap van een Volgeling. Wanneer je die gebruikt kan de Verteller aangeven om anders te kiezen.',
  },
  alsaahir: {
    ability:
      'Elke dag, als je publiek raadt welke spelers Volgeling(en) zijn en welke speler Demon(en), dan wint het goede team.',
  },
  amnesiac: {
    name: 'Vergeetachtige',
    firstNightReminder:
      "Beslis wat de eigenschap is van de Vergeetachtige. Als die eigenschap hem vannacht wakker moet maken: Wek de Vergeetachtige en voer zijn eigenschap uit.",
    otherNightReminder:
      "Als die eigenschap hem vannacht wakker moet maken: Wek de Vergeetachtige en voer zijn eigenschap uit.",
    ability:
      'Je weet niet wat je eigenschap is. Je mag elke dag privé bij de Verteller raden wat die is: je leert hoe dichtbij je bent.',
  },
  artist: {
    name: 'Kunstenaar',
    reminders: ['Geen eigenschap'],
    ability:
      'Je mag één keer per spel de Verteller tijdens de dag privé een ja/nee vraag stellen.',
  },
  atheist: {
    ability:
      'De Verteller kan de regels van het spel breken & als die geëxecuteerd wordt, wint het goed team, zelfs als je dood bent. [Geen kwaadaardige personages]',
  },
  balloonist: {
    name: 'Ballonvaarder',
    firstNightReminder:
      "Kies een type personage. Wijs een speler met een personage van dat type aan. Markeer die speler met het 'Gezien'-markeerfiche van de Ballonvaarder.",
    otherNightReminder:
      "Kies een type personage dat nog niet gezien is door de Ballonvaarder. Wijs een speler met een personage van dat type aan. Markeer die speler met het 'Gezien'-markeerfiche van de Ballonvaarder.",
    reminders: [
      'Dorpsbewoner gezien',
      'Buitenstaander gezien',
      'Volgeling gezien',
      'Demon gezien',
      'Reiziger gezien',
    ],
    ability:
      'Je leert elke nacht 1 speler van elk type personage, tot er geen types meer zijn om te leren. [+1 Buitenstaander]',
  },
  bountyhunter: {
    name: 'Premiejager',
    firstNightReminder:
      "Wijs 1 kwaadaardige speler aan. Wek de Dorpsbewoner die kwaadaardig is en toon de 'Jij bent' kaart, gevolgd door een duim naar beneden om 'kwaadaardig' aan te geven.",
    otherNightReminder:
      'Als de gekende kwaadaardige speler dood is, wijs een andere kwaadaardige speler aan.',
    reminders: ['Gekend'],
    ability:
      'Je leert in je eerste nacht 1 kwaadaardige speler. Als die speler dood gaat, leer je vannacht een andere kwaadaardige speler. [1 Dorpsbewoner is kwaadaardig]',
  },
  cannibal: {
    name: 'Kannibaal',
    reminders: ['Vergiftigd', 'Gedood vandaag'],
    ability:
      'Je hebt de eigenschap van de speler die het laatst gedood werd door executie. Als die speler kwaadaardig is, ben je vergiftigd totdat een goede speler gedood wordt door executie.',
  },
  chambermaid: {
    name: 'Kamermeid',
    firstNightReminder:
      'De Kamermeid wijst 2 spelers aan. Toon het aantal vingers (0, 1, 2, …) om het aantal spelers aan te duiden die vannacht wakker werden vanwege hun eigenschap.',
    otherNightReminder:
      'De Kamermeid wijst 2 spelers aan. Toon het aantal vingers (0, 1, 2, …) om het aantal spelers aan te duiden die vannacht wakker werden vanwege hun eigenschap.',
    ability:
      'Kies elke nacht 2 levende spelers (niet jezelf): je leert hoeveel er vannacht wakker werden vanwege hun eigenschap.',
  },
  chef: {
    name: 'Kok',
    firstNightReminder:
      'Toon het aantal vingers (0, 1, 2, …) om het aantal paar kwaadaardige spelers die naast elkaar zitten aan te duiden.',
    ability: 'Je leert in je eerste nacht hoeveel paar kwaadaardige spelers er naast elkaar zitten.',
  },
  choirboy: {
    name: 'Koorjongen',
    otherNightReminder:
      'Als de Koning gedood werd door de Demon, wek de Koorjongen en wijs de Demon speler aan.',
    ability:
      'Als de Demon de Koning doodt, leer je welke speler de Demon is. [+ de Koning]',
  },
  clockmaker: {
    name: 'Klokkenmaker',
    firstNightReminder:
      'Toon het aantal vingers (1, 2, 3, etc.) om het aantal stappen van de Demon tot zijn dichtstbijzijnde Volgeling aan te geven.',
    ability:
      'Je leert in je eerste nacht het aantal stappen van de Demon tot zijn dichtstbijzijnde Volgeling.',
  },
  courtier: {
    name: 'Hoveling',
    firstNightReminder:
      "De Hoveling schudt ofwel 'nee', of wijst een personage op het script aan. Als de eigenschap van de Hoveling werd gebruikt: Als dat personage in het spel zit, dan is die speler dronken.",
    otherNightReminder:
      "Verminder het aantal overgebleven dagen dat de gemarkeerde speler dronken is. Als de eigenschap van de Hoveling nog niet werd gebruikt: De Hoveling schudt ofwel 'nee', of wijst een personage op het script aan. Als de eigenschap van de Hoveling werd gebruikt: Als dat personage in het spel zit, dan is die speler dronken.",
    reminders: ['Dronken 3', 'Dronken 2', 'Dronken 1', 'Geen eigenschap'],
    ability:
      'Je mag één keer per spel, tijdens de nacht, een personage kiezen: dat personage is dronken voor 3 nachten & 3 dagen.',
  },
  cultleader: {
    name: 'Sekteleider',
    firstNightReminder:
      'Als de Sekteleider van team veranderde, toon een duim omhoog voor het Goede team of duim omlaag voor het Slechte team aan te geven.',
    otherNightReminder:
      'Als de Sekteleider van team veranderde, toon een duim omhoog voor het Goede team of duim omlaag voor het Slechte team aan te geven.',
    ability:
      'Je wordt elke dag deel van het team van een van je levende buren. Als alle goede spelers kiezen om lid te worden van je sekte, dan wint jouw team.',
  },
  dreamer: {
    name: 'Dromer',
    firstNightReminder:
      'De Dromer wijst een speler aan. Toon 1 goed en 1 kwaadaardig personagefiche; 1 ervan moet correct zijn.',
    otherNightReminder:
      'De Dromer wijst een speler aan. Toon 1 goed en 1 kwaadaardig personagefiche; 1 ervan moet correct zijn.',
    ability:
      'Kies elke nacht een speler (niet jezelf en geen Reizigers): je leert 1 goed en 1 kwaadaardig personage, 1 ervan is correct.',
  },
  empath: {
    name: 'Empaat',
    firstNightReminder:
      'Toon het aantal vingers (0, 1, 2) om het aantal kwaadaardige levende buren van de Empaat aan te duiden.',
    otherNightReminder:
      'Toon het aantal vingers (0, 1, 2) om het aantal kwaadaardige levende buren van de Empaat aan te duiden.',
    ability:
      'Je leert elke nacht hoeveel van je 2 levende buren kwaadaardig zijn.',
  },
  engineer: {
    name: 'Ingenieur',
    firstNightReminder:
      "De Ingenieur schudt ofwel 'nee', of wijst een Demon aan, of wijst het juiste aantal Volgelingen aan. Als de Ingenieur personages koos, vervang de Demon of Volgeling personagefiches met de gemaakte keuzes. Wek de relevante spelers en toon hen de 'Jij bent' kaart en de relevante personagefiches.",
    otherNightReminder:
      "De Ingenieur schudt ofwel 'nee', of wijst een Demon aan, of wijst het juiste aantal Volgelingen aan. Als de Ingenieur personages koos, vervang de Demon of Volgeling personagefiches met de gemaakte keuzes. Wek de relevante spelers en toon hen de 'Jij bent' kaart en de relevante personagefiches.",
    reminders: ['Geen eigenschap'],
    ability:
      'Kies één keer per spel, tijdens de nacht, welke Volgelingen OF welke Demon in het spel zitten.',
  },
  exorcist: {
    name: 'Exorcist',
    otherNightReminder:
      'De Exorcist wijst een speler aan (een andere als vorige nacht). Als die speler de Demon is: Wek de Demon. Toon het personagefiche van de Exorcist. Wijs de Exorcist aan. De Demon activeert vannacht niet.',
    reminders: ['Gekozen'],
    ability:
      "Kies elke nacht* een speler (een andere als vorige nacht): de Demon, als gekozen, leert wie je bent en wordt dan niet wakker vannacht.",
  },
  farmer: {
    name: 'Boer',
    otherNightReminder:
      "Als een Boer vannacht dood ging, kies een andere goede speler en verander hen in een Boer. Wek die speler, en toon de 'Jij bent' kaart en het personagefiche van de Boer.",
    ability: "Als je 's nachts dood gaat, wordt een levende goede speler een Boer.",
  },
  fisherman: {
    name: 'Visser',
    reminders: ['Geen eigenschap'],
    ability:
      'Bezoek overdag, één keer per spel, de Verteller om advies te krijgen om je te helpen winnen.',
  },
  flowergirl: {
    name: 'Bloemenmeisje',
    otherNightReminder:
      "Knik 'ja' of schud 'nee' om aan te geven of de Demon vandaag gestemd heeft. Plaats het 'Demon niet gestemd'-markeerfiche (verwijder het 'Demon gestemd'-markeerfiche, indien van toepassing).",
    reminders: ['Demon gestemd', 'Demon niet gestemd'],
    ability: 'Je leert elke nacht* of een Demon gestemd heeft vandaag',
  },
  fool: {
    name: 'Dwaas',
    reminders: ['Geen eigenschap'],
    ability: "De eerste keer dat je sterft, gebeurt dat niet.",
  },
  fortuneteller: {
    name: 'Waarzegger',
    firstNightReminder:
      'De Waarzegger wijst 2 spelers aan. Knik ja, of schud nee, om aan te duiden of een van die spelers de Demon is. ',
    otherNightReminder:
      "De Waarzegger wijst 2 spelers aan. Knik ja, of schud nee, om aan te duiden of een van die spelers de Demon is. ",
    reminders: ['Rode haring'],
    ability:
      'Je kiest elke nacht 2 spelers: je leert of een van hen een Demon is. Er is een goede speler die voor jou registreert als een Demon.',
  },
  gambler: {
    name: 'Gokker',
    otherNightReminder:
      'De Gokker wijst een speler aan en een personage op het script. Als het personage niet klopt, gaat de Gokker dood.',
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een speler & gok wat hun personage is: als je verkeerd gokt, ga je dood.',
  },
  general: {
    name: 'Generaal',
    firstNightReminder:
      'Toon de Generaal een duim naar boven om aan te geven dat goed aan het winnen is, een duim naar beneden voor kwaad, of een duim opzij indien geen van beide.',
    otherNightReminder:
      'Toon de Generaal een duim naar boven om aan te geven dat goed aan het winnen is, een duim naar beneden voor kwaad, of een duim opzij indien geen van beide.',
    ability:
      'Je leert elke nacht welk team dat de Verteller denkt dat aan het winnen is: goed, kwaad of geen van beide.',
  },
  gossip: {
    name: 'Roddelaar',
    otherNightReminder:
      'Als de publieke uitspraak van de Roddelaar waar was: Kies een speler die niet beschermd is tegen de dood vannacht. Die speler gaat dood.',
    reminders: ['Dood'],
    ability:
      'je mag elke dag een publieke uitspraak doen. Vannacht, als het waar was, sterft een speler.',
  },
  grandmother: {
    name: 'Grootmoeder',
    firstNightReminder:
      'Toon het personagefiche van de gemarkeerde speler. Wijs de gemarkeerde speler aan.',
    otherNightReminder:
      "Als de Grootmoeder haar kleinkind werd gedood door de Demon vannacht: De Grootmoeder sterft.",
    reminders: ['Kleinkind'],
    ability:
      'Je leert in je eerste nacht een goede speler & hun personage. Als de Demon hen doodt, sterf jij ook.',
  },
  huntsman: {
    name: 'Jager',
    firstNightReminder:
      "De Jager schudt ofwel 'nee', of wijst een speler aan. Als de Jongedame gekozen wordt, wek die speler, toon de 'Jij bent' kaart en een Dorpsbewoner personagefiche dat niet in het spel zit.",
    otherNightReminder:
      "De Jager schudt ofwel 'nee', of wijst een speler aan. Als de Jongedame gekozen wordt, wek die speler, toon de 'Jij bent' kaart en een Dorpsbewoner personagefiche dat niet in het spel zit.",
    reminders: ['Geen eigenschap'],
    ability:
      'Kies één keer per spel, in de nacht, een levende speler: de Jongedame, indien gekozen, wordt een Dorpsbewoner die niet in het spel zit. [+de Jongedame]',
  },
  innkeeper: {
    name: 'Herbergier',
    otherNightReminder:
      'Verwijder de markeerfiches van de eerder beschermde en dronken spelers. De Herbergier wijst 2 spelers aan. Die spelers zijn beschermd. Een van hen is dronken.',
    reminders: ['Beschermd', 'Dronken'],
    ability:
      "Kies elke nacht* 2 spelers: die kunnen vannacht niet sterven, maar 1 ervan is dronken tot zonsondergang.",
  },
  investigator: {
    name: 'Onderzoeker',
    firstNightReminder:
      'Toon het personagefiche van een Volgeling die in het spel zit. Wijs naar 2 spelers, waarvan één dat personage is.',
    reminders: ['Volgeling', 'Fout'],
    ability: 'Je leert in je eerste nacht dat 1 van 2 spelers een bepaalde Volgeling is.',
  },
  juggler: {
    name: 'Jongleur',
    otherNightReminder:
      "Als vandaag de eerste dag was van de Jongleur: Toon het aantal vingers (0, 1, 2, etc.) om het aantal correcte gokken (via de 'Correct'-markeerfiches) aan te geven. Verwijder de markeerfiches.",
    reminders: ['Correct'],
    ability:
      "Tijdens je 1ste dag mag je tot 5 spelers hun personages raden. Die nacht leer je hoeveel je er correct had.",
  },
  king: {
    name: 'Koning',
    firstNightReminder:
      "Wek de Demon, toon de 'Dit personage heeft jou geselecteerd' kaart. Toon het personagefiche van de Koning en wijs die speler aan.",
    otherNightReminder:
      'Als er meer spelers dood zijn dan in leven, toon de Koning een personagefiche van een levende speler.',
    ability:
      'Je leert elke nacht, als er meer spelers dood zijn dan in leven, 1 levend personage. De Demon weet wie je bent.',
  },
  librarian: {
    name: 'Bibliothecaris',
    firstNightReminder:
      "Toon het personagefiche van een Buitenstaander die in het spel zit. Wijs naar 2 spelers, waarvan een dat personage is. Als er geen Buitenstaanders in het spel zitten, toon een '0'.",
    reminders: ['Buitenstaander', 'Fout'],
    ability:
      'Je leert in je eerste nacht dat 1 van 2 spelers een bepaalde Buitenstaander is. (Of dat er geen enkele in het spel zit.)',
  },
  lycanthrope: {
    name: 'Weerwolf',
    otherNightReminder:
      'De Weerwolf wijst een levende speler aan: als die goed is, sterft die speler en kan er niemand anders dood gaan vannacht.',
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een levende speler: indien goed, dan gaat die speler dood, maar dat is ook de enige speler die kan dood gaan vannacht.',
  },
  magician: {
    name: 'Goochelaar',
    ability:
      'De Demon denkt dat je een Volgeling bent. Volgelingen denken dat je een Demon bent.',
  },
  mathematician: {
    name: 'Wiskundige',
    firstNightReminder:
      'Toon het aantal vingers (0, 1, 2, etc.) om het aantal spelers aan te duiden waarvan hun eigenschap abnormaal gewerkt heeft als gevolg van andere eigenschappen.',
    otherNightReminder:
      'Toon het aantal vingers (0, 1, 2, etc.) om het aantal spelers aan te duiden waarvan hun eigenschap abnormaal gewerkt heeft als gevolg van andere eigenschappen.',
    reminders: ['Abnormaal'],
    ability:
      "Je leert elke nacht hoeveel spelers hun eigenschap abnormaal gewerkt heeft (sinds zonsopgang) als gevolg van een andere personage hun eigenschap.",
  },
  mayor: {
    name: 'Burgemeester',
    ability:
      'Als er nog maar 3 spelers leven & er vindt geen executie plaats, dan wint jouw team. Als je in de nacht wordt gedood, dan kan een andere speler in de plaats sterven.',
  },
  minstrel: {
    name: 'Minstreel',
    reminders: ['Iedereen dronken'],
    ability:
      'Als vandaag een Volgeling werd gedood door executie, worden alle spelers (buiten Reizigers) dronken tot zonsondergang morgen.',
  },
  monk: {
    name: 'Monnik',
    otherNightReminder:
      "De eerder gekozen speler is niet langer beschermd. De Monnik wijst een speler aan (niet zichzelf). Markeer die speler als 'Beschermd'.",
    reminders: ['Beschermd'],
    ability:
      'Kies elke nacht* een speler (niet jezelf): deze speler is vannacht beschermd tegen de Demon.',
  },
  nightwatchman: {
    name: 'Nachtwaker',
    firstNightReminder:
      "De Nachtwaker mag een speler aanwijzen. Wek die speler, toon de 'Dit personage heeft je geselecteerd' kaart en het personagefiche van de Nachtwaker, wijs dan de Nachtwaker speler aan.",
    otherNightReminder:
      "De Nachtwaker mag een speler aanwijzen. Wek die speler, toon de 'Dit personage heeft je geselecteerd' kaart en het personagefiche van de Nachtwaker, wijs dan de Nachtwaker speler aan.",
    reminders: ['Geen eigenschap'],
    ability:
      'Kies één keer per spel, in de nacht, een speler: die speler leert wie je bent.',
  },
  noble: {
    name: 'Edele',
    firstNightReminder:
      'Wijs 3 spelers aan, inclusief 1 kwaadaardige speler, in willekeurige volgorde.',
    reminders: ['Gezien'],
    ability: 'Je leert in je eerste nacht 3 spelers, Één, en enkel één van hen is kwaadaardig.',
  },
  oracle: {
    name: 'Orakel',
    otherNightReminder:
      'Toon het aantal vingers (0, 1, 2, etc.) om het aantal dode kwaadaardige spelers aan te geven.',
    ability: 'Je leert elke nacht* hoeveel dode spelers er kwaadaardig zijn.',
  },
  pacifist: {
    ability: 'Goede spelers die geëxecuteerd worden sterven mogelijk niet.',
  },
  philosopher: {
    name: 'Filosoof',
    firstNightReminder:
      "De Filosoof schudt ofwel 'nee', of wijst een goed personage aan op het script. Als er een personage gekozen werd: Wissel het personagefiche met dat van de Filosoof en plaats het 'Is de Filosoof'-markeerfiche. Als het personage in het spel zit, plaats het 'Dronken'-markeerfiche bij die speler.",
    otherNightReminder:
      "Indien de eigenschap van de Filosoof nog niet werd gebruikt: De Filosoof schudt ofwel 'nee', of wijst een goed personage aan op het script. Als er een personage gekozen werd: Wissel het personagefiche met dat van de Filosoof en plaats het 'Is de Filosoof'-markeerfiche. Als het personage in het spel zit, plaats het 'Dronken'-markeerfiche bij die speler.",
    reminders: ['Dronken', 'Is de Filosoof'],
    ability:
      'Kies één keer per spel, in de nacht, een goed personage: je krijgt die eigenschap. Als dat personage in het spel zit, wordt die speler dronken.',
  },
  pixie: {
    name: 'Fee',
    firstNightReminder: 'Toon de Fee 1 Dorpsbewoner personagefiche dat in het spel zit.',
    reminders: ['Verkondigingsdwang', 'Heeft eigenschap'],
    ability:
      'Je leert in je eerste nacht 1 Dorpsbewoner-personage dat in het spel zit. Als je verkondigde dat personage te zijn, dan krijg je de eigenschap van dat personage wanneer die dood gaat.',
  },
  poppygrower: {
    name: 'Opiumkweker',
    firstNightReminder: 'Laat de Demon/Volgelingen elkaar niet kennen.',
    otherNightReminder:
      'Als de Opiumkweker dood ging, toon Volgelingen/Demonen aan elkaar.',
    reminders: ['Kwaad Wekken'],
    ability:
      'Volgelingen & Demonen kennen elkaar niet. Als je dood gaat, leren ze elkaar die nacht.',
  },
  preacher: {
    name: 'Preker',
    firstNightReminder:
      "De Preker wijst een speler aan. Als een Volgeling gekozen wordt, wek die Volgeling en toon de 'Dit personage heeft jou geselecteerd'-kaart en dan het personagefiche van de Preker.",
    otherNightReminder:
      "De Preker wijst een speler aan. Als een Volgeling gekozen wordt, wek die Volgeling en toon de 'Dit personage heeft jou geselecteerd'-kaart en dan het personagefiche van de Preker.",
    reminders: ['Bij een preek'],
    ability:
      'Kies elke nacht een speler: een Volgeling, indien gekozen, komt dit te weten. Alle gekozen Volgelingen hebben geen eigenschap meer.',
  },
  princess: {
    name: 'Prinses',
    otherNightReminder:
      "Als het vandaag de Prinses haar eerste dag was, en die Prinses nomineerde en executeerde een speler, dan doodt de Demon niet vannacht.",
    reminders: ["Doodt niet"],
    ability:
      'Tijdens je 1ste dag, als je een speler nomineerde en executeerde, dan doodt de Demon niet vannacht.',
  },
  professor: {
    name: 'Professor',
    otherNightReminder:
      "Als de eigenschap van de Professor nog niet werd gebruikt: De Professor schudt ofwel 'nee', of wijst een dode speler aan. Als die speler een Dorpsbewoner is, komt die terug tot leven.",
    reminders: ['Levend', 'Geen eigenschap'],
    ability:
      'Je mag één keer per spel, in de nacht*, een dode speler kiezen: als die speler een Dorpsbewoner is, komt die terug tot leven',
  },
  ravenkeeper: {
    name: 'Raafwachter',
    otherNightReminder:
      'Als de Raafwachter vannacht werd gedood: De Raafwachter wijst een speler aan. Toon het personagefiche van die speler.',
    ability:
      "Als je 's nachts wordt gedood, zal je worden gewekt om een speler te kiezen: je leert hun personage.",
  },
  knight: {
    name: 'Ridder',
    firstNightReminder: 'Wijs de 2 gemarkeerde speler aan.',
    reminders: ['Gekend', 'Gekend'],
    ability: 'Je leert in je eerste nacht 2 spelers die niet de Demon zijn.',
  },
  sage: {
    name: 'Wijsgeer',
    otherNightReminder:
      'Als de Wijsgeer gedood werd door een Demon: Wijs 2 spelers aan, 1 er van is de Demon.',
    ability: 'Als de Demon jou doodt, leer je dat het 1 van 2 spelers was.',
  },
  sailor: {
    name: 'Zeeman',
    firstNightReminder:
      'De Zeeman wijst een levende speler aan. Ofwel de Zeeman, ofwel de gekozen speler, is dronken.',
    otherNightReminder:
      'De speler die eerder dronken was, is niet langer dronken. De Zeeman wijst een levende speler aan. Ofwel de Zeeman, ofwel de gekozen speler, is dronken.',
    reminders: ['Dronken'],
    ability:
      "Elke nacht kies je een levende speler: jij of die speler is dronken tot zonsondergang. Je kunt niet sterven.",
  },
  savant: {
    name: 'Geleerde',
    ability:
      'Je mag elke dag de Verteller bezoeken om privé 2 dingen te weten te komen: 1 is waar & 1 is niet waar.',
  },
  seamstress: {
    name: 'Naaister',
    firstNightReminder:
      "De Naaister schudt ofwel 'nee', of wijst 2 spelers aan. Als de Naaister spelers koos, knik 'ja' of schud 'nee' om aan te geven of de spelers in hetzelfde team zitten.",
    otherNightReminder:
      "Als de eigenschap van de Naaister nog niet werd gebruikt: De Naaister schudt ofwel 'nee', of wijst 2 spelers aan. Als de Naaister spelers koos, knik 'ja' of schud 'nee' om aan te geven of de spelers in hetzelfde team zitten.",
    reminders: ['Geen eigenschap'],
    ability:
      'Kies één keer per spel in de nacht 2 spelers (niet jezelf): je leert of ze in hetzelfde team zitten.',
  },
  shugenja: {
    firstNightReminder:
      'Toon met een horizontale vinger de richting van de dichtstbijzijnde kwaadaardige speler. Als ze op gelijk afstand zitten, kies een richting.',
    ability:
      'Je leert in je eerste nacht in welke richting jouw dichtstbijzijnde kwaadaardige speler zit. Deze info is willekeurig indien op gelijke afstand.',
  },
  slayer: {
    name: 'Demonenjager',
    reminders: ['Geen eigenschap'],
    ability:
      'Je mag één keer per spel, tijdens de dag, publiek een speler kiezen: als die speler de Demon is, dan sterft die.',
  },
  banshee: {
    otherNightReminder:
      'Als de Banshee gedood werd door de Demon, verkondig publiek dat de Banshee dood is.',
    reminders: ['Heeft eigenschap'],
    ability:
      'Als de Demon jou doodt, komen alle spelers dit te weten. Vanaf nu, mag je 2 keer per dag nomineren en 2 keer stemmen per nominatie.',
  },
  snakecharmer: {
    name: 'Slangenbezweerder',
    firstNightReminder:
      'De Slangenbezweerder wijst een speler aan. Als die speler de Demon is: wissel de Demon en de Slangenbezweerder hun personage en team. Wek beide spelers om hen te informeren over hun nieuwe personage en team. De nieuwe Slangenbezweerder is vergiftigd.',
    otherNightReminder:
      'De Slangenbezweerder wijst een speler aan. Als die speler de Demon is: wissel de Demon en de Slangenbezweerder hun personage en team. Wek beide spelers om hen te informeren over hun nieuwe personage en team. De nieuwe Slangenbezweerder is vergiftigd.',
    reminders: ['Vergiftigd'],
    ability:
      'Kies elke nacht een levende speler: als je de Demon kiest wisselt die van personage en van team met jou & is dan vergiftigd.',
  },
  soldier: {
    name: 'Soldaat',
    ability: 'Je bent beschermd tegen de Demon.',
  },
  steward: {
    name: 'Hofmeester',
    firstNightReminder: 'Wijs de gemarkeerde speler aan.',
    reminders: ['Gekend'],
    ability: 'Je leert in je eerste nacht 1 goede speler.',
  },
  tealady: {
    name: 'Theedame',
    reminders: ['Kan niet sterven'],
    ability: "Als beide van je levende buren goed zijn, kunnen ze niet sterven.",
  },
  towncrier: {
    name: 'Dorpsomroeper',
    otherNightReminder:
      "Knik 'ja' of schud 'nee' om aan te geven of een Volgeling vandaag iemand genomineerd heeft. Plaats het 'Volgelingen niemand genomineerd'-markeerfiche (verwijder 'Volgeling heeft genomineerd', indien van toepassing).",
    reminders: ['Volgelingen niemand genomineerd', 'Volgeling heeft genomineerd'],
    ability: 'Je leert elke nacht* of een Volgeling iemand genomineerd heeft.',
  },
  undertaker: {
    name: 'Grafdelver',
    otherNightReminder:
      'Als een speler vandaag werd gedood door executie: Toon het personagefiche van die persoon.',
    reminders: ['Geëxecuteerd'],
    ability: 'Je leert elke nacht* het personage dat overdag werd gedood door executie.',
  },
  highpriestess: {
    name: 'Hogepriesteres',
    firstNightReminder: 'Wijs een speler aan.',
    otherNightReminder: 'Wijs een speler aan.',
    ability:
      'Je leert elke nacht met welke speler de Verteller denkt dat je het beste zou praten.',
  },
  villageidiot: {
    name: 'Dorpsgek',
    firstNightReminder:
      'De Dorpsgek wijst een speler aan; toon een duim naar boven als die speler goed is, of een duim naar beneden indien kwaadaardig.',
    otherNightReminder:
      'De Dorpsgek wijst een speler aan; toon een duim naar boven als die speler goed is, of een duim naar beneden indien kwaadaardig.',
    reminders: ['Dronken'],
    ability:
      "Kies elke nacht een speler: je leert hun team. [+0 tot +2 Dorpsgekken. 1 van de extra's is dronken]",
  },
  virgin: {
    name: 'Maagd',
    reminders: ['Geen eigenschap'],
    ability:
      'De 1e keer dat je genomineerd wordt, als de persoon die je nomineerde een Dorpsbewoner is, wordt die onmiddellijk geëxecuteerd.',
  },
  washerwoman: {
    name: 'Wasvrouw',
    firstNightReminder:
      'Toon het personagefiche van een Dorpsbewoner die in het spel zit. Wijs naar twee spelers, waarvan één dat personage is.',
    reminders: ['Dorpsbewoner', 'Fout'],
    ability: 'Je leert in je eerste nacht dat 1 van 2 spelers een bepaalde Dorpsbewoner is.',
  },
  acrobat: {
    name: 'Acrobaat',
    otherNightReminder:
      'Als een goede levende buur dronken of vergiftigd is, dan gaat de Acrobaat dood.',
    reminders: ['Dood'],
    ability:
      'Elke nacht*, als een van je goede levende buren dronken of vergiftigd is, dan ga je dood.',
  },
  barber: {
    name: 'Barbier',
    otherNightReminder:
      "Als de Barbier dood ging: Wek de Demon. Toon de 'Dit personage heeft jou geselecteerd' kaart, dan de Barbier. De Demon schudt ofwel 'nee', of wijst 2 spelers aan. Indien spelers gekozen werden: Wissel hun personagefiches. Wek elke speler. Toon de 'Jij bent' kaart en dan hun nieuwe personagefiche.",
    reminders: ['Haarbeurten vannacht'],
    ability:
      'Als je vandaag of vannacht dood ging, mag de Demon 2 spelers kiezen (geen andere Demon) om van personage te wisselen.',
  },
  butler: {
    firstNightReminder:
      "De Butler wijst een speler aan. Markeer die speler als 'Meester'.",
    otherNightReminder:
      "De Butler wijst een speler aan. Markeer die speler als 'Meester'.",
    reminders: ['Meester'],
    ability:
      'Je kiest elke nacht een speler (niet jezelf): morgen mag je alleen stemmen als die speler ook stemt.',
  },
  damsel: {
    name: 'Jongedame',
    firstNightReminder:
      "Wek alle Volgelingen, toon hen de 'Dit personage heeft jou geselecteerd'-kaart en het personagefiche van de Jongedame.",
    otherNightReminder:
      "Als de Jager de Jongedame koos, wek de Jongedame, toon de 'Jij bent' kaart en een Dorpsbewoner personagefiche dat niet in het spel zit.",
    reminders: ['Gok gebruikt'],
    ability:
      'Alle Volgelingen weten dat je in het spel zit. Als een Volgeling jou publiek raadt (eenmalig), dan verliest jouw team.',
  },
  drunk: {
    name: 'Dronkaard',
    remindersGlobal: ['Dronken'],
    ability:
      'Je weet niet dat je de Dronkaard bent. Je denkt dat je een bepaalde Dorpsbewoner bent, maar dat is niet zo.',
  },
  golem: {
    reminders: ['Kan niet nomineren'],
    ability:
      'Je mag maar één keer per spel nomineren. Als je dat doet, en de genomineerde is niet de Demon, dan gaat die speler dood.',
  },
  goon: {
    name: 'Handlanger',
    reminders: ['Dronken'],
    ability:
      'Elke nacht is de 1ste speler die jou kiest met hun eigenschap dronken tot zonsondergang. Je wordt deel van hun team.',
  },
  hatter: {
    name: 'Hoedenmaker',
    otherNightReminder:
      "Wek de Volgelingen en de Demon. Elke speler schudt ofwel 'nee', of wijst een andere personage van hetzelfde type als hun huidige personage aan. Als een tweede speler hetzelfde personage zou kiezen als een andere speler, schud dan 'nee' of signaleer dat ze opnieuw moeten kiezen. Verander elke speler hun personagefiche met dat van het gekozen personage.",
    reminders: ['Theekransje Vannacht'],
    ability:
      'Als je vandaag of vannacht dood ging, mogen de Volgelingen & Demon nieuwe Volgelingen & Demon personages kiezen om te zijn.',
  },
  heretic: {
    name: 'Ketter',
    ability: 'Het team dat wint, verliest & het team dat verliest, wint, zelfs als je dood bent.',
  },
  klutz: {
    name: 'Kluns',
    ability:
      'Wanneer je leert dat je dood bent, kies je publiek 1 levende speler: als die speler kwaadaardig is, verliest jouw team.',
  },
  lunatic: {
    name: 'Krankzinnige',
    firstNightReminder:
      "Als er 7 of meer spelers zijn: Toon de Krankzinnige een aantal willekeurige 'Volgelingen' gelijk aan het aantal Volgelingen in het spel. Toon 3 personagefiches van willekeurige goede personages. Als het personagefiche van de Krankzinnige een Demon is die vannacht wakker wordt: Laat de Krankzinnige de Demon acties doen. Plaats hun 'aanval'-markeerfiches. Wek de Demon. Toon de Demon zijn echte personagefiche & wijs de Krankzinnige speler aan. Als de Krankzinnige spelers aanviel: Toon de echte Demon elke gemarkeerde speler. Verwijder daarna alle 'aanval'-markeerfiches.",
    otherReminder:
      "Laat de Krankzinnige de acties van de Demon doen. Plaats hun 'aanval'-markeerfiches. Als de Krankzinnige spelers selecteerde: Wek de Demon. Toon de 'aanval'-markeerfiches en wijst de gemarkeerde spelers aan. Verwijder daarna de markeerfiches.",
    reminders: ['Aanval 1', 'Aanval 2', 'Aanval 3'],
    ability:
      'Je denkt dat je de Demon bent, maar je bent dat niet. De Demon weet wie je bent & welke speler je kiest in de nacht.',
  },
  moonchild: {
    name: 'Maankind',
    otherNightReminder:
      'Als de eigenschap van het Maankind vandaag gebruikt werd om een speler te kiezen: Als die speler goed is, gaat die dood.',
    reminders: ['Dood'],
    ability:
      'Wanneer je leert dat je dood bent, kies je publiek 1 levende speler. Als dat een goede speler is, gaat die vannacht dood.',
  },
  plaguedoctor: {
    name: 'Pestdokter',
    reminders: ['Verteller Eigenschap'],
    ability: 'Als je dood gaat, krijgt de Verteller een Volgeling-eigenschap.',
  },
  mutant: {
    ability: 'Als je verkondigt dat je een Buitenstaander bent, kan je geëxecuteerd worden.',
  },
  politician: {
    name: 'Politicus',
    ability:
      'Als je de speler bent die het meest verantwoordelijk was voor het verlies van jouw team, dan verander je van team & win je, zelfs als je dood bent.',
  },
  hermit: {
    name: 'Heremiet',
    ability: 'Je hebt alle Buitenstaander-eigenschappen. [-0 of -1 Buitenstaander]',
  },
  puzzlemaster: {
    name: 'Puzzelmeester',
    reminders: ['Dronken', 'Gok gebruikt'],
    ability:
      '1 speler is dronken, zelfs als je dood bent. Als je raadt (eenmalig) wie het is, dan kom je te weten welke speler de Demon is, maar als je mis bent krijg je foutieve informatie.',
  },
  recluse: {
    name: 'Kluizenaar',
    ability: 'Je kan registreren als kwaadaardig & als een Volgeling of een Demon, zelfs als je dood bent.',
  },
  saint: {
    name: 'Heilige',
    ability: 'Als je sterft door executie, dan verliest jouw team.',
  },
  snitch:{
    name: 'Klikspaan',
    firstNightReminder:
      'Na de Volgelingen-info, wek elke Volgeling en toon hen 3 personages die niet in het spel zitten. Dit mogen dezelfde of verschillende zijn van die getoond aan de Demon.',
    ability: 'Volgelingen leren in hun eerste nacht 3 personages die niet in het spel zitten.',
  },
  sweetheart: {
    name: 'Lieverd',
    otherNightReminder: 'Als de Lieverd dood ging: Kies een speler. Die is dronken.',
    reminders: ['Dronken'],
    ability: 'Als je dood gaat is 1 speler dronken vanaf nu.',
  },
  tinker: {
    name: 'Knutselaar',
    otherNightReminder: 'De Knutselaar kan dood gaan.',
    reminders: ['Dood'],
    ability: 'Je kan op elk moment dood gaan.',
  },
  zealot: {
    name: 'Zeloot',
    ability:
      'Als er 5 of meer spelers in leven zijn, moet je voor elke nominatie stemmen.',
  },
  ogre: {
    name: 'Oger',
    firstNightReminder:
      'De Oger wijst een speler aan (niet zichzelf) en wordt deel van hun team.',
    reminders: ['Vriend'],
    ability:
      "Kies een speler (niet jezelf) in je eerste nacht: je wordt deel van hun team (je leert niet het welke) zelfs als je dronken of vergiftigd bent.",
  },
  assassin: {
    name: 'Huurmoordenaar',
    otherNightReminder:
      "Als de eigenschap van de Huurmoordenaar nog niet gebruikt werd: De Huurmoordenaar schudt ofwel 'nee', of wijst een speler aan. Die speler gaat dood.",
    reminders: ['Dood', 'Geen eigenschap'],
    ability:
      'Je kan één keer per spel, in de nacht*, een speler kiezen: die speler gaat dood, zelfs als dat om een of andere reden niet zou kunnen.',
  },
  baron: {
    ability: 'Er zijn extra Buitenstaanders in het spel. [+2 Buitenstaanders]',
  },
  boffin: {
    name: 'Wetenschapper',
    firstNightReminder:
      'Wek de Wetenschapper en toon het personagefiche van de goede eigenschap dat de Demon heeft. Wek de Demon & toon het personagefiche van de Wetenschapper, en dan het personagefiche met de goede eigenschap die de Demon heeft.',
    ability:
      "De Demon (ook indien dronken of vergiftigd) heeft een eigenschap van een goed personage dat niet in het spel zit. Jullie weten beide het welke.",
  },
  boomdandy: {
    ability:
      'Als je wordt geëxecuteerd, sterven alle spelers, behalve 3. Één minuut later sterft de speler naar wie de meeste spelers wijzen.',
  },
  wizard: {
    name: 'Tovenaar',
    firstNightReminder:
      "Als de Tovenaar zijn wens vannacht actie vereist, voer ze uit.",
    otherNightReminder:
      "Als de Tovenaar zijn wens vannacht actie vereist, voer ze uit.",
    ability:
      'Je mag één keer per spel een wens maken. Als die wordt ingewilligd, kan er een gevolg aan vasthangen en een tip worden achtergelaten over de aard ervan.',
  },
  cerenovus: {
    firstNightReminder:
      "De Cerenovus wijst een speler aan, daarna een personage op het script. Wek die speler. Toon de 'Dit personage heeft jou geselecteerd' kaart en dan het personagefiche van de Cerenovus. Toon het geselecteerde personagefiche. Als de speler morgen niet verkondigt dat hij dat personage is, dan kan die speler geëxecuteerd worden.",
    otherNightReminder:
      "De Cerenovus wijst een speler aan, daarna een personage op het script. Wek die speler. Toon de 'Dit personage heeft jou geselecteerd' kaart en dan het personagefiche van de Cerenovus. Toon het geselecteerde personagefiche. Als de speler morgen niet verkondigt dat hij dat personage is, dan kan die speler geëxecuteerd worden.",
    reminders: ['Verkondigingsdwang'],
    ability:
      'Kies elke nacht een speler & een goed personage: die speler is gedwongen om de volgende dag te verkondigen dat personage te zijn, anders kan die speler geëxecuteerd worden.',
  },
  organgrinder: {
    name: 'Orgeldraaier',
    firstNightReminder:
      "Wek de Orgeldraaier. Als die 'ja' knikt, plaats het 'Dronken'-markeerfiche. Als die 'nee' schudt, verwijder dat fiche.",
    otherNightReminder:
      "Wek de Orgeldraaier. Als die 'ja' knikt, plaats het 'Dronken'-markeerfiche. Als die 'nee' schudt, verwijder dat fiche.",
    reminders: ['Gaat Dood', 'Dronken'],
    ability:
      'Alle spelers houden hun ogen toe wanneer er gestemd wordt en het aantal stemmen is geheim. Kies elke nacht of je dronken bent tot zonsondergang.',
  },
  devilsadvocate: {
    name: "Advocaat van de Duivel",
    firstNightReminder:
      'De Advocaat van de Duivel wijst een levende speler aan. Die speler overleeft morgen executie.',
    otherNightReminder:
      'De Advocaat van de Duivel wijst een levende speler aan (een andere als vorige nacht). Die speler overleeft morgen executie.',
    reminders: ['Overleeft executie'],
    ability:
      "Kies elke nacht een levende speler (een andere als vorige nacht): als die speler morgen geëxecuteerd wordt, dan gaat die niet dood.",
  },
  eviltwin: {
    name: 'Kwaadaardige Tweeling',
    firstNightReminder:
      'Wek de Kwaadaardige Tweeling en zijn broer/zus. Verzeker dat ze elkaar gezien hebben. Wijs de Kwaadaardige Tweeling aan. Toon hun personagefiche aan de tweelingbroer/zus speler. Wijs die speler aan. Toon hun personagefiche aan de Kwaadaardige Tweeling.',
    reminders: ['Tweelingbroer of -zus'],
    ability:
      "Jij & een speler van het andere team kennen elkaar. Als de goede speler wordt geëxecuteerd, wint het kwaadaardige team. Het goede team kan niet winnen als jullie beide leven.",
  },
  fearmonger: {
    name: 'Angstzaaier',
    firstNightReminder:
      "De Angstzaaier wijst een speler aan. Plaats het 'Angst'-markeerfiche naast die speler en kondig aan dat een nieuwe speler gekozen is door de Angstzaaier.",
    otherNightReminder:
      "De Angstzaaier wijst een speler aan. Als dat een andere is als vorige nacht, plaats het 'Angst'-markeerfiche naast die speler en kondig aan dat een nieuwe speler gekozen is door de Angstzaaier.",
    reminders: ['Angst'],
    ability:
      'Kies elke nacht een speler. Als je die speler nomineert & executeert, dan verliest hun team. Alle spelers komen te weten dat je een nieuwe speler kiest.',
  },
  goblin: {
    reminders: ['Verklaard'],
    ability:
      'Als je publiek verklaart dat je de Goblin bent wanneer je genomineerd & geëxecuteerd wordt, dan wint je team.',
  },
  godfather: {
    name: 'Peetvader',
    firstNightReminder: 'Toon de personagefiches van elke Buitenstaander die in het spel zit.',
    otherNightReminder:
      'Als er vandaag een Buitenstaander dood ging: De Peetvader wijst een speler aan. Die speler gaat dood.',
    reminders: ['Dood vandaag', 'Dood'],
    ability:
      'Je leert in je eerste nacht welke Buitenstaanders in het spel zitten. Als er 1 dood gaat vandaag, kies je 1 speler: die gaat dood. [-1 of +1 Buitenstaander]',
  },
  harpy: {
    name: 'Harpij',
    firstNightReminder:
      "De Harpij wijst 2 spelers aan. Wek de 1ste aangewezen speler, toon de 'Dit personage heeft jou geselecteerd' kaart en het personagefiche van de Harpij, wijs dan naar de 2e speler die de Harpij gekozen heeft.",
    otherNightReminder:
      "De Harpij wijst 2 spelers aan. Wek de 1ste aangewezen speler, toon de 'Dit personage heeft jou geselecteerd' kaart en het personagefiche van de Harpij, wijs dan naar de 2e speler die de Harpij gekozen heeft.",
    reminders: ['Verkondigingsdwang', '2e'],
    ability:
      'Kies elke nacht 2 spelers: morgen moet de 1ste speler verkondigen dat de 2e kwaadaardig is, of een van hen kan dood gaan.',
  },
  marionette: {
    name: 'Marionet',
    firstNightReminder:
      'Selecteer een van de goede spelers die naast de Demon zit en plaats de Marionet markeerfiche. Wek de Demon en toon de Marionet speler.',
    remindersGlobal: ['Marionet'],
    ability:
      'Je denkt dat je een goed personage bent, maar je bent dat niet. De Demon weet wie je bent. [Je zit naast de Demon]',
  },
  mastermind: {
    name: 'Meesterbrein',
    ability:
      'Als de Demon gedood wordt door executie (en het spel zou eindigen), speel nog 1 dag. Als een speler dan wordt geëxecuteerd, verliest hun team.',
  },
  mezepheles: {
    otherNightReminder:
      "Wek de 1ste goede speler die het geheime woord van de Mezepheles gebruikte en toon de 'JIJ BENT' kaart en een duim naar beneden om 'kwaadaardig' aan te geven.",
    reminders: ['Wordt kwaadaardig', 'Geen eigenschap'],
    ability:
      'Je leert in je eerste nacht een geheim woord. De 1ste goede speler die dit woord gebruikt wordt kwaadaardig vannacht.',
  },
  pithag: {
    name: 'Feeks',
    otherNightReminder:
      "De Feeks wijst een speler en een personage aan op het script. Als dit personage niet in het spel zit, wek die speler en toon de 'JIJ BENT'-kaart en het relevante personagefiche. Als het personage niet in het spel zit, dan gebeurt er niets.",
    ability:
      'Kies elke nacht* een speler & een personage waarin die speler verandert (indien niet in het spel). Als er zo een Demon wordt gemaakt, wordt er willekeurig bepaald wie er vannacht dood gaat.',
  },
  poisoner: {
    name: 'Gifmenger',
    firstNightReminder:
      'De Gifmenger wijst een speler aan. Die speler is vergiftigd.',
    otherNightReminder:
      'De eerder vergiftigde speler is niet langer vergiftigd. De Gifmenger wijst een speler aan. Die speler is vergiftigd.',
    reminders: ['Vergiftigd'],
    ability:
      'Je kiest elke nacht een speler: die is vannacht en de hele volgende dag vergiftigd.',
  },
  wraith: {
    name: 'Geest',
    firstNightReminder:
      'Wek de Geest telkens als je andere kwaadaardige spelers wakker maakt.',
    otherNightReminder:
      'Wek de Geest telkens als je andere kwaadaardige spelers wakker maakt.',
    ability:
      'Je mag kiezen om je ogen open te doen tijdens de nacht. Je wordt wakker wanneer andere kwaadaardige spelers wakker worden.',
  },
  psychopath: {
    name: 'Psychopaat',
    ability:
      'Je mag elke dag, voor de nominaties, publiek een speler kiezen: die gaat dood. Als je geëxecuteerd wordt, ga je enkel dood als je blad, steen, schaar verliest.',
  },
  scarletwoman: {
    name: 'Verleidster',
    otherNightReminder:
      "Als de Verleidster vandaag de Demon werd: Toon de 'JIJ BENT' kaart, dan het Demon-personagefiche.",
    reminders: ['Demon'],
    ability:
      'Als er nog minstens 5 spelers leven & de Demon sterft, dan word jij de nieuwe Demon. (Reizigers tellen niet mee)',
  },
  spy: {
    name: 'Spion',
    firstNightReminder:
      'Toon de Grimoire aan de Spion, zolang als gewenst.',
    otherNightReminder:
      'Toon de Grimoire aan de Spion, zolang als gewenst.',
    ability:
      'Elke nacht mag je de Grimoire bekijken. Je kan registreren als Goed & als een Dorpsbewoner of Buitenstaander, zelfs als je dood bent.',
  },
  summoner: {
    name: 'Oproeper',
    firstNightReminder:
      "Toon de 'Deze personage zitten niet in het spel' kaart. Toon 3 personagefiches van goede personage die niet in het spel zitten.",
    otherNightReminder:
      'Als het de Oproeper zijn 3e nacht is, wek de Oproeper. Die wijst een speler aan en een Demon van het script. Die speler wordt de Demon.',
    reminders: ['Nacht 1', 'Nacht 2', 'Nacht 3'],
    ability:
      'Je krijgt 3 goede personages die niet in het spel zitten om te bluffen. In je 3e nacht kies je een speler: die speler wordt een kwaadaardige Demon naar jouw keuze. [Geen Demon]',
  },
  vizier: {
    firstNightReminder: 'Verkondig de speler die de Vizier is.',
    ability:
      'Alle spelers weten dat jij de Vizier bent. Je kan overdag niet dood gaan. Als goede spelers gestemd hebben, mag je kiezen om onmiddelijk te executeren.',
  },
  widow: {
    name: 'Weduwe',
    firstNightReminder:
      "Toon de Grimoire aan de Weduwe zolang als gewenst. De Weduwe wijst een speler aan, die is vergiftigd. Wek een goede speler. Toon de 'Deze personages zitten in het spel'-kaart, en dan het personagefiche van de Weduwe.",
    reminders: ['Vergiftigd'],
    remindersGlobal: ['Gekend'],
    ability:
      'Tijdens je 1ste nacht bekijk je de Grimoire en kies je een speler: die is vergiftigd. 1 goede speler weet dat er een Weduwe in het spel zit.',
  },
  witch: {
    name: 'Heks',
    firstNightReminder:
      'De Heks wijst een speler aan. Als die speler morgen nomineert dan gaat die meteen dood.',
    otherNightReminder:
      'Als er 4 of meer spelers in leven zijn: De Heks wijst een speler aan. Als die speler morgen nomineert dan gaat die meteen dood.',
    reminders: ['Vervloekt'],
    ability:
      'Kies elke nacht een speler: als die morgen nomineert, dan gaat die dood. Als er nog maar 3 spelers in leven zijn, verlies je deze eigenschap.',
  },
  xaan: {
    firstNightReminder:
      "Voeg het 'Nacht 1'-markeerfiche van de Xaan toe aan de Grimoire. Als X gelijk is aan 1, voeg het 'X'-markeerfiche toe.",
    otherNightReminder:
      "Verander het Nacht-markeerfiche van de Xaan naar de relevante nacht. Als vannacht nacht X is, voeg het 'X'-markeerfiche toe.",
    reminders: ['Nacht 1', 'Nacht 2', 'Nacht 3', 'X'],
    ability: 'In nacht X zijn alle Dorpsbewoners vergiftigd tot en met zonsondergang. [X Buitenstaanders]',
  },
  alhadikhia: {
    otherNightReminder:
      'De Al-Hadikhia kiest 3 spelers. Verkondig de eerste speler, wek hen om ja te knikken om te blijven leven, of nee om te sterven, dood of breng de speler terug tot leven op die manier, en leg ze terug te slapen voor de volgende speler te verkondigen. Als alle 3 spelers hierna leven, dan sterven ze alle 3.',
    reminders: ['1', '2', '3', 'Kies dood', 'Kies leven'],
    ability:
      'Kies elke nacht* 3 spelers (alle spelers leren wie): elke speler kiest in het geheim om te leven of dood te gaan, maar als alle spelers kiezen om te leven, gaan ze allemaal dood.',
  },
  yaggababble: {
    name: 'Yaggababble',
    firstNightReminder: 'Toon de Yaggababble de geheime uitspraak.',
    otherNightReminder:
      'Kies een aantal spelers kleiner of gelijk aan het aantal keer dat de Yaggababble zijn geheime uitspraak vandaag gebruikte, die spelers gaan dood.',
    reminders: ['Dood', 'Dood', 'Dood'],
    ability:
      'Je leert in je eerste nacht een geheime uitspraak. Voor elke keer je deze publiek gebruikte vandaag, kan een speler dood gaan.',
  },
  fanggu: {
    otherNightReminder:
      "De Fang Gu wijst een speler aan. Die speler gaat dood. Of, als die speler een Buitenstaander was en er is geen andere Fang Gu in het spel: De Fang Gu sterft in de plaats van de gekozen speler. De gekozen speler is nu een kwaadaardige Fang Gu. Wek de nieuwe Fang Gu. Toon de 'Jij bent' kaart, en dan het personagefiche van de Fang Gu. Toon de 'Jij bent' kaart, dan een duim naar beneden om 'kwaadaardig' aan te geven.",
    reminders: ['Dood', 'Eenmalig'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. De 1ste Buitenstaander die zo dood gaat wordt een kwaadaardige Fang Gu & jij sterft in de plaats. [+1 Buitenstaander]',
  },
  imp: {
    otherNightReminder:
      "De Imp wijst een speler aan. Die speler gaat dood. Als de Imp zichzelf kiest: Vervang het personage van 1 levende Volgeling met een extra Imp personagefiche. Toon de 'JIJ BENT' kaart, dan het personagefiche van de Imp.",
    reminders: ['Dood'],
    ability:
      'Je kiest elke nacht* een speler, die gaat dood. Als je jezelf op die manier doodt wordt een Volgeling de nieuwe Imp.',
  },
  kazali: {
    firstNightReminder:
      "De Kazali wijst een speler aan en een Volgeling op het script. Dit gebeurt zo vaak als er Volgelingen in het spel moeten zitten. Verander deze spelers hun personagefiches met die van de gekozen Volgelingen. Wek elke gekozen speler, toon hen de 'Jij bent' kaart, de personagefiche van de Volgeling die ze zijn geworden, en een duim naar beneden om aan te geven dat ze 'kwaadaardig' zijn.",
    otherNightReminder: 'De Kazali wijst een speler aan. Die speler gaat dood.',
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. [Jij kiest welke spelers welke Volgeling zijn. -? to +? Buitenstaanders]',
  },
  legion: {
    name: 'Legion',
    otherNightReminder: 'Kies een speler, die speler gaat dood.',
    reminders: ['Dood', 'Gaat Dood'],
    ability:
      'Elke nacht* kan een speler dood gaan. Executies falen als alleen kwaadaardige spelers stemmen. Je registreert ook als een Volgeling. [Meerderheid van spelers is Legion]',
  },
  leviathan: {
    firstNightReminder:
      "Plaats het 'Dag 1'-markeerfiche van de Leviathan. Kondig aan dat de Leviathan in het spel zit, dit is Dag 1.'",
    otherNightReminder: 'Verander het markeerfiche van de Leviathan voor de volgende dag.',
    reminders: [
      'Dag 1',
      'Dag 2',
      'Dag 3',
      'Dag 4',
      'Dag 5',
      'Goede speler geëxecuteerd',
    ],
    ability:
      'Als meer dan 1 goede speler is geëxecuteerd, dan win je. Alle spelers weten dat je in het spel zit. Na dag 5 wint het kwaadaardige team.',
  },
  lilmonsta: {
    firstNightReminder:
      "Maak alle Volgelingen samen wakker en laat ze door te wijzen stemmen op wie Lil' Monsta moet babysitten.",
    otherNightReminder:
      "Maak alle Volgelingen samen wakker en laat ze door te wijzen stemmen op wie Lil' Monsta moet babysitten. Kies een speler, die speler gaat dood.",
    remindersGlobal: ['Is de Demon', 'Dood'],
    ability:
      "Elke nacht kiezen de Volgelingen wie op Lil' Monsta moet babysitten en de Demon is. Een speler gaat elke nacht* dood. [+1 Volgeling]",
  },
  lleech: {
    firstNightReminder:
      "De Lleech wijst een speler aan. Plaats een 'Vergiftigd' markeerfiche bij die speler.",
    otherNightReminder: "De Lleech wijst een speler aan. Die gaat dood.",
    reminders: ['Dood', 'Vergiftigd'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. Je kiest in je eerste nacht een levende speler: die is vergiftigd - je gaat dood, enkel en alleen als die speler dood gaat.',
  },
  nodashii: {
    otherNightReminder: 'De No Dashii wijst een speler aan. Die speler gaat dood.',
    reminders: ['Dood', 'Vergiftigd'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. Je 2 naburige Dorpsbewoners zijn vergiftigd.',
  },
  ojo: {
    otherNightReminder:
      'De Ojo wijst een speler aan op het script. Als dat personage in het spel zit, dan gaat die speler dood. Zo niet, dan kiest de Verteller wie in de plaats dood gaat.',
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een personage: die speler gaat dood. Als dat personage niet in het spel zit kiest de Verteller wie er dood gaat.',
  },
  lordoftyphon: {
    firstNightReminder:
      "Wek de speler aan beide kanten van de Demon. Toon hen de 'Jij bent' kaart, het personagefiche van de Volgeling die ze nu zijn, en een duim naar beneden om aan te geven dat ze 'kwaadaardig' zijn.",
    otherNightReminder:
      'De Lord of Typhon wijst een speler aan. Die speler gaat dood.',
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. [Kwaadaardige personages zitten naast elkaar. Jij zit in het midden. +1 Volgeling. -? to +? Buitenstaanders]',
  },
  po: {
    otherNightReminder:
      "Als de Po vorige nacht niemand koos: De Po wijst 3 spelers aan. In het andere geval: De Po schudt ofwel 'nee', of wijst een speler aan. Gekozen spelers gaan dood.",
    reminders: ['Dood', '3 aanvallen'],
    ability:
      'Je mag elke nacht* een speler kiezen, die gaat dood. Als je laatste keuze was om niemand te doden, kies je vannacht 3 spelers.',
  },
  pukka: {
    firstNightReminder:
      'De Pukka wijst een speler aan. Die speler is vergiftigd.',
    otherNightReminder:
      'De Pukka wijst een speler aan. Die speler is vergiftigd. De vorige vergiftigde speler gaat dood.',
    reminders: ['Vergiftigd', 'Dood'],
    ability:
      'Kies elke nacht een speler: die speler is vergiftigd. De vorige vergiftigde speler gaat dood en is niet meer vergiftigd.',
  },
  riot: {
    name: 'Riot',
    ability:
      'Genomineerden gaan dood, maar mogen meteen opnieuw nomineren (op dag 3, zijn ze verplicht). Na dag 3 wint het kwaadaardige team. [Alle Volgelingen zijn Riot]',
  },
  shabaloth: {
    otherNightReminder:
      'Een speler die de Shabaloth vorige nacht koos kan terug tot leven komen. De Shabaloth wijst 2 spelers aan. Die spelers gaan dood.',
    reminders: ['Dood', 'Levend'],
    ability:
      'Kies elke nacht* 2 spelers: die gaan dood. Een dode speler die je vorige nacht koos kan terug tot leven komen.',
  },
  vigormortis: {
    otherNightReminder:
      'De Vigormortis wijst een speler aan. Die speler gaat dood. Volgelingen die zo dood gaan behouden hun eigenschap en 1 van hun naburige Dorpsbewoners wordt vergiftigd.',
    reminders: ['Dood', 'Heeft eigenschap', 'Vergiftigd'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. Volgelingen die je doodt behouden hun eigenschap en vergiftigen 1 naburige Dorpsbewoner. [-1 Buitenstaander]',
  },
  vortox: {
    otherNightReminder: 'De Vortox wijst een speler aan. Die speler gaat dood.',
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een speler: die gaat dood. Eigenschappen van Dorpsbewoners leveren altijd foutieve informatie op. Als niemand wordt geëxecuteerd overdag, wint het kwaadaardige team.',
  },
  zombuul: {
    otherNightReminder:
      'Als niemand dood ging vandaag: De Zombuul wijst een speler aan. Die speler gaat dood.',
    reminders: ['Dood vandaag', 'Dood'],
    ability:
      'Elke nacht*, als niemand dood ging vandaag, kies je een speler: die gaat dood. De 1ste keer dat je dood gaat, blijf je in leven maar registreer je als dood.',
  },
  apprentice: {
    name: 'Leerling',
    firstNightReminder:
      "Toon de Leerling de 'JIJ BENT' kaart en dan het personagefiche van een Dorpsbewoner of van een Volgeling. Vervang in de Grimoire het fiche van de Leerling met dat personagefiche en markeer het met het 'Is de leerling'-fiche.",
    reminders: ['Is de Leerling'],
    ability:
      'In je 1ste nacht krijg je de eigenschap van een Dorpsbewoner (als je goed bent), of die van een Volgeling (als je kwaadaardig bent).',
  },
  barista: {
    firstNightReminder:
      'Kies een speler. Wek die speler en vertel welke eigenschap van de Barista van toepassing is. Behandel de speler naar gelang (nuchter/gezond/correcte info of activeer hun eigenschap 2 keer).',
    otherNightReminder:
      'Kies een speler. Wek die speler en vertel welke eigenschap van de Barista van toepassing is. Behandel de speler naar gelang (nuchter/gezond/correcte info of activeer hun eigenschap 2 keer).',
    reminders: ['Nuchter & Gezond', '2x eigenschap'],
    ability:
      'Elke nacht, tot zonsondergang: 1) een speler wordt nuchter, gezond en ontvangt correcte informatie, of 2) hun eigenschap werkt 2 keer. Die speler leert welke van de twee.',
  },
  beggar: {
    name: 'Bedelaar',
    ability:
      'Je moet een stemfiche gebruiken om te stemmen. Dode spelers mogen hun fiche aan jou geven. Als ze dat doen, kom je hun team te weten. Je bent nuchter en gezond.',
  },
  bishop: {
    name: 'Bisschop',
    reminders: ['Nomineer goed', 'Nomineer kwaad'],
    ability:
      'Enkel de Verteller kan nomineren. Elk dag moet minstens 1 speler van elk team genomineerd worden.',
  },
  bonecollector: {
    name: 'Bottenverzamelaar',
    otherNightReminder:
      "The Bottenverzamelaar schudt ofwel 'nee' of wijst een dode speler aan. Als er een dode speler wordt aangewezen, plaats het 'Heeft eigenschap'-markeerfiche bij het personagefiche van de gekozen speler. (Het is mogelijk dat de speler gewekt moet worden vannacht om de eigenschap te gebruiken.)",
    reminders: ['Geen eigenschap', 'Heeft eigenschap'],
    ability:
      'Kies één keer per spel, in de nacht, een dode speler: die krijgt zijn/haar eigenschap terug tot zonsondergang.',
  },
  bureaucrat: {
    name: 'Bureaucraat',
    firstNightReminder:
      "De Bureaucraat wijst een speler aan. Leg het 3 stemmen-herinneringsfiche van de Bureaucraat bij het personagefiche van de gekozen speler.",
    otherNightReminder:
      "De Bureaucraat wijst een speler aan. Leg het 3 stemmen-herinneringsfiche van de Bureaucraat bij het personagefiche van de gekozen speler.",
    reminders: ['3 stemmen'],
    ability:
      'Je kiest elke nacht een speler (niet jezelf): hun stem telt de volgende dag als 3 stemmen.',
  },
  butcher: {
    name: 'Slager',
    ability: 'Je mag elke dag, na de 1ste executie, opnieuw iemand nomineren.',
  },
  cacklejack: {
    otherNightReminder:
      "Vervang het personagefiche van een speler (buiten die gekozen door de Cacklejack vandaag) met een ander personagefiche. Wek die speler en toon de 'Jij bent' kaart en hun nieuwe personagefiche.",
    reminders: ['Ik Niet'],
    ability:
      'Kies elke dag een speler: een andere speler verandert vannacht van personage.',
  },
  deviant: {
    ability: 'Als je grappig was vandaag kan je niet verbannen worden.',
  },
  gangster: {
    ability:
      'Je mag één keer per dag er voor kiezen om een levende buur te doden, als je andere levende buur daarmee akkoord gaat.',
  },
  gnome: {
    name: 'Gnoom',
    reminders: ['Amigo'],
    ability:
      'Alle spelers leren een speler die in jouw team zit. Je mag iedereen die deze speler nomineert doden.',
  },
  gunslinger: {
    name: 'Scherpschutter',
    ability:
      'Elke dag, nadat de eerste stemronde is geteld, mag je een speler kiezen die gestemd heeft: die speler sterft.',
  },
  harlot: {
    name: 'Prostituee',
    otherNightReminder:
      "De Prostituee wijst een speler aan en gaat terug slapen. Wek daarna de gekozen speler en toon de 'Dit personage heeft jou geselecteerd' kaart, gevolgd door het personagefiche van de Prostituee. De speler knikt ofwel 'ja' of schudt van 'nee'. Zo ja, wek dan opnieuw de Prostituee en toon het personagefiche van de gekozen speler. Daarna mag de Verteller beslissen of beide speler dood gaan.",
    reminders: ['Dood'],
    ability:
      'Kies elke nacht* een levende speler: als die akkoord gaat, kom je hun personage te weten, maar jullie kunnen beide dood gaan',
  },
  judge: {
    name: 'Rechter',
    reminders: ['Geen eigenschap'],
    ability:
      'Je mag één keer per spel, als een andere speler genomineerd wordt, kiezen om de huidige executie te laten slagen of te laten mislukken.',
  },
  matron: {
    name: 'Gouvernante',
    ability:
      'Je mag elke dag tot 3 keer toe 2 spelers van plaats doen wisselen. Spelers mogen hun stoel niet verlaten om privé-gesprekken te voeren.',
  },
  scapegoat: {
    name: 'Zondebok',
    ability:
      'Als een speler van jouw team wordt geëxecuteerd, kan jij in hun plaats geëxecuteerd worden ',
  },
  thief: {
    name: 'Dief',
    firstNightReminder:
      "De Dief wijst een speler aan. Leg het 'Negatieve stem' herinneringsfiche van de Dief bij het personagefiche van de gekozen speler.",
    otherNightReminder:
      "De Dief wijst een speler aan. Leg het 'Negatieve stem' herinneringsfiche van de Dief bij het personagefiche van de gekozen speler.",
    reminders: ['Negatieve stem'],
    ability:
      'Je kiest elke nacht een speler (niet jezelf): hun stem telt negatief de volgende dag.',
  },
  voudon: {
    ability:
      "Enkel jij en de dode spelers kunnen stemmen. Die speler hebben geen stemfiche nodig. Een meerderheid van 50% is niet vereist.",
  },
  tor: {
    otherNightReminder:
      "Als een speler dood gaat in de nacht, maak ze wakker en toon hen de 'Jij bent' kaart, hun personagefiche, en een duim naar beneden of naar boven om hun team aan te duiden.",
    ability:
      "Spelers kennen hun personage en team niet. Ze leren dit wanneer ze dood gaan.",
  },
  bigwig: {
    ability:
      'Iedereen die genomineerd wordt kiest een speler: totdat er gestemd wordt, mag enkel die speler praten & die moet verkondigen dat de genomineerde goed is, anders kan die dood gaan.',
  },
  bootlegger: {
    ability: 'Dit script heeft zelfgemaakte personages of regels.',
  },
  gardener: {
    name: 'Tuinman',
    ability: "De Verteller kiest de personages voor 1 of meer spelers.",
  },
  stormcatcher: {
    name: "Stormjager",
    firstNightReminder:
      "In het begin van de nacht, verkondig het personage dat de stormjager verkiest. Als dat personage in het spel zit, markeer die speler als 'Beschermd'. Wek elke kwaadaardige speler om beurt. Als het gekozen personage in het spel zit, toon hen het personagefiche en wijs de gemarkeerde speler aan. Zo niet, toon hen de 'Deze personages zitten niet in het spel' kaart en het gekozen personagefiche.",
    ability:
      'Verkondig een goed personage. Als dat in het spel zit, kan die enkel dood gaan door executie, maar kwaadaardige spelers leren welke speler dat is.',
  },
  zenomancer: {
    ability:
      '1 of meer spelers hebben een doelstelling. Als die wordt volbracht, dan leert die speler een stuk correcte informatie.',
  },
  hindu: {
    name: 'Hindoe',
    ability:
      'De eerste 4 spelers die dood gaan worden onmiddelijk gereïncarneerd als Reizigers van hetzelfde team.',
  },
  pope: {
    name: 'Paus',
    ability: 'Er zijn goede personages die meerdere keren in het spel zitten. Dat kunnen ook blufpersonages zijn',
  },
  doomsayer: {
    name: 'Doemdenker',
    ability:
      'Zolang er 4 of meer spelers leven, mag elke levende speler (één keer per spel) publiek kiezen dat een speler van hun team dood gaat.',
  },
  angel: {
    id: 'angel',
    name: 'Engel',
    reminders: ['Beschermd', 'Iets Slecht'],
    ability:
      'Er kan iets slecht gebeuren met de speler die het meest verantwoordelijk is voor de dood van een nieuwe speler.',
  },
  buddhist: {
    name: 'Boeddhist',
    ability:
      'Tijdens elke eerste 2 minuten van dag, mogen ervaren spelers niet praten.',
  },
  hellslibrarian: {
    reminders: ['Iets Slecht'],
    name: "Bibliothecaris van de Hel",
    ability:
      'Er kan iets slecht gebeuren met degene die praat als de Verteller om stilte heeft gevraagd.',
  },
  revolutionary: {
    reminders: ['Gebruikt'],
    name: 'Revolutionair',
    ability:
      "2 spelers die naast elkaar zitten worden verkondigd in hetzelfde team te zitten. Één keer per spel, registreert een van hen foutief.",
  },
  fiddler: {
    name: 'Violist',
    ability:
      'De Demon kiest één keer per spel in het geheim een speler van het andere team: alle spelers kiezen welke van deze 2 spelers winnen.',
  },
  toymaker: {
    otherNightReminder:
      'Als vannacht een Demon het spel kan beëindigen, en de Demon is gemarkeerd met het “Vannacht: Geen Aanval”-markeerfiche dan wordt de Demon niet wakker vannacht.',
    reminders: ['Vannacht: Geen Aanval'],
    name: 'Speelgoedmaker',
    ability:
      'De Demon mag kiezen om niet aan te vallen & moet die minstens een keer doen per spel. Kwaadaardige spelers krijgen startinformatie zoals normaal.',
  },
  fibbin: {
    reminders: ['Gebruikt'],
    name: 'Leugenaar',
    ability: 'Één keer per spel kan 1 goede speler foutieve informatie krijgen.',
  },
  duchess: {
    otherNightReminder:
      'Wek elke speler gemarkeerd met “Bezoeker” of “Foutieve info” apart. Toon hen het personagefiche van de Hertogin en het aantal vingers (1, 2, 3) om het aantal kwaadaardige spelers gemarkeerd met “Bezoeker” aan te geven, of, als je de speler “Foutieve info” wakker maakt, toon hen een willekeurig aantal.',
    reminders: ['Bezoeker', 'Foutieve info'],
    name: 'Hertogin',
    ability:
      'Elke dag mogen 3 spelers jou bezoeken. In de nacht* leert elke bezoeker hoeveel bezoekers kwaadaardig zijn, maar 1 bezoeker krijgt foutieve informatie.',
  },
  sentinel: {
    name: 'Schildwacht',
    ability: 'Er kan 1 extra of 1 Buitenstaander minder in het spel zitten.',
  },
  spiritofivory: {
    reminders: ['Geen extra kwaadaardige speler'],
    ability: "Er kan niet meer dan 1 extra kwaadaardige speler zijn.",
  },
  djinn: {
    ability: "Gebruik de speciale regel van de Djinn. Alle spelers kennen deze.",
  },
  deusexfiasco: {
    ability:
      'De Verteller maakt minstens één keer per spel een fout, corrigeer die fout en geef het publiek toe.',
  },
  ferryman: {
    name: 'Veerman',
    ability: 'Op de laatste dag krijgen alle dode spelers hun stemfiche terug.',
  },
}

export default roleTranslationsNl
