import { Jinx } from '@/types/jinx'

/**
 * Hungarian translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array (same order, same pairs) but
 * only the `reason` texts are localized. Role ids stay the same as in the
 * base data.
 */

export const jinxesHu: Array<Jinx> = [
  {
    id: 'alchemist',
    hatred: [
      {
        id: 'boffin',
        reason:
          'Ha az Alchemist megkapja a Boffin képességét, az Alchemist nem tudja meg, milyen képessége van a Démonnak.',
      },
      {
        id: 'marionette',
        reason:
          'Az Alchemist-Marionette-nek nincs Marionette képessége, és a Marionette játékban van.',
      },
      {
        id: 'mastermind',
        reason:
          'Az Alchemist-Lángésznek nincs Lángész képessége, és a Lángész nincs játékban.',
      },
      {
        id: 'organgrinder',
        reason:
          'Ha az Alchemist megkapja az Organ Grinder képességét, az Organ Grinder játékban van. Ha mindkettő józan, mindkettő részeg.',
      },
      {
        id: 'spy',
        reason:
          'Az Alchemist-Kémnek nincs Kém képessége, és egy Kém játékban van. Minden kivégzés után az élő Alchemist-Kém nyilvánosan megtippelhet egy élő játékost Kémként. Ha eltalálja, a Démonnak ma éjjel a Kémet kell választania.',
      },
      {
        id: 'summoner',
        reason:
          'Az Alchemist-Summoner nem kap blöfföket, és azt választja meg, melyik Démon legyen, de nem azt, hogy melyik játékos. Ha ez előtt meghal, a gonosz győz. [Nincs Démon]',
      },
      {
        id: 'widow',
        reason:
          'Az Alchemist-Widow-nak nincs Widow képessége, és egy Widow játékban van. Minden kivégzés után az élő Alchemist-Widow nyilvánosan megtippelhet egy élő játékost Widow-ként. Ha eltalálja, a Démonnak ma éjjel a Widow-t kell választania.',
      },
      {
        id: 'wraith',
        reason:
          'Az Alchemist-Wraithnek nincs Wraith képessége, és egy Wraith játékban van. Minden kivégzés után az élő Alchemist-Wraith nyilvánosan megtippelhet egy élő játékost Wraithként. Ha eltalálja, a Démonnak ma éjjel a Wraithet kell választania.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Ha az Al-Hadikhia kivégzés által meghal, és a Lángész életben van, az Al-Hadikhia ma éjjel kiválaszt 3 jó játékost: ha mind a 3 az életet választja, a gonosz győz. Egyébként a jó győz.',
      },
      {
        id: 'princess',
        reason:
          'Ha a Princess az első napján jelölt egy játékost, akit kivégeztek, ma éjjel senki nem hal meg az Al-Hadikhia miatt.',
      },
    ],
  },
  {
    id: 'boffin',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Ha a Démonnak Cult Leader képessége van, ettől a képességtől nem válhat jóvá.',
      },
      {
        id: 'drunk',
        reason: 'A Démonnak nem lehet Részeg képessége.',
      },
      {
        id: 'goon',
        reason:
          'Ha a Démonnak Fajankó képessége van, ettől a képességtől nem válhat jóvá.',
      },
      {
        id: 'heretic',
        reason: 'A Démonnak nem lehet Heretic képessége.',
      },
      {
        id: 'ogre',
        reason: 'A Démonnak nem lehet Ogre képessége.',
      },
      {
        id: 'politician',
        reason: 'A Démonnak nem lehet Politician képessége.',
      },
      {
        id: 'villageidiot',
        reason:
          'Ha van szabad jelző, a Boffin a Démonnak adhatja a Village Idiot képességét.',
      },
    ],
  },
  {
    id: 'bountyhunter',
    hatred: [
      {
        id: 'kazali',
        reason:
          'Ha a Kazali Csatlóssá változtatja a Bounty Huntert, nem jön létre gonosz Városi.',
      },
      {
        id: 'philosopher',
        reason:
          'Ha a Filozófus megkapja a Bounty Hunter képességét, egy Városi gonosszá válhat.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'organgrinder',
        reason:
          'Ha az Organ Grinder miatt csukott szemmel szavaznak, a Komornyik felteheti a kezét, de a szavazata csak akkor számít, ha a mestere is szavazott.',
      },
    ],
  },
  {
    id: 'cannibal',
    hatred: [
      {
        id: 'butler',
        reason:
          'Ha a Cannibal megkapja a Komornyik képességét, a Cannibal megtudja ezt.',
      },
      {
        id: 'juggler',
        reason:
          'Ha a Zsonglőr az első napján tippel, és kivégzés által meghal, ma éjjel az élő Cannibal megtudja, hány tippje volt helyes a Zsonglőrnek.',
      },
      {
        id: 'princess',
        reason:
          'Ha a Cannibal ma jelölte a Princesst, akit kivégeztek és meghalt, a Démon ma éjjel nem öl.',
      },
      {
        id: 'zealot',
        reason:
          'Ha a Cannibal megkapja a Zealot képességét, a Cannibal megtudja ezt.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'Az Agymosó választhatja, hogy egy játékost őrültté tesz, hogy ő a Goblin.',
      },
    ],
  },
  {
    id: 'heretic',
    hatred: [
      {
        id: 'baron',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'godfather',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'lleech',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'pithag',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'spy',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
      {
        id: 'widow',
        reason: 'Csak 1 átkozott karakter lehet játékban.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Ha Legion létrejön, minden gonosz játékos Legion lesz. Ha Legion játékban van, az Engineer ezt kezdettől tudja, de nincs képessége.',
      },
      {
        id: 'hatter',
        reason:
          'Ha Legion létrejön, minden gonosz játékos Legion lesz. Ha Legion játékban van, a Hatternek nincs képessége.',
      },
      {
        id: 'minstrel',
        reason:
          'Ha Legion ma kivégzés által meghalt, Legion megtartja a képességét, de a Vándorénekes megtudhatja, hogy Legion.',
      },
      {
        id: 'politician',
        reason: 'A Politician gonosznak tűnhet Legion számára.',
      },
      {
        id: 'preacher',
        reason:
          'Ha a Preacher Legiont választja, Legion megtartja a képességét, de a Preacher megtudhatja, hogy az Legion.',
      },
      {
        id: 'summoner',
        reason: 'Ha Legiont megidézik, minden gonosz játékos Legion lesz.',
      },
      {
        id: 'zealot',
        reason: 'A Zealot gonosznak tűnhet Legion számára.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Minden éjjel* a Leviathan választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Banshee meghal, és megkapja a képességét.',
      },
      {
        id: 'exorcist',
        reason:
          'Ha a Leviathan jelöli az Ördögűző által választott játékost, és azt kivégzik, a jó győz.',
      },
      {
        id: 'farmer',
        reason:
          'Minden éjjel* a Leviathan választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Farmer használja a képességét, de nem hal meg.',
      },
      {
        id: 'grandmother',
        reason:
          'Ha a Leviathan játékban van, és az unoka kivégzés által meghal, a gonosz győz.',
      },
      {
        id: 'hatter',
        reason: 'A Leviathan az 5. nap után nem kerülhet játékba.',
      },
      {
        id: 'innkeeper',
        reason:
          'Ha a Leviathan a Fogadós által védett játékost jelöli, és azt kivégzik, a jó győz.',
      },
      {
        id: 'king',
        reason:
          'Ha a Leviathan játékban van, és legalább 1 játékos halott, a King minden éjjel megtud egy élő karaktert.',
      },
      {
        id: 'mayor',
        reason:
          'Ha a Leviathan és a Polgármester az 5. napon életben van, és nincs kivégzés, a jó győz.',
      },
      {
        id: 'monk',
        reason:
          'Ha a Leviathan a Szerzetes által védett játékost jelöli, és azt kivégzik, a jó győz.',
      },
      {
        id: 'pithag',
        reason: 'A Leviathan az 5. nap után nem kerülhet játékba.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Minden éjjel* a Leviathan választ egy élő játékost (az előző éjszakáktól eltérőt): a választott Hollónevelő használja a képességét, de nem hal meg.',
      },
      {
        id: 'sage',
        reason:
          'Minden éjjel* a Leviathan választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Bölcs használja a képességét, de nem hal meg.',
      },
      {
        id: 'soldier',
        reason: 'Ha a Leviathan a Katonát jelöli, és azt kivégzik, a jó győz.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'hatter',
        reason:
          "Ha a Hatter meghal, és a Démon a Lil' Monstát választja, azt is megválasztja, melyik Csatlós legyen.",
      },
      {
        id: 'magician',
        reason:
          "Ha a Magician életben van, a Mesélő választja ki, melyik Csatlós dajkálja a Lil' Monstát.",
      },
      {
        id: 'poppygrower',
        reason:
          "Ha a Lil' Monsta és a Poppy Grower életben van, a Csatlósok egyenként ébrednek, amíg egyikük elvállalja a Lil' Monsta jelzőt.",
      },
      {
        id: 'psychopath',
        reason: "Ha a Psychopath dajkálja a Lil' Monstát, meghal, ha kivégzik.",
      },
      {
        id: 'scarletwoman',
        reason:
          "Ha a Lil' Monsta 5 vagy több élő játékos mellett meghal, a Romlott nő dajkálja a Lil' Monstát a játék hátralévő részében.",
      },
      {
        id: 'vizier',
        reason: "Ha a Vizier dajkálja a Lil' Monstát, meghal, ha kivégzik.",
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Ha a Lángész életben van, és a Lleech gazdája kivégzés által meghal, a Lleech életben marad, de elveszíti a képességét.',
      },
      {
        id: 'slayer',
        reason: 'Ha a Démonvadász megöli a Lleech gazdáját, a gazda meghal.',
      },
    ],
  },
  {
    id: 'magician',
    hatred: [
      {
        id: 'legion',
        reason:
          'Ha a Magician játékban van, a Démon-információ során Legion külön csoportokban ébred. Minden csoport megtudja, mely játékosok jók, de a Magiciant nem tudja meg.',
      },
      {
        id: 'marionette',
        reason:
          'Ha a Magician életben van, a Démon nem tudja, melyik szomszédja a Marionette.',
      },
      {
        id: 'spy',
        reason:
          'Amikor a Kém megnézi a Grimoárt, a Démon és a Magician karakterjelzői el vannak távolítva.',
      },
      {
        id: 'vizier',
        reason:
          'Ha a Vizier játékban van, a Magiciannek nincs képessége, de immunis a Vizier képességére.',
      },
      {
        id: 'widow',
        reason:
          'Amikor a Widow megnézi a Grimoárt, a Démon és a Magician karakterjelzői el vannak távolítva.',
      },
      {
        id: 'wraith',
        reason:
          'Minden kivégzés után az élő Magician nyilvánosan megtippelhet egy élő játékost Wraithként. Ha eltalálja, a Démonnak ma éjjel a Wraithet kell választania.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'balloonist',
        reason:
          'Ha a Marionette azt hiszi, hogy ő a Balloonist, a felkészülés során talán egy Kívülálló került a játékba.',
      },
      {
        id: 'huntsman',
        reason:
          'Ha a Marionette azt hiszi, hogy ő a Huntsman, a felkészülés során a Damsel került a játékba.',
      },
      {
        id: 'kazali',
        reason:
          'Ha Marionette lenne játékban, a Démon után kerül játékba, és a szomszédjaként kell kezdenie.',
      },
      {
        id: 'lilmonsta',
        reason:
          'Ha Marionette lenne játékban, a Démon után kerül játékba, és a szomszédjaként kell kezdenie.',
      },
      {
        id: 'summoner',
        reason:
          'Ha Marionette lenne játékban, a Démon után kerül játékba, és a szomszédjaként kell kezdenie.',
      },
    ],
  },
  {
    id: 'mastermind',
    hatred: [
      {
        id: 'vigormortis',
        reason:
          'Az a Lángész, akinek megvan a képessége, megtartja azt, ha a Vigormortis meghal.',
      },
    ],
  },
  {
    id: 'mathematician',
    hatred: [
      {
        id: 'chambermaid',
        reason:
          'A Szobalány észlelheti, hogy a Matematikus felébred-e ma éjjel.',
      },
      {
        id: 'drunk',
        reason:
          'A Matematikus megtudja, ha a Részeg képessége hamis információt adott, vagy nem működött megfelelően.',
      },
      {
        id: 'lunatic',
        reason:
          'A Matematikus megtudja, ha a Holdkóros más játékost támad meg, mint az igazi Démon.',
      },
      {
        id: 'marionette',
        reason:
          'A Matematikus megtudja, ha a Marionette képessége hamis információt adott, vagy nem működött megfelelően.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Ha a Banya egy gonosz játékost Cult Leaderré változtat, az a saját képessége miatt nem válhat jóvá.',
      },
      {
        id: 'damsel',
        reason:
          'Ha a Banya Damsel-t hoz létre, a Mesélő választja ki, melyik játékos lesz az.',
      },
      {
        id: 'goon',
        reason:
          'Ha a Banya egy gonosz játékost Fajankóvá változtat, az a saját képessége miatt nem válhat jóvá.',
      },
      {
        id: 'ogre',
        reason:
          'Ha a Banya egy gonosz játékost Ogre-vá változtat, az a saját képessége miatt nem válhat jóvá.',
      },
      {
        id: 'politician',
        reason:
          'Ha a Banya egy gonosz játékost Politicianná változtat, az a saját képessége miatt nem válhat jóvá.',
      },
      {
        id: 'villageidiot',
        reason:
          'Ha van szabad jelző, a Banya létrehozhat még egy Village Idiot-ot. Ilyenkor megváltozhat, melyik Village Idiot a részeg.',
      },
    ],
  },
  {
    id: 'plaguedoctor',
    hatred: [
      {
        id: 'baron',
        reason:
          'Ha a Mesélő megkapná a Báró képességét, legfeljebb két játékos Kívülálló lesz.',
      },
      {
        id: 'boomdandy',
        reason:
          'Ha a Mesélő megkapná a Boomdandy képességét, egy játékos Boomdandy lesz.',
      },
      {
        id: 'eviltwin',
        reason:
          'Ha a Mesélő megkapná a Gonosz iker képességét, egy játékos Gonosz iker lesz.',
      },
      {
        id: 'fearmonger',
        reason:
          'Ha a Mesélő megkapná a Fearmonger képességét, egy Csatlós kapja meg, és megtudja ezt.',
      },
      {
        id: 'goblin',
        reason:
          'Ha a Mesélő megkapná a Goblin képességét, egy Csatlós kapja meg, és megtudja ezt.',
      },
      {
        id: 'marionette',
        reason:
          'Ha a Mesélő megkapná a Marionette képességét, a Démon egyik jó szomszédja Marionette lesz.',
      },
      {
        id: 'scarletwoman',
        reason:
          'Ha a Mesélő megkapná a Romlott nő képességét, egy Csatlós kapja meg, és megtudja ezt.',
      },
      {
        id: 'spy',
        reason:
          'Ha a Mesélő megkapná a Kém képességét, egy Csatlós kapja meg, és megtudja ezt.',
      },
      {
        id: 'wraith',
        reason:
          'Ha a Mesélő megkapná a Wraith képességét, egy Csatlós kapja meg, és megtudja ezt.',
      },
    ],
  },
  {
    id: 'recluse',
    hatred: [
      {
        id: 'ogre',
        reason:
          'Ha a Remete gonosznak tűnik az Ogre számára, az Ogre megtudja, hogy gonosz.',
      },
      {
        id: 'sage',
        reason: 'A Remete Démonnak tűnhet a Bölcs számára.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'atheist',
        reason:
          'Ha egy Riot során a Mesélőt jelölik, a játékosok szavaznak. Ha „halálra van ítélve”, a játék véget ér. Ha nem, újra jelölnek.',
      },
      {
        id: 'banshee',
        reason:
          'Minden éjjel* a Riot választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Banshee meghal, és megkapja a képességét.',
      },
      {
        id: 'exorcist',
        reason:
          'Ha a Riot az Ördögűző által választott játékost jelöli, és azt kivégzik, a jó győz.',
      },
      {
        id: 'farmer',
        reason:
          'Minden éjjel* a Riot választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Farmer használja a képességét, de nem hal meg.',
      },
      {
        id: 'grandmother',
        reason:
          'Ha a Riot játékban van, és az unoka kivégzés által meghal, a gonosz győz.',
      },
      {
        id: 'innkeeper',
        reason:
          'Ha a Riot a Fogadós által védett játékost jelöli, és azt kivégzik, a jó győz.',
      },
      {
        id: 'king',
        reason:
          'Ha a Riot játékban van, és legalább 1 játékos halott, a King minden éjjel megtud egy élő karaktert.',
      },
      {
        id: 'mayor',
        reason:
          'A Polgármester döntheti el, hogy leállítja a Riotot. Ha ezt akkor teszi, amikor már csak 1 Riot van életben, a jó győz. Egyébként a gonosz győz.',
      },
      {
        id: 'monk',
        reason:
          'Ha a Riot a Szerzetes által védett játékost jelöli, és azt kivégzik, a jó győz.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Minden éjjel* a Riot választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Hollónevelő használja a képességét, de nem hal meg.',
      },
      {
        id: 'sage',
        reason:
          'Minden éjjel* a Riot választ egy élő jó játékost (az előző éjszakáktól eltérőt): a választott Bölcs használja a képességét, de nem hal meg.',
      },
      {
        id: 'soldier',
        reason: 'Ha a Riot a Katonát jelöli, és azt kivégzik, a jó győz.',
      },
    ],
  },
  {
    id: 'scarletwoman',
    hatred: [
      {
        id: 'alhadikhia',
        reason:
          'Ha két Démon lenne, akik közül az egyik a Romlott nő volt, a Romlott nő ismét Romlott nő lesz.',
      },
      {
        id: 'fanggu',
        reason:
          'Ha két Démon lenne, akik közül az egyik a Romlott nő volt, a Romlott nő Romlott nő marad.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'damsel',
        reason: 'Ha a Kém játékban van (vagy volt), a Damsel meg van mérgezve.',
      },
      {
        id: 'ogre',
        reason: 'A Kém gonosznak tűnik az Ogre számára.',
      },
      {
        id: 'poppygrower',
        reason:
          'Ha a Poppy Grower rendelkezik a képességével, a Kém nem látja a Grimoárt.',
      },
    ],
  },
  {
    id: 'summoner',
    hatred: [
      {
        id: 'clockmaker',
        reason: 'A Summoner Démonnak tűnik az Órásmester számára.',
      },
      {
        id: 'courtier',
        reason:
          'Ha az élő Summonernek nincs képessége, a Summoner képessége a Mesélőnél van.',
      },
      {
        id: 'engineer',
        reason:
          'Ha az élő Summonert eltávolítják a játékból, a Summoner képessége a Mesélőnél van.',
      },
      {
        id: 'hatter',
        reason:
          'Ha a Summoner létrehoz egy második élő Démont, a ma éjjeli halálesetekről a Mesélő dönt.',
      },
      {
        id: 'kazali',
        reason:
          'Ha a Summoner létrehoz egy második élő Démont, a ma éjjeli halálesetekről a Mesélő dönt.',
      },
      {
        id: 'lordoftyphon',
        reason:
          'Ha egy Lord of Typhont megidéznek, egy Csatlós mellett kell lennie, a másik szomszédja pedig gonosz Csatlós lesz.',
      },
      {
        id: 'pithag',
        reason:
          'Ha a Summoner létrehoz egy második élő Démont, a ma éjjeli halálesetekről a Mesélő dönt.',
      },
      {
        id: 'poppygrower',
        reason:
          'Ha a Poppy Grower életben van a 3. éjjelen, a Summoner azt választja meg, melyik Démon legyen, de nem azt, hogy melyik játékos.',
      },
      {
        id: 'preacher',
        reason:
          'Ha az élő Summonernek nincs képessége, a Summoner képessége a Mesélőnél van.',
      },
      {
        id: 'pukka',
        reason:
          'A Summoner a 3. éjjel helyett a 2. éjjelen is megidézhet egy Pukkát.',
      },
      {
        id: 'zombuul',
        reason:
          'Ha a Summoner egy halott játékost idéz meg Zombuulként, a Zombuul már „egyszer meghalt”.',
      },
    ],
  },
  {
    id: 'vizier',
    hatred: [
      {
        id: 'alsaahir',
        reason: 'A Mesélő nem jelenti be, hogy a Vizier játékban van.',
      },
      {
        id: 'courtier',
        reason:
          'Ha a Vizier elveszíti a képességét, megtudja ezt, és napközben nem halhat meg.',
      },
      {
        id: 'fearmonger',
        reason:
          'A Vizier a Fearmongerrel együtt ébred, megtudja, kit választ, és nem rendelheti el az adott játékos azonnali kivégzését.',
      },
      {
        id: 'investigator',
        reason: 'A Mesélő nem jelenti be, hogy a Vizier játékban van.',
      },
      {
        id: 'politician',
        reason: 'A Politician gonosznak tűnhet a Vizier számára.',
      },
      {
        id: 'preacher',
        reason:
          'Ha a Vizier elveszíti a képességét, megtudja ezt, és napközben nem halhat meg.',
      },
      {
        id: 'zealot',
        reason: 'A Zealot gonosznak tűnhet a Vizier számára.',
      },
    ],
  },
  {
    id: 'vortox',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Ha a Vortox megöli a Banshee-t, minden játékos megtudja, hogy a Banshee meghalt.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'damsel',
        reason:
          'Ha a Widow játékban van (vagy volt), a Damsel meg van mérgezve.',
      },
      {
        id: 'poppygrower',
        reason:
          'Ha a Poppy Grower rendelkezik a képességével, a Widow nem látja a Grimoárt.',
      },
    ],
  },
  {
    id: 'yaggababble',
    hatred: [
      {
        id: 'exorcist',
        reason:
          'Ha az Ördögűző a Blabla Jagát választja, a Blabla Jaga ma éjjel nem öl.',
      },
    ],
  },
]

export default jinxesHu
