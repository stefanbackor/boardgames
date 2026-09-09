import { Jinx } from '@/types/jinx'

/**
 * Dutch translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array (same order, same pairs) but
 * only the `reason` texts are localized. Role ids stay the same as in the
 * base data.
 */

export const jinxesNl: Array<Jinx> = [
  {
    id: 'alchemist',
    hatred: [
      {
        id: 'boffin',
        reason:
          'Als de Alchemist de eigenschap van de Wetenschapper heeft, leert de Alchemist niet welke eigenschap de Demon heeft.',
      },
      {
        id: 'marionette',
        reason:
          'Een Alchemist-Marionet heeft geen Marionet-eigenschap en de Marionet is in het spel.',
      },
      {
        id: 'mastermind',
        reason:
          'Een Alchemist-Meesterbrein heeft geen Meesterbrein-eigenschap en het Meesterbrein is niet in het spel.',
      },
      {
        id: 'organgrinder',
        reason:
          'Als de Alchemist de eigenschap van de Orgeldraaier heeft, is de Orgeldraaier in het spel. Als beiden nuchter zijn, zijn beiden dronken.',
      },
      {
        id: 'spy',
        reason:
          'Een Alchemist-Spion heeft geen Spion-eigenschap en een Spion is in het spel. Na elke executie mag een levende Alchemist-Spion publiekelijk een levende speler aanwijzen als de Spion. Als dat juist is, moet de Demon vannacht de Spion kiezen.',
      },
      {
        id: 'summoner',
        reason:
          'De Alchemist-Oproeper krijgt geen bluffs en kiest welke Demon, maar niet welke speler. Als die eerder sterft, wint kwaad. [Geen Demon]',
      },
      {
        id: 'widow',
        reason:
          'Een Alchemist-Weduwe heeft geen Weduwe-eigenschap en een Weduwe is in het spel. Na elke executie mag een levende Alchemist-Weduwe publiekelijk een levende speler aanwijzen als de Weduwe. Als dat juist is, moet de Demon vannacht de Weduwe kiezen.',
      },
      {
        id: 'wraith',
        reason:
          'Een Alchemist-Geest heeft geen Geest-eigenschap en een Geest is in het spel. Na elke executie mag een levende Alchemist-Geest publiekelijk een levende speler aanwijzen als de Geest. Als dat juist is, moet de Demon vannacht de Geest kiezen.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Als de Al-Hadikhia sterft door executie en het Meesterbrein leeft, kiest de Al-Hadikhia vannacht 3 goede spelers: als alle 3 kiezen om te leven, wint kwaad. Anders wint goed.',
      },
      {
        id: 'princess',
        reason:
          'Als de Prinses op haar 1e dag een speler nomineerde die werd geëxecuteerd, sterft er vannacht niemand door de Al-Hadikhia.',
      },
    ],
  },
  {
    id: 'boffin',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Als de Demon de eigenschap van de Sekteleider heeft, kan die door deze eigenschap niet goed worden.',
      },
      {
        id: 'drunk',
        reason: 'De Demon kan de eigenschap van de Dronkaard niet hebben.',
      },
      {
        id: 'goon',
        reason:
          'Als de Demon de eigenschap van de Handlanger heeft, kan die door deze eigenschap niet goed worden.',
      },
      {
        id: 'heretic',
        reason: 'De Demon kan de eigenschap van de Ketter niet hebben.',
      },
      {
        id: 'ogre',
        reason: 'De Demon kan de eigenschap van de Oger niet hebben.',
      },
      {
        id: 'politician',
        reason: 'De Demon kan de eigenschap van de Politicus niet hebben.',
      },
      {
        id: 'villageidiot',
        reason:
          'Als er een extra fiche is, mag de Wetenschapper de Demon de eigenschap van de Dorpsgek geven.',
      },
    ],
  },
  {
    id: 'bountyhunter',
    hatred: [
      {
        id: 'kazali',
        reason:
          'Als de Kazali de Premiejager in een Volgeling verandert, wordt er geen kwaadaardige Dorpsbewoner gemaakt.',
      },
      {
        id: 'philosopher',
        reason:
          'Als de Filosoof de eigenschap van de Premiejager krijgt, kan een Dorpsbewoner kwaadaardig worden.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'organgrinder',
        reason:
          'Als de Orgeldraaier zorgt voor stemmen met gesloten ogen, mag de Butler zijn hand opsteken om te stemmen, maar zijn stem telt alleen als zijn meester ook stemde.',
      },
    ],
  },
  {
    id: 'cannibal',
    hatred: [
      {
        id: 'butler',
        reason:
          'Als de Kannibaal de eigenschap van de Butler krijgt, komt de Kannibaal dit te weten.',
      },
      {
        id: 'juggler',
        reason:
          'Als de Jongleur op zijn eerste dag gokt en sterft door executie, leert de levende Kannibaal vannacht hoeveel gokken van de Jongleur juist waren.',
      },
      {
        id: 'princess',
        reason:
          'Als de Kannibaal vandaag de Prinses nomineerde die werd geëxecuteerd en stierf, doodt de Demon vannacht niet.',
      },
      {
        id: 'zealot',
        reason:
          'Als de Kannibaal de eigenschap van de Zeloot krijgt, komt de Kannibaal dit te weten.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'De Cerenovus mag er ook voor kiezen om een speler te dwingen te verkondigen de Goblin te zijn.',
      },
    ],
  },
  {
    id: 'heretic',
    hatred: [
      {
        id: 'baron',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'godfather',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'lleech',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'pithag',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'spy',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'widow',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Als Legion wordt gemaakt, worden alle kwaadaardige spelers Legion. Als Legion in het spel is, weet de Ingenieur dit vanaf het begin, maar heeft die geen eigenschap.',
      },
      {
        id: 'hatter',
        reason:
          'Als Legion wordt gemaakt, worden alle kwaadaardige spelers Legion. Als Legion in het spel is, heeft de Hoedenmaker geen eigenschap.',
      },
      {
        id: 'minstrel',
        reason:
          'Als Legion vandaag stierf door executie, houdt Legion de eigenschap, maar de Minstreel kan te weten komen dat die Legion is.',
      },
      {
        id: 'politician',
        reason: 'De Politicus kan voor Legion als kwaadaardig gelden.',
      },
      {
        id: 'preacher',
        reason:
          'Als de Preker Legion kiest, houdt Legion de eigenschap, maar de Preker kan te weten komen dat het Legion is.',
      },
      {
        id: 'summoner',
        reason:
          'Als Legion wordt opgeroepen, worden alle kwaadaardige spelers Legion.',
      },
      {
        id: 'zealot',
        reason: 'De Zeloot kan voor Legion als kwaadaardig gelden.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Elke nacht* kiest de Leviathan een levende goede speler (anders dan de vorige nachten): een gekozen Banshee sterft en krijgt haar eigenschap.',
      },
      {
        id: 'exorcist',
        reason:
          'Als de Leviathan de door de Exorcist gekozen speler nomineert en die wordt geëxecuteerd, wint goed.',
      },
      {
        id: 'farmer',
        reason:
          'Elke nacht* kiest de Leviathan een levende goede speler (anders dan de vorige nachten): een gekozen Boer gebruikt zijn eigenschap, maar sterft niet.',
      },
      {
        id: 'grandmother',
        reason:
          'Als de Leviathan in het spel is en het kleinkind sterft door executie, wint kwaad.',
      },
      {
        id: 'hatter',
        reason: 'De Leviathan kan na dag 5 niet meer in het spel komen.',
      },
      {
        id: 'innkeeper',
        reason:
          'Als de Leviathan een door de Herbergier beschermde speler nomineert en die wordt geëxecuteerd, wint goed.',
      },
      {
        id: 'king',
        reason:
          'Als de Leviathan in het spel is en minstens 1 speler dood is, leert de Koning elke nacht een levend personage.',
      },
      {
        id: 'mayor',
        reason:
          'Als de Leviathan en de Burgemeester op dag 5 leven en er geen executie is, wint goed.',
      },
      {
        id: 'monk',
        reason:
          'Als de Leviathan de door de Monnik beschermde speler nomineert en die wordt geëxecuteerd, wint goed.',
      },
      {
        id: 'pithag',
        reason: 'De Leviathan kan na dag 5 niet meer in het spel komen.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Elke nacht* kiest de Leviathan een levende speler (anders dan de vorige nachten): een gekozen Raafwachter gebruikt zijn eigenschap, maar sterft niet.',
      },
      {
        id: 'sage',
        reason:
          'Elke nacht* kiest de Leviathan een levende goede speler (anders dan de vorige nachten): een gekozen Wijsgeer gebruikt zijn eigenschap, maar sterft niet.',
      },
      {
        id: 'soldier',
        reason:
          'Als de Leviathan de Soldaat nomineert en die wordt geëxecuteerd, wint goed.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'hatter',
        reason:
          "Als de Hoedenmaker sterft en de Demon Lil' Monsta kiest, kiest die ook een Volgeling om te worden.",
      },
      {
        id: 'magician',
        reason:
          "Als de Goochelaar leeft, kiest de Verteller welke Volgeling Lil' Monsta bewaakt.",
      },
      {
        id: 'poppygrower',
        reason:
          "Als Lil' Monsta en de Opiumkweker leven, worden de Volgelingen één voor één wakker, tot een van hen het Lil' Monsta-fiche neemt.",
      },
      {
        id: 'psychopath',
        reason:
          "Als de Psychopaat Lil' Monsta bewaakt, sterft die wanneer die wordt geëxecuteerd.",
      },
      {
        id: 'scarletwoman',
        reason:
          "Als Lil' Monsta sterft terwijl er 5 of meer spelers leven, bewaakt de Verleidster Lil' Monsta de rest van het spel.",
      },
      {
        id: 'vizier',
        reason:
          "Als de Vizier Lil' Monsta bewaakt, sterft die wanneer die wordt geëxecuteerd.",
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Als het Meesterbrein leeft en de gastheer van de Lleech sterft door executie, leeft de Lleech verder, maar verliest zijn eigenschap.',
      },
      {
        id: 'slayer',
        reason:
          'Als de Demonenjager de gastheer van de Lleech doodt, sterft de gastheer.',
      },
    ],
  },
  {
    id: 'magician',
    hatred: [
      {
        id: 'legion',
        reason:
          'Als de Goochelaar in het spel is, wordt Legion tijdens de Demon-info in aparte groepen wakker. Elke groep leert welke spelers goed zijn, maar leert de Goochelaar niet.',
      },
      {
        id: 'marionette',
        reason:
          'Als de Goochelaar leeft, weet de Demon niet welke buur de Marionet is.',
      },
      {
        id: 'spy',
        reason:
          'Als de Spion de Grimoire bekijkt, dan worden de fiches van de Demon en de Goochelaar verwijderd.',
      },
      {
        id: 'vizier',
        reason:
          'Als de Vizier in het spel is, heeft de Goochelaar geen eigenschap, maar is die immuun voor de eigenschap van de Vizier.',
      },
      {
        id: 'widow',
        reason:
          'Als de Weduwe de Grimoire bekijkt, dan worden de fiches van de Demon en de Goochelaar verwijderd.',
      },
      {
        id: 'wraith',
        reason:
          'Na elke executie mag de levende Goochelaar publiekelijk een levende speler aanwijzen als de Geest. Als dat juist is, moet de Demon vannacht de Geest kiezen.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'balloonist',
        reason:
          'Als de Marionet denkt dat die de Ballonvaarder is, is er tijdens de opzet mogelijk een Buitenstaander toegevoegd.',
      },
      {
        id: 'huntsman',
        reason:
          'Als de Marionet denkt dat die de Jager is, is tijdens de opzet de Jongedame toegevoegd.',
      },
      {
        id: 'kazali',
        reason:
          'Als er een Marionet in het spel zou zijn, komt die na de Demon in het spel en moet die als buur van de Demon beginnen.',
      },
      {
        id: 'lilmonsta',
        reason:
          'Als er een Marionet in het spel zou zijn, komt die na de Demon in het spel en moet die als buur van de Demon beginnen.',
      },
      {
        id: 'summoner',
        reason:
          'Als er een Marionet in het spel zou zijn, komt die na de Demon in het spel en moet die als buur van de Demon beginnen.',
      },
    ],
  },
  {
    id: 'mastermind',
    hatred: [
      {
        id: 'vigormortis',
        reason:
          'Een Meesterbrein dat zijn eigenschap heeft, houdt die als de Vigormortis sterft.',
      },
    ],
  },
  {
    id: 'mathematician',
    hatred: [
      {
        id: 'chambermaid',
        reason:
          'De Kamermeid kan vaststellen of de Wiskundige vannacht wakker wordt.',
      },
      {
        id: 'drunk',
        reason:
          'De Wiskundige leert of de eigenschap van de Dronkaard foutieve info gaf of niet goed werkte.',
      },
      {
        id: 'lunatic',
        reason:
          'De Wiskundige leert of de Krankzinnige een andere speler aanviel dan de echte Demon.',
      },
      {
        id: 'marionette',
        reason:
          'De Wiskundige leert of de eigenschap van de Marionet foutieve info gaf of niet goed werkte.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Als de Feeks een kwaadaardige speler in de Sekteleider verandert, kan die door zijn eigen eigenschap niet goed worden.',
      },
      {
        id: 'damsel',
        reason:
          'Als een Feeks een Jongedame maakt, dan kiest de Verteller welke speler dat wordt.',
      },
      {
        id: 'goon',
        reason:
          'Als de Feeks een kwaadaardige speler in de Handlanger verandert, kan die door zijn eigen eigenschap niet goed worden.',
      },
      {
        id: 'ogre',
        reason:
          'Als de Feeks een kwaadaardige speler in de Oger verandert, kan die door zijn eigen eigenschap niet goed worden.',
      },
      {
        id: 'politician',
        reason:
          'Als de Feeks een kwaadaardige speler in de Politicus verandert, kan die door zijn eigen eigenschap niet goed worden.',
      },
      {
        id: 'villageidiot',
        reason:
          'Als er een extra fiche is, mag de Feeks een extra Dorpsgek maken. In dat geval kan veranderen welke Dorpsgek dronken is.',
      },
    ],
  },
  {
    id: 'plaguedoctor',
    hatred: [
      {
        id: 'baron',
        reason:
          'Als de Verteller de eigenschap van de Baron zou krijgen, worden tot twee spelers Buitenstaanders.',
      },
      {
        id: 'boomdandy',
        reason:
          'Als de Verteller de eigenschap van de Boomdandy zou krijgen, wordt een speler de Boomdandy.',
      },
      {
        id: 'eviltwin',
        reason:
          'Als de Verteller de eigenschap van de Kwaadaardige Tweeling zou krijgen, wordt een speler de Kwaadaardige Tweeling.',
      },
      {
        id: 'fearmonger',
        reason:
          'Als de Verteller de eigenschap van de Angstzaaier zou krijgen, krijgt een Volgeling die en komt dit te weten.',
      },
      {
        id: 'goblin',
        reason:
          'Als de Verteller de eigenschap van de Goblin zou krijgen, krijgt een Volgeling die en komt dit te weten.',
      },
      {
        id: 'marionette',
        reason:
          'Als de Verteller de eigenschap van de Marionet zou krijgen, wordt een van de goede buren van de Demon de Marionet.',
      },
      {
        id: 'scarletwoman',
        reason:
          'Als de Verteller de eigenschap van de Verleidster zou krijgen, krijgt een Volgeling die en komt dit te weten.',
      },
      {
        id: 'spy',
        reason:
          'Als de Verteller de eigenschap van de Spion zou krijgen, krijgt een Volgeling die en komt dit te weten.',
      },
      {
        id: 'wraith',
        reason:
          'Als de Verteller de eigenschap van de Geest zou krijgen, krijgt een Volgeling die en komt dit te weten.',
      },
    ],
  },
  {
    id: 'recluse',
    hatred: [
      {
        id: 'ogre',
        reason:
          'Als de Kluizenaar voor de Oger als kwaadaardig geldt, leert de Oger dat hij kwaadaardig is.',
      },
      {
        id: 'sage',
        reason: 'De Kluizenaar kan voor de Wijsgeer als de Demon gelden.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'atheist',
        reason:
          'Als tijdens een Riot de Verteller wordt genomineerd, stemmen de spelers. Als die “bijna dood” is, eindigt het spel. Zo niet, dan wordt er opnieuw genomineerd.',
      },
      {
        id: 'banshee',
        reason:
          'Elke nacht* kiest Riot een levende goede speler (anders dan de vorige nachten): een gekozen Banshee sterft en krijgt haar eigenschap.',
      },
      {
        id: 'exorcist',
        reason:
          'Als Riot de door de Exorcist gekozen speler nomineert en die wordt geëxecuteerd, wint goed.',
      },
      {
        id: 'farmer',
        reason:
          'Elke nacht* kiest Riot een levende goede speler (anders dan de vorige nachten): een gekozen Boer gebruikt zijn eigenschap, maar sterft niet.',
      },
      {
        id: 'grandmother',
        reason:
          'Als Riot in het spel is en het kleinkind sterft door executie, wint kwaad.',
      },
      {
        id: 'innkeeper',
        reason:
          'Als Riot een door de Herbergier beschermde speler nomineert en die wordt geëxecuteerd, wint goed.',
      },
      {
        id: 'king',
        reason:
          'Als Riot in het spel is en minstens 1 speler dood is, leert de Koning elke nacht een levend personage.',
      },
      {
        id: 'mayor',
        reason:
          'De Burgemeester mag de Riot stoppen. Doet die dat wanneer er nog maar 1 Riot leeft, dan wint goed. Anders wint kwaad.',
      },
      {
        id: 'monk',
        reason:
          'Als Riot de door de Monnik beschermde speler nomineert en die wordt geëxecuteerd, wint goed.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Elke nacht* kiest Riot een levende goede speler (anders dan de vorige nachten): een gekozen Raafwachter gebruikt zijn eigenschap, maar sterft niet.',
      },
      {
        id: 'sage',
        reason:
          'Elke nacht* kiest Riot een levende goede speler (anders dan de vorige nachten): een gekozen Wijsgeer gebruikt zijn eigenschap, maar sterft niet.',
      },
      {
        id: 'soldier',
        reason:
          'Als Riot de Soldaat nomineert en die wordt geëxecuteerd, wint goed.',
      },
    ],
  },
  {
    id: 'scarletwoman',
    hatred: [
      {
        id: 'alhadikhia',
        reason:
          'Als er twee Demonen zouden zijn, waarvan een de Verleidster was, wordt de Verleidster opnieuw de Verleidster.',
      },
      {
        id: 'fanggu',
        reason:
          'Als er twee Demonen zouden zijn, waarvan een de Verleidster was, blijft de Verleidster de Verleidster.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'damsel',
        reason:
          'Als de Spion in het spel is (of was), is de Jongedame vergiftigd.',
      },
      {
        id: 'ogre',
        reason: 'De Spion geldt voor de Oger als kwaadaardig.',
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Opiumkweker zijn eigenschap heeft, ziet de Spion de Grimoire niet.',
      },
    ],
  },
  {
    id: 'summoner',
    hatred: [
      {
        id: 'clockmaker',
        reason: 'De Oproeper geldt voor de Klokkenmaker als de Demon.',
      },
      {
        id: 'courtier',
        reason:
          'Als de levende Oproeper geen eigenschap heeft, heeft de Verteller de eigenschap van de Oproeper.',
      },
      {
        id: 'engineer',
        reason:
          'Als de levende Oproeper uit het spel wordt gehaald, heeft de Verteller de eigenschap van de Oproeper.',
      },
      {
        id: 'hatter',
        reason:
          'Als de Oproeper een tweede levende Demon maakt, bepaalt de Verteller wie er vannacht sterven.',
      },
      {
        id: 'kazali',
        reason:
          'Als de Oproeper een tweede levende Demon maakt, bepaalt de Verteller wie er vannacht sterven.',
      },
      {
        id: 'lordoftyphon',
        reason:
          'Als er een Lord of Typhon wordt opgeroepen, moet die naast een Volgeling zitten en wordt de andere buur een kwaadaardige Volgeling.',
      },
      {
        id: 'pithag',
        reason:
          'Als de Oproeper een tweede levende Demon maakt, bepaalt de Verteller wie er vannacht sterven.',
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Opiumkweker leeft op de 3e nacht, kiest de Oproeper welke Demon, maar niet welke speler.',
      },
      {
        id: 'preacher',
        reason:
          'Als de levende Oproeper geen eigenschap heeft, heeft de Verteller de eigenschap van de Oproeper.',
      },
      {
        id: 'pukka',
        reason:
          'De Oproeper mag een Pukka oproepen op de 2e nacht in plaats van de 3e.',
      },
      {
        id: 'zombuul',
        reason:
          'Als de Oproeper een dode speler in de Zombuul oproept, is de Zombuul al “een keer gestorven”.',
      },
    ],
  },
  {
    id: 'vizier',
    hatred: [
      {
        id: 'alsaahir',
        reason: 'De Verteller kondigt niet aan dat de Vizier in het spel is.',
      },
      {
        id: 'courtier',
        reason:
          'Als de Vizier zijn eigenschap verliest, komt die dit te weten en kan die tijdens de dag niet sterven.',
      },
      {
        id: 'fearmonger',
        reason:
          'De Vizier wordt wakker met de Angstzaaier, leert wie die kiest en mag die speler niet onmiddellijk laten executeren.',
      },
      {
        id: 'investigator',
        reason: 'De Verteller kondigt niet aan dat de Vizier in het spel is.',
      },
      {
        id: 'politician',
        reason: 'De Politicus kan voor de Vizier als kwaadaardig gelden.',
      },
      {
        id: 'preacher',
        reason:
          'Als de Vizier zijn eigenschap verliest, komt die dit te weten en kan die tijdens de dag niet sterven.',
      },
      {
        id: 'zealot',
        reason: 'De Zeloot kan voor de Vizier als kwaadaardig gelden.',
      },
    ],
  },
  {
    id: 'vortox',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Als de Vortox de Banshee doodt, leren alle spelers dat de Banshee is gestorven.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'damsel',
        reason:
          'Als de Weduwe in het spel is (of was), is de Jongedame vergiftigd.',
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Opiumkweker zijn eigenschap heeft, ziet de Weduwe de Grimoire niet.',
      },
    ],
  },
  {
    id: 'yaggababble',
    hatred: [
      {
        id: 'exorcist',
        reason:
          'Als de Exorcist de Yaggababble kiest, doodt de Yaggababble vannacht niet.',
      },
    ],
  },
]

export default jinxesNl
