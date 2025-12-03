import { Jinx } from '@/types/jinx'

/**
 * Hungarian translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array but only the `reason` texts
 * are localized. Role ids stay the same as in the base data.
 */

export const jinxesHu: Array<Jinx> = [
  {
    id: 'chambermaid',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'A Chambermaid megtudja, hogy a Mathematician ma éjjel felébred-e vagy sem, még akkor is, ha a Chambermaid ébred először.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'cannibal',
        reason:
          'Ha a Cannibal megkapja a Butler képességét, a Cannibal megtudja ezt.',
      },
    ],
  },
  {
    id: 'lunatic',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'A Mathematician megtudja, ha a Lunatic más játékost támad meg, mint az igazi Démon.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'heretic',
        reason: 'A Pit-Hag nem tud Heretic-et létrehozni.',
      },
      {
        id: 'damsel',
        reason:
          'Ha a Pit-Hag Damsel-t hoz létre, a Mesélő választja ki, melyik játékos lesz az.',
      },
      {
        id: 'politician',
        reason: 'A Pit-Hag nem tud gonosz Politician-t létrehozni.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'A Cerenovus választhatja, hogy egy játékost őrültté tesz, hogy ő a Goblin.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'soldier',
        reason:
          'Ha a Leviathan jelöli és végzi ki a Soldier-t, a Soldier nem hal meg.',
      },
      {
        id: 'monk',
        reason:
          'Ha a Leviathan jelöli és végzi ki a Monk által választott játékost, az a játékos nem hal meg.',
      },
      {
        id: 'innkeeper',
        reason:
          'Ha a Leviathan jelöli és végzi ki az Innkeeper által választott játékost, az a játékos nem hal meg.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Ha a Leviathan játékban van és a Ravenkeeper kivégzés által hal meg, azon az éjszakán felébred, hogy használja a képességét.',
      },
      {
        id: 'sage',
        reason:
          'Ha a Leviathan játékban van és a Sage kivégzés által hal meg, azon az éjszakán felébred, hogy használja a képességét.',
      },
      {
        id: 'farmer',
        reason:
          'Ha a Leviathan játékban van és egy Farmer kivégzés által hal meg, azon az éjszakán egy jó játékos Farmer lesz.',
      },
      {
        id: 'mayor',
        reason:
          'Ha a Leviathan játékban van és az 5. napon nem történik kivégzés, a jó győz.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'scarlet woman',
        reason:
          'Ha két élő Al-Hadikhia van, a Scarlet Woman Al-Hadikhia újra Scarlet Woman lesz.',
      },
      {
        id: 'mastermind',
        reason:
          'Csak 1 átkozott karakter lehet játékban. A gonosz játékosok kezdéskor tudják, melyik játékos és karakter az.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'poppygrower',
        reason:
          "Ha a Poppy Grower játékban van, a Követők nem ébrednek együtt. Egyenként ébrednek, amíg egyikük választ, hogy felveszi a Lil' Monsta jelzőt.",
      },
      {
        id: 'magician',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'scarletwoman',
        reason:
          "Ha 5 vagy több játékos él és a Lil' Monsta jelzőt tartó játékos meghal, a Scarlet Woman ma este megkapja a Lil' Monsta jelzőt.",
      },
    ],
  },
  {
    id: 'lycanthrope',
    hatred: [
      {
        id: 'gambler',
        reason:
          'Ha a Lycanthrope él és a Gambler éjjel megöli magát, ma éjjel senki más nem halhat meg.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'A Legion és az Engineer nem lehetnek egyszerre játékban kezdéskor. Ha az Engineer Legion-t hoz létre, a legtöbb játékos (beleértve az összes gonoszt) gonosz Legion lesz.',
      },
      {
        id: 'preacher',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
    ],
  },
  {
    id: 'fanggu',
    hatred: [
      {
        id: 'scarletwoman',
        reason:
          'Ha a Fang Gu egy Kívülállót választ és meghal, a Scarlet Woman nem lesz Fang Gu.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'magician',
        reason:
          'Amikor a Spy megnézi a Grimoárt, a Démon és a Magician karakterjelzői el vannak távolítva.',
      },
      {
        id: 'alchemist',
        reason: 'Az Alchemist nem kaphatja meg a Spy képességét.',
      },
      {
        id: 'poppygrower',
        reason:
          'Ha a Poppy Grower játékban van, a Spy nem látja a Grimoárt, amíg a Poppy Grower meg nem hal.',
      },
      {
        id: 'damsel',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'heretic',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'magician',
        reason:
          'Amikor a Widow megnézi a Grimoárt, a Démon és a Magician karakterjelzői el vannak távolítva.',
      },
      {
        id: 'poppygrower',
        reason:
          'Ha a Poppy Grower játékban van, a Widow nem látja a Grimoárt, amíg a Poppy Grower meg nem hal.',
      },
      {
        id: 'alchemist',
        reason: 'Az Alchemist nem kaphatja meg a Widow képességét.',
      },
      {
        id: 'damsel',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'heretic',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
    ],
  },
  {
    id: 'godfather',
    hatred: [
      {
        id: 'heretic',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
    ],
  },
  {
    id: 'baron',
    hatred: [
      {
        id: 'heretic',
        reason: 'A Baron esetleg csak 1 Kívülállót ad hozzá, nem 2-t.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'lilmonsta',
        reason:
          "A Marionette egy Követő szomszédja, nem a Démoné. A Marionette-et nem ébresztik fel, hogy válassza ki, ki veszi fel a Lil' Monsta jelzőt.",
      },
      {
        id: 'poppygrower',
        reason:
          'Amikor a Poppy Grower meghal, a Démon megtudja a Marionette-et, de a Marionette nem tud meg semmit.',
      },
      {
        id: 'snitch',
        reason:
          'A Marionette nem tud meg 3 nem játékban lévő karaktert. Ehelyett a Démon tud meg 3 további karaktert.',
      },
      {
        id: 'balloonist',
        reason:
          'Ha a Marionette azt gondolja, hogy ő a Balloonist, +1 Kívülálló lett hozzáadva.',
      },
      {
        id: 'damsel',
        reason: 'A Marionette nem tudja meg, hogy Damsel van játékban.',
      },
      {
        id: 'huntsman',
        reason:
          'Ha a Marionette azt gondolja, hogy ő a Huntsman, a Damsel hozzá lett adva.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'engineer',
        reason:
          'A Riot és az Engineer nem lehetnek egyszerre játékban kezdéskor.\nHa az Engineer Riot-ot hoz létre, a gonosz játékosok Riot lesznek.',
      },
      {
        id: 'golem',
        reason: 'Ha a Golem jelöli a Riot-ot, a Riot játékos nem hal meg.',
      },
      {
        id: 'snitch',
        reason:
          'Ha a Snitch játékban van, minden Riot játékos kap 3 további blöfföt.',
      },
      {
        id: 'saint',
        reason:
          'Ha egy jó játékos jelöli és megöli a Saint-et, a Saint csapata veszít.',
      },
      {
        id: 'butler',
        reason: 'A Butler nem jelölheti a gazdáját.',
      },
      {
        id: 'pithag',
        reason:
          'Ha a Pit-Hag Riot-ot hoz létre, az összes gonosz játékos Riot lesz.\nHa a Pit-Hag a 3. nap után hoz létre Riot-ot, a játék még egy napig folytatódik.',
      },
      {
        id: 'mayor',
        reason:
          'Ha a 3. nap csak három élő játékossal kezdődik, a játékosok (csoportként) választhatják, hogy egyáltalán nem jelölnek. Ha így van (és egy Mayor él), a Mayor csapata nyer.',
      },
      {
        id: 'monk',
        reason:
          'Ha egy Riot játékos jelöli és megöli a Monk által védett játékost, a védett játékos nem hal meg.',
      },
      {
        id: 'farmer',
        reason:
          'Ha egy Riot játékos jelöli és megöli a Farmer-t, a Farmer ma este használja a képességét.',
      },
      {
        id: 'innkeeper',
        reason:
          'Ha egy Riot játékos jelöl egy Innkeeper által védett játékost, a védett játékos nem hal meg.',
      },
      {
        id: 'sage',
        reason:
          'Ha egy Riot játékos jelöli és megöli a Sage-t, a Sage ma este használja a képességét.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Ha egy Riot játékos jelöli és megöli a Ravenkeeper-t, a Ravenkeeper ma este használja a képességét.',
      },
      {
        id: 'soldier',
        reason:
          'Ha egy Riot játékos jelöli a Soldier-t, a Soldier nem hal meg.',
      },
      {
        id: 'grandmother',
        reason:
          'Ha egy Riot játékos jelöli és megöli az unokát, a Grandmother is meghal.',
      },
      {
        id: 'king',
        reason:
          'Ha egy Riot játékos jelöli és megöli a King-et és a Choirboy él, a Choirboy ma este használja a képességét.',
      },
      {
        id: 'exorcist',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'minstrel',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'flowergirl',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'undertaker',
        reason:
          'A jelölés által meghaló játékosok az Undertaker számára kivégzettnek számítanak.',
      },
      {
        id: 'cannibal',
        reason:
          'A jelölés által meghaló játékosok a Cannibal számára kivégzettnek számítanak.',
      },
      {
        id: 'pacifist',
        reason:
          'A jelölés által meghaló játékosok a Pacifist számára kivégzettnek számítanak.',
      },
      {
        id: 'devilsadvocate',
        reason:
          "A jelölés által meghaló játékosok a Devil's Advocate számára kivégzettnek számítanak.",
      },
      {
        id: 'investigator',
        reason: 'A Riot az Investigator számára Követőnek számít.',
      },
      {
        id: 'clockmaker',
        reason: 'A Riot a Clockmaker számára Követőnek számít.',
      },
      {
        id: 'towncrier',
        reason: 'A Riot a Town Crier számára Követőnek számít.',
      },
      {
        id: 'damsel',
        reason: 'A Riot a Damsel számára Követőnek számít.',
      },
      {
        id: 'preacher',
        reason: 'A Riot a Preacher számára Követőnek számít.',
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Ha a Mastermind él és a Lleech gazdája kivégzés által meghal, a Lleech él, de elveszíti a képességét.',
      },
      {
        id: 'slayer',
        reason: 'Ha a Slayer megöli a Lleech gazdáját, a gazda meghal.',
      },
      {
        id: 'heretic',
        reason:
          'Ha a Lleech megmérgezte a Heretic-et, majd a Lleech meghal, a Heretic megmérgezve marad.',
      },
    ],
  },
]

export default jinxesHu
