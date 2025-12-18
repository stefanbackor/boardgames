/**
 * Hungarian translations and overrides for Blood on the Clocktower roles.
 * Generated from the official Trouble Brewing, Sects and Violets & Bad Moon Rising
 * script JSON (`Trouble Brewing.hu.json`, `Sects and Violets.hu.json`,
 * `Bad Moon Rising.hu.json` on botcscripts.com).
 *
 * Only roles that appear in these base scripts are included here – other roles
 * fall back to the base English text from `roles.ts`.
 */

import { RoleTranslation } from './types'

export const roleTranslationsHu: Record<string, RoleTranslation> = {
  washerwoman: {
    name: 'Mosónő',
    ability: 'Megtudod, hogy 2 játékos közül az egyik egy bizonyos Városi.',
    reminders: ['Városi', 'Hibás'],
    firstNightReminder:
      'Mutasd meg egy játékban lévő Városi karakter jelzőjét. Mutass két játékosra, akik közül az egyik ez a karakter.',
  },
  librarian: {
    name: 'Könyvtáros',
    ability:
      'Megtudod, hogy 2 játékos közül az egyik egy bizonyos Kívülálló (vagy hogy nincs Kívülálló a játékban).',
    reminders: ['Kívülálló', 'Hibás'],
    firstNightReminder:
      'Mutasd meg egy játékban lévő Kívülálló karakter jelzőjét. Mutass két játékosra, akik közül az egyik ez a karakter.',
  },
  investigator: {
    name: 'Nyomozó',
    ability: 'Megtudod, hogy 2 játékos közül az egyik egy bizonyos Követő.',
    reminders: ['Követő', 'Hibás'],
    firstNightReminder:
      'Mutasd meg egy játékban lévő Követő karakter jelzőjét. Mutass két játékosra, akik közül az egyik ez a karakter.',
  },
  chef: {
    name: 'Séf',
    ability: 'Megtudod, hogy hány pár Gonosz játékos ül egymás mellett.',
    firstNightReminder:
      'Mutasd az ujjaddal (0, 1, 2, …) a szomszédos gonosz játékospárok számát.',
  },
  empath: {
    name: 'Együttérző',
    ability: 'Éjjelente megtudod, hogy a két élő szomszédod közül hány Gonosz.',
    firstNightReminder:
      'Mutasd az ujjaddal (0, 1, 2) a gonosz szomszédok számát.',
    otherNightReminder:
      'Mutasd az ujjaddal (0, 1, 2) a gonosz szomszédok számát.',
  },
  fortuneteller: {
    name: 'Jós',
    ability:
      'Éjjelente válassz két játékost, akikről megtudod, hogy köztük van‑e a Démon. Egy jó játékosról azt hiszed, hogy ő a Démon.',
    reminders: ['Figyelemelterelés'],
    firstNightReminder:
      'A Jós két játékosra mutat. Jelezz fejjel (bólints igennel, rázz nemet), hogy egyikük Démon‑e.',
    otherNightReminder:
      'A Jós két játékosra mutat. Jelezz fejjel (bólints „igen”, rázz „nem”), hogy egyikük Démon‑e.',
  },
  undertaker: {
    name: 'Sírásó',
    ability:
      'Éjjelente* megtudod, hogy nappal melyik karakter halt meg kivégzésben.',
    reminders: ['Kivégzett'],
    otherNightReminder:
      'Ha ma egy játékost kivégeztek: mutasd meg a karakter jelzőjét.',
  },
  monk: {
    name: 'Szerzetes',
    ability:
      'Éjjelente* válassz egy játékost (magadat nem lehet): ő biztonságban van a Démontól aznap éjjel.',
    reminders: ['Védett'],
    otherNightReminder:
      'Az előzőleg védett játékos többé nincs védve. A Szerzetes egy játékosra mutat (nem saját magára). Jelöld „VÉDETT” jelzővel.',
  },
  ravenkeeper: {
    name: 'Hollónevelő',
    ability:
      'Ha éjjel halsz meg, felébredsz, hogy válassz egy játékost: megtudod a karakterét.',
    otherNightReminder:
      'Ha a Hollónevelő ma éjjel meghalt: a Hollónevelő egy játékosra mutat. Mutasd meg annak a játékosnak a karakter jelzőjét.',
  },
  virgin: {
    name: 'Szűz',
    ability:
      'Amikor első alkalommal gyanúsítanak, és a gyanúsító Városi, őt végzik ki.',
    reminders: ['Nincs képessége'],
  },
  slayer: {
    name: 'Démonvadász',
    ability:
      'Egyszer a játék során, napközben, nyilvánosan válassz egy játékost. Ha ő a Démon, azonnal meghal.',
    reminders: ['Nincs képessége'],
  },
  soldier: {
    name: 'Katona',
    ability: 'Védett vagy a Démonnal szemben.',
  },
  mayor: {
    name: 'Polgármester',
    ability:
      'Ha 3 játékos van életben és nappal nem végeztek ki senkit, nyer a csapatod. Ha éjjel bármikor meghalnál, meghalhat helyetted más.',
  },
  butler: {
    name: 'Komornyik',
    ability:
      'Éjjelente* válassz egy játékost (magadat nem lehet): holnap csak akkor szavazhatsz, ha ő is.',
    reminders: ['Uram'],
    firstNightReminder:
      'A Komornyik rámutat egy játékosra. Jelöld azt a játékost „URAM” jelzővel.',
    otherNightReminder:
      'A Komornyik rámutat egy játékosra. Jelöld azt a játékost „URAM” jelzővel.',
  },
  drunk: {
    name: 'Részeg',
    ability:
      'Te nem tudsz róla, hogy te vagy a Részeg. Azt hiszed, hogy Városi vagy, de valójában nem.',
  },
  recluse: {
    name: 'Remete',
    ability:
      'Gonosznak (akár Démonnak vagy Követőnek) tűnhetsz mások számára, akár a halálod után is.',
  },
  saint: {
    name: 'Szent',
    ability: 'Ha kivégzés miatt halsz meg, a csapatod elveszíti a játékot.',
  },
  poisoner: {
    name: 'Méregkészítő',
    ability:
      'Éjjelente válassz egy játékost. Ez a játékos mérgezett lesz aznap éjjel és holnap napközben is.',
    reminders: ['Mérgezett'],
    firstNightReminder:
      'A Méregkészítő egy játékosra mutat. Az a játékos mérgezett.',
    otherNightReminder:
      'Az előzőleg mérgezett játékos többé nincs mérgezve. A Méregkészítő egy játékosra mutat. Az a játékos mérgezett.',
  },
  spy: {
    name: 'Kém',
    ability:
      'Éjjelente megnézheted a Grimoárt. Jónak, Városinak és Kívülállónak is tűnhetsz a többi játékosnak, még akkor is, ha már meghaltál.',
    firstNightReminder:
      'Mutasd meg a Grimoárt a Kémnek, ameddig szüksége van rá.',
    otherNightReminder:
      'Mutasd meg a Grimoárt a Kémnek, ameddig szüksége van rá.',
  },
  scarletwoman: {
    name: 'Romlott nő',
    ability:
      'Ha 5 vagy több játékos életben van, és a Démon meghal, te válsz Démonná. (Utazók nem számítanak.)',
    reminders: ['Démon'],
    otherNightReminder:
      'Ha a Romlott nő ma lett Démonná: mutasd meg neki a „TE VAGY” kártyát, majd a Démon jelzőt.',
  },
  baron: {
    name: 'Báró',
    ability: 'Extra Kívülállók vannak játékban. [+2 Kívülálló]',
  },
  imp: {
    name: 'Pokolfajzat',
    ability:
      'Éjjelente* válassz egy játékost, aki meghal. Ha így magadat ölöd meg, az egyik Követőd lesz az új Démon.',
    reminders: ['Halott'],
    otherNightReminder:
      'A Pokolfajzat egy játékosra mutat. Az a játékos meghal. Ha a Pokolfajzat magát választotta: cseréld ki egy élő Követő karakterét tartalék Pokolfajzat jelzőre. Mutasd a „TE VAGY” kártyát, majd a Pokolfajzat jelzőt.',
  },
  // Sects & Violets
  clockmaker: {
    name: 'Órásmester',
    ability:
      'Megtudod, hogy hány lépésre ül a Démon a legközelebbi Követőjétől.',
    firstNightReminder:
      'Mutasd az ujjaddal (1, 2, 3, …) a Démon és a legközelebbi Követője közötti helyek számát.',
  },
  dreamer: {
    name: 'Álmodó',
    ability:
      'Éjjelente válassz egy játékost (magadon vagy Utazón kívül): megtudsz 1 jó és 1 gonosz karaktert, ezek közül az egyik helyes.',
    firstNightReminder:
      'Az Álmodó egy játékosra mutat. Mutass 1 jó és 1 gonosz karakterjelzőt; az egyik helyes.',
    otherNightReminder:
      'Az Álmodó egy játékosra mutat. Mutass 1 jó és 1 gonosz karakterjelzőt; az egyik helyes.',
  },
  snakecharmer: {
    name: 'Kígyóbűvölő',
    ability:
      'Éjjelente válassz egy élő játékost: ha ő Démon, karaktert és csapatot cserél veled, majd ő részeg lesz.',
    reminders: ['Mérgezett'],
    firstNightReminder:
      'A Kígyóbűvölő egy játékosra mutat. Ha Démon: cseréld ki a Démon és a Kígyóbűvölő karakterét és csapatát. Ébreszd mindkettőt, és tájékoztasd az új szerepükről és csapatukról. Az új Kígyóbűvölő mérgezett.',
    otherNightReminder:
      'A Kígyóbűvölő egy játékosra mutat. Ha Démon: cseréld ki a Démon és a Kígyóbűvölő karakterét és csapatát. Ébreszd mindkettőt, és tájékoztasd az új szerepükről és csapatukról. Az új Kígyóbűvölő mérgezett.',
  },
  mathematician: {
    name: 'Matematikus',
    ability:
      'Éjjelente megtudod, hány játékos képessége működött rendellenesen (virradat óta) egy másik karakter képessége miatt.',
    reminders: ['Rendellenes'],
    firstNightReminder:
      'Mutasd az ujjaddal (0, 1, 2, …) hány játékos képessége működött rendellenesen más képesség miatt.',
    otherNightReminder:
      'Mutasd az ujjaddal (0, 1, 2, …) hány játékos képessége működött rendellenesen más képesség miatt.',
  },
  flowergirl: {
    name: 'Virágárus',
    ability: 'Éjjelente* megtudod, ha a Démon aznap szavazott.',
    reminders: ['Démon szavazott', 'Démon nem szavazott'],
    otherNightReminder:
      'Bólints igennel, vagy rázz nemet a fejeddel, hogy a Démon ma szavazott‑e. Helyezd el a „Démon nem szavazott” jelölőt (ha van, vedd le a „Démon szavazott” jelölőt).',
  },
  towncrier: {
    name: 'Kikiáltó',
    ability: 'Éjjelente* megtudod, ha Követő aznap jelölt.',
    reminders: ['Követő jelölt', 'Követő nem jelölt'],
    otherNightReminder:
      'Bólints igennel, vagy rázz nemet a fejeddel, hogy ma jelölt‑e Követő. Helyezd el a „Követő nem jelölt” jelölőt (ha van, vedd le a „Követő jelölt” jelölőt).',
  },
  oracle: {
    name: 'Orákulum',
    ability: 'Éjjelente* megtudod, hány halott játékos Gonosz.',
    otherNightReminder:
      'Mutasd az ujjaddal (0, 1, 2, …) a halott gonosz játékosok számát.',
  },
  savant: {
    name: 'Tudós',
    ability:
      'Minden nap elmehetsz a Mesélőhöz, hogy két információt kapj privátban: az egyik igaz, a másik hamis.',
  },
  seamstress: {
    name: 'Varrónő',
    ability:
      'Egyszer a játék során, éjjel, válassz 2 játékost (magadat nem lehet): megtudod, hogy azonos csapatban vannak‑e.',
    reminders: ['Nincs képessége'],
    firstNightReminder:
      'A Varrónő vagy nemet jelez a fejével, vagy két másik játékosra mutat. Ha játékosokat választott, bólints vagy rázz nemet, hogy azonos‑e a csapatuk.',
    otherNightReminder:
      'Ha a Varrónő még nem használta a képességét: vagy nemet jelez a fejével, vagy két másik játékosra mutat. Ha játékosokat választott, bólints vagy rázz nemet, hogy azonos‑e a csapatuk.',
  },
  philosopher: {
    name: 'Filozófus',
    ability:
      'Egyszer a játék során, éjjel, válassz egy jó karaktert: megkapod a képességét. Ha ez a karakter játékban van, az a játékos részeg lesz.',
    firstNightReminder:
      'A Filozófus vagy nemet jelez a fejével, vagy egy jó karakterre mutat a lapon. Ha karaktert választott: cseréld ki az inaktív karakter jelzőjét a Filozófus jelzőre, vagy ha a karakter játékban van, tedd a „RÉSZEG” jelzőt arra a játékosra.',
    otherNightReminder:
      'Ha a Filozófus még nem használta a képességét: ugyanúgy járj el, mint az első éjszakán.',
  },
  artist: {
    name: 'Művész',
    ability:
      'Egyszer a játék során, nappal, privátban kérdezz a Mesélőtől egy eldöntendő (igen/nem) kérdést.',
    reminders: ['Nincs képesség'],
  },
  juggler: {
    name: 'Zsonglőr',
    ability:
      'Az első napodon, nyilvánosan tippelj legfeljebb 5 játékos karakterére. Aznap éjjel megtudod, hányat találtál el.',
    reminders: ['Helyes'],
    otherNightReminder:
      'Ha ma volt a Zsonglőr első napja: mutasd az ujjaddal a „Helyes” jelölők számát (0, 1, 2, …). Távolítsd el a jelölőket.',
  },
  sage: {
    name: 'Bölcs',
    ability:
      'Ha Démon öl meg, megtudod, hogy két játékos közül melyik lehet a Démon.',
    otherNightReminder:
      'Ha a Bölcset Démon ölte meg: mutass két játékosra, akik közül az egyik a Démon.',
  },
  mutant: {
    name: 'Mutáns',
    ability: 'Ha rögeszméd, hogy Kívülálló vagy, a Mesélő kivégeztethet.',
  },
  sweetheart: {
    name: 'Édesem',
    ability: 'Ha meghalsz, egy játékos ezentúl részeg lesz.',
    reminders: ['Részeg'],
    otherNightReminder:
      'Ha ma meghalt az Édesem, válassz egy játékost, aki részeg lesz.',
  },
  barber: {
    name: 'Borbély',
    ability:
      'Ha nappal vagy éjjel meghalsz, a Démon választhat 2 játékost (nem egy másik Démont), akik karaktert cserélnek.',
    reminders: ['Ma este hajvágás'],
    otherNightReminder:
      'Ha ma meghalt a Borbély: ébreszd fel a Démon. Mutasd az „Ez a karakter választott téged” kártyát és a Borbély jelzőt. A Démon vagy nemet jelez, vagy két játékosra mutat. Ha játékosokat választott, cseréld ki a karakter jelzőiket, majd ébreszd fel őket és mutasd meg az új karakterüket.',
  },
  klutz: {
    name: 'Balfácán',
    ability:
      'Amikor megtudod, hogy meghaltál, nyilvánosan válassz egy élő játékost: ha ő Gonosz, a csapatod veszít.',
  },
  eviltwin: {
    name: 'Gonosz iker',
    ability:
      'Te és egy másik, ellentétes csapatban lévő játékos ismeritek egymást. Ha a jó iker hal meg kivégzéssel, a Gonoszok nyernek. A Jók nem nyerhetnek, amíg mindketten életben vagytok.',
    reminders: ['Iker'],
    firstNightReminder:
      'Ébreszd fel a Gonosz ikreket és a jó ikert. Bizonyosodj meg róla, hogy felismerték egymást. Mutass a Gonosz ikerre, majd mutasd a Gonosz iker jelzőt a jó ikernek és a jó iker jelzőjét a Gonosz ikernek.',
  },
  witch: {
    name: 'Boszorkány',
    ability:
      'Éjjelente válassz egy játékost: ha másnap jelöl, azonnal meghal. Ha már csak 3 játékos él, elveszíted a képességed.',
    reminders: ['Megátkozott'],
    firstNightReminder:
      'A Boszorkány egy játékosra mutat. Ha ez a játékos holnap jelöl, azonnal meghal.',
    otherNightReminder:
      'Ha legalább 4 játékos él: a Boszorkány egy játékosra mutat. Ha ez a játékos holnap jelöl, azonnal meghal.',
  },
  cerenovus: {
    name: 'Agymosó',
    ability:
      'Éjjelente válassz egy játékost és egy jó karaktert: másnap rögeszméje lesz, hogy ő az a karakter, különben kivégezhető.',
    reminders: ['Rögeszmés'],
    firstNightReminder:
      'Az Agymosó egy játékosra, majd egy jó karakterre mutat. Ébreszd fel a játékost, mutasd az „Ez a karakter választott téged” kártyát, az Agymosó jelzőt, majd a választott karakter jelzőjét.',
    otherNightReminder:
      'Az Agymosó egy játékosra, majd egy jó karakterre mutat. Ébreszd fel a játékost, mutasd az „Ez a karakter választott téged” kártyát, az Agymosó jelzőt, majd a választott karakter jelzőjét.',
  },
  pithag: {
    name: 'Banya',
    ability:
      'Éjjelente* válassz egy játékost és egy karaktert: ha a karakter nincs játékban, a játékos azzá válik. Ha így Démon jön létre, azon az éjjelen a halálokról a Mesélő dönt.',
    otherNightReminder:
      'A Banya egy játékosra és egy karakterre mutat. Ha a karakter nincs játékban, ébreszd fel a játékost és mutasd a „TE VAGY” kártyát és az új karakter jelzőjét.',
  },
  fanggu: {
    name: 'Fang Gu',
    ability:
      'Éjjelente* válassz egy játékost: meghal. Az első Kívülálló, aki így halna meg, gonosz Fang Gu‑vá válik, és te halsz meg helyette. [+1 Kívülálló]',
    reminders: ['Halott', 'Egyszer'],
    otherNightReminder:
      'A Fang Gu egy játékosra mutat. Az a játékos meghal. Ha Kívülálló volt és nincs másik Fang Gu: a Fang Gu hal meg helyette, a játékos pedig gonosz Fang Gu lesz.',
  },
  vigormortis: {
    name: 'Vigormortis',
    ability:
      'Éjjelente* válassz egy játékost: meghal. Az általad megölt Követők megtartják képességüket, és 1 szomszédos Városit megmérgeznek. [-1 Kívülálló]',
    reminders: ['Halott', 'Van képessége', 'Mérgezett'],
    otherNightReminder:
      'A Vigormortis egy játékosra mutat. Az a játékos meghal. Ha Követő volt, megtartja a képességét, és egy szomszédos Városi mérgezett lesz.',
  },
  nodashii: {
    name: 'No Dashii',
    ability:
      'Éjjelente* válassz egy játékost: meghal. Két szomszédos Városi (egyik mindkét oldalról) mérgezett.',
    reminders: ['Halott', 'Mérgezett'],
    otherNightReminder: 'A No Dashii egy játékosra mutat. Az a játékos meghal.',
  },
  vortox: {
    name: 'Vortox',
    ability:
      'Éjjelente* válassz egy játékost: meghal. A Városiak képességei hamis információt adnak. Ha bármelyik napon senkit sem végeznek ki, a Gonoszak nyernek.',
    reminders: ['Halott'],
    otherNightReminder: 'A Vortox egy játékosra mutat. Az a játékos meghal.',
  },
  // Bad Moon Rising
  grandmother: {
    name: 'Nagymama',
    ability:
      'Megismersz egy jó játékost és a karakterét. Ha a Démon megöli, te is meghalsz.',
    reminders: ['Unoka'],
    firstNightReminder:
      'Mutasd meg a megjelölt karakter jelzőjét. Mutass a megjelölt játékosra.',
    otherNightReminder:
      'Ha a Nagymama unokáját ma este megölte a Démon: a Nagymama meghal.',
  },
  sailor: {
    name: 'Tengerész',
    ability:
      'Éjjelente válassz egy élő játékost: vagy te, vagy ő részeg lesz szürkületig. Nem halhatsz meg.',
    reminders: ['Részeg'],
    firstNightReminder:
      'A Tengerész egy élő játékosra mutat. Vagy a Tengerész, vagy a kiválasztott játékos részeg.',
    otherNightReminder:
      'Az előzőleg részeg játékos józan lesz. A Tengerész egy élő játékosra mutat. Vagy a Tengerész, vagy a kiválasztott játékos részeg.',
  },
  chambermaid: {
    name: 'Szobalány',
    ability:
      'Éjjelente válassz 2 élő játékost (ne magadat): megtudod, hányan ébredtek fel azon az éjjelen a képességük miatt.',
    firstNightReminder:
      'A Szobalány két játékosra mutat. Mutasd az ujjaddal (0, 1, 2, …), hányan ébrednek ma éjjel a képességük miatt.',
    otherNightReminder:
      'A Szobalány két játékosra mutat. Mutasd az ujjaddal (0, 1, 2, …), hányan ébrednek ma éjjel a képességük miatt.',
  },
  exorcist: {
    name: 'Ördögűző',
    ability:
      'Éjjelente* válassz egy játékost (ne azt, akit legutóbb): ha ő a Démon, megtudja, ki vagy, és ma éjjel nem ébred fel.',
    reminders: ['Kiválasztott'],
    otherNightReminder:
      'Az Ördögűző egy játékosra mutat, másra, mint az előző éjszaka. Ha ez a játékos a Démon: ébreszd fel a Démont, mutasd az Ördögűző jelzőt és az Ördögűző játékost. A Démon ma éjjel nem cselekszik.',
  },
  innkeeper: {
    name: 'Fogadós',
    ability:
      'Éjjelente* válassz két játékost: ők nem halhatnak meg aznap éjjel, de egyikük részeg lesz szürkületig.',
    reminders: ['Részeg', 'Védett'],
    otherNightReminder:
      'A korábban védett és részeg játékosok elveszítik a jelzőiket. A Fogadós két játékosra mutat. Ők védettek, egyikük részeg.',
  },
  gambler: {
    name: 'Szerencsejátékos',
    ability:
      'Éjjelente* válassz egy játékost és tippeld meg a karakterét. Ha rosszul tippelsz, meghalsz.',
    reminders: ['Halott'],
    otherNightReminder:
      'A Szerencsejátékos egy játékosra és egy karakterre mutat. Ha téved, a Szerencsejátékos meghal.',
  },
  gossip: {
    name: 'Pletykafészek',
    ability:
      'Minden nap tehetsz egy nyilvános kijelentést. Ha igaz volt, aznap éjjel valaki meghal.',
    reminders: ['Halott'],
    otherNightReminder:
      'Ha a Pletykafészek nyilvános kijelentése igaz volt: válassz egy játékost, aki nincs védve a haláltól – az a játékos meghal.',
  },
  courtier: {
    name: 'Udvaronc',
    ability:
      'Egyszer a játék során, éjjel, válassz egy karaktert: részeg lesz 3 éjjel és 3 nappal.',
    reminders: ['Részeg 3', 'Részeg 2', 'Részeg 1', 'Nincs képesség'],
    firstNightReminder:
      'Az Udvaronc vagy nemet jelez a fejével, vagy egy karakterre mutat a lapon. Ha használta a képességét: ha a karakter játékban van, a hozzá tartozó játékos részeg.',
    otherNightReminder:
      'Csökkentsd a megjelölt játékos hátralévő részeg napjainak számát. Ha az Udvaronc még nem használta a képességét: járj el úgy, mint az első éjszakán.',
  },
  professor: {
    name: 'Professzor',
    ability:
      'Egyszer a játék során, éjjel*, válassz egy halott játékost: ha Városi, feltámad.',
    reminders: ['Élő', 'Nincs képesség'],
    otherNightReminder:
      'Ha a Professzor még nem használta a képességét: a Professzor vagy nemet jelez, vagy egy játékosra mutat. Ha Városit választott, az a játékos él.',
  },
  minstrel: {
    name: 'Vándorénekes',
    ability:
      'Amikor egy Követőt kivégzéssel megölnek, minden más játékos (Utazókon kívül) részeg lesz a következő szürkületig.',
    reminders: ['Mindenki részeg'],
  },
  tealady: {
    name: 'Teakészítő',
    ability: 'Ha mindkét élő szomszédod jó, egyikőtök sem halhat meg.',
    reminders: ['Nem halhat meg'],
  },
  pacifist: {
    name: 'Pacifista',
    ability: 'A kivégzett jó játékosok esetleg nem halnak meg.',
  },
  fool: {
    name: 'Udvari bolond',
    ability: 'Első alkalommal, amikor meghalnál, nem halsz meg.',
    reminders: ['Nincs képesség'],
  },
  tinker: {
    name: 'Kontár',
    ability: 'Bármikor meghalhatsz.',
    reminders: ['Halott'],
    otherNightReminder: 'A Kontár bármikor meghalhat.',
  },
  moonchild: {
    name: 'Holdgyermek',
    ability:
      'Amikor megtudod, hogy meghaltál, nyilvánosan válassz egy élő játékost. Ha jó, aznap éjjel meghal.',
    reminders: ['Halott'],
    otherNightReminder:
      'Ha a Holdgyermek ma valakit megjelölt: ha az a játékos jó, meghal.',
  },
  goon: {
    name: 'Fajankó',
    ability:
      'Éjjelente az első játékos, aki a képességével kiválaszt, részeg lesz szürkületig. Átveszed az ő csapatát.',
    reminders: ['Részeg'],
  },
  lunatic: {
    name: 'Holdkóros',
    ability:
      'Azt hiszed, hogy te vagy a Démon, de nem. A Démon tudja, ki vagy és kit választasz éjjel.',
    reminders: ['Támadás 1', 'Támadás 2', 'Támadás 3'],
  },
  godfather: {
    name: 'Keresztapa',
    ability:
      'Megtudod, mely Kívülállók vannak játékban. Ha egyikük aznap meghal, aznap éjjel válassz egy játékost: meghal. [-1 vagy +1 Kívülálló]',
    reminders: ['Halott', 'Ma meghalt'],
  },
  devilsadvocate: {
    name: 'Ördög ügyvédje',
    ability:
      'Éjjelente válassz egy élő játékost (mást, mint előző éjjel): ha másnap kivégzik, nem hal meg.',
    reminders: ['Túléli a kivégzést'],
  },
  assassin: {
    name: 'Bérgyilkos',
    ability:
      'Egyszer a játék alatt, éjjel*, válassz egy játékost: meghal, még akkor is, ha másképp nem halhatna meg.',
    reminders: ['Halott', 'Nincs képesség'],
  },
  mastermind: {
    name: 'Lángész',
    ability:
      'Ha a Démon kivégzés által hal meg (ami általában a játék végét jelenti), játsszatok még egy napot. Ha ekkor valakit kivégeznek, az ő csapata veszít.',
  },
  zombuul: {
    name: 'Zombuul',
    ability:
      'Éjjelente*, ha aznap senki sem halt meg, válassz egy játékost: meghal. Amikor először meghalnál, életben maradsz, de halottnak látszol.',
    reminders: ['Halott', 'Ma meghalt'],
  },
  pukka: {
    name: 'Pukka',
    ability:
      'Éjjelente válassz egy játékost: mérgezett lesz. Az előző éjjel megmérgezett játékos meghal és többé nem mérgezett.',
    reminders: ['Halott', 'Mérgezett'],
  },
  shabaloth: {
    name: 'Shabaloth',
    ability:
      'Éjjelente* válassz 2 játékost: ők meghalnak. Lehet, hogy feltámasztasz egy előző éjjel általad megölt játékost.',
    reminders: ['Élő', 'Halott'],
  },
  po: {
    name: 'Po',
    ability:
      'Éjjelente* választhatsz egy játékost: meghal. Ha előző éjjel senkit sem választottál, ezen az éjjelen három játékost válassz.',
    reminders: ['3 támadás', 'Halott'],
  },
  // === FABLED ROLES ===
  angel: {
    name: 'Angyal',
    ability:
      'Valami rossz történhet azzal, aki a leginkább felelős egy új játékos haláláért.',
    reminders: ['Védeni', 'Valami rossz'],
  },
  buddhist: {
    name: 'Buddhista',
    ability: 'Minden nap első 2 percében a tapasztalt játékosok nem beszélhetnek.',
  },
  deusexfiasco: {
    name: 'Deus ex Fiasco',
    ability:
      'Legalább egyszer játékonként a Mesélő hibázik, kijavítja, és nyilvánosan beismeri.',
  },
  djinn: {
    name: 'Dzsinn',
    ability: 'Használd a Dzsinn speciális szabályát. Minden játékos tudja, mi az.',
  },
  doomsayer: {
    name: 'Végítélet próféta',
    ability:
      'Ha 4 vagy több játékos él, minden élő játékos nyilvánosan dönthet (játékonként egyszer), hogy egy azonos csapathoz tartozó játékos meghal.',
  },
  duchess: {
    name: 'Hercegnő',
    ability:
      'Minden nap 3 játékos dönthet úgy, hogy meglátogat téged. Éjjel* minden látogató megtudja, hány látogató gonosz, de 1 hamis információt kap.',
    reminders: ['Látogató', 'Hamis információ'],
    otherNightReminder:
      'Ébreszd fel minden „Látogató" vagy „Hamis információ" jelzéssel ellátott játékost egyenként. Mutasd nekik a Hercegnő tokent, majd ujjakat (1, 2, 3) a „Látogató" jelzéssel ellátott gonosz játékosok számának megfelelően, vagy ha a „Hamis információ" jelzéssel ellátott játékost ébreszted, mutass bármennyi ujjat a „Látogató" jelzéssel ellátott gonosz játékosok száma kivételével.',
  },
  ferryman: {
    name: 'Révész',
    ability: 'Az utolsó napon minden halott játékos visszakapja a szavazati tokenét.',
  },
  fibbin: {
    name: 'Hazug',
    ability: 'Játékonként egyszer 1 jó játékos hamis információt kaphat.',
    reminders: ['Használt'],
  },
  fiddler: {
    name: 'Hegedűs',
    ability:
      'Játékonként egyszer a Démon titokban választ egy ellenfelet: minden játékos választja ki, hogy e 2 játékos közül melyik nyer.',
  },
  hellslibrarian: {
    name: 'Pokol könyvtárosa',
    ability:
      'Valami rossz történhet azzal, aki beszél, amikor a Mesélő csendet kért.',
    reminders: ['Valami rossz'],
  },
  revolutionary: {
    name: 'Forradalmár',
    ability:
      '2 szomszédos játékos ismerten azonos csapathoz tartozik. Játékonként egyszer egyikük hamisan regisztrálhat.',
    reminders: ['Használt'],
  },
  sentinel: {
    name: 'Őr',
    ability: 'Lehet 1-gyel több vagy kevesebb Kívülálló a játékban.',
  },
  spiritofivory: {
    name: 'Elefántcsont szelleme',
    ability: 'Nem lehet több mint 1 extra gonosz játékos.',
    reminders: ['Nincs extra gonosz'],
  },
  toymaker: {
    name: 'Játékkészítő',
    ability:
      'A Démon dönthet úgy, hogy nem támad, és ezt legalább egyszer meg kell tennie játékonként. A gonosz játékosok normál kezdő információt kapnak.',
    reminders: ['Utolsó éjjel: Nincs támadás'],
    otherNightReminder:
      'Ha ez az az éjjel, amikor a Démon támadása véget vethet a játéknak, és a Démon „Utolsó éjjel: Nincs támadás" jelzéssel van ellátva, akkor a Démon ezen az éjjelen nem cselekszik. (Ne ébreszd fel.)',
  },
  // === LORIC ROLES ===
  bootlegger: {
    name: 'Csempész',
    ability: 'Ez a forgatókönyv homebrew karaktereket vagy szabályokat tartalmaz.',
    flavor:
      "I've got the latest shipment from home, a brew I'd like to call 'Barrowfog'. Wanna try?",
  },
  gardener: {
    name: 'Kertész',
    ability: 'A Mesélő 1 vagy több játékos karakterét kijelöli.',
    flavor:
      "Oh now, this won't do. We've got the monkshood mixed in with the wolfsbane and the hemlock is smothering the hellebore! Oh dear me, we'd better start over. Fetch my shears.",
  },
  stormcatcher: {
    name: 'Viharfogó',
    ability:
      'Nevezz meg egy jó karaktert. Ha játékban van, csak kivégzéssel halhat meg, de a gonosz játékosok megtudják, melyik játékos az.',
    firstNightReminder:
      'Az éjjel elején hirdesd ki, melyik karakter van viharba zárva. Ha játékban van, jelöld meg ezt a játékost VIHARBA ZÁRVA-ként. Ébreszd fel minden gonosz játékost és mutasd meg nekik a karakter tokent, majd a megjelölt játékost. Ha nincs játékban, ébreszd fel minden gonosz játékost, mutasd meg nekik a EZEK A KARAKTEREK NEM JÁTÉKBAN tokent és a megfelelő karakter tokent.',
    flavor:
      "At dawn, the temple's long shadow creeps to the fountain. At dusk, the obelisk blocks the red glare, cooling warm water under the archway. All lines converge here. A storm is coming, and this, this pebbled and lush and holy place between the apple trees, is the eye.",
  },
  zenomancer: {
    name: 'Zenomancer',
    ability:
      'Egy vagy több játékosnak külön-külön célja van. Ha elérte, az a játékos megtud egy igaz információt.',
    flavor:
      'The universe is a verb not a noun, they say, and it is turtles, turtles all the way down. Turtles all the way down, my friend, turtles all the way down.',
  },
}

export default roleTranslationsHu
