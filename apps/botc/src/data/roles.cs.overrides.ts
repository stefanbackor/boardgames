/**
 * Czech translations and overrides for Blood on the Clocktower roles.
 * This file contains translations for role names, abilities, reminders, and flavor text.
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
    flavor:
      'Bloodstains on a dinner jacket? No, this is cooking sherry. How careless.',
  },
  librarian: {
    name: 'Knihovník',
    ability:
      'Začínáš s informací, že 1 ze 2 hráčů je konkrétní Podivín. (Nebo že ve hře není žádný Podivín.)',
    reminders: ['Podivín', 'Někdo jiný'],
    firstNightReminder:
      'Ukažte mu žeton Podivína. Ukažte na oba hráče označené Knihovníkovými žetony PODIVÍN a NĚKDO JINÝ.',
    flavor:
      'Certainly madam, under normal circumstances, you may borrow the Codex Malificarium from the library vaults. However, you do not seem to be a member.',
  },
  investigator: {
    name: 'Vyšetřovatel',
    ability:
      'Začínáš s informací, že jeden ze dvou hráčů je konkrétní Přisluhovač.',
    reminders: ['Přisluhovač', 'Někdo jiný'],
    firstNightReminder:
      'Ukažte mu žeton Přisluhovače. Ukažte na oba hráče označené Vyšetřovatelovými žetony PŘISLUHOVAČ a NĚKDO JINÝ.',
    flavor:
      "It is a fine night for a stroll, wouldn't you say, Mister Morozov? Or should I say... BARON Morozov?",
  },
  chef: {
    name: 'Kuchař',
    ability: 'Začínáš s informací, kolik párů zlých hráčů je ve hře.',
    firstNightReminder: 'Ukažte počet prstů.',
    flavor:
      "This evening's reservations seem odd. Never before has Mrs Mayweather kept company with that scamp from Hudson Lane. Yet, tonight, they have a table for two. Strange.",
  },
  empath: {
    name: 'Empat',
    ability: 'Každou noc se dozvíš, kolik z tvých 2 živých sousedů je zlých.',
    firstNightReminder: 'Ukažte počet prstů.',
    otherNightReminder: 'Ukažte počet prstů.',
    flavor: 'My skin prickles. Something is not right here. I can feel it.',
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
    flavor:
      'I sense great evil in your soul! But... that could just be your perfume. I am allergic to Elderberry.',
  },
  undertaker: {
    name: 'Hrobník',
    ability: 'Každou noc* se dozvíš, která postava byla ten den popravena.',
    reminders: ['Popraven'],
    otherNightReminder:
      'Pokud byl dnes některý hráč popraven, ukažte Hrobníkovi žeton jeho postavy.',
    flavor:
      'Hmmm....what have we here? The left boot is worn down to the heel, with flint shavings under the tongue. This is the garb of a Military man.',
  },
  monk: {
    name: 'Mnich',
    ability:
      'Každou noc* vybereš 1 hráče (ne sebe): tu noc je v bezpečí před Démonem.',
    reminders: ['Chráněný'],
    otherNightReminder: 'Mnich vybere 1 hráče.',
    flavor:
      "'Tis an ill and deathly wind that blows tonight. Come, my brother, take shelter in the abbey while the storm rages. By my word, or by my life, you will be safe.",
  },
  ravenkeeper: {
    name: 'Strážkyně krkavců',
    ability:
      'Pokud zemřeš v noci, budeš hned probuzena a vybereš 1 hráče: dozvíš se jeho postavu.',
    otherNightReminder:
      'Pokud dnes v noci Strážkyně krkavců zemřela, vyberte hráče. Ukažte jí žeton postavy tohoto hráče.',
    flavor:
      'My birds will avenge me! Fly! Fly, my sweet and dutiful pets! To the manor and to the river! To the alleys and to the salons! Fly!',
  },
  virgin: {
    name: 'Panna',
    ability:
      'Když tě poprvé někdo nominuje a nominujícím je Měšťan, je ihned popraven.',
    reminders: ['Bez schopnosti'],
    flavor:
      'I am pure. Let those who are without sin cast themselves down and suffer in my stead. My reputation shall not be stained with your venomous accusations.',
  },
  slayer: {
    name: 'Zabiják',
    ability:
      'Jednou za hru, během dne, veřejně označíš 1 hráče: Je-li to Démon, zemře.',
    reminders: ['Bez schopnosti'],
    flavor: 'Die.',
  },
  soldier: {
    name: 'Voják',
    ability: 'Jsi v bezpečí před Démonem.',
    flavor:
      'As David said to Goliath, as Theseus said to the Minotaur, as Arjuna said to Bhagadatta... No.',
  },
  mayor: {
    name: 'Starosta',
    ability:
      'Jsou-li naživu pouze 3 hráči a neproběhne žádná poprava, tvůj tým vyhrává. Pokud v noci zemřeš, může namísto tebe zemřít jiný hráč.',
    flavor:
      'We must put our differences aside, and cease this senseless killing. We are all taxpayers after all. Well, most of us.',
  },
  butler: {
    name: 'Sluha',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe): následující den můžeš hlasovat pouze tehdy, pokud hlasuje i tento hráč.',
    reminders: ['Pán'],
    firstNightReminder: 'Sluha si vybere 1 hráče.',
    otherNightReminder: 'Sluha si vybere 1 hráče.',
    flavor: 'Yes, sir... No, sir... Certainly, sir.',
  },
  drunk: {
    name: 'Opilec',
    ability: 'Nevíš, že jsi Opilec. Myslíš si, že jsi Měšťan, ale nejsi.',
    flavor:
      'I’m only a *hic* social drinker, my dear. Admittedly, I am a heavy *burp* socializer.',
  },
  recluse: {
    name: 'Samotář',
    ability:
      'Můžeš se jevit jako zlý, jako Přisluhovač nebo Démon, i když jsi mrtvý.',
    flavor:
      "Garn git ya darn grub ya mitts ofma lorn yasee. Grr. Natsy pikkins yonder southwise ye begittin afta ya! Git! Me harvy no so widda licks and demmons no be fightin' hadsup ne'er ma kin. Git, assay!",
  },
  saint: {
    name: 'Světec',
    ability: 'Pokud zemřeš popravou, tvůj tým prohrává.',
    flavor:
      'Wisdom begets peace. Patience begets wisdom. Fear not, for the time shall come when fear too shall pass. Let us pray, and may the unity of our vision make saints of us all.',
  },
  poisoner: {
    name: 'Travič',
    ability:
      'Každou noc vybereš 1 hráče: je otrávený po celou tuto noc a následující den.',
    reminders: ['Otrávený'],
    firstNightReminder: 'Travič vybere 1 hráče.',
    otherNightReminder: 'Travič vybere 1 hráče.',
    flavor: 'Add compound Alpha to compound Beta... NOT TOO MUCH!',
  },
  spy: {
    name: 'Špeh',
    ability:
      'Každou noc nahlédneš do grimoáru. Můžeš se jevit jako dobrý, Měšťan, nebo Podivín, i když jsi mrtvý.',
    firstNightReminder: 'Ukažte mu grimoár na tak dlouho, jak potřebuje.',
    otherNightReminder: 'Ukažte mu grimoár na tak dlouho, jak potřebuje.',
    flavor:
      'Any brewmaster worth their liquor, knows no concoction pours trouble quicker, than one where spies seem double.',
  },
  scarletwoman: {
    name: 'Šarlatová žena',
    ability:
      'Pokud je naživu alespoň 5 hráčů a zemře Démon, stáváš se Démonem. (Pocestní se nepočítají.)',
    reminders: ['Démon'],
    otherNightReminder:
      'Pokud se dnes Šarlatová žena stala Démonem, ukažte jí žeton JSI a pak žeton Démona.',
    flavor:
      'You have shown me the secrets of the Council of the Purple Flame. We have lain together in fire and in lust and in beastly commune, and I am forever your servant. But tonight, my dear, I am your master.',
  },
  baron: {
    name: 'Baron',
    ability: 'Ve hře jsou dva Podivíni navíc. [+2 Podivíni]',
    flavor:
      "This town has gone to the dogs, what? Cheap foreign labor... that's the ticket. Stuff them in the mine, I say. A bit of hard work never hurt anyone, and a clip'o'the ears to any brigand who says otherwise. It's all about the bottom line, what?",
  },
  imp: {
    name: 'Čert',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Pokud takto zabiješ sebe, Přisluhovač se stane Čertem.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Čert vybere 1 hráče. Pokud Čert vybere sám sebe:<br/>Nahraďte žeton 1 živého Přisluhovače náhradním žetonem Čerta.<br/>Uspěte starého Čerta. Probuďte nového Čerta.<br/>Ukažte mu žeton JSI a pak žeton Čerta.',
    flavor:
      'We must keep our wits sharp and our sword sharper. Evil walks among us, and will stop at nothing to destroy us good, simple folk, bringing our fine town to ruin. Trust no-one. But, if you must trust someone, trust me.',
  },
  bureaucrat: {
    name: 'Byrokrat',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe):<br/>jeho hlas se následující den počítá za 3 hlasy.',
    reminders: ['3 votes'],
    firstNightReminder: 'Byrokrat ukáže na hráče.',
    otherNightReminder: 'Byrokrat ukáže na hráče.',
    flavor:
      "Sign here please. And here. And here. Aaaaaaaaand here. This should all be sorted and tallied by the end of the day, assuming everyone's signatures are legible. We haven't had a mix-up in the paperwork for ages. Yesterday noon, if memory serves...",
  },
  thief: {
    name: 'Thief',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe):<br/>jeho hlas je následující den negativní.',
    reminders: ['Negative vote'],
    firstNightReminder: 'Zloděj ukáže na hráče.',
    otherNightReminder: 'Zloděj ukáže na hráče.',
    flavor:
      "I aint done nuffink. I weren't even in dat alley last night! It weren't me what stole Mayor Bruno's briefcase wiv all dem fancy dockoments innit. Besides, it was too 'eavy to carry far.",
  },
  gunslinger: {
    name: 'Pistolník',
    ability:
      'Každý den po sečtení hlasů prvního hlasování můžeš vybrat 1 hráče, který hlasoval: ten zemře.',
    flavor:
      "It's time someone took matters into their own hands. That someone... is me.",
  },
  scapegoat: {
    name: 'Obětní beránek',
    ability:
      'Pokud je odhlasován k popravě hráč tvé příslušnosti, můžeš být popraven místo něj.',
    flavor:
      "Good evening! Thank you for inviting me to the ball. I'm not from around here, but you sure seem like a friendly bunch, by golly. I'm sure we'll get along just dandy. What's all that rope for?",
  },
  beggar: {
    name: 'Žebrák',
    ability:
      'K hlasování musíš použít hlasovací žeton. Pokud ti mrtvý hráč dá svůj hlasovací žeton, dozvíš se jeho příslušnost. Jsi zdravý a střízlivý.',
    flavor:
      "Alms for the poor, good Sir? Spare a coin, Madam? Thank you. God bless! You're a right kind soul and no mistake! I'll have some swanky nosh tonight, I will!",
  },
  grandmother: {
    name: 'Babička',
    ability:
      'Začínáš s informací o jednom dobrém hráči a jeho postavě. Pokud ho zabije Démon, zemřeš také.',
    reminders: ['Grandchild'],
    firstNightReminder:
      'Ukažte na hráče, který je její vnouče a ukažte jí žeton jeho postavy.',
    otherNightReminder: 'Pokud Démon zabil vnouče, Babička zemře.',
    flavor:
      'Take a jacket if you go outside, dearie. And your thermos. And your scarf. I have a weak heart, you know. Whatever would I do if you caught cold...or worse?',
  },
  sailor: {
    name: 'Námořník',
    ability:
      'Každou noc vybereš 1 živého hráče: buď ty, nebo on jste až do soumraku opilí. Nemůžeš zemřít.',
    reminders: ['Opilý'],
    firstNightReminder: 'Námořník vybere 1 živého hráče.',
    otherNightReminder: 'Námořník vybere 1 živého hráče.',
    flavor:
      "I'll drink any one of yer under the table! You! The chatterbox! Reckon you can take me? No? Howza 'bout you, Grandma? You ever tried Old McKillys Extra Spiced Rum before? Guaranteed to put hairs on yer chest! Step aboard, aye!",
  },
  chambermaid: {
    name: 'Komorná',
    ability:
      'Každou noc vybereš 2 živé hráče (ne sebe): dozvíš se, kolik z nich bylo tu noc probuzeno na základě jejich schopnosti.',
    firstNightReminder: 'Komorná vybere 2 živé hráče. Ukažte počet prstů.',
    otherNightReminder: 'Komorná vybere 2 živé hráče. Ukažte počet prstů.',
    flavor:
      "I aint seen nothin' untoward, Milady. Begging your pardon, but if I did see somethin', it certainly weren't the master o' the house sneaking into the professor's laboratory 'round eleven o'clock and mixing up fancy potions, just like you said, Miss.",
  },
  exorcist: {
    name: 'Exorcista',
    ability:
      'Každou noc* vybereš 1 hráče (jiného než tu minulou): pokud to bude Démon, dozví se, kdo jsi, ale tu noc se neprobudí.',
    reminders: ['Vybraný'],
    otherNightReminder:
      'Exorcista vybere 1 hráče. Uspěte Exorcistu. Pokud Exorcista vybral Démona:<br/>Probuďte Démona. Ukažte mu žeton TATO POSTAVA TĚ VYBRALA a žeton Exorcisty. Ukažte na Exorcistu.',
    flavor:
      'We cast you out, every unclean spirit, every satanic power, every onslaught of the infernal adversary, every legion, every diabolical group and sect, in the name and by the power of Our Lord Jesus Christ. We command you, begone and fly far from the Church of God, from the souls made by God in His image and redeemed by the precious blood of the divine Lamb.',
  },
  innkeeper: {
    name: 'Hostinský',
    ability:
      'Každou noc* vybereš 2 hráče: tu noc nemůžou zemřít, ale 1 z nich je až do soumraku opilý.',
    reminders: ['Chráněný', 'Opilý'],
    otherNightReminder: 'Hostinský vybere 2 hráče.',
    flavor:
      'Come inside, fair traveler, and rest your weary bones. Drink and be merry, for the legions of the Dark One shall not harass thee tonight.',
  },
  gambler: {
    name: 'Gambler',
    ability:
      'Každou noc* vybereš 1 hráče a zkusíš uhodnout jeho postavu: pokud bude tvůj tip špatný, zemřeš.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Gambler vybere 1 hráče.',
    flavor: 'Heads, I win. Tails, you lose.',
  },
  gossip: {
    name: 'Drbna',
    ability:
      'Každý den můžeš učinit veřejné prohlášení. Pokud bude pravdivé, tu noc někdo zemře.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Pokud se Drbně podařilo zabít hráče, zemře.',
    flavor:
      'Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah. Blah.',
  },
  courtier: {
    name: 'Lichotník',
    ability:
      'Jednou za hru, v noci, vybereš 1 postavu: bude opilá 3 noci a 3 dny.',
    reminders: ['Opilý 3', 'Opilý 2', 'Opilý 1', 'Bez schopnosti'],
    firstNightReminder: 'Lichotník může vybrat 1 postavu.',
    otherNightReminder: 'Lichotník může vybrat 1 postavu.',
    flavor:
      'I am more afraid of an army of one hundred sheep led by a lion than an army of one hundred lions led by a sheep.',
  },
  professor: {
    name: 'Profesor',
    ability:
      'Jednou za hru, v noci*, vybereš 1 mrtvého hráče: pokud je to Měšťan, je oživen.',
    reminders: ['Živý', 'Bez schopnosti'],
    otherNightReminder: 'Profesor může vybrat 1 mrtvého hráče.',
    flavor:
      'The process is simple. Attach the hydraulic confabulator to the modified chi matrix amplifier, add 20 CCs of pseudodorafine, keep his Z levels above 20%, and your husband will be fine. Now, all we need is a lightning strike.',
  },
  minstrel: {
    name: 'Pěvec',
    ability:
      'Když Přisluhovač zemře popravou, všichni hráči (až na Pocestné) jsou až do soumraku dalšího dne opilí.',
    reminders: ['Všichni jsou opilí'],
    flavor:
      "And I shall hear, tho' soft you tread above me... And all my dreams will warm and sweeter be... If you'll not fail to tell me that you love me... I simply sleep in peace until you come to me.",
  },
  tealady: {
    name: 'Čajová dáma',
    ability:
      'Pokud jsou oba tví nejbližší živí sousedé (1 z každé strany) na straně dobra, nemohou zemřít.',
    reminders: ['Nemůže zemřít'],
    flavor:
      'If you are cold, tea will warm you. If you are too heated, tea will cool you. If you are depressed, tea will cheer you. If you are excited, tea will calm you.',
  },
  pacifist: {
    name: 'Pacifista',
    ability: 'Popravení hráči dobra nemusí zemřít.',
    flavor: 'Distrust all in whom the impulse to punish is powerful.',
  },
  fool: {
    name: 'Šašek',
    ability: 'Když máš zemřít poprvé, nezemřeš.',
    reminders: ['Bez schopnosti'],
    flavor:
      "...and the King said 'What?! I've never even owned a pair of rubber pantaloons, let alone a custard cannon!' Ho-ho! Jolly day!",
  },
  tinker: {
    name: 'Dráteník',
    ability: 'Můžeš kdykoli zemřít.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Dráteník může zemřít.',
    flavor:
      'I think I see the problem. Luckily, I have an idea! This catapult will shoot twice as far with just a minor adjustment...',
  },
  moonchild: {
    name: 'Dítě měsíce',
    ability:
      'Když se dozvíš o své smrti, veřejně vybereš 1 živého hráče. Pokud je na straně dobra, tu noc zemře.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Pokud se Dítěti měsíce podařilo zabít dobrého hráče, zemře.',
    flavor:
      'Scorpio looks sideways at the lovers, and you have a choice to make. With silver cross my palm, and your fate shall be revealed. With steel cross my throat, and by the stars you shall regret it.',
  },
  goon: {
    name: 'Hňup',
    ability:
      'Každou noc první hráč, který tě označí na základě své schopnosti, je až do soumraku opilý. Získáváš jeho příslušnost.',
    reminders: ['Opilý'],
    flavor:
      'Each night, the 1st player to choose you with their ability is drunk until dusk. You become their alignment.',
  },
  lunatic: {
    name: 'Blázen',
    ability:
      'Myslíš si, že jsi Démon, ale nejsi. Démon ví, kdo jsi a koho v noci vybíráš.',
    reminders: ['Útok 1', 'Útok 2', 'Útok 3'],
    firstNightReminder:
      'Pokud je ve hře alespoň 7 hráčů, probuďte Blázna.<br/>Ukažte mu žeton TOTO JSOU TVÍ PŘISLUHOVAČI. Ukažte na libovolné hráče.<br/>Ukažte mu žeton TYTO POSTAVY NEJSOU VE HŘE. Ukažte mu 3 žetony dobrých postav.<br/>Uspěte Blázna. Probuďte Démona.<br/>Ukažte mu žeton JSI a pak žeton Démona.<br/>Ukažte mu žeton TENTO HRÁČ JE a pak žeton Blázna. Ukažte na Blázna.',
    otherNightReminder:
      'Udělejte vše tak, aby to vypadalo, že jedná skutečný Démon.<br/>Uspěte Blázna. Probuďte Démona.</br>Ukažte žeton Blázna a ukažte na hráče, kterého Blázen vybral.',
    flavor: 'I am the night... I think.',
  },
  godfather: {
    name: 'Kmotr',
    ability:
      'Začínáš s informací, kteří Podivíni jsou ve hře. Pokud 1 z nich ve dne zemře, vybereš tu noc 1 hráče: ten zemře. [-1 nebo +1 Podivín]',
    reminders: ['Dnes zemřel', 'Mrtvý'],
    firstNightReminder: 'Ukažte mu žetony postav všech podivínů ve hře.',
    otherNightReminder: 'Pokud dnes zemřel Podivín, Kmotr vybere hráče.',
    flavor:
      "Normally, it's just business. But when you insult my daughter, you insult me. And when you insult me, you insult my family. You really should be more careful - it would be a shame if you had an unfortunate accident.",
  },
  devilsadvocate: {
    name: 'Ďáblův advokát',
    ability:
      'Každou noc vybereš 1 živého hráče (jiného než tu minulou): pokud by měl být následující den popraven, nezemře.',
    reminders: ['Survives execution'],
    firstNightReminder: 'Ďáblův advokát vybere 1 živého hráče.',
    otherNightReminder: 'Ďáblův advokát vybere 1 živého hráče.',
    flavor:
      "My client, should the objection be overruled, pleads innocent by virtue of the prosecution's non-observance of statute 27.B - incorrect or misleading conjugation of a verb. The fact that nine of the jury died last night is simply prima facie, which is, as Wills vs Thule set precedent for, further reason to acquit.",
  },
  assassin: {
    name: 'Nájemný vrah',
    ability:
      'Jednou za hru, v noci*, vybereš 1 hráče: ten zemře, i pokud by z jakéhokoli důvodu nemohl.',
    reminders: ['Mrtvý', 'Bez schopnosti'],
    otherNightReminder: 'Nájemný vrah může vybrat 1 hráče.',
    flavor: '...',
  },
  mastermind: {
    name: 'Strůjce',
    ability:
      'Pokud Démon zemře popravou (což obvykle znamená konec hry), hraje se ještě 1 den. Je-li pak někdo popraven, jeho tým prohrává.',
    flavor:
      'The tentacles of that monster are nailed to the doors of the church. Mothers and children are dancing in the street. Excellent. Everything is proceeding exactly as I have planned.',
  },
  zombuul: {
    name: 'Zombuul',
    ability:
      'Každou noc*, pokud ten den nikdo nezemřel, vybereš 1 hráče: ten zemře. Když zemřeš poprvé, žiješ a jevíš se jako mrtvý.',
    reminders: ['Dnes zemřel', 'Mrtvý'],
    otherNightReminder: 'Pokud dnes nikdo nezemřel, Zombuul vybere 1 hráče.',
    flavor:
      'I do not. Understand. Your ways. Fellow human. Show me. The dirt. Where the holy. Lay. Sleeping. I too. Must sleep. Soon.',
  },
  pukka: {
    name: 'Pukka',
    ability:
      'Každou noc vybereš 1 hráče: je otrávený. Hráč otrávený předchozí noc zemře a přestane být otrávený.',
    reminders: ['Otrávený', 'Mrtvý'],
    firstNightReminder: 'Pukka vybere 1 hráče.',
    otherNightReminder:
      'Pukka vybere 1 hráče. Hráč otrávený předchozí noc zemře a přestane být otrávený.',
    flavor:
      'You truly have been kind welcoming me into your beautiful home. I am so sorry I accidentally scratched you. A little thing. No matter. But please, take this golden toothpick as a humble token of my regret.',
  },
  shabaloth: {
    name: 'Shabaloth',
    ability:
      'Každou noc* vybereš 2 hráče: ti zemřou. Hráč zabitý předchozí noc může být vyvržen zpět (oživen).',
    reminders: ['Mrtvý', 'Živý'],
    otherNightReminder:
      'Hráč vybraný Shabalothem předchozí noc může být vyvržen zpět. Shabaloth vybere 2 hráče.',
    flavor:
      "Blarg f'taag nm mataan! No sho gumtha m'sik na yuuu. Fluuuuuuuuurg h-sikkkh.",
  },
  po: {
    name: 'Pó',
    ability:
      'Každou noc* můžeš vybrat 1 hráče: ten zemře. Pokud ses naposled rozhodl nikoho nevybrat, tuto noc vybereš 3 hráče.',
    reminders: ['Mrtvý', '3 útoky'],
    otherNightReminder:
      'Pó buď vybere 1 hráče, NEBO vybere 3 hráče, pokud naposledy nevybral nikoho.',
    flavor: "Would you like a flower? I'm so lonely.",
  },
  apprentice: {
    name: 'Učedník',
    ability:
      'Během své první noci získáváš schopnost Měšťana nebo Přisluhovače dle své příslušnosti.',
    reminders: ['Je učedník'],
    firstNightReminder:
      'Ukažte Učedníkovi žeton JSI a pak žeton Měšťana nebo Přisluhovače.',
    flavor:
      'For years have I traveled, studying the ways of The Craft. Which craft, you ask? Simply that of the simple folk. Nothing to worry about. Not yet.',
  },
  matron: {
    name: 'Matrona',
    ability:
      'Každý den můžeš až třikrát vybrat 2 hráče, kteří si prohodí svá místa. Hráči nemohou odejít ze svého místa k soukroému hovoru.',
    flavor:
      'Miss Featherbottom, be quiet. Master Rutherford, a teacup needs just the four fingers, please. I know you are a father of nine, but age, or lack there-of as the case may be, is never an excuse for poor manners.',
  },
  judge: {
    name: 'Soudce',
    ability:
      'Jednou za hru, pokud nominoval jiný hráč, můžeš rozhodnout o výsledku této nominace (odsouzení nebo omilostnění).',
    reminders: ['Bez schopnosti'],
    flavor:
      'I find the defendant guilty of the crimes of murder, fraud, arson, larceny, impersonating an officer of the law, practicing medicine without a license, slander, regicide, and littering.',
  },
  bishop: {
    name: 'Biskup',
    ability:
      'Jen vypravěč může nominovat. Každý den musí být nominován alespoň 1 hráč z opačného týmu.',
    reminders: ['Nominuje dobro', 'Nominuje zlo'],
    flavor:
      'In nomine Patris, et Filii, et Spiritus Sancti… Nos mos Dei. Deus vult de nobis.',
  },
  voudon: {
    name: 'Vudun',
    ability:
      'Pouze ty a mrtví můžete hlasovat. Nepotřebují k tomu hlasovací žeton. Minimální počet hlasů není potřeba.',
    flavor:
      'Bien venu. Sit down. Breathe deep. Enter the land of the dead. See with their eyes. Speak with their voice. Yon sel lang se janm ase.',
  },
  clockmaker: {
    name: 'Hodinář',
    ability:
      'Začínáš s informací, kolik kroků je Démon od svého nejbližšího Přisluhovače.',
    firstNightReminder: 'Ukažte počet prstů.',
    flavor:
      'Do not disturb me. The tick must continue, for the circle is a symbol of life and contains all things - all answers - in its divine machinery. I must work.',
  },
  dreamer: {
    name: 'Snílek',
    ability:
      'Každou noc vybereš 1 hráče (ne sebe ani Pocestného): dozvíš se 1 dobrou a 1 zlou postavu. Jednou z nich je vybraný hráč.',
    firstNightReminder:
      'Snílek ukáže na 1 hráče. Ukažte mu 1 žeton dobré postavy a 1 žeton zlé postavy. 1 z toho musí být správný žeton postavy vybraného hráče.',
    otherNightReminder:
      'Snílek ukáže na 1 hráče. Ukažte mu 1 žeton dobré postavy a 1 žeton zlé postavy. 1 z toho musí být správný žeton postavy vybraného hráče.',
    flavor:
      'I remember the Clockmaker. The sky was red and it was raining fractal triangles. There was a smell of violets and a bubbling sound. A woman with glowing eyes and a scraggly beard was hissing at the sky. Then, I awoke.',
  },
  snakecharmer: {
    name: 'Zaklínač hadů',
    ability:
      'Každou noc vybereš 1 živého hráče: pokud je to Démon, prohodíte si postavu i příslušnost a on je otrávený.',
    reminders: ['Poisoned'],
    firstNightReminder:
      'Zaklínač hadů vybere 1 hráče. Pokud vybral Démona:<br/>Ukažte mu žeton JSI a žeton Démona. Ukažte palec dolů. Prohoďte žetony Zaklínače hadů a Démona.<br/>Uspěte starého Zaklínače hadů. Probuďte starého Démona.<br/>Ukažte mu žeton JSI a žeton Zaklínače hadů. Ukažte palec nahoru.',
    otherNightReminder:
      'Zaklínač hadů vybere 1 hráče. Pokud vybral Démona:<br/>Ukažte mu žeton JSI a žeton Démona. Ukažte palec dolů. Prohoďte žetony Zaklínače hadů a Démona.<br/>Uspěte starého Zaklínače hadů. Probuďte starého Démona.<br/>Ukažte mu žeton JSI a žeton Zaklínače hadů. Ukažte palec nahoru.',
    flavor:
      'Effendi... I am but a humble man, but my pipe is golden and a single tune will tame the wildest djinn, Inshallah. They say that greed hangs more men than rope. But not I, Effendi... not I.',
  },
  mathematician: {
    name: 'Matematik',
    ability:
      'Každou noc se dozvíš, kolik schopností hráčů fungovalo abnormálně (od úsvitu) v důsledku schopnosti jiné postavy.',
    reminders: ['Abnormalní'],
    firstNightReminder: 'Ukažte počet prstů.',
    otherNightReminder: 'Ukažte počet prstů.',
    flavor:
      'Any consistent formal system x, within which a certain amount of elementary arithmetic can be carried out is incomplete; that is, there are statements of the language of x which can neither be proved nor disproved in x. Ergo, you are drunk.',
  },
  flowergirl: {
    name: 'Květinářka',
    ability: 'Každou noc* se dozvíš, zda Démon ten den hlasoval.',
    reminders: ['Démon hlasoval', 'Démon nehlasoval'],
    otherNightReminder: 'Přikývněte, nebo zavrťte hlavou.',
    flavor:
      "Yesterday's violets have withered and died, but today my poppies bloom.",
  },
  towncrier: {
    name: 'Městský vyvolávač',
    ability: 'Každou noc* se dozvíš, zda Přisluhovač ten den nominoval.',
    reminders: ['Přisluhovač nenominoval', 'Přisluhovač nominoval'],
    otherNightReminder: 'Přikývněte, nebo zavrťte hlavou.',
    flavor:
      'Hear ye! Hear ye! Witchcraft in the labyrinth! Genius savant reveals all! Town in danger! Hear Ye!',
  },
  oracle: {
    name: 'Věštec',
    ability: 'Každou noc* se dozvíš, kolik zlých hráčů je mrtvých.',
    otherNightReminder: 'Ukažte počet prstů.',
    flavor:
      'Only the chosen may gaze beyond the veil. The dead are restless, and they point in silence toward the icy north.',
  },
  savant: {
    name: 'Učenec',
    ability:
      'Každý den můžeš přijít soukromě za vypravěčem a dozvědět se od něj 2 informace. Jedna z nich je pravdivá, jedna falešná.',
    flavor:
      'Seventy-two matchsticks on the floor... the sun sets early but the moon is unchanged... a torn piece of cloth... evil in the manor house... three by three... the one we trusted is not what he seems... green light means magnesium... residue, but the pattern is wrong... Seventy-two matchsticks on the floor...',
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
    flavor:
      "Did you hear that stranger in the cashmere coat put the word on our young Belle? And she said yes? Well, that's nothing compared to what Harry and that juggler got up to at the fair! The things I could say if I was a tattletale... my, yes.",
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
    flavor:
      'If anything is real, beer is real. Drink, for tomorrow we may die.',
  },
  artist: {
    name: 'Umělec',
    ability:
      'Jednou za hru, během dne, soukromě položíš vypravěči jakoukoli otázku, na kterou může odpovědět „ano/ne“.',
    reminders: ['Bez schopnosti'],
    flavor:
      "Mon Dieu! C'est lumineux! My work, she is... how you say... Magnifique! Dieu est révélé! Oui.",
  },
  juggler: {
    name: 'Kejklíř',
    ability:
      'První den zkus veřejně uhádnout až 5 postav hráčů. Tu noc se dozvíš, kolik jsi jich uhodl správně.',
    reminders: ['Correct'],
    otherNightReminder: 'Ukažte počet prstů.',
    flavor:
      'For my next trick, as per request, I will need a flower, a bag of beans, a toy snake, a paintbrush, and a motorized gasoline-powered hedge trimming device. I warn you, this trick may be my last. Oh dear.',
  },
  sage: {
    name: 'Mudrc',
    ability: 'Pokud tě zabije Démon, dozvíš se, že je to jeden ze dvou hráčů.',
    otherNightReminder:
      'Pokud Mudrce zabil Démon, probuďte Mudrce a ukažte na 2 hráče. 1 z nich musí být Démon.',
    flavor:
      'These mountainous tomes guard the secret, I am sure of it! Twixt word and word, it lies in wait. More candles, boy! More ink! These notes may look arcane, but the infernal puzzle is revealing itself.',
  },
  mutant: {
    name: 'Mutant',
    ability:
      'Pokud jsi „posedlý“ představou, že jsi Podivín, můžeš být popraven.',
    flavor: 'I am not a freak! I am a human being! Have mercy!',
  },
  sweetheart: {
    name: 'Zlatíčko',
    ability: 'Když zemřeš, 1 hráč je odteď trvale opilý.',
    reminders: ['Opilý'],
    otherNightReminder:
      'Popkud Zlatíčko zemřelo, 1 hráč je ihned otrávený. Piokud jste tak již neučinili, udělejte to teď.',
    flavor: 'I will never forget her. Never.',
  },
  barber: {
    name: 'Holič',
    ability:
      'Pokud jsi tento den nebo tuto noc zemřel, Démon může vybrat 2 hráče (ne dalšího Démona), kteří si prohodí postavy.',
    reminders: ['Haircuts tonight'],
    otherNightReminder:
      'Pokud tento den nebo tuto noc Holič umřel, ukažte Démonovi žeton TATO POSTAVA TĚ VYBRALA a žeton Holiče.<br/>Pokud Démon vybere 2 hráče, jednoho po druhém je probuďte. Ukažte jim žeton JSI a žeton jejich nové postavy.',
    flavor:
      'Did you know that barbery and surgery were once the same profession? No? Well, now you do.',
  },
  klutz: {
    name: 'Nešika',
    ability:
      'Když se dozvíš o své smrti, veřejně vybereš 1 živého hráče: pokud je zlý, tvůj tým prohrává.',
    flavor: 'Oops.',
  },
  eviltwin: {
    name: 'Zlé dvojče',
    ability:
      'Ty a hráč druhé strany o sobě víte. Pokud je ten dobrý z vás popraven, zlo vyhrává. Dobro nemůže vyhrát, jste-li oba naživu.',
    reminders: ['Twin'],
    firstNightReminder:
      'Probuďte obě dvojčata. Nechte je navázat oční kontakt.<br/>Ukažte žeton postavy Dobrého dvojčete Zlému dvojčeti a naopak.',
    flavor:
      "I'm not Sara! I'm Clara! SHE is Sara! Sara is the evil one! Not me!",
  },
  witch: {
    name: 'Čarodějnice',
    ability:
      'Každou noc vybereš 1 hráče: pokud bude následující den nominovat, zemře. O tuto schopnost přicházíš, pokud jsou naživu pouze 3 hráči.',
    reminders: ['Cursed'],
    firstNightReminder: 'Čarodějnice vybere 1 hráče.',
    otherNightReminder: 'Čarodějnice vybere 1 hráče.',
    flavor:
      "Three drops of goat's blood. A lock of hair, torn in anger. The name is spoken, the shadow cast. Walk left foot first down that brambled path, and don't look back.",
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
    flavor: 'Reality is merely an opinion. Specifically, my opinion.',
  },
  pithag: {
    name: 'Ježibaba',
    ability:
      'Každou noc* vybereš 1 hráče a 1 postavu, kterou se vybraný hráč stane (pokud není ve hře). Pokud je takto stvořen Démon, tu noc může zemřít kdokoli.',
    otherNightReminder:
      'Ježibaba vybere 1 hráče a 1 postavu. Pokud vybere postavu, která není ve hře:<br/>Uspěte Ježibabu. Probuďte vybraného hráče. Ukažte mu žeton JSI a jeho nový žeton postavy.',
    flavor:
      "Round about the cauldron go; In the poison'd entrails throw; Toad, that under cold stone; Days and nights has thirty-one; Sweated venom sleeping got; Boil thou first in the charmed pot.",
  },
  fanggu: {
    name: 'Fang Gu',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Když takto poprvé zabiješ Podivína, stane se Fang Guem a ty zemřeš namísto něj. [+1 Podivín]',
    reminders: ['Mrtvý', 'Once'],
    otherNightReminder:
      'Fang Gu vybere 1 hráče. Pokud vybral Podivína:<br/>Nahraďte žeton tohoto Podivína náhradním žetonem Fang Gu. Uspěte Fang Gu.<br/>Probuďte vybraného hráče. Ukažte mu žeton JSI a žeton Fang Gu. Ukažte mu palec dolů.',
    flavor: 'Your walls and your weapons are but smoke in dreams.',
  },
  vigormortis: {
    name: 'Vigormortis',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Přisluhovači, které zabiješ, si ponechají svou schopnost a otráví 1 svého sousedícího Měšťana. [-1 Podivín]',
    reminders: ['Mrtvý', 'Has ability', 'Poisoned'],
    otherNightReminder:
      'Vigormortis vybere 1 hráče. Pokud vybral Přisluhovače, 1 sousedící Měšťan je otráven.',
    flavor:
      'All doors are one door. All keys are one key. All cups are one cup, but whosoever drinketh of the water that I give shall never thirst, but the water shall be in him a well springing up into everlasting life.',
  },
  nodashii: {
    name: 'No Dashii',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Dva tví sousedící Měšťané (1 z každé strany) jsou otráveni.',
    reminders: ['Mrtvý', 'Poisoned'],
    otherNightReminder: 'No Dashii vybere 1 hráče.',
    flavor:
      'By the sins of Arnoch, I feel thy laden stench. By the curs-ed sun and her foul legion of tiny grinning gods, I corrupt thee. By the blessed night and the hidden depths of the horrid and unholy sea, I end thy squalid life upon this plane.',
  },
  vortox: {
    name: 'Vortox',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Schopnosti Měšťanů dávají falešné informace. Pokud není někdo každý den popraven, zlo vyhrává.',
    reminders: ['Mrtvý'],
    otherNightReminder: 'Vortox vybere 1 hráče.',
    flavor:
      'Black is White. Right is Wrong. Left is Right. Up is Long. Down is Sight. Short is Blind. Follow me. Answers find.',
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
    flavor:
      'A cup of coffee with no cream, Monsieur? I’m terribly sorry, but we’re fresh out of cream — how about with no milk?',
  },
  harlot: {
    name: 'Nevěstka',
    ability:
      'Každou noc* vybereš 1 živého hráče: pokud souhlasí, dozvíš se jeho postavu, ale můžete oba zemřít.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Nevěstka ukáže na libovolného hráče. Poté Nevěstku uspěte. Probuďte vybraného hráče, ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Nevěstky. Hráč buď přikývne (ano), nebo zavrtí hlavou (ne). Pokud přikývl, probuďte Nevěstku a ukažte jí žeton postavy vybraného hráče. Poté se můžete rozhodnout, že oba hráči zemřou.',
    flavor:
      "Enchanté, Sailor. You look like you need someone to really listen to your troubles. I'm a good listener. Very, very good.",
  },
  butcher: {
    name: 'Řezník',
    ability: 'Každý den po první popravě můžeš znovu někoho nominovat.',
    flavor: 'It tastes like chicken. More please.',
  },
  bonecollector: {
    name: 'Sběratel kostí',
    ability:
      'Jednou za hru, v noci*, vybereš 1 mrtvého hráče: až do soumraku má zpět svou schopnost.',
    reminders: ['Bez schopnosti', 'Má schopnost'],
    otherNightReminder:
      'Sběratel kostí buď zavrtí hlavou (ne), nebo ukáže na jakéhokoli mrtvého hráče. Pokud ukázal na mrtvého hráče, položte jeho žeton MÁ SCHOPNOST k žetonu postavy vybraného hráče. (Možná ho budete muset tuto noc probudit, aby ji použil.)',
    flavor:
      'I collect many things. Hair. Teeth. Clothes. Fragments of poems. The dreams of lost lovers. My secret arts are not for you to know but my fee is a mere pittance. Bring me the blood of a noblewoman who died of heartbreak under a full moon, and you shall have your answers.',
  },
  deviant: {
    name: 'Deviant',
    ability: 'Pokud jsi dnes byl vtipný, nemůžeš zemřít vyhoštěním.',
    flavor: "Twas the lady's quip, forsooth.",
  },
  noble: {
    name: 'Šlechtic',
    ability: 'Začínáš s informací o 3 hráčích, z kterých přesně 1 je zlý.',
    reminders: ['Seen'],
    firstNightReminder:
      'Ukažte na 3 hráče v libovolném pořadí, z nichž přesně 1 je zlý.',
    flavor:
      'Sarcasm is indeed the lowest form of wit. But speaking in response to your criticism, Sir, it is, nevertheless, a form of wit.',
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
    flavor:
      'Alone, I walk these streets, paved with the sick stench of corruption. Its thickness worms its way into my nostrils, unbidden, burning with revulsion. And anticipation. The illness of this wretched place grows each night. And I... I am the cure.',
  },
  pixie: {
    name: 'Víla',
    ability:
      'Začínáš s informací o 1 Měšťanovi, který je ve hře. Pokud jsi posedlá, že jsi tato postava, získáš jeho schopnost, když umře.',
    reminders: ['Mad', 'Has ability'],
    firstNightReminder: 'Ukažte Víle žeton 1 Měšťana, který je ve hře.',
    flavor:
      'Round and round the garden, go. Little girls run to and fro. Little boys climb up the tree. Which of these should Pixie be? Ladies smile and go to town. Lords with axe chop forest down. What’s yours is mine. What’s mine, divine. Silly little Pixie, me.',
  },
  general: {
    name: 'Generál',
    ability:
      'Každou noc se dozvíš, která strana má podle vypravěče navrch. Dobro, zlo, nebo nikdo.',
    firstNightReminder:
      'Ukažte Generálovi palec nahoru, pokud vítězí dobro, palec dolů, pokud vítězí zlo, nebo palec do strany, pokud nemá navrch nikdo.',
    otherNightReminder:
      'Ukažte Generálovi palec nahoru, pokud vítězí dobro, palec dolů, pokud vítězí zlo, nebo palec do strany, pokud nemá navrch nikdo.',
    flavor: 'I don’t have time for quotes.',
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
    flavor: 'It is better to be rich and healthy than poor and sick.',
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
    flavor:
      'Roses are blue, and violets are red, Please reverse what I just said.',
  },
  king: {
    name: 'Král',
    ability:
      'Pokud je mrtvých více než živých, každou noc se dozvíš jednu živou postavu. Démon ví, kdo jsi.',
    firstNightReminder:
      'Probuďte Démona, ukažte mu žeton TATO POSTAVA TĚ VYBRALA, poté žeton Krále a ukažte na hráče Krále.',
    otherNightReminder:
      'Pokud je mrtvých více než živých, ukažte Králi žeton postavy některého živého hráče.',
    flavor:
      'Betwixt the unknown strains of mortal strife / And morbid night, sweet with mystery and woe / Lies unfettered joys of fate’s long and colored life / Who’s garden blooms with each painted Face to Show.',
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
      'Seen traveler',
    ],
    firstNightReminder:
      'Vyberte typ postavy. Ukažte na hráče, jehož postava je tohoto typu. Položte Balonářův žeton VIDĚN na žeton této postavy.',
    otherNightReminder:
      'Vyberte typ postavy, u kterého ještě není žádný žeton VIDĚN vedle postavy tohoto typu. Ukažte na hráče, jehož postava je tohoto typu (pokud nějaký je). Položte Balonářův žeton VIDĚN na žeton této postavy.',
    flavor:
      "More heat! Higher! Higher! Più alto! Ahhh... it is so beautiful from up here, don't you agree? Can you see the children fishing by the river, under the willow? Can you see the glint of the sun on the circus tent-poles? What's this? An old man, alone, passed out in the vineyard? Less heat! Lower! Lower! Vai più in basso!",
  },
  cultleader: {
    name: 'Vůdce sekty',
    ability:
      'Každou noc získáváš příslušnost svého živého souseda. Pokud se do tvé sekty přidají všichni dobří hráči, tvůj tým vyhrává.',
    firstNightReminder:
      'Pokud se Vůdci sekty změnila příslušnost, ukažte mu podle toho signál palec nahoru (dobro) nebo palec dolů (zlo).',
    otherNightReminder:
      'Pokud se Vůdci sekty změnila příslušnost, ukažte mu podle toho signál palec nahoru (dobro) nebo palec dolů (zlo).',
    flavor: 'Thinking themselves wise, they became fools.',
  },
  lycanthrope: {
    name: 'Vlkodlak',
    ability:
      'Každou noc* vybereš 1 živého hráče: pokud je na straně dobra, zemře, ale Démon tu noc nezabíjí. Jeden dobrý hráč se jeví jako zlý.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Vlkodlak ukáže na živého hráče: pokud je dobrý, zemře a této noci už nikdo další zemřít nemůže.',
    flavor: 'Beneath the thin veneer of civilisation lies a howling madness.',
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
    flavor: 'Wait. What. Who? Oh, ok. Wait. What?',
  },
  nightwatchman: {
    name: 'Noční hlídka',
    ability: 'Jednou za hru vybereš hráče: dozví se, kdo jsi.',
    reminders: ['Bez schopnosti'],
    firstNightReminder:
      'Noční hlídka může ukázat na hráče. Probuďte tohoto hráče, ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Noční hlídky, pak ukažte na hráče Noční hlídky.',
    otherNightReminder:
      'Noční hlídka může ukázat na hráče. Probuďte tohoto hráče, ukažte mu žeton TATO POSTAVA TĚ VYBRALA a poté žeton Noční hlídky, pak ukažte na hráče Noční hlídky.',
    flavor:
      'The night is cold and lonely, but I have the moon, the stars, the crisp wind and the soft thud of leather boots on cobbled stone for company. Yonder, candlelight flickers behind a murky window...',
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
    flavor:
      'If it bends, great. If it breaks, well, it probably needed fixing anyway.',
  },
  fisherman: {
    name: 'Rybář',
    ability:
      'Jednou za hru můžeš soukromě zajít za Vypravěčem a získat radu, jak má tvůj tým vyhrát.',
    reminders: ['Bez schopnosti'],
    flavor:
      'This was my favourite part of the river... see how the sunlight makes a rainbow from the monastery to the market? This was the best place for big fish. And the older I get, the bigger they were.',
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
    flavor:
      'My cabin is warm and sturdy. My axe by the door, my boots drying by the fire, and elk stew a-simmering… Hark! A scream echoes through the valley! The rain and the mud and the cold, cold wind mask the scent of the wolves, but I know the path and my pace is steady. I am coming.',
  },
  alchemist: {
    name: 'Alchymista',
    ability:
      'Máš schopnost Přisluhovače. Při použití shopnosti Vypravěč může vyzvat ke změně volby.',
    firstNightReminder:
      'Ukažte mu žeton JSI a žeton postavy Přisluhovače.',
    flavor:
      'Visit the interior of the Earth. By rectification thou shalt find the hidden stone. Above the gold, lieth the red. Kether in Malkuth.',
  },
  farmer: {
    name: 'Farmář',
    ability: 'Pokud v noci zemřeš, živý dobrý hráč se stane Farmářem.',
    otherNightReminder:
      'Pokud dnes v noci zemřel Farmář, vyberte jiného dobrého hráče a udělejte z něj Farmáře. Probuďte tohoto hráče, ukažte mu žeton JSI a žeton postavy Farmáře.',
    flavor:
      'Even the high and mighty need food on the table. Without us, the city starves.',
  },
  magician: {
    name: 'Kouzelník',
    ability:
      'Démon si myslí, že jsi Přisluhovač. Přisluhovači si myslí, že jsi Démon.',
    flavor:
      '1... 2... Abra... 3... 4... Cadabra... *poof!* And, as you can see, ladies and gentlemen, Captain Farnsworth’s bag of gold has disappeared! Gone! Without a trace! Thank you, and goodnight!',
  },
  choirboy: {
    name: 'Zpěváček',
    ability:
      'Pokud Démon zabije Krále, dozvíš se, který hráč je Démon. [+ Král]',
    otherNightReminder:
      'Pokud Krále zabil Démon, probuďte Zpěváčka a ukažte na hráče Démona.',
    flavor:
      'I saw it, I did. I was in the pews, tidying the hymn books, when a dreadful tune started from the pipe organ. The organist had a long cloak, and long fingers on the keys. And a hat that looked… just like… yours.',
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
    flavor:
      'In the hidden groves of the deep forest, the black poppy dwells. To see its revelry is to be enchanted. To smell its thick aroma is to be lost forever, a slave to the gods of light and dark.',
  },
  atheist: {
    name: 'Ateista',
    ability:
      'Vypravěč může porušovat pravidla hry a dobro vyhraje, je-li popraven (i když jsi mrtvý). [Žádné zlé postavy]',
    flavor:
      'Let us disperse with unnecessary conjecture and silly paranoia. There is a perfectly rational explanation for everything. Yes, a teacup may indeed be orbiting the planet, too small to see, but I shall drink my tea from the very real china in my very real hands.',
  },
  ogre: {
    name: 'Zlobr',
    ability:
      'Během své první noci vybereš 1 hráče (ne sebe): získáváš jeho příslušnost (nevíš jakou), i když jsi opilý nebo otrávený.',
    reminders: ['Friend'],
    firstNightReminder:
      'Zlobr ukáže na hráče (ne na sebe) a získá jeho příslušnost.',
    flavor: '<grunt><grin></grunt>',
  },
  cannibal: {
    name: 'Kanibal',
    ability:
      'Máš schopnost naposledy popravené postavy, která zemřela. Pokud byla na straně zla, jsi otrávený, dokud nezemře popravou dobrý hráč.',
    reminders: ['Poisoned', 'Dnes zemřel'],
    flavor: 'I don’t like clowns. They taste funny.',
  },
  snitch: {
    name: 'Práskač',
    ability:
      'Přisluhovači začínají s informací o 3 postavách, které nejsou ve hře.',
    firstNightReminder:
      'Po informacích pro Přisluhovače probuďte každého Přisluhovače a ukažte mu tři žetony postav, které nejsou ve hře. Tyto postavy mohou být stejné nebo jiné než ty, které jste ukázali Démonovi i ostatním Přisluhovačům.',
    flavor: 'It was John.',
  },
  acrobat: {
    name: 'Akrobat',
    ability:
      'Každou noc* vybereš 1 hráče: pokud tuto noc je nebo se stane opilým nebo otráveným, zemřeš.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Pokud je dobrý živý soused opilý nebo otrávený, hráč Akrobata zemře.',
    flavor: 'Welcome, one and all, to the greatest show on earth.',
  },
  puzzlemaster: {
    name: 'Hádankář',
    ability:
      '1 hráč je opilý, i když jsi mrtvý. Jednou za hru můžeš hádat, který. Dozvíš se, kdo je Démon, pokud to uhodneš. V opačném případě dostaneš nesprávnou informaci.',
    reminders: ['Opilý', 'Guess used'],
    flavor:
      'When one begins to think that some thing is merely some other thing, one is usually on the brink of an error. Patience, patience. Don’t confuse just and should with is and isn’t.',
  },
  heretic: {
    name: 'Heretik',
    ability:
      'Kdokoliv vyhraje, prohrává a kdokoliv prohraje, vyhrává (i když jsi mrtvý).',
    flavor:
      'After the hail has smashed the roof and splintered the glass of the Cathedral windows, it melts again into the earth, like a dying lamb in the desert sun. Such is the parable of the madman.',
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
    flavor: "Don't touch the hair, honey.",
  },
  golem: {
    name: 'Golem',
    ability:
      'Nominovat můžeš jen jednou za hru. Když tak učiníš a nominovaný není Démon, zemře.',
    reminders: ['Can not nominate'],
    flavor: 'Golem help? Golem smash! Golem help.',
  },
  politician: {
    name: 'Politician',
    ability:
      'Pokud jsi byl hráčem, který byl nejvíc zodpovědný za prohru svého týmu, změníš příslušnost a vyhráváš, i když jsi mrtvý.',
    flavor:
      "I'm glad you asked that question. Truly, I am. But I think the REAL question here is...",
  },
  widow: {
    name: 'Vdova',
    ability:
      'Svou první noc nahlédneš do grimoáru a vybereš 1 hráče: je otrávený. Jeden dobrý hráč ví, že Vdova je ve hře.',
    reminders: ['Poisoned'],
    firstNightReminder:
      'Ukažte Vdově grimoár na tak dlouho, jak potřebuje. Vdova ukáže na hráče, který je otrávený. Probuďte jednoho dobrého hráče. Ukažte mu žeton TYTO POSTAVY JSOU VE HŘE a poté žeton postavy Vdovy.',
    flavor:
      'More wine? Château d’Ergot ’07 is a very special vintage. My yes, very special indeed.',
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
    flavor:
      'Beware of gazing long into the Abyss, lest the Abyss also gaze into you.',
  },
  psychopath: {
    name: 'Psychopat',
    ability:
      'Každý den, před nominacemi, můžeš veřejně vybrat hráče: ten zemře. Pokud jsi popraven, zemřeš, jenom když prohraješ kámen-nůžky-papír.',
    flavor: 'Surprise!',
  },
  goblin: {
    name: 'Skřet',
    ability:
      'Pokud během své nominace veřejně prohlásíš, že jsi Skřet a jsi ten den popraven, tvůj tým vyhrává.',
    reminders: ['Claimed'],
    flavor:
      'You don’t want to insult the goblins. You really, really don’t. On a completely different note… can I have another piece of cake?',
  },
  mezepheles: {
    name: 'Mezefeles',
    ability:
      'Začínáš s informací o tajném slově. První dobrý hráč, který toto slovo vysloví, se v noci stane zlým.',
    reminders: ['Turns evil', 'Bez schopnosti'],
    firstNightReminder: 'Ukažte Mezefelovi jeho tajné slovo.',
    otherNightReminder:
      'Probuďte prvního dobrého hráče, který vyslovil Mezefelovo tajné slovo, a ukažte mu žeton JSI a poté signál palec dolů (zlo).',
    flavor:
      'That which issues from the heart alone, will bend the hearts of others to your own.',
  },
  marionette: {
    name: 'Marioneta',
    ability:
      'Myslíš si, že jsi na straně dobra, ale nejsi. Démon ví, kdo jsi. [Sousedíš s Démonem]',
    firstNightReminder:
      'Vyberte jednoho z dobrých hráčů sousedících s Démonem a položte k němu žeton JE MARIONETA. Probuďte Démona a ukažte mu Marionetu.',
    flavor: "Words, words. They're all we have to go on.",
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
    flavor:
      'Hail the guardians of the north; by my intellect, thou art cut. Hail the guardians of the east; by my will, thou art dominated. Hail the guardians of the south; by that which lies beyond, the mystery is revealed. Hail the guardians of the west; a shield in the darkness',
  },
  boomdandy: {
    name: 'Boomdandy',
    ability:
      'Pokud jsi popraven, všichni kromě 3 hráčů zemřou. O minutu později zemře hráč, na kterého ukazuje nejvíce ostatních.',
    flavor: 'Tick... Tick... Tick... TOCK.',
  },
  vizier: {
    name: 'Vizír',
    ability:
      'Všichni hráči vědí, že jsi Vizír. Nemůžeš zemřít ve dne. Pokud hlasovali dobří hráči, můžeš se rozhodnout někoho okamžitě popravit.',
    firstNightReminder: 'Oznamte, který hráč je Vizír.',
    flavor:
      'An excellent decision, as always, sire. Such a petty crime as bumping into the Bishop indeed deserves your ‘justice’ and ‘mercy’. Take a stroll in the gardens. Visit the gallery and peruse the sculptures of Von Strauf. Relax, sire. Leave everything… to me.',
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
    flavor:
      'Round and round the handles go. The more you dance the less you know.',
  },
  boffin: {
    name: 'Boffin',
    ability:
      'Démon (i když je opilý nebo otrávený) má schopnost dobré postavy, která není ve hře. Vy oba víte, o kterou jde.',
    firstNightReminder:
      'Probuďte Boffina a ukažte mu žeton dobré postavy, jejíž schopnost má Démon. Boffina uspěte. Probuďte Démona, ukažte mu žeton Boffina a poté žeton dobré postavy, jejíž schopnost má.',
    flavor:
      'Stellar hydrogen, vast, inert; carbon, oxygen, neon gases, all ruined. Molecular chaos, entropy, yields new cosmic phenomena, rebirth from atomic chaos, dense matter collapsing. All in a teeny little bottle.',
  },
  yaggababble: {
    name: 'Blabla Jaga',
    ability:
      'Začínáš s informací o tajném rčení. Za každé jeho veřejné vyslovení, které ve dne učiníš, může zemřít jeden hráč.',
    reminders: ['Mrtvý', 'Mrtvý', 'Mrtvý'],
    firstNightReminder: 'Ukažte Blabla Jaze její tajnou frázi.',
    otherNightReminder:
      'Vyberte počet hráčů až do počtu, kolikrát dnes Blabla Jaga veřejně pronesla svou tajnou frázi; tito hráči zemřou.',
    flavor:
      'Murders inside the Rue Morgue? Фальшивые новости! Hounds on the Baskerville moor? Фальшивые новости! Death while sailing the Nile? Фальшивые новости!',
  },
  lilmonsta: {
    name: "Lil' Monsta",
    ability:
      "Každou noc si Přisluhovači zvolí, kdo bude hlídat žeton Lil' Monsta a „bude Démonem“. Každou noc* zemře 1 hráč. [+1 Přisluhovač]",
    firstNightReminder:
      "Probuďte všechny Přisluhovače najednou a nechte je hlasovat ukazováním na toho, kdo má hlídat Lil' Monsta.",
    otherNightReminder:
      "Probuďte všechny Přisluhovače najednou a nechte je hlasovat ukazováním na toho, kdo má hlídat Lil' Monsta. Poté vyberte hráče, který zemře.",
    flavor: 'Step 1: Be cute. Step 2: World domination. Step 3: Bweakfast.',
  },
  kazali: {
    name: 'Kazali',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. [Vybereš si, kteří hráči jsou jací Přisluhovači. -? až +? Podivínů]',
    reminders: ['Mrtvý'],
    firstNightReminder:
      'Kazali ukáže na hráče a na Přisluhovače na přehledu postav. Udělá to tolikrát, kolik má být ve hře Přisluhovačů. Změňte žetony těchto hráčů na zvolené žetony Přisluhovačů. Probuďte tyto hráče, ukažte jim žeton JSI, jejich nové žetony Přisluhovačů a palec dolů.',
    otherNightReminder: 'Kazali ukáže na hráče. Tento hráč zemře.',
    flavor:
      'Gon(z)a7les6. Take cau8tun. The mech4an4ion is iNvert10d. E99ors insy6tum. Reco{7}fig.',
  },
  lleech: {
    name: 'Pijavice',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. Začínáš výběrem 1 živého hráče: je otrávený a ty zemřeš, jen pokud zemře tento hráč.',
    reminders: ['Mrtvý', 'Poisoned'],
    firstNightReminder:
      'Pijavice ukáže na hráče. Položte k němu žeton OTRÁVENÝ.',
    otherNightReminder: 'Pijavice ukáže na hráče. Tento hráč zemře.',
    flavor:
      'Tasty, tasty, tasty, tasty, tasty, tasty, tasty, tasty brai- I mean pie! Yes. Tasty pie. That’s what I meant to say.',
  },
  ojo: {
    name: 'Ojo',
    ability:
      'Každou noc* vybereš postavu: ta zemře. Pokud není ve hře, vypravěč rozhodne o tom, kdo zemře.',
    reminders: ['Mrtvý'],
    otherNightReminder:
      'Ojo ukáže na postavu na přehledu. Pokud je ve hře, hráč s touto postavou zemře. Pokud není ve hře, vypravěč zvolí, kdo zemře místo ní.',
    flavor: 'Like a bonfire on a moonless night… I see you, mortal.',
  },
  alhadikhia: {
    name: 'Al-Hadichia',
    ability:
      'Každou noc* vybereš 3 hráče (všichni se dozví které): každý se v tichosti rozhodne, jestli chce žít nebo zemřít, ale pokud si všichni vyberou život, všichni zemřou.',
    reminders: ['1', '2', '3', 'Chose death', 'Chose life'],
    otherNightReminder:
      'Al‑Hadichia vybere 3 hráče. Oznámte prvního, probuďte ho a nechte ho kývnout hlavou (ano) pro život nebo zavrtět hlavou (ne) pro smrt; podle toho ho zabijte nebo oživte, pak ho uspěte a oznamte dalšího hráče. Pokud jsou po tomto všichni 3 naživu, všichni 3 zemřou.',
    flavor: 'Alsukut min dhahab.',
  },
  legion: {
    name: 'Legie',
    ability:
      'Každou noc* může zemřít 1 hráč. Pokud pro popravu hlasují jen zlí hráči, poprava nebude úspěšná. Jevíš se také jako Přisluhovač. [Většina hráčů jsou Legie.]',
    reminders: ['Mrtvý', 'About to die'],
    otherNightReminder: 'Vyberte hráče, tento hráč zemře.',
    flavor:
      'We are the chill wind on a winter’s day. We are the shadow in the moonless night. We are the poison in your tea and the whisper in your ear. We are everywhere.',
  },
  lordoftyphon: {
    name: 'Pán bouře',
    ability:
      'Každou noc* vybereš 1 hráče: ten zemře. [Zlí hráči sedí vedle sebe a ty jsi uprostřed. +1 Přisluhovač, -? až +? Podivínů]',
    reminders: ['Mrtvý'],
    firstNightReminder:
      'Probuďte hráče sedící po obou stranách Démona. Ukažte jim žeton JSI, žeton Přisluhovače, kterým se stali, a palec dolů, aby bylo jasné, že jsou zlí.',
    otherNightReminder: 'Pán bouře ukáže na hráče. Tento hráč zemře.',
    flavor:
      'In the shadowed and forgotten corners of the cosmos, where the stars whisper secrets to the void, lies a truth so profound that the merest glimpse of it unravels the sanity of mortal minds.',
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
    flavor:
      'To the last, I grapple with thee. From Hell’s heart, I stab at thee. For hate’s sake, I spit my last breath at thee.',
  },
  riot: {
    name: 'Riot',
    ability:
      'Nominovaní hráči zemřou, ale mohou okamžitě znovu nominovat (třetí den musí). Po 3. dni vyhrává zlo. [Všichni Přisluhovači jsou Riot]',
    flavor: 'Larga vida a la revolución! Mi revolucion!',
  },
  gangster: {
    name: 'Gangster',
    ability:
      'Jednou za den můžeš zabít živého souseda, pokud s tím tvůj druhý živý soused souhlasí.',
    flavor:
      'I like your shoes. It would be such a shame if you had a little accident, and they got ruined. Now that you mention it, I like your cufflinks too.',
  },
  gnome: {
    name: 'Gnome',
    ability:
      'Všichni hráči na začátku vědí o jednom hráči tvé příslušnosti. Můžeš se rozhodnout zabít kohokoli, kdo ho nominuje.',
    reminders: ['Amigo'],
    flavor:
      "Four the score or seven beers, no shows are goes for me and my. A prank to crack the cranks and planks o' the floor foundation length, so incontravertabubbilly mini. The large essays down streams of joyce, no greater than is scene, not inherdt, Ha-urrumph.o.",
  },
  steward: {
    name: 'Steward',
    ability: 'Začínáš s informací o 1 dobrém hráči.',
    reminders: ['Know'],
    firstNightReminder: 'Ukažte na označeného hráče.',
    flavor:
      'How DARE you accuse Her Ladyship of wrongdoing? I’ve known her my entire life! All nine years!',
  },
  knight: {
    name: 'Rytíř',
    ability: 'Začínáš s informací o 2 hráčích, kteří nejsou Démon.',
    reminders: ['Know', 'Know'],
    firstNightReminder: 'Ukažte na 2 označené hráče.',
    flavor: 'When a man lies, he murders some part of the world.',
  },
  shugenja: {
    name: 'Shugenja',
    ability:
      'Začínáš s informací o tom, jestli nejbližší zlý hráč k tobě sedí po nebo proti směru hodinových ručiček. V případě stejné vzdálenosti je informace libovolná.',
    firstNightReminder:
      'Pokud nejbližší zlý hráč sedí ve směru hodinových ručiček, ukážte vodorovně prstem tím směrem. Pokud nejbližší zlý hráč sedí proti směru hodinových ručiček, ukážte vodorovně prstem tím směrem. Pokud jsou dva nejbližší zlí hráči stejně daleko, ukážte vodorovně prstem libovolným směrem.',
    flavor: 'これは夢。それも夢。すべて夢です。',
  },
  highpriestess: {
    name: 'Velekněžka',
    ability:
      'Každou noc se dozvíš, se kterým hráčem by sis měla podle vypravěče promluvit.',
    firstNightReminder: 'Ukažte na hráče.',
    otherNightReminder: 'Ukažte na hráče.',
    flavor:
      'There is life behind the personality that uses personalities as masks. There are times when life puts off the mask and deep answers to deep.',
  },
  alsaahir: {
    name: 'Alsaahir',
    ability:
      'Každý den, když veřejně uhodneš, kteří hráči jsou Přisluhovači a Démoni, dobro vyhrává.',
    flavor: 'I am here because of you, and you are here because of me.',
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
    flavor:
      'Gorm do shúile, dearg do ghruaig, ní bheidh sé i bhfad, is a mbeidh tú san uaigh.',
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
    flavor: 'Pleauze shtay shtill. Thinks nid tiime for hillink. Myrhh-myrhh.',
  },
  hatter: {
    name: 'Kloboučník',
    ability:
      'Pokud jsi dnes ve dne nebo v noci zemřel, mohou si hráči Přisluhovačů a Démona zvolit nové postavy Přisluhovačů a Démona, kterými budou.',
    reminders: ['Tea Party Tonight'],
    otherNightReminder:
      'Probuďte Přisluhovače a Démona. Každý z nich buď zavrtí hlavou (ne), nebo ukáže na jinou postavu stejného typu, jako je ta jejich současná. Pokud by druhý hráč skončil se stejnou postavou jako někdo jiný, zavrťte hlavou a gestem ho vyzvěte, aby si vybral znovu. Změňte každému hráči postavu na tu, kterou si zvolil.',
    flavor:
      'One Hat. Too Hat. Three Hat. Tea Hat. Fore Hat. Thrive Hat. Six Hat. Sticks Hat.',
  },
  zealot: {
    name: 'Fanatik',
    ability:
      'Pokud je naživu 5 nebo více hráčů, musíš hlasovat při každé nominaci.',
    flavor:
      'I enjoy talking to you. Your mind appeals to me. It resembles my own mind except that you happen to be insane.',
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
    flavor:
      'So fair a day I never did see, nor so fowl a presence hanging over me.',
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
    flavor:
      'Every man and every woman is a star. Love is the law, love under will.',
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
    flavor: 'Down they fall. One by one. By two, by three, by five.',
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
    otherNightReminder:
      'Pokud hráč zemře v noci, probuďte ho, ukažte mu žeton JSI, jeho žeton postavy, znovu žeton JSI a nakonec palec nahoru nebo palec dolů.',
    flavor:
      'With thunder as my voice and lightning as my blade, I, the eternal guardian, feast upon the fools who dare approach the forbidden gate. Behold, my sacred goal! To purge the beetle from the belly of the rocky earth, to ensnare it in a net of stars on the hilltop where heaven meets earth.',
  },
  bigwig: {
    name: 'Velké zvíře',
    ability:
      "Každý nominovaný si zvolí hráče: až do hlasování může mluvit pouze obhájce & je 'Posedlý' představou, že nominovaný je dobrý, jinak může zemřít.",
    flavor:
      'Vanity asks ‘Is it popular?’ Cowardice asks ‘Is it safe?’ Conscience asks ‘Is it right?’ Who among us will ask: ‘Is it true?’',
  },
}

export default roleTranslationsCs
