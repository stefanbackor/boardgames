import { Jinx } from '@/types/jinx'

/**
 * Dutch translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array but only the `reason` texts
 * are localized. Role ids stay the same as in the base data.
 */

export const jinxesNl: Array<Jinx> = [
  {
    id: 'chambermaid',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Het Kamermeisje verneem of de Wiskundige vanavond wakker wordt of niet, hoewel het Kamermeisje als eerste wakker wordt.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'cannibal',
        reason:
          'Als de Kannibaal het vermogen van de Knecht krijgt, verneem de Kannibaal dit.',
      },
    ],
  },
  {
    id: 'lunatic',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'De Wiskundige verneem of de Krankzinnige een andere speler aanvalt dan de echte demon.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'heretic',
        reason: 'Een Heksenketel kan geen Ketter creëren.',
      },
      {
        id: 'damsel',
        reason:
          'Als een Heksenketel een Freule creëert, kiest de verteller welke speler het is.',
      },
      {
        id: 'politician',
        reason: 'Een Heksenketel kan geen slechte Politicus creëren.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'De Cerenovus kan kiezen een speler gek te maken dat hij de Goblin is.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'soldier',
        reason:
          'Als de Leviathan de Soldaat nomineert en executeert, sterft de Soldaat niet.',
      },
      {
        id: 'monk',
        reason:
          'Als de Leviathan de door de Monnik gekozen speler nomineert en executeert, sterft die speler niet.',
      },
      {
        id: 'innkeeper',
        reason:
          'Als de Leviathan een door de Herbergier gekozen speler nomineert en executeert, sterft die speler niet.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Als de Leviathan in het spel is en de Ravenhoeder door executie sterft, wordt hij die nacht wakker om zijn vermogen te gebruiken.',
      },
      {
        id: 'sage',
        reason:
          'Als de Leviathan in het spel is en de Wijze door executie sterft, wordt hij die nacht wakker om zijn vermogen te gebruiken.',
      },
      {
        id: 'farmer',
        reason:
          'Als de Leviathan in het spel is en een Boer door executie sterft, wordt die nacht een goede speler de Boer.',
      },
      {
        id: 'mayor',
        reason:
          'Als de Leviathan in het spel is en er op dag 5 geen executie plaatsvindt, wint Goed.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'scarlet woman',
        reason:
          'Als er twee levende Al-Hadikhias zijn, wordt de Scharlakenrode Vrouw Al-Hadikhia en weer de Scharlakenrode Vrouw.',
      },
      {
        id: 'mastermind',
        reason:
          'Er kan maar 1 vervloekt karakter in het spel zijn. Slechte spelers vernemen aan het begin welke speler en welk karakter het is.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'poppygrower',
        reason:
          "Als de Klaproozkweker in het spel is, worden handlangers niet samen wakker. Ze worden één voor één gewekt totdat er één kiest de Lil' Monsta-marker te nemen.",
      },
      {
        id: 'magician',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
      {
        id: 'scarletwoman',
        reason:
          "Als er 5 of meer spelers leven en de speler met de Lil' Monsta-marker sterft, ontvangt de Scharlakenrode Vrouw vanavond de Lil' Monsta-marker.",
      },
    ],
  },
  {
    id: 'lycanthrope',
    hatred: [
      {
        id: 'gambler',
        reason:
          'Als de Weerwolf leeft en de Gokker zichzelf \'s nachts doodt, kan vanavond geen andere speler sterven.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Legion en de Ingenieur kunnen niet allebei aan het begin van het spel in het spel zijn. Als de Ingenieur Legion creëert, worden de meeste spelers (inclusief alle slechte spelers) slechte Legion.',
      },
      {
        id: 'preacher',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
    ],
  },
  {
    id: 'fanggu',
    hatred: [
      {
        id: 'scarletwoman',
        reason:
          'Als de Fang Gu een buitenstaander kiest en sterft, wordt de Scharlakenrode Vrouw geen Fang Gu.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'magician',
        reason:
          'Als de Spion het Grimoire bekijkt, worden de karakter-markers van de demon en de Magiër verwijderd.',
      },
      {
        id: 'alchemist',
        reason: 'De Alchemist kan het Spion-vermogen niet hebben.',
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Klaproozkweker in het spel is, bekijkt de Spion het Grimoire pas als de Klaproozkweker sterft.',
      },
      {
        id: 'damsel',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
      {
        id: 'heretic',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'magician',
        reason:
          'Als de Weduwe het Grimoire bekijkt, worden de karakter-markers van de demon en de Magiër verwijderd.',
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Klaproozkweker in het spel is, bekijkt de Weduwe het Grimoire pas als de Klaproozkweker sterft.',
      },
      {
        id: 'alchemist',
        reason: 'De Alchemist kan het Weduwe-vermogen niet hebben.',
      },
      {
        id: 'damsel',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
      {
        id: 'heretic',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
    ],
  },
  {
    id: 'godfather',
    hatred: [
      {
        id: 'heretic',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
    ],
  },
  {
    id: 'baron',
    hatred: [
      {
        id: 'heretic',
        reason:
          'De Baron voegt mogelijk maar 1 buitenstaander toe, niet 2.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'lilmonsta',
        reason:
          "De Marionet is de buur van een handlanger, niet van de demon. De Marionet wordt niet gewekt om te kiezen wie de Lil' Monsta-marker neemt.",
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Klaproozkweker sterft, verneem de demon de Marionet, maar de Marionet verneem niets.',
      },
      {
        id: 'snitch',
        reason:
          'De Marionet verneem geen 3 niet in het spel zijnde karakters. De demon verneem in plaats daarvan 3 extra.',
      },
      {
        id: 'balloonist',
        reason:
          'Als de Marionet denkt de Ballonvaarder te zijn, is er +1 buitenstaander toegevoegd.',
      },
      {
        id: 'damsel',
        reason: 'De Marionet verneem niet dat er een Freule in het spel is.',
      },
      {
        id: 'huntsman',
        reason:
          'Als de Marionet denkt de Jager te zijn, is de Freule toegevoegd.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Riot en de Ingenieur kunnen niet allebei aan het begin van het spel in het spel zijn.\nAls de Ingenieur Riot creëert, worden de slechte spelers Riot.',
      },
      {
        id: 'golem',
        reason:
          'Als de Golem Riot nomineert, sterft de Riot-speler niet.',
      },
      {
        id: 'snitch',
        reason:
          'Als de Verklikker in het spel is, ontvangt elke Riot-speler 3 extra bluffs.',
      },
      {
        id: 'saint',
        reason:
          'Als een goede speler de Heilige nomineert en doodt, verliest het team van de Heilige.',
      },
      {
        id: 'butler',
        reason: 'De Knecht kan zijn meester niet nomineren.',
      },
      {
        id: 'pithag',
        reason:
          'Als de Heksenketel Riot creëert, worden alle slechte spelers Riot.\nAls de Heksenketel Riot na dag 3 creëert, gaat het spel nog één dag verder.',
      },
      {
        id: 'mayor',
        reason:
          'Als dag 3 begint met slechts drie levende spelers, kunnen de spelers (als groep) kiezen helemaal niet te nomineren. Als ze dat doen (en er een Burgemeester leeft), wint het team van de Burgemeester.',
      },
      {
        id: 'monk',
        reason:
          'Als een Riot-speler de door de Monnik beschermde speler nomineert en doodt, sterft de beschermde speler niet.',
      },
      {
        id: 'farmer',
        reason:
          'Als een Riot-speler een Boer nomineert en doodt, gebruikt de Boer vanavond zijn vermogen.',
      },
      {
        id: 'innkeeper',
        reason:
          'Als een Riot-speler een door de Herbergier beschermde speler nomineert, sterft de beschermde speler niet.',
      },
      {
        id: 'sage',
        reason:
          'Als een Riot-speler een Wijze nomineert en doodt, gebruikt de Wijze vanavond zijn vermogen.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Als een Riot-speler de Ravenhoeder nomineert en doodt, gebruikt de Ravenhoeder vanavond zijn vermogen.',
      },
      {
        id: 'soldier',
        reason:
          'Als een Riot-speler de Soldaat nomineert, sterft de Soldaat niet.',
      },
      {
        id: 'grandmother',
        reason:
          'Als een Riot-speler het kleinkind nomineert en doodt, sterft de Grootmoeder ook.',
      },
      {
        id: 'king',
        reason:
          'Als een Riot-speler de Koning nomineert en doodt en de Koorknaap leeft, gebruikt de Koorknaap vanavond zijn vermogen.',
      },
      {
        id: 'exorcist',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
      {
        id: 'minstrel',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
      {
        id: 'flowergirl',
        reason: 'Er kan maar 1 vervloekt karakter in het spel zijn.',
      },
      {
        id: 'undertaker',
        reason:
          'Spelers die door nominatie sterven tellen voor de Lijkbezorger als geëxecuteerd.',
      },
      {
        id: 'cannibal',
        reason:
          'Spelers die door nominatie sterven tellen voor de Kannibaal als geëxecuteerd.',
      },
      {
        id: 'pacifist',
        reason:
          'Spelers die door nominatie sterven tellen voor de Pacifist als geëxecuteerd.',
      },
      {
        id: 'devilsadvocate',
        reason:
          "Spelers die door nominatie sterven tellen voor de Duivels Advocaat als geëxecuteerd.",
      },
      {
        id: 'investigator',
        reason: 'Riot telt voor de Onderzoeker als handlanger.',
      },
      {
        id: 'clockmaker',
        reason: 'Riot telt voor de Uurwerkmaker als handlanger.',
      },
      {
        id: 'towncrier',
        reason: 'Riot telt voor de Stadsomroeper als handlanger.',
      },
      {
        id: 'damsel',
        reason: 'Riot telt voor de Freule als handlanger.',
      },
      {
        id: 'preacher',
        reason: 'Riot telt voor de Predikant als handlanger.',
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Als het Meesterbrein leeft en de gastheer van de Lleech door executie sterft, leeft de Lleech maar verliest zijn vermogen.',
      },
      {
        id: 'slayer',
        reason:
          'Als de Doder de gastheer van de Lleech doodt, sterft de gastheer.',
      },
      {
        id: 'heretic',
        reason:
          'Als de Lleech de Ketter heeft vergiftigd en de Lleech sterft, blijft de Ketter vergiftigd.',
      },
    ],
  },
]

export default jinxesNl
