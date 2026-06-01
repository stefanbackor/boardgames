
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
          'De Kamermeid leert of de Wiskundige vannacht wakker wordt, ondanks de Kamermeid eerst wakker wordt.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'cannibal',
        reason:
          'Als de Kannibaal de eigenschap van de Butler krijgt, komt de Kannibaal dit te weten.',
      },
    ],
  },
  {
    id: 'lunatic',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'De Wiskundige leert of de Krankzinnige een andere speler(s) aanviel dan de echte Demon.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'heretic',
        reason: 'Een Feeks kan geen Ketter maken.',
      },
      {
        id: 'damsel',
        reason:
          'Als een Feeks een Jongedame maakt, dan kiest de Verteller welke speler dat wordt.',
      },
      {
        id: 'politician',
        reason: 'Een Feeks kan geen kwaadaardige Politicus maken.',
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
          'Als de Leviathan de speler die de Monnik koos nomineert en executeert, dan sterft die speler niet.',
      },
      {
        id: 'innkeeper',
        reason:
          'Als de Leviathan de speler die de Herbergier koos nomineert en executeert, dan sterft die speler niet.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Als de Leviathan in het spel zit & de Raafwachter sterft door executie, dan wordt de Raafwachter die nacht wakker om zijn eigenschap te gebruiken.',
      },
      {
        id: 'sage',
        reason:
          'Als de Leviathan in het spel zit & de Wijsgeer sterft door executie, dan wordt de Wijsgeer die nacht wakker om zijn eigenschap te gebruiken.',
      },
      {
        id: 'farmer',
        reason:
          'Als de Leviathan in het spel zit & de Boer sterft door executie, dan wordt een goede speler die nacht een Boer.',
      },
      {
        id: 'mayor',
        reason:
          'Als de Leviathan in het spel zit & er gebeurt geen executie op dag 5, dan wint goed.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'scarlet woman',
        reason:
          "Als er twee levende Al-Hadikhia's in het spel zitten, dan wordt de Verleidster Al-Hadikhia opnieuw de Verleidster.",
      },
      {
        id: 'mastermind',
        reason:
          'Er kan maar 1 jinx-personage in het spel zitten. Kwaadaardige speler leren in hun eerste nacht welke speler en welk personage dat is.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'poppygrower',
        reason:
          "Als de Opiumkweker in het spel zit worden Volgelingen niet samen wakker. Ze worden individueel wakker, tot een van hen kiest om Lil' Monsta te bezitten.",
      },
      {
        id: 'magician',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'scarletwoman',
        reason:
          "Als er nog minstens 5 spelers leven en de speler die Lil' Monsta bezit sterft, dan krijgt de Verleidster vannacht Lil' Monsta.",
      },
    ],
  },
  {
    id: 'lycanthrope',
    hatred: [
      {
        id: 'gambler',
        reason:
          "Als de Weerwolf nog leeft en de Gokker zichzelf 's nachts doodt, dan kunnen geen andere speler vannacht dood gaan.",
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Legion en de Ingenieur kunnen niet samen in het spel zitten aan het begin van het spel. Als de Ingenieur een Legion maakt, dan wordt de meerderheid van de spelers (inclusief alle kwaadaardige spelers) kwaadaardig Legion.',
      },
      {
        id: 'preacher',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
    ],
  },
  {
    id: 'fanggu',
    hatred: [
      {
        id: 'scarletwoman',
        reason:
          'Als de Fang Gu een Buitenstaander kiest en dood gaat, dan wordt de Verleidster niet de Fang Gu.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'magician',
        reason:
          "Als de Spion de Grimoire bekijkt, dan worden de fiches van de Demon en de Goochelaar verwijderd.",
      },
      {
        id: 'alchemist',
        reason: 'De Alchemist kan niet de eigenschap van de Spion hebben.',
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Opiumkweker in het spel zit, dan bekijkt de Spion de Grimoire niet, totdat de Opiumkweker sterft.',
      },
      {
        id: 'damsel',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'heretic',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'magician',
        reason:
          "Als de Weduwe de Grimoire bekijkt, dan worden de fiches van de Demon en de Goochelaar verwijderd.",
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Opiumkweker in het spel zit, dan bekijkt de Weduwe de Grimoire niet, totdat de Opiumkweker sterft.',
      },
      {
        id: 'alchemist',
        reason: 'De Alchemist kan niet de eigenschap van de Weduwe hebben.',
      },
      {
        id: 'damsel',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'heretic',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
    ],
  },
  {
    id: 'godfather',
    hatred: [
      {
        id: 'heretic',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
    ],
  },
  {
    id: 'baron',
    hatred: [
      {
        id: 'heretic',
        reason: 'De Baron mag ook 1 Buitenstaander toevoegen, geen 2.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'lilmonsta',
        reason:
          "De Marionet zit naast een Volgeling, niet de Demon. De Marionet wordt niet wakker gemaakt om te kiezen wie Lil' Monsta moet bezitten.",
      },
      {
        id: 'poppygrower',
        reason:
          'Als de Opiumkweker dood gaat, dan leert de Demon wie de Marionet is, maar de Marionet leert niets.',
      },
      {
        id: 'snitch',
        reason:
          'De Marionet leert geen 3 personages die niet in het spel zitten. De Demon leert er 3 extra in de plaats.',
      },
      {
        id: 'balloonist',
        reason:
          'Als de Marionet denkt de Ballonvaarder te zijn, dan kan er +1 Buitenstaander in het spel zitten.',
      },
      {
        id: 'damsel',
        reason: 'De Marionet leert niet dat er een Jongedame in het spel zit.',
      },
      {
        id: 'huntsman',
        reason:
          'Als de Marionet denkt de Jager te zijn, dan zit de Jongedame in het spel.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Riot en de Ingenieur kunnen in het begin niet samen in het spel zitten. \nAls de Ingenieur een Riot maakt, dan worden de kwaadaardige spelers Riot.',
      },
      {
        id: 'golem',
        reason: 'Als de Golem een Riot speler nomineert, dan gaat die speler niet dood.',
      },
      {
        id: 'snitch',
        reason:
          'Als de Klikspaan in het spel zit, dan krijgt elke Riot speler 3 extra personages om te bluffen.',
      },
      {
        id: 'saint',
        reason:
          "Als een goede speler de Heilige nomineert en doodt, dan verliest het team van de Heilige.",
      },
      {
        id: 'butler',
        reason: 'De Butler kan zijn Meester niet nomineren.',
      },
      {
        id: 'pithag',
        reason:
          'Als de Feeks Riot maakt, dan worden alle kwaadaardige speler Riot. \nAls de Feeks Riot maakt na dag 3, dan gaat het spel nog 1 dag door.',
      },
      {
        id: 'mayor',
        reason:
          "Als de 3e dag begint met slechts 3 levende spelers, dan mogen de spelers (als groep) kiezen om niet te nomineren. In dat geval (en als de Burgemeester nog leeft) dan wint het team van de Burgemeester.",
      },
      {
        id: 'monk',
        reason:
          'Als een Riot speler de door de Monnik beschermde speler nomineert en doodt, dan gaat die speler niet dood.',
      },
      {
        id: 'farmer',
        reason:
          'Als een Riot speler de Boer nomineert en doodt, dan gebruikt de Boer zijn eigenschap vannacht.',
      },
      {
        id: 'innkeeper',
        reason:
          'Als een Riot speler de door de Herbergier beschermde speler nomineert en doodt, dan gaat die speler niet dood.',
      },
      {
        id: 'sage',
        reason:
          'Als een Riot speler de Wijsgeer nomineert en doodt, dan gebruikt de Wijsgeer zijn eigenschap vannacht.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Als een Riot speler de Raafwachter nomineert en doodt, dan gebruikt de Raafwachter zijn eigenschap vannacht.',
      },
      {
        id: 'soldier',
        reason:
          'Als een Riot speler de Soldaat nomineert, dan gaat de Soldaat niet dood.',
      },
      {
        id: 'grandmother',
        reason:
          'Als een Riot speler het Kleinkind nomineert en doodt, dan gaat de Grootmoeder ook dood.',
      },
      {
        id: 'king',
        reason:
          'Als een Riot speler de Koning nomineert en doodt, en de Koorjongen is in leven, dan gebruikt de Koorjongen zijn eigenschap vannacht.',
      },
      {
        id: 'exorcist',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'minstrel',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'flowergirl',
        reason: 'Er kan maar 1 jinx-personage in het spel zitten.',
      },
      {
        id: 'undertaker',
        reason:
          'Spelers die sterven door nominatie registreren als geëxecuteerd voor de Grafdelver.',
      },
      {
        id: 'cannibal',
        reason:
          'Spelers die sterven door nominatie registreren als geëxecuteerd voor de Kannibaal.',
      },
      {
        id: 'pacifist',
        reason:
          'Spelers die sterven door nominatie registreren als geëxecuteerd voor de Pacifist.',
      },
      {
        id: 'devilsadvocate',
        reason:
          "Spelers die sterven door nominatie registreren als geëxecuteerd voor de Advocaat van de Duivel.",
      },
      {
        id: 'investigator',
        reason: 'Riot registreert als een Volgeling voor de Onderzoeker.',
      },
      {
        id: 'clockmaker',
        reason: 'Riot registreert als een Volgeling voor de Klokkenmaker.',
      },
      {
        id: 'towncrier',
        reason: 'Riot registreert als een Volgeling voor de Dorpsomroeper.',
      },
      {
        id: 'damsel',
        reason: 'Riot registreert als een Volgeling voor de Jongedame.',
      },
      {
        id: 'preacher',
        reason: 'Riot registreert als een Volgeling voor de Preker.',
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          "Als het Meesterbrein in leven is en de gastheer van de Lleech sterft door executie, dan blijft de Lleech in leven, maar verliest zijn eigenschap.",
      },
      {
        id: 'slayer',
        reason: "Als de Demonenjager de gastheer van de Lleech doodt, dan gaat de gastheer dood.",
      },
      {
        id: 'heretic',
        reason:
          'Als de Lleech de Ketter heeft vergiftigd en de Lleech daarna sterft, dan blijft de Ketter vergiftigd.',
      },
    ],
  },
]

export default jinxesNl
