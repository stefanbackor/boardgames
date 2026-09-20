/**
 * Czech translations and overrides for Blood on the Clocktower roles.
 * This file contains translations for role names, abilities, and reminders.
 *
 * Auto-generated from roles.cs.json
 * Usage: Import this file and merge with the base roles data to get Czech localization.
 */

import { RoleTranslation } from './types'

export const roleTranslationsCs: Record<string, RoleTranslation> = {
  washerwoman: {
    name: 'Pradlena',
    ability: 'Začínáš s informací, že 1 ze 2 hráčů je konkrétní Měšťan.',
    reminders: ['Měšťan', 'Někdo jiný'],
    firstNightReminder:
      'Ukažte jí žeton Měšťana. Ukažte na oba hráče označené Pradleninými žetony MĚŠŤAN a NĚKDO JINÝ.',
  },
  librarian: {
    name: 'Knihovník',
    ability:
      'Začínáš s informací, že 1 ze 2 hráčů je konkrétní Podivín. (Nebo že ve hře není žádný Podivín.)',
    reminders: ['Podivín', 'Někdo jiný'],
    firstNightReminder:
      'Ukažte mu žeton Podivína. Ukažte na oba hráče označené Knihovníkovými žetony PODIVÍN a NĚKDO JINÝ.',
  },
  investigator: {
    name: 'Vyšetřovatel',
    ability:
      'Začínáš s informací, že jeden ze dvou hráčů je konkrétní Přisluhovač.',
    reminders: ['Přisluhovač', 'Někdo jiný'],
    firstNightReminder:
      'Ukažte mu žeton Přisluhovače. Ukažte na oba hráče označené Vyšetřovatelovými žetony PŘISLUHOVAČ a NĚKDO JINÝ.',
  },
  chef: {
    name: 'Kuchař',
    ability: 'Začínáš s informací, kolik párů zlých hráčů je ve hře.',
    firstNightReminder: 'Ukažte počet prstů.',
  },
  empath: {
    name: 'Empat',
    ability: 'Každou noc se dozvíš, kolik z tvých 2 živých sousedů je zlých.',
    firstNightReminder: 'Ukažte počet prstů.',
    otherNightReminder: 'Ukažte počet prstů.',
  },
  fortuneteller: {
    name: 'Vědma',
    ability:
      'Každou noc vybereš 2 hráče: dozvíš se, je-li mezi nimi Démon. Jeden dobrý hráč se ti jeví jako Démon.',
    reminders: ['Návnada'],
    firstNightReminder:
      'Vědma vybere 2 hráče. Přikývněte, pokud je mezi nimi Démon (nebo NÁVNADA).',
    otherNightReminder:
      'Vědma vybere 2 hráče. Přikývněte, pokud je mezi nimi Démon (nebo NÁVNADA).',
  },
  undertaker: {
    name: 'Hrobník',
    ability: 'Každou noc* se dozvíš, která postava byla ten den popravena.',
    reminders: ['Popraven'],
    otherNightReminder:
      'Pokud byl dnes některý hráč popraven, ukažte Hrobníkovi žeton jeho postavy.',
  },
  monk: {
    name: 'Mnich',
    ability:
      'Každou noc* vybereš 1 hráče (ne sebe): tu noc je v bezpečí před Démonem.',
    reminders: ['Chráněný'],
    otherNightReminder: 'Mnich vybere 1 hráče.',
  },
  ravenkeeper: {
    name: 'Strážkyně krkavců',
    ability:
      'Pokud zemřeš v noci, budeš hned probuzena a vybereš 1 hráče: dozvíš se jeho postavu.',
    otherNightReminder:
      'Pokud dnes v noci Strážkyně krkavců zemřela, vyberte hráče. Ukažte jí žeton postavy tohoto hráče.',
  },
  virgin: {
    name: 'Panna',
    ability:
      'Když tě poprvé někdo nominuje a nominujícím je Měšťan, je ihned popraven.',
    reminders: ['Bez schopnosti'],
  },
  slayer: {
    name: 'Zabiják',
    ability:
      'Jednou za hru, během dne, veřejně označíš 1 hráče: Je-li to Démon, zemře.',
    reminders: ['Bez schopnosti'],
  },
  soldier: {
    name: 'Voják',
    ability: 'Jsi v bezpečí před Démonem.',
  },
  mayor: {
    name: 'Starosta',
    ability:
      'Jsou-li naživu pouze 3 hráči a neproběhne žádná poprava, tvůj tým vyhrává. Pokud v noci zemřeš, může namísto tebe zemřít jiný hráč.',
  },
  butler: {
    name: 'Sluha',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe): následující den můžeš hlasovat pouze tehdy, pokud hlasuje i tento hráč.',
    reminders: ['Pán'],
    firstNightReminder: 'Sluha si vybere 1 hráče.',
    otherNightReminder: 'Sluha si vybere 1 hráče.',
  },
  drunk: {
    name: 'Opilec',
    ability: 'Nevíš, že jsi Opilec. Myslíš si, že jsi Měšťan, ale nejsi.',
    remindersGlobal: ['Opilý'],
  },
  recluse: {
    name: 'Samotář',
    ability:
      'Můžeš se jevit jako zlý, jako Přisluhovač nebo Démon, i když jsi mrtvý.',
  },
  saint: {
    name: 'Světec',
    ability: 'Pokud zemřeš popravou, tvůj tým prohrává.',
  },
  poisoner: {
    name: 'Travič',
    ability:
      'Každou noc vybereš 1 hráče: je otrávený po celou tuto noc a následující den.',
    reminders: ['Otrávený'],
    firstNightReminder: 'Travič vybere 1 hráče.',
    otherNightReminder: 'Travič vybere 1 hráče.',
  },
  spy: {
    name: 'Špeh',
    ability:
      'Každou noc nahlédneš do grimoáru. Můžeš se jevit jako dobrý, Měšťan, nebo Podivín, i když jsi mrtvý.',
    firstNightReminder: 'Ukažte mu grimoár na tak dlouho, jak potřebuje.',
    otherNightReminder: 'Ukažte mu grimoár na tak dlouho, jak potřebuje.',
  },
  scarletwoman: {
    name: 'Šarlatová žena',
    ability:
      'Pokud je naživu alespoň 5 hráčů a zemře Démon, stáváš se Démonem. (Pocestní se nepočítají.)',
    reminders: ['Démon'],
    otherNightReminder:
      'Pokud se dnes Šarlatová žena stala Démonem, ukažte jí žeton JSI a pak žeton Démona.',
  },
  baron: {
    name: 'Baron',
    ability: 'Ve hře jsou dva Podivíni navíc. [+2 Podivíni]',
  },
  imp: {
    name: 'Čert',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Pokud takto zabiješ sebe, Přisluhovač se stane Čertem.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Čert vybere 1 hráče. Pokud Čert vybere sám sebe: Nahraďte žeton 1 živého Přisluhovače náhradním žetonem Čerta. Uspěte starého Čerta. Probuďte nového Čerta. Ukažte mu žeton JSI a pak žeton Čerta.',
  },
  bureaucrat: {
    name: 'Byrokrat',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe): jeho hlas se následující den počítá za 3 hlasy.',
    reminders: ['3 votes'],
    firstNightReminder: 'Byrokrat ukáže na hráče.',
    otherNightReminder: 'Byrokrat ukáže na hráče.',
  },
  thief: {
    name: 'Thief',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe): jeho hlas je následující den negativní.',
    reminders: ['Negative vote'],
    firstNightReminder: 'Zloděj ukáže na hráče.',
    otherNightReminder: 'Zloděj ukáže na hráče.',
  },
  gunslinger: {
    name: 'Pistolník',
    ability:
      'Každý den po sečtení hlasů prvního hlasování můžeš vybrat 1 hráče, který hlasoval: ten zemře.',
  },
  scapegoat: {
    name: 'Obětní beránek',
    ability:
      'Pokud je odhlasován k popravě hráč tvé příslušnosti, můžeš být popraven místo něj.',
  },
  beggar: {
    name: 'Žebrák',
    ability:
      'K hlasování musíš použít hlasovací žeton. Pokud ti mrtvý hráč dá svůj hlasovací žeton, dozvíš se jeho příslušnost. Jsi zdravý a střízlivý.',
  },
  grandmother: {
    name: 'Babička',
    ability:
      'Začínáš s informací o jednom dobrém hráči a jeho postavě. Pokud ho zabije Démon, zemřeš také.',
    reminders: ['Grandchild'],
    firstNightReminder:
      'Ukažte na hráče, který je její vnouče a ukažte jí žeton jeho postavy.',
    otherNightReminder: 'Pokud Démon zabil vnouče, Babička zemře.',
  },
  sailor: {
    name: 'Námořník',
    ability:
      'Každou noc vybereš 1 živého hráče: buď ty, nebo on jste až do soumraku opilí. Nemůžeš zemřít.',
    reminders: ['Opilý'],
    firstNightReminder: 'Námořník vybere 1 živého hráče.',
    otherNightReminder: 'Námořník vybere 1 živého hráče.',
  },
  chambermaid: {
    name: 'Komorná',
    ability:
      'Každou noc vybereš 2 živé hráče (ne sebe): dozvíš se, kolik z nich bylo tu noc probuzeno na základě jejich schopnosti.',
    firstNightReminder: 'Komorná vybere 2 živé hráče. Ukažte počet prstů.',
    otherNightReminder: 'Komorná vybere 2 živé hráče. Ukažte počet prstů.',
  },
  exorcist: {
    name: 'Exorcista',
    ability:
      'Každou noc* vybereš 1 hráče (jiného než tu minulou): pokud to bude Démon, dozví se, kdo jsi, ale tu noc se neprobudí.',
    reminders: ['Vybraný'],
    otherNightReminder:
      'Exorcista vybere 1 hráče. Uspěte Exorcistu. Pokud Exorcista vybral Démona: Probuďte Démona. Ukažte mu žeton TATO POSTAVA TĚ VYBRALA a žeton Exorcisty. Ukažte na Exorcistu.',
  },
  innkeeper: {
    name: 'Hostinský',
    ability:
      'Každou noc* vybereš 2 hráče: tu noc nemůžou zemřít, ale 1 z nich je až do soumraku opilý.',
    reminders: ['Chráněný', 'Opilý'],
    otherNightReminder: 'Hostinský vybere 2 hráče.',
  },
  gambler: {
    name: 'Gambler',
    ability:
      'Každou noc* vybereš 1 hráče a zkusíš uhodnout jeho postavu: pokud bude tvůj tip špatný, zemřeš.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Gambler vybere 1 hráče.',
  },
  gossip: {
    name: 'Drbna',
    ability:
      'Každý den můžeš učinit veřejné prohlášení. Pokud bude pravdivé, tu noc někdo zemře.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Pokud se Drbně podařilo zabít hráče, zemře.',
  },
  courtier: {
    name: 'Lichotník',
    ability:
      'Jednou za hru, v noci, vybereš 1 postavu: bude opilá 3 noci a 3 dny.',
    reminders: ['Opilý 3', 'Opilý 2', 'Opilý 1', 'Bez schopnosti'],
    firstNightReminder: 'Lichotník může vybrat 1 postavu.',
    otherNightReminder: 'Lichotník může vybrat 1 postavu.',
  },
  professor: {
    name: 'Profesor',
    ability:
      'Jednou za hru, v noci*, vybereš 1 mrtvého hráče: pokud je to Měšťan, je oživen.',
    reminders: ['Živý', 'Bez schopnosti'],
    otherNightReminder: 'Profesor může vybrat 1 mrtvého hráče.',
  },
  minstrel: {
    name: 'Pěvec',
    ability:
      'Když Přisluhovač zemře popravou, všichni hráči (až na Pocestné) jsou až do soumraku dalšího dne opilí.',
    reminders: ['Všichni jsou opilí'],
  },
  tealady: {
    name: 'Čajová dáma',
    ability:
      'Pokud jsou oba tví nejbližší živí sousedé (1 z každé strany) na straně dobra, nemohou zemřít.',
    reminders: ['Nemůže zemřít'],
  },
  pacifist: {
    name: 'Pacifista',
    ability: 'Popravení hráči dobra nemusí zemřít.',
  },
  fool: {
    name: 'Šašek',
    ability: 'Když máš zemřít poprvé, nezemřeš.',
    reminders: ['Bez schopnosti'],
  },
  tinker: {
    name: 'Dráteník',
    ability: 'Můžeš kdykoli zemřít.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Dráteník může zemřít.',
  },
  moonchild: {
    name: 'Dítě měsíce',
    ability:
      'Když se dozvíš o své smrti, veřejně vybereš 1 živého hráče. Pokud je na straně dobra, tu noc zemře.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Pokud se Dítěti měsíce podařilo zabít dobrého hráče, zemře.',
  },
  goon: {
    name: 'Hňup',
    ability:
      'Každou noc první hráč, který tě označí na základě své schopnosti, je až do soumraku opilý. Získáváš jeho příslušnost.',
    reminders: ['Opilý'],
  },
  lunatic: {
    name: 'Blázen',
    ability:
      'Myslíš si, že jsi Démon, ale nejsi. Démon ví, kdo jsi a koho v noci vybíráš.',
    reminders: ['Útok 1', 'Útok 2', 'Útok 3'],
    firstNightReminder:
      'Pokud je ve hře alespoň 7 hráčů, probuďte Blázna. Ukažte mu žeton TOTO JSOU TVÍ PŘISLUHOVAČI. Ukažte na libovolné hráče. Ukažte mu žeton TYTO POSTAVY NEJSOU VE HŘE. Ukažte mu 3 žetony dobrých postav. Uspěte Blázna. Probuďte Démona. Ukažte mu žeton JSI a pak žeton Démona. Ukažte mu žeton TENTO HRÁČ JE a pak žeton Blázna. Ukažte na Blázna.',
    otherNightReminder:
      'Udělejte vše tak, aby to vypadalo, že jedná skutečný Démon. Uspěte Blázna. Probuďte Démona.</br>Ukažte žeton Blázna a ukažte na hráče, kterého Blázen vybral.',
  },
  godfather: {
    name: 'Kmotr',
    ability:
      'Začínáš s informací, kteří Podivíni jsou ve hře. Pokud 1 z nich ve dne zemře, vybereš tu noc 1 hráče: ten zemře. [-1 nebo +1 Podivín]',
    reminders: ['Dnes zemřel', 'Mrtvý'],
    firstNightReminder: 'Ukažte mu žetony postav všech podivínů ve hře.',
    otherNightReminder: 'Pokud dnes zemřel Podivín, Kmotr vybere hráče.',
  },
  devilsadvocate: {
    name: 'Ďáblův advokát',
    ability:
      'Každou noc vybereš 1 živého hráče (jiného než tu minulou): pokud by měl být následující den popraven, nezemře.',
    reminders: ['Survives execution'],
    firstNightReminder: 'Ďáblův advokát vybere 1 živého hráče.',
    otherNightReminder: 'Ďáblův advokát vybere 1 živého hráče.',
  },
  assassin: {
    name: 'Nájemný vrah',
    ability:
      'Jednou za hru, v noci*, vybereš 1 hráče: ten zemře, i pokud by z jakéhokoli důvodu nemohl.',
    reminders: ['Mrtvý', 'Bez schopnosti'],
    otherNightReminder: 'Nájemný vrah může vybrat 1 hráče.',
  },
  mastermind: {
    name: 'Strůjce',
    ability:
      'Pokud Démon zemře popravou (což obvykle znamená konec hry), hraje se ještě 1 den. Je-li pak někdo popraven, jeho tým prohrává.',
  },
  zombuul: {
    name: 'Zombuul',
    ability:
      'Každou noc*, pokud ten den nikdo nezemřel, vybereš 1 hráče: ten zemře. Když zemřeš poprvé, žiješ a jevíš se jako mrtvý.',
    reminders: ['Dnes zemřel', 'Mrtvý'],
    otherNightReminder: 'Pokud dnes nikdo nezemřel, Zombuul vybere 1 hráče.',
  },
  pukka: {
    name: 'Pukka',
    ability:
      'Každou noc vybereš 1 hráče: je otrávený. Hráč otrávený předchozí noc zemře a přestane být otrávený.',
    reminders: ['Otrávený', 'Mrtvý'],
    firstNightReminder: 'Pukka vybere 1 hráče.',
    otherNightReminder:
      'Pukka vybere 1 hráče. Hráč otrávený předchozí noc zemře a přestane být otrávený.',
  },
  shabaloth: {
    name: 'Shabaloth',
    ability:
      'Každou noc* vybereš 2 hráče: ti zemřou. Hráč zabitý předchozí noc může být vyvržen zpět (oživen).',
    reminders: ['Mrtvý', 'Živý'],
    otherNightReminder:
      'Hráč vybraný Shabalothem předchozí noc může být vyvržen zpět. Shabaloth vybere 2 hráče.',
  },
  po: {
    name: 'Pó',
    ability:
      'Každou noc* můžeš vybrat 1 hráče: ten zemře. Pokud ses naposled rozhodl nikoho nevybrat, tuto noc vybereš 3 hráče.',
    reminders: ['Mrtvý', '3 útoky'],
    otherNightReminder:
      'Pó buď vybere 1 hráče, NEBO vybere 3 hráče, pokud naposledy nevybral nikoho.',
  },
  apprentice: {
    name: 'Učedník',
    ability:
      'Během své první noci získáváš schopnost Měšťana nebo Přisluhovače dle své příslušnosti.',
    reminders: ['Je učedník'],
    firstNightReminder:
      'Ukažte Učedníkovi žeton JSI a pak žeton Měšťana nebo Přisluhovače.',
  },
  matron: {
    name: 'Matrona',
    ability:
      'Každý den můžeš až třikrát vybrat 2 hráče, kteří si prohodí svá místa. Hráči nemohou odejít ze svého místa k soukroému hovoru.',
  },
  judge: {
    name: 'Soudce',
    ability:
      'Jednou za hru, pokud nominoval jiný hráč, můžeš rozhodnout o výsledku této nominace (odsouzení nebo omilostnění).',
    reminders: ['Bez schopnosti'],
  },
  bishop: {
    name: 'Biskup',
    ability:
      'Jen vypravěč může nominovat. Každý den musí být nominován alespoň 1 hráč z opačného týmu.',
    reminders: ['Nominuje dobro', 'Nominuje zlo'],
  },
  voudon: {
    name: 'Vudun',
    ability:
      'Pouze ty a mrtví můžete hlasovat. Nepotřebují k tomu hlasovací žeton. Minimální počet hlasů není potřeba.',
  },
  clockmaker: {
    name: 'Hodinář',
    ability:
      'Začínáš s informací, kolik kroků je Démon od svého nejbližšího Přisluhovače.',
    firstNightReminder: 'Ukažte počet prstů.',
  },
  dreamer: {
    name: 'Snílek',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe ani Pocestného): dozvíš se 1 dobrou a 1 zlou postavu. Jednou z nich je vybraný hráč.',
    firstNightReminder:
      'Snílek ukáže na 1 hráče. Ukažte mu 1 žeton dobré postavy a 1 žeton zlé postavy. 1 z toho musí být správný žeton postavy vybraného hráče.',
    otherNightReminder:
      'Snílek ukáže na 1 hráče. Ukažte mu 1 žeton dobré postavy a 1 žeton zlé postavy. 1 z toho musí být správný žeton postavy vybraného hráče.',
  },
  snakecharmer: {
    name: 'Zaklínač hadů',
    ability:
      'Každou noc vybereš 1 živého hráče: pokud je to Démon, prohodíte si postavu i příslušnost a on je otrávený.',
    reminders: ['Poisoned'],
    firstNightReminder:
      'Zaklínač hadů vybere 1 hráče. Pokud vybral Démona: Ukažte mu žeton JSI a žeton Démona. Ukažte palec dolů. Prohoďte žetony Zaklínače hadů a Démona. Uspěte starého Zaklínače hadů. Probuďte starého Démona. Ukažte mu žeton JSI a žeton Zaklínače hadů. Ukažte palec nahoru.',
    otherNightReminder:
      'Zaklínač hadů vybere 1 hráče. Pokud vybral Démona: Ukažte mu žeton JSI a žeton Démona. Ukažte palec dolů. Prohoďte žetony Zaklínače hadů a Démona. Uspěte starého Zaklínače hadů. Probuďte starého Démona. Ukažte mu žeton JSI a žeton Zaklínače hadů. Ukažte palec nahoru.',
  },
  mathematician: {
    name: 'Matematik',
    ability:
      'Každou noc se dozvíš, kolik schopností hráčů fungovalo abnormálně (od úsvitu) v důsledku schopnosti jiné postavy.',
    reminders: ['Abnormalní'],
    firstNightReminder: 'Ukažte počet prstů.',
    otherNightReminder: 'Ukažte počet prstů.',
  },
  flowergirl: {
    name: 'Květinářka',
    ability: 'Každou noc* se dozvíš, zda Démon ten den hlasoval.',
    reminders: ['Démon hlasoval', 'Démon nehlasoval'],
    otherNightReminder: 'Přikývněte, nebo zavrťte hlavou.',
  },
  towncrier: {
    name: 'Městský vyvolávač',
    ability: 'Každou noc* se dozvíš, zda Přisluhovač ten den nominoval.',
    reminders: ['Přisluhovač nenominoval', 'Přisluhovač nominoval'],
    otherNightReminder: 'Přikývněte, nebo zavrťte hlavou.',
  },
  oracle: {
    name: 'Věštec',
    ability: 'Každou noc* se dozvíš, kolik zlých hráčů je mrtvých.',
    otherNightReminder: 'Ukažte počet prstů.',
  },
  savant: {
    name: 'Učenec',
    ability:
      'Každý den můžeš přijít soukromě za vypravěčem a dozvědět se od něj 2 informace. Jedna z nich je pravdivá, jedna falešná.',
  },
  seamstress: {
    name: 'Švadlena',
    ability:
      'Jednou za hru, v noci, vybereš 2 hráče (ne sebe): dozvíš se, zda je jejich příslušnost stejná.',
    reminders: ['Bez schopnosti'],
    firstNightReminder:
      'Švadlena může vybrat 2 hráče. Přikývněte, nebo zavrťte hlavou.',
    otherNightReminder:
      'Švadlena může vybrat 2 hráče. Přikývněte, nebo zavrťte hlavou.',
  },
  philosopher: {
    name: 'Filozof',
    ability:
      'Jednou za hru, v noci, vybereš 1 dobrou postavu: získáš její schopnost. Pokud je tato postava ve hře, stává se opilou.',
    reminders: ['Opilý', 'Je Filosof'],
    firstNightReminder:
      'Filosof může vybrat 1 postavu. V případě potřeby mu prohoďte žeton postavy.',
    otherNightReminder:
      'Filosof může vybrat 1 postavu. V případě potřeby mu prohoďte žeton postavy.',
  },
  artist: {
    name: 'Umělec',
    ability:
      'Jednou za hru, během dne, soukromě položíš vypravěči jakoukoli otázku, na kterou může odpovědět „ano/ne“.',
    reminders: ['Bez schopnosti'],
  },
  juggler: {
    name: 'Kejklíř',
    ability:
      'První den zkus veřejně uhádnout až 5 postav hráčů. Tu noc se dozvíš, kolik jsi jich uhodl správně.',
    reminders: ['Correct'],
    otherNightReminder: 'Ukažte počet prstů.',
  },
  sage: {
    name: 'Mudrc',
    ability: 'Pokud tě zabije Démon, dozvíš se, že je to jeden ze dvou hráčů.',
    otherNightReminder:
      'Pokud Mudrce zabil Démon, probuďte Mudrce a ukažte na 2 hráče. 1 z nich musí být Démon.',
  },
  mutant: {
    name: 'Mutant',
    ability:
      'Pokud jsi „posedlý“ představou, že jsi Podivín, můžeš být popraven.',
  },
  sweetheart: {
    name: 'Zlatíčko',
    ability: 'Když zemřeš, 1 hráč je odteď trvale opilý.',
    reminders: ['Opilý'],
    otherNightReminder:
      'Popkud Zlatíčko zemřelo, 1 hráč je ihned otrávený. Piokud jste tak již neučinili, udělejte to teď.',
  },
  barber: {
    name: 'Holič',
    ability:
      'Pokud jsi tento den nebo tuto noc zemřel, Démon může vybrat 2 hráče (ne dalšího Démona), kteří si prohodí postavy.',
    reminders: ['Haircuts tonight'],
    otherNightReminder:
      'Pokud tento den nebo tuto noc Holič umřel, ukažte Démonovi žeton TATO POSTAVA TĚ VYBRALA a žeton Holiče. Pokud Démon vybere 2 hráče, jednoho po druhém je probuďte. Ukažte jim žeton JSI a žeton jejich nové postavy.',
  },
  klutz: {
    name: 'Nešika',
    ability:
      'Když se dozvíš o své smrti, veřejně vybereš 1 živého hráče: pokud je zlý, tvůj tým prohrává.',
  },
  eviltwin: {
    name: 'Zlé dvojče',
    ability:
      'Ty a hráč druhé strany o sobě víte. Pokud je ten dobrý z vás popraven, zlo vyhrává. Dobro nemůže vyhrát, jste-li oba naživu.',
    reminders: ['Twin'],
    firstNightReminder:
      'Probuďte obě dvojčata. Nechte je navázat oční kontakt. Ukažte žeton postavy Dobrého dvojčete Zlému dvojčeti a naopak.',
  },
  witch: {
    name: 'Čarodějnice',
    ability:
      'Každou noc vybereš 1 hráče: pokud bude následující den nominovat, zemře. O tuto schopnost přicházíš, pokud jsou naživu pouze 3 hráči.',
    reminders: ['Cursed'],
    firstNightReminder: 'Čarodějnice vybere 1 hráče.',
    otherNightReminder: 'Čarodějnice vybere 1 hráče.',
  },
  cerenovus: {
    name: 'Cerenovus',
    ability:
      'Každou noc vybereš 1 hráče a 1 dobrou postavu: následující den musí být vybraný hráč „posedlý“ představou, že je tou postavou, jinak může být popraven.',
    reminders: ['Mad'],
    firstNightReminder:
      'Cerenovus vybere 1 hráče a 1 dobrou postavu. Uspěte Cerenovuse. Probuďte vybraného hráče. Ukažte mu žeton TATO POSTAVA TĚ VYBRALA a žeton Cerenovuse a pak i žeton postavy, ktrou má být posedlý.',
    otherNightReminder:
      'Cerenovus vybere 1 hráče a 1 dobrou postavu. Uspěte Cerenovuse. Probuďte vybraného hráče. Ukažte mu žeton TATO POSTAVA TĚ VYBRALA a žeton Cerenovuse a pak i žeton postavy, ktrou má být posedlý.',
  },
  pithag: {
    name: 'Ježibaba',
    ability:
      'Každou noc* vybereš 1 hráče a 1 postavu, kterou se vybraný hráč stane (pokud není ve hře). Pokud je takto stvořen Démon, tu noc může zemřít kdokoli.',
    otherNightReminder:
      'Ježibaba vybere 1 hráče a 1 postavu. Pokud vybere postavu, která není ve hře: Uspěte Ježibabu. Probuďte vybraného hráče. Ukažte mu žeton JSI a jeho nový žeton postavy.',
  },
  fanggu: {
    name: 'Fang Gu',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Když takto poprvé zabiješ Podivína, stane se Fang Guem a ty zemřeš namísto něj. [+1 Podivín]',
    reminders: ['Mrtvý', 'Once'],
    otherNightReminder:
      'Fang Gu vybere 1 hráče. Pokud vybral Podivína: Nahraďte žeton tohoto Podivína náhradním žetonem Fang Gu. Uspěte Fang Gu. Probuďte vybraného hráče. Ukažte mu žeton JSI a žeton Fang Gu. Ukažte mu palec dolů.',
  },
  vigormortis: {
    name: 'Vigormortis',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Přisluhovači, které zabiješ, si ponechají svou schopnost a otráví 1 svého sousedícího Měšťana. [-1 Podivín]',
    reminders: ['Mrtvý', 'Has ability', 'Poisoned'],
    otherNightReminder:
      'Vigormortis vybere 1 hráče. Pokud vybral Přisluhovače, 1 sousedící Měšťan je otráven.',
  },
  nodashii: {
    name: 'No Dashii',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Dva tví sousedící Měšťané (1 z každé strany) jsou otráveni.',
    reminders: ['Mrtvý', 'Poisoned'],
    otherNightReminder: 'No Dashii vybere 1 hráče.',
  },
  vortox: {
    name: 'Vortox',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Schopnosti Měšťanů dávají falešné informace. Pokud není někdo každý den popraven, zlo vyhrává.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Vortox vybere 1 hráče.',
  },
  barista: {
    name: 'Kavárník',
    ability:
      'Každou noc až do soumraku buď 1) je jeden hráč střízlivý, zdravý a dostává pravdivé informace, nebo 2) jeho schopnost funguje dvakrát. Dozví se, která možnost platí.',
    reminders: ['Sober & Healthy', 'Ability twice'],
    firstNightReminder:
      'Vyberte hráče, probuďte ho a řekněte mu, jaký účinek Kavárníka ho ovlivňuje. Podle toho s ním naložte (střízlivý/zdravý/pravdivé informace nebo jeho schopnost funguje dvakrát).',
    otherNightReminder:
      'Vyberte hráče, probuďte ho a řekněte mu, jaký účinek Kavárníka ho ovlivňuje. Podle toho s ním naložte (střízlivý/zdravý/pravdivé informace nebo jeho schopnost funguje dvakrát).',
  },
  harlot: {
    name: 'Nevěstka',
    ability:
      'Každou noc* vybereš 1 živého hráče: pokud souhlasí, dozvíš se jeho postavu, ale můžete oba zemřít.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Nevěstka ukáže na libovolného hráče. Poté Nevěstku uspěte. Probuďte vybraného hráče, ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Nevěstky. Hráč buď přikývne (ano), nebo zavrtí hlavou (ne). Pokud přikývl, probuďte Nevěstku a ukažte jí žeton postavy vybraného hráče. Poté se můžete rozhodnout, že oba hráči zemřou.',
  },
  butcher: {
    name: 'Řezník',
    ability: 'Každý den po první popravě můžeš znovu někoho nominovat.',
  },
  bonecollector: {
    name: 'Sběratel kostí',
    ability:
      'Jednou za hru, v noci*, vybereš 1 mrtvého hráče: až do soumraku má zpět svou schopnost.',
    reminders: ['Bez schopnosti', 'Má schopnost'],
    otherNightReminder:
      'Sběratel kostí buď zavrtí hlavou (ne), nebo ukáže na jakéhokoli mrtvého hráče. Pokud ukázal na mrtvého hráče, položte jeho žeton MÁ SCHOPNOST k žetonu postavy vybraného hráče. (Možná ho budete muset tuto noc probudit, aby ji použil.)',
  },
  deviant: {
    name: 'Deviant',
    ability: 'Pokud jsi dnes byl vtipný, nemůžeš zemřít vyhoštěním.',
  },
  noble: {
    name: 'Šlechtic',
    ability: 'Začínáš s informací o 3 hráčích, z kterých přesně 1 je zlý.',
    reminders: ['Seen'],
    firstNightReminder:
      'Ukažte na 3 hráče v libovolném pořadí, z nichž přesně 1 je zlý.',
  },
  bountyhunter: {
    name: 'Lovec odměn',
    ability:
      'Začínáš s informací o 1 zlém hráči. Pokud tento hráč zemře, dozvíš se dalšího zlého hráče. [1 Měšťan je zlý]',
    reminders: ['Known'],
    firstNightReminder:
      'Ukažte na 1 zlého hráče. Probuďte Měšťana, který je zlý, a ukažte mu žeton JSI a poté signál palec dolů (zlo).',
    otherNightReminder:
      'Pokud známý zlý hráč zemřel, ukažte na dalšího zlého hráče.',
  },
  pixie: {
    name: 'Víla',
    ability:
      'Začínáš s informací o 1 Měšťanovi, který je ve hře. Pokud jsi posedlá, že jsi tato postava, získáš jeho schopnost, když umře.',
    reminders: ['Mad', 'Has ability'],
    firstNightReminder: 'Ukažte Víle žeton 1 Měšťana, který je ve hře.',
  },
  general: {
    name: 'Generál',
    ability:
      'Každou noc se dozvíš, která strana má podle vypravěče navrch. Dobro, zlo, nebo nikdo.',
    firstNightReminder:
      'Ukažte Generálovi palec nahoru, pokud vítězí dobro, palec dolů, pokud vítězí zlo, nebo palec do strany, pokud nemá navrch nikdo.',
    otherNightReminder:
      'Ukažte Generálovi palec nahoru, pokud vítězí dobro, palec dolů, pokud vítězí zlo, nebo palec do strany, pokud nemá navrch nikdo.',
  },
  preacher: {
    name: 'Kazatel',
    ability:
      'Každou noc vybereš 1 hráče. Pokud to je Přisluhovač, dozví se to. Všichni takto vybraní Přisluhovači ztrácejí svou schopnost.',
    reminders: ['At a sermon'],
    firstNightReminder:
      'Kazatel vybere hráče. Pokud vybral Přisluhovače, probuďte Přisluhovače a ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Kazatele.',
    otherNightReminder:
      'Kazatel vybere hráče. Pokud vybral Přisluhovače, probuďte Přisluhovače a ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Kazatele.',
  },
  villageidiot: {
    name: 'Vesnický pobuda',
    ability:
      'Každou noc vybereš 1 hráče: dozvíš se jeho příslušnost. [+0 až +2 Vesnických pobudů, přičemž jeden z těch dalších je opilý.]',
    reminders: ['Opilý'],
    firstNightReminder:
      'Vesnický pobuda ukáže na hráče; ukažte palec nahoru, pokud je tento hráč dobrý, nebo palec dolů, pokud je zlý.',
    otherNightReminder:
      'Vesnický pobuda ukáže na hráče; ukažte palec nahoru, pokud je tento hráč dobrý, nebo palec dolů, pokud je zlý.',
  },
  king: {
    name: 'Král',
    ability:
      'Pokud je mrtvých více než živých, každou noc se dozvíš jednu živou postavu. Démon ví, kdo jsi.',
    firstNightReminder:
      'Probuďte Démona, ukažte mu žeton TATO POSTAVA TĚ VYBRALA, poté žeton Krále a ukažte na hráče Krále.',
    otherNightReminder:
      'Pokud je mrtvých více než živých, ukažte Králi žeton postavy některého živého hráče.',
  },
  balloonist: {
    name: 'Balonář',
    ability:
      'Každou noc se dozvíš o 1 hráči jiného typu postavy než poslední noc. [+0 nebo +1 Podivín]',
    reminders: [
      'Seen Townsfolk',
      'Seen Outsider',
      'Seen Minion',
      'Seen Demon',
      'Seen traveller',
    ],
    firstNightReminder:
      'Vyberte typ postavy. Ukažte na hráče, jehož postava je tohoto typu. Položte Balonářův žeton VIDĚN na žeton této postavy.',
    otherNightReminder:
      'Vyberte typ postavy, u kterého ještě není žádný žeton VIDĚN vedle postavy tohoto typu. Ukažte na hráče, jehož postava je tohoto typu (pokud nějaký je). Položte Balonářův žeton VIDĚN na žeton této postavy.',
  },
  cultleader: {
    name: 'Vůdce sekty',
    ability:
      'Každou noc získáváš příslušnost svého živého souseda. Pokud se do tvé sekty přidají všichni dobří hráči, tvůj tým vyhrává.',
    firstNightReminder:
      'Pokud se Vůdci sekty změnila příslušnost, ukažte mu podle toho signál palec nahoru (dobro) nebo palec dolů (zlo).',
    otherNightReminder:
      'Pokud se Vůdci sekty změnila příslušnost, ukažte mu podle toho signál palec nahoru (dobro) nebo palec dolů (zlo).',
  },
  lycanthrope: {
    name: 'Vlkodlak',
    ability:
      'Každou noc* vybereš 1 živého hráče: pokud je na straně dobra, zemře, ale Démon tu noc nezabíjí. Jeden dobrý hráč se jeví jako zlý.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Vlkodlak ukáže na živého hráče: pokud je dobrý, zemře a této noci už nikdo další zemřít nemůže.',
  },
  amnesiac: {
    name: 'Amnesiak',
    ability:
      'Nevíš, jakou máš schopnost. Každý den ji zkusíš u vypravěče v soukromí uhodnout. Dozvíš se, jak přesný je tvůj odhad.',
    reminders: ['?'],
    firstNightReminder:
      'Rozhodněte o celé schopnosti Amnesiaka. Pokud jeho schopnost způsobí, že se má tuto noc probudit, probuďte ho a proveďte jeho schopnost.',
    otherNightReminder:
      'Pokud schopnost Amnesiaka způsobí, že se má tuto noc probudit, probuďte ho a proveďte jeho schopnost.',
  },
  nightwatchman: {
    name: 'Noční hlídka',
    ability: 'Jednou za hru vybereš hráče: dozví se, kdo jsi.',
    reminders: ['Bez schopnosti'],
    firstNightReminder:
      'Noční hlídka může ukázat na hráče. Probuďte tohoto hráče, ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Noční hlídky, pak ukažte na hráče Noční hlídky.',
    otherNightReminder:
      'Noční hlídka může ukázat na hráče. Probuďte tohoto hráče, ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Noční hlídky, pak ukažte na hráče Noční hlídky.',
  },
  engineer: {
    name: 'Inženýr',
    ability:
      'Jednou za hru během noci můžeš vybrat, kteří Přisluhovači, nebo Démon bude ve hře.',
    reminders: ['Bez schopnosti'],
    firstNightReminder:
      'Inženýr buď zavrtí hlavou (ne), nebo ukáže na Démona, nebo ukáže na odpovídající počet Přisluhovačů. Pokud si Inženýr vybral postavy, nahraďte Démona nebo Přisluhovače zvolenými postavami, poté probuďte příslušné hráče a ukažte jim žeton JSI a jejich nové žetony postav.',
    otherNightReminder:
      'Inženýr buď zavrtí hlavou (ne), nebo ukáže na Démona, nebo ukáže na odpovídající počet Přisluhovačů. Pokud si Inženýr vybral postavy, nahraďte Démona nebo Přisluhovače zvolenými postavami, poté probuďte příslušné hráče a ukažte jim žeton JSI a jejich nové žetony postav.',
  },
  fisherman: {
    name: 'Rybář',
    ability:
      'Jednou za hru můžeš soukromě zajít za Vypravěčem a získat radu, jak má tvůj tým vyhrát.',
    reminders: ['Bez schopnosti'],
  },
  huntsman: {
    name: 'Lovec',
    ability:
      'Jednou za hru v noci vybereš živého hráče: pokud je to Kráska, stane se Měšťanem, který není ve hře. [+ Kráska]',
    reminders: ['Bez schopnosti'],
    firstNightReminder:
      'Lovec buď zavrtí hlavou (ne), nebo ukáže na hráče. Pokud ukáže na Krásku, probuďte ji, ukažte jí žeton JSI a žeton Měšťana, který není ve hře.',
    otherNightReminder:
      'Lovec buď zavrtí hlavou (ne), nebo ukáže na hráče. Pokud ukáže na Krásku, probuďte ji, ukažte jí žeton JSI a žeton Měšťana, který není ve hře.',
  },
  alchemist: {
    name: 'Alchymista',
    ability:
      'Máš schopnost Přisluhovače. Při použití shopnosti Vypravěč může vyzvat ke změně volby.',
    remindersGlobal: ['Je Alchymista'],
    firstNightReminder: 'Ukažte mu žeton JSI a žeton postavy Přisluhovače.',
  },
  farmer: {
    name: 'Farmář',
    ability: 'Pokud v noci zemřeš, živý dobrý hráč se stane Farmářem.',
    otherNightReminder:
      'Pokud dnes v noci zemřel Farmář, vyberte jiného dobrého hráče a udělejte z něj Farmáře. Probuďte tohoto hráče, ukažte mu žeton JSI a žeton postavy Farmáře.',
  },
  magician: {
    name: 'Kouzelník',
    ability:
      'Démon si myslí, že jsi Přisluhovač. Přisluhovači si myslí, že jsi Démon.',
    firstNightReminder:
      'Během informací pro Přisluhovače ukažte na Kouzelníka a Démona. Během informací pro Démona ukažte na Kouzelníka a Přisluhovače.',
  },
  choirboy: {
    name: 'Zpěváček',
    ability:
      'Pokud Démon zabije Krále, dozvíš se, který hráč je Démon. [+ Král]',
    otherNightReminder:
      'Pokud Krále zabil Démon, probuďte Zpěváčka a ukažte na hráče Démona.',
  },
  poppygrower: {
    name: 'Maková panenka',
    ability:
      'Přisluhovači a Démoni se navzájem neznají. Pokud zemřeš, tu noc se o sobě dozvědí.',
    reminders: ['Evil wakes'],
    firstNightReminder:
      'Nesdělujte Démonovi ani Přisluhovačům, kdo jsou ostatní z nich.',
    otherNightReminder:
      'Pokud Maková panenka zemřela, ukažte Přisluhovačům a Démonovi, kdo jsou navzájem.',
  },
  atheist: {
    name: 'Ateista',
    ability:
      'Vypravěč může porušovat pravidla hry a dobro vyhraje, je-li popraven (i když jsi mrtvý). [Žádné zlé postavy]',
  },
  ogre: {
    name: 'Zlobr',
    ability:
      'Během své první noci vybereš 1 hráče (ne sebe): získáváš jeho příslušnost (nevíš jakou), i když jsi opilý nebo otrávený.',
    reminders: ['Friend'],
    firstNightReminder:
      'Zlobr ukáže na hráče (ne na sebe) a získá jeho příslušnost.',
  },
  cannibal: {
    name: 'Kanibal',
    ability:
      'Máš schopnost naposledy popravené postavy, která zemřela. Pokud byla na straně zla, jsi otrávený, dokud nezemře popravou dobrý hráč.',
    reminders: ['Poisoned', 'Dnes zemřel'],
  },
  snitch: {
    name: 'Práskač',
    ability:
      'Přisluhovači začínají s informací o 3 postavách, které nejsou ve hře.',
    firstNightReminder:
      'Po informacích pro Přisluhovače probuďte každého Přisluhovače a ukažte mu tři žetony postav, které nejsou ve hře. Tyto postavy mohou být stejné nebo jiné než ty, které jste ukázali Démonovi i ostatním Přisluhovačům.',
  },
  acrobat: {
    name: 'Akrobat',
    ability:
      'Každou noc* vybereš 1 hráče: pokud tuto noc je nebo se stane opilým nebo otráveným, zemřeš.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Pokud je dobrý živý soused opilý nebo otrávený, hráč Akrobata zemře.',
  },
  puzzlemaster: {
    name: 'Hádankář',
    ability:
      '1 hráč je opilý, i když jsi mrtvý. Jednou za hru můžeš hádat, který. Dozvíš se, kdo je Démon, pokud to uhodneš. V opačném případě dostaneš nesprávnou informaci.',
    reminders: ['Opilý', 'Guess used'],
  },
  heretic: {
    name: 'Heretik',
    ability:
      'Kdokoliv vyhraje, prohrává a kdokoliv prohraje, vyhrává (i když jsi mrtvý).',
  },
  damsel: {
    name: 'Kráska',
    ability:
      'Všichni Přisluhovači vědí, že jsi ve hře. Pokud tě jednou za hru Přisluhovač veřejně uhodne, tvůj tým prohrává.',
    reminders: ['Guess used'],
    firstNightReminder:
      'Probuďte všechny Přisluhovače, ukažte jim žeton TATO POSTAVA TĚ VYBRALA a poté žeton Krásky.',
    otherNightReminder:
      'Pokud ji vybral Lovec, probuďte Krásku, ukažte jí žeton JSI a žeton Měšťana, který není ve hře.',
  },
  golem: {
    name: 'Golem',
    ability:
      'Nominovat můžeš jen jednou za hru. Když tak učiníš a nominovaný není Démon, zemře.',
    reminders: ['Can not nominate'],
  },
  politician: {
    name: 'Politician',
    ability:
      'Pokud jsi byl hráčem, který byl nejvíc zodpovědný za prohru svého týmu, změníš příslušnost a vyhráváš, i když jsi mrtvý.',
  },
  widow: {
    name: 'Vdova',
    ability:
      'Svou první noc nahlédneš do grimoáru a vybereš 1 hráče: je otrávený. Jeden dobrý hráč ví, že Vdova je ve hře.',
    reminders: ['Poisoned'],
    remindersGlobal: ['Ví'],
    firstNightReminder:
      'Ukažte Vdově grimoár na tak dlouho, jak potřebuje. Vdova ukáže na hráče, který je otrávený. Probuďte jednoho dobrého hráče. Ukažte mu žeton TYTO POSTAVY JSOU VE HŘE a poté žeton postavy Vdovy.',
  },
  fearmonger: {
    name: 'Strachotvůrce',
    ability:
      'Každou noc vybereš 1 hráče. Pokud ho nominuješ a je popraven, jeho tým prohrává. Všichni hráči vědí, když si vybereš nového hráče.',
    reminders: ['Fear'],
    firstNightReminder:
      'Strachotvůrce ukáže na hráče. Položte žeton STRACH k tomuto hráči a oznamte, že schopností Strachotvůrce byl vybrán nový hráč.',
    otherNightReminder:
      'Strachotvůrce ukáže na hráče. Pokud je jiný než minulou noc, položte žeton STRACH k tomuto hráči a oznamte, že schopností Strachotvůrce byl vybrán nový hráč.',
  },
  psychopath: {
    name: 'Psychopat',
    ability:
      'Každý den, před nominacemi, můžeš veřejně vybrat hráče: ten zemře. Pokud jsi popraven, zemřeš, jenom když prohraješ kámen-nůžky-papír.',
  },
  goblin: {
    name: 'Skřet',
    ability:
      'Pokud během své nominace veřejně prohlásíš, že jsi Skřet a jsi ten den popraven, tvůj tým vyhrává.',
    reminders: ['Claimed'],
  },
  mezepheles: {
    name: 'Mezefeles',
    ability:
      'Začínáš s informací o tajném slově. První dobrý hráč, který toto slovo vysloví, se v noci stane zlým.',
    reminders: ['Turns evil', 'Bez schopnosti'],
    firstNightReminder: 'Ukažte Mezefelovi jeho tajné slovo.',
    otherNightReminder:
      'Probuďte prvního dobrého hráče, který vyslovil Mezefelovo tajné slovo, a ukažte mu žeton JSI a poté signál palec dolů (zlo).',
  },
  marionette: {
    name: 'Marioneta',
    ability:
      'Myslíš si, že jsi na straně dobra, ale nejsi. Démon ví, kdo jsi. [Sousedíš s Démonem]',
    remindersGlobal: ['Je Marioneta'],
    firstNightReminder:
      'Vyberte jednoho z dobrých hráčů sousedících s Démonem a položte k němu žeton JE MARIONETA. Probuďte Démona a ukažte mu Marionetu.',
  },
  summoner: {
    name: 'Vyvolávač',
    ability:
      'Dostaneš 3 blafy. Třetí noc vybereš hráče: stane se zlým Démonem dle tvé volby. [Žádný Démon]',
    reminders: ['Night 1', 'Night 2', 'Night 3'],
    firstNightReminder:
      'Ukažte žeton TYTO POSTAVY NEJSOU VE HŘE. Ukažte 3 žetony dobrých postav, které nejsou ve hře.',
    otherNightReminder:
      'Je‑li třetí noc, probuďte Vyvolávače. Ukáže na hráče a na Démona na přehledu postav. Tento hráč se stane tímto Démonem.',
  },
  boomdandy: {
    name: 'Boomdandy',
    ability:
      'Pokud jsi popraven, všichni kromě 3 hráčů zemřou. O minutu později zemře hráč, na kterého ukazuje nejvíce ostatních.',
  },
  vizier: {
    name: 'Vizír',
    ability:
      'Všichni hráči vědí, že jsi Vizír. Nemůžeš zemřít ve dne. Pokud hlasovali dobří hráči, můžeš se rozhodnout někoho okamžitě popravit.',
    firstNightReminder: 'Oznamte, který hráč je Vizír.',
  },
  organgrinder: {
    name: 'Cvičitel opic',
    ability:
      'Všichni hráči mají během hlasování zavřené oči a počet hlasů je tajný. Každou noc si vybereš, jestli chceš být až do soumraku opilý.',
    reminders: ['About To Die', 'Opilý'],
    firstNightReminder:
      'Probuďte Cvičitele opic. Pokud kývne hlavou (ano), označte ho žetonem OPILÝ. Pokud zavrtí hlavou (ne), tento žeton OPILÝ odstraňte.',
    otherNightReminder:
      'Probuďte Cvičitele opic. Pokud kývne hlavou (ano), označte ho žetonem OPILÝ. Pokud zavrtí hlavou (ne), tento žeton OPILÝ odstraňte.',
  },
  boffin: {
    name: 'Boffin',
    ability:
      'Démon (i když je opilý nebo otrávený) má schopnost dobré postavy, která není ve hře. Vy oba víte, o kterou jde.',
    firstNightReminder:
      'Probuďte Boffina a ukažte mu žeton dobré postavy, jejíž schopnost má Démon. Boffina uspěte. Probuďte Démona, ukažte mu žeton Boffina a poté žeton dobré postavy, jejíž schopnost má.',
  },
  yaggababble: {
    name: 'Blabla Jaga',
    ability:
      'Začínáš s informací o tajném rčení. Za každé jeho veřejné vyslovení, které ve dne učiníš, může zemřít jeden hráč.',
    reminders: ['Mrtvý', 'Mrtvý', 'Mrtvý'],
    firstNightReminder: 'Ukažte Blabla Jaze její tajnou frázi.',
    otherNightReminder:
      'Vyberte počet hráčů až do počtu, kolikrát dnes Blabla Jaga veřejně pronesla svou tajnou frázi; tito hráči zemřou.',
  },
  lilmonsta: {
    name: "Lil' Monsta",
    ability:
      "Každou noc si Přisluhovači zvolí, kdo bude hlídat žeton Lil' Monsta a „bude Démonem“. Každou noc* zemře 1 hráč. [+1 Přisluhovač]",
    remindersGlobal: ['Je Démon', 'Mrtvý'],
    firstNightReminder:
      "Probuďte všechny Přisluhovače najednou a nechte je hlasovat ukazováním na toho, kdo má hlídat Lil' Monsta.",
    otherNightReminder:
      "Probuďte všechny Přisluhovače najednou a nechte je hlasovat ukazováním na toho, kdo má hlídat Lil' Monsta. Poté vyberte hráče, který zemře.",
  },
  kazali: {
    name: 'Kazali',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. [Vybereš si, kteří hráči jsou jací Přisluhovači. -? až +? Podivínů]',
    reminders: ['Mrtvý'],
    firstNightReminder:
      'Kazali ukáže na hráče a na Přisluhovače na přehledu postav. Udělá to tolikrát, kolik má být ve hře Přisluhovačů. Změňte žetony těchto hráčů na zvolené žetony Přisluhovačů. Probuďte tyto hráče, ukažte jim žeton JSI, jejich nové žetony Přisluhovačů a palec dolů.',
    otherNightReminder: 'Kazali ukáže na hráče. Tento hráč zemře.',
  },
  lleech: {
    name: 'Pijavice',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Začínáš výběrem 1 živého hráče: je otrávený a ty zemřeš, jen pokud zemře tento hráč.',
    reminders: ['Mrtvý', 'Poisoned'],
    firstNightReminder:
      'Pijavice ukáže na hráče. Položte k němu žeton OTRÁVENÝ.',
    otherNightReminder: 'Pijavice ukáže na hráče. Tento hráč zemře.',
  },
  ojo: {
    name: 'Ojo',
    ability:
      'Každou noc* vybereš postavu: ta zemře. Pokud není ve hře, vypravěč rozhodne o tom, kdo zemře.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Ojo ukáže na postavu na přehledu. Pokud je ve hře, hráč s touto postavou zemře. Pokud není ve hře, vypravěč zvolí, kdo zemře místo ní.',
  },
  alhadikhia: {
    name: 'Al-Hadichia',
    ability:
      'Každou noc* vybereš 3 hráče (všichni se dozví které): každý se v tichosti rozhodne, jestli chce žít nebo zemřít, ale pokud si všichni vyberou život, všichni zemřou.',
    reminders: ['1', '2', '3', 'Chose death', 'Chose life'],
    otherNightReminder:
      'Al‑Hadichia vybere 3 hráče. Oznámte prvního, probuďte ho a nechte ho kývnout hlavou (ano) pro život nebo zavrtět hlavou (ne) pro smrt; podle toho ho zabijte nebo oživte, pak ho uspěte a oznamte dalšího hráče. Pokud jsou po tomto všichni 3 naživu, všichni 3 zemřou.',
  },
  legion: {
    name: 'Legie',
    ability:
      'Každou noc* může zemřít 1 hráč. Pokud pro popravu hlasují jen zlí hráči, poprava nebude úspěšná. Jevíš se také jako Přisluhovač. [Většina hráčů jsou Legie.]',
    reminders: ['Mrtvý', 'About to die'],
    otherNightReminder: 'Vyberte hráče, tento hráč zemře.',
  },
  lordoftyphon: {
    name: 'Pán bouře',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. [Zlí hráči sedí vedle sebe a ty jsi uprostřed. +1 Přisluhovač, -? až +? Podivínů]',
    reminders: ['Mrtvý'],
    firstNightReminder:
      'Probuďte hráče sedící po obou stranách Démona. Ukažte jim žeton JSI, žeton Přisluhovače, kterým se stali, a palec dolů, aby bylo jasné, že jsou zlí.',
    otherNightReminder: 'Pán bouře ukáže na hráče. Tento hráč zemře.',
  },
  leviathan: {
    name: 'Leviathan',
    ability:
      'Pokud jsou popraveni více než jeden dobrý hráč, vyhráváš. Všichni hráči vědí, že je ve hře Leviathan. Po 5. dni vyhrává zlo.',
    reminders: [
      'Day 1',
      'Day 2',
      'Day 3',
      'Day 4',
      'Day 5',
      'Good player executed',
    ],
    firstNightReminder:
      'Položte žeton Leviathana „Den 1“. Oznámte: „Leviathan je ve hře, je Den 1.“',
    otherNightReminder: 'Posuňte žeton dne Leviathana na další den.',
  },
  riot: {
    name: 'Riot',
    ability:
      'Nominovaní hráči zemřou, ale mohou okamžitě znovu nominovat (třetí den musí). Po 3. dni vyhrává zlo. [Všichni Přisluhovači jsou Riot]',
    otherNightReminder:
      'Přesuňte žeton Riot na příslušný den. Pokud je 3. noc, můžete probudit Přisluhovače. Ukažte jim žeton JSI a žeton Riot.',
  },
  gangster: {
    name: 'Gangster',
    ability:
      'Jednou za den můžeš zabít živého souseda, pokud s tím tvůj druhý živý soused souhlasí.',
  },
  gnome: {
    name: 'Gnome',
    ability:
      'Všichni hráči na začátku vědí o jednom hráči tvé příslušnosti. Můžeš se rozhodnout zabít kohokoli, kdo ho nominuje.',
    reminders: ['Amigo'],
  },
  steward: {
    name: 'Steward',
    ability: 'Začínáš s informací o 1 dobrém hráči.',
    reminders: ['Know'],
    firstNightReminder: 'Ukažte na označeného hráče.',
  },
  knight: {
    name: 'Rytíř',
    ability: 'Začínáš s informací o 2 hráčích, kteří nejsou Démon.',
    reminders: ['Know', 'Know'],
    firstNightReminder: 'Ukažte na 2 označené hráče.',
  },
  shugenja: {
    name: 'Shugenja',
    ability:
      'Začínáš s informací o tom, jestli nejbližší zlý hráč k tobě sedí po nebo proti směru hodinových ručiček. V případě stejné vzdálenosti je informace libovolná.',
    firstNightReminder:
      'Pokud nejbližší zlý hráč sedí ve směru hodinových ručiček, ukážte vodorovně prstem tím směrem. Pokud nejbližší zlý hráč sedí proti směru hodinových ručiček, ukážte vodorovně prstem tím směrem. Pokud jsou dva nejbližší zlí hráči stejně daleko, ukážte vodorovně prstem libovolným směrem.',
  },
  highpriestess: {
    name: 'Velekněžka',
    ability:
      'Každou noc se dozvíš, se kterým hráčem by sis měla podle vypravěče promluvit.',
    firstNightReminder: 'Ukažte na hráče.',
    otherNightReminder: 'Ukažte na hráče.',
  },
  alsaahir: {
    name: 'Alsaahir',
    ability:
      'Každý den, když veřejně uhodneš, kteří hráči jsou Přisluhovači a Démoni, dobro vyhrává.',
  },
  princess: {
    name: 'Princezna',
    ability:
      'Během svého prvního dne: pokud nominuješ hráče, který je popraven, Démon tu noc nezabíjí.',
    reminders: ["Doesn't Kill"],
    otherNightReminder:
      'Pokud byl dnes první den Princezny a nominovala a popravila hráče, Démon tuto noc nezabíjí.',
  },
  banshee: {
    name: 'Smrtonoška',
    ability:
      'Pokud tě zabije Démon, všichni se to dozvědí. Od té chvíle můžeš nominovat dvakrát i hlasovat dvakrát v každé nominaci.',
    reminders: ['Has Ability'],
    otherNightReminder:
      'Pokud Smrtonoška zemřela rukou Démona, oznamte, že Smrtonoška zemřela.',
  },
  hermit: {
    name: 'Poustevník',
    ability: 'Máš schopnost všech Podivínů. [-0 nebo -1 Podivín]',
    reminders: ['1', '2', '3'],
  },
  plaguedoctor: {
    name: 'Morový doktor',
    ability: 'Když zemřeš, vypravěč získává schopnost Přisluhovače.',
    reminders: ['Storyteller Ability'],
    otherNightReminder:
      'Pokud Morový doktor zemřel, vypravěč získal schopnost Přisluhovače. Pokud jste tak již neučinili, udělejte to teď.',
  },
  hatter: {
    name: 'Kloboučník',
    ability:
      'Pokud jsi dnes ve dne nebo v noci zemřel, mohou si hráči Přisluhovačů a Démona zvolit nové postavy Přisluhovačů a Démona, kterými budou.',
    reminders: ['Tea Party Tonight'],
    otherNightReminder:
      'Probuďte Přisluhovače a Démona. Každý z nich buď zavrtí hlavou (ne), nebo ukáže na jinou postavu stejného typu, jako je ta jejich současná. Pokud by druhý hráč skončil se stejnou postavou jako někdo jiný, zavrťte hlavou a gestem ho vyzvěte, aby si vybral znovu. Změňte každému hráči postavu na tu, kterou si zvolil.',
  },
  zealot: {
    name: 'Fanatik',
    ability:
      'Pokud je naživu 5 nebo více hráčů, musíš hlasovat při každé nominaci.',
  },
  harpy: {
    name: 'Harpyje',
    ability:
      'Každou noc vybereš 2 hráče: zítra je první z nich „posedlý“ představou, že ten druhý je zlý, nebo může jeden či oba zemřít.',
    reminders: ['Mad', '2nd'],
    firstNightReminder:
      'Harpyje ukáže na dva hráče. Probuďte prvního hráče, na kterého ukázala, ukažte mu žeton TATO POSTAVA TĚ VYBRALA, poté žeton Harpyje a nakonec ukažte na druhého hráče, na kterého Harpyje ukázala.',
    otherNightReminder:
      'Harpyje ukáže na dva hráče. Probuďte prvního hráče, na kterého ukázala, ukažte mu žeton TATO POSTAVA TĚ VYBRALA, poté žeton Harpyje a nakonec ukažte na druhého hráče, na kterého Harpyje ukázala.',
  },
  wizard: {
    name: 'Čaroděj',
    ability:
      'Jednou za hru si můžeš něco přát. Pokud se splní, může mít svou cenu a může zanechat stopu.',
    reminders: ['?', '?'],
    firstNightReminder:
      'Pokud si Čaroděj přeje něco, co vyžaduje akci v noci, proveďte tyto akce.',
    otherNightReminder:
      'Pokud si Čaroděj přeje něco, co vyžaduje akci v noci, proveďte tyto akce.',
  },
  xaan: {
    name: 'Xaan',
    ability:
      'V noci X jsou všichni Měšťané otráveni a otrava trvá až do soumraku. [X Podivínů]',
    reminders: ['Night 1', 'Night 2', 'Night 3', 'X'],
    firstNightReminder:
      'Přidejte do grimoáru Xaanův žeton „Noc 1“. Pokud je X rovno 1, přidejte také žeton „X“.',
    otherNightReminder:
      'Změňte Xaanův žeton noci na odpovídající noc. Pokud je dnešní noc nocí X, přidejte žeton „X“.',
  },
  wraith: {
    name: 'Přízrak',
    ability:
      'Můžeš se rozhodnout v noci otevřít oči. Probouzíš se vždy, když se probouzejí ostatní zlí hráči.',
    firstNightReminder:
      'Budete‑li tuto noc probouzet zlé hráče, probouzejte zároveň i Přízrak.',
    otherNightReminder:
      'Budete‑li tuto noc probouzet zlé hráče, probouzejte zároveň i Přízrak.',
  },
  cacklejack: {
    name: 'Cacklejack',
    ability:
      'Každý den vybereš 1 hráče: dnes v noci se jinému hráči změní postava.',
    reminders: ['Not Me'],
    otherNightReminder:
      'Nahraďte žeton postavy libovolného hráče (kromě toho, kterého si dnes vybral Cacklejack) jiným žetonem postavy. Probuďte tohoto hráče a ukažte mu žeton JSI a jeho nový žeton postavy.',
  },
  tor: {
    name: 'Tor',
    ability:
      'Hráči neznají svou Postavu ani Příslušnost. Dozvídají se je když zemřou.',
    firstNightReminder:
      'Vynechejte informace pro Přisluhovače a informace pro Démona.',
    otherNightReminder:
      'Pokud hráč zemře v noci, probuďte ho, ukažte mu žeton JSI, jeho žeton postavy, znovu žeton JSI a nakonec palec nahoru nebo palec dolů.',
  },
  bigwig: {
    name: 'Velké zvíře',
    ability:
      "Každý nominovaný si zvolí hráče: až do hlasování může mluvit pouze obhájce & je 'Posedlý' představou, že nominovaný je dobrý, jinak může zemřít.",
  },
  // === FABLED ROLES ===
  angel: {
    name: 'Anděl',
    ability:
      'Tomu, kdo je nejvíce zodpovědný za smrt nového hráče, se může stát něco špatného.',
    reminders: ['Chránit', 'Něco špatného'],
    firstNightReminder: 'Oznamte, kteří hráči jsou chráněni Andělem.',
  },
  buddhist: {
    name: 'Budha',
    ability: 'Během prvních 2 minut každého dne nesmějí zkušení hráči mluvit.',
    firstNightReminder: 'Oznamte, kteří hráči jsou ovlivněni Budhou.',
  },
  deusexfiasco: {
    name: 'Deus ex Fiasco',
    ability:
      'Alespoň jednou za hru udělá Vypravěč chybu, opraví ji a veřejně se k ní přizná.',
  },
  djinn: {
    name: 'Džin',
    ability: 'Použij speciální pravidlo Džina. Všichni hráči vědí, jaké je.',
  },
  doomsayer: {
    name: 'Věštec zkázy',
    ability:
      'Pokud žijí 4 nebo více hráčů, každý živý hráč může veřejně zvolit (jednou za hru), že hráč stejné Příslušnosti zemře.',
  },
  duchess: {
    name: 'Vévodkyně',
    ability:
      'Každý den se tě mohou 3 hráči rozhodnout navštívit. V noci* se každý návštěvník dozví, kolik návštěvníků je zlých, ale 1 dostane falešnou informaci.',
    reminders: ['Návštěvník', 'Falešná informace'],
    otherNightReminder:
      'Probuďte každého hráče označeného „Návštěvník" nebo „Falešná informace" jednoho po druhém. Ukažte jim žeton Vévodkyně, pak prsty (1, 2, 3) odpovídající počtu zlých hráčů označených „Návštěvník" nebo, pokud budíte hráče označeného „Falešná informace", ukažte jim libovolný počet prstů kromě počtu zlých hráčů označených „Návštěvník".',
  },
  ferryman: {
    name: 'Převozník',
    ability:
      'V poslední den obdrží všichni mrtví hráči zpět svůj hlasovací žeton.',
  },
  fibbin: {
    name: 'Lhář',
    ability: 'Jednou za hru může 1 dobrý hráč dostat falešnou informaci.',
    reminders: ['Použito'],
  },
  fiddler: {
    name: 'Houslista',
    ability:
      'Jednou za hru si Démon tajně zvolí protivníka: všichni hráči zvolí, který z těchto 2 hráčů vyhraje.',
  },
  hellslibrarian: {
    name: 'Pekelná knihovnice',
    ability:
      'Tomu, kdo mluví, když Vypravěč požádal o ticho, se může stát něco špatného.',
    reminders: ['Něco špatného'],
  },
  revolutionary: {
    name: 'Revolucionář',
    ability:
      '2 sousedící hráči jsou známí jako stejné Příslušnosti. Jednou za hru se jeden z nich může registrovat falešně.',
    reminders: ['Použito'],
  },
  sentinel: {
    name: 'Strážný',
    ability: 'Ve hře může být o 1 Podivína více nebo méně.',
  },
  spiritofivory: {
    name: 'Duch slonoviny',
    ability: 'Nemůže být více než 1 extra zlý hráč.',
    reminders: ['Žádné extra zlo'],
  },
  toymaker: {
    name: 'Hračkář',
    ability:
      'Démon se může rozhodnout neútočit a musí to udělat alespoň jednou za hru. Zlí hráči dostanou normální počáteční informace.',
    reminders: ['Poslední noc: Bez útoku'],
    firstNightReminder:
      'Proveďte informace pro Přisluhovače a informace pro Démona, i když je ve hře méně než 7 hráčů.',
    otherNightReminder:
      'Pokud je to noc, kdy by útok Démona mohl ukončit hru, a Démon je označen „Poslední noc: Bez útoku", pak Démon dnes v noci nejedná. (Nebuďte ho.)',
  },
  // === LORIC ROLES ===
  bootlegger: {
    name: 'Pašerák',
    ability: 'Tento scénář má homebrew postavy nebo pravidla.',
  },
  gardener: {
    name: 'Zahradník',
    ability: 'Vypravěč přiřadí 1 nebo více hráčům jejich postavy.',
  },
  stormcatcher: {
    name: 'Lapač bouří',
    ability:
      'Pojmenuj dobrou postavu. Pokud je ve hře, může zemřít pouze popravou, ale zlí hráči se dozví, který hráč to je.',
    firstNightReminder:
      'Na začátku noci oznamte, která postava je chycena bouří. Pokud je ve hře, označte tohoto hráče jako CHYCENÝ BOUŘÍ. Probuďte každého zlého hráče a ukažte mu žeton postavy, pak označeného hráče. Pokud není ve hře, probuďte každého zlého hráče, ukažte jim žeton TYTO POSTAVY NEJSOU VE HŘE a příslušný žeton postavy.',
  },
  zenomancer: {
    name: 'Zenomancer',
    ability:
      'Jeden nebo více hráčů má každý cíl. Když je dosaženo, tento hráč se dozví kus pravdivé informace.',
  },
  hindu: {
    name: 'Hindu',
    ability:
      'První 4 hráči, kteří zemřou, jsou okamžitě reinkarnováni jako Pocestní stejné příslušnosti.',
  },
  pope: {
    name: 'Papež',
    ability:
      'Ve hře jsou duplicitní dobré postavy. Mohou být také blafy.',
  },
  godofug: {
    name: 'Bůh Ug',
    ability:
      'Jeden Ug klobouk. Kdo nosit Ug klobouk, smět říkat jen jeden zvuk naráz, ale hlasovat dvakrát. Když selhat, předat Ug klobouk.',
  },
  knaves: {
    name: 'Šibalové',
    ability:
      'Jsou 2 vypravěči: jeden lže a jeden mluví pravdu. Jednou za hru, za soumraku, si mohou vyměnit role.',
  },
  ventriloquist: {
    name: 'Břichomluvec',
    ability:
      'Pokud je hráč během své nominace posedlý představou, že je dosud nepoužitou postavou, nemusí zemřít, je-li ten den popraven.',
    reminders: ['Posedlý'],
  },
}

export default roleTranslationsCs
