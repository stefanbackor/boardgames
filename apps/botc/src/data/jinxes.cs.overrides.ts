import { Jinx } from '@/types/jinx'

/**
 * Czech translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array (same order, same pairs) but
 * only the `reason` texts are localized. Role ids stay the same as in the
 * base data.
 */

export const jinxesCs: Array<Jinx> = [
  {
    id: 'alchemist',
    hatred: [
      {
        id: 'boffin',
        reason:
          'Pokud má Alchymista schopnost Boffina, Alchymista se nedozví, jakou schopnost má Démon.',
      },
      {
        id: 'marionette',
        reason:
          'Alchymista-Marioneta nemá schopnost Marionety a Marioneta je ve hře.',
      },
      {
        id: 'mastermind',
        reason:
          'Alchymista-Strůjce nemá schopnost Strůjce a Strůjce není ve hře.',
      },
      {
        id: 'organgrinder',
        reason:
          'Pokud má Alchymista schopnost Cvičitele opic, Cvičitel opic je ve hře. Pokud jsou oba střízliví, oba jsou opilí.',
      },
      {
        id: 'spy',
        reason:
          'Alchymista-Špeh nemá schopnost Špeha a Špeh je ve hře. Po každé popravě může žijící Alchymista-Špeh veřejně označit žijícího hráče za Špeha. Pokud má pravdu, Démon musí tuto noc zvolit Špeha.',
      },
      {
        id: 'summoner',
        reason:
          'Alchymista-Vyvolávač nedostává bluffy a volí, který Démon, ale ne který hráč. Pokud zemře, než k tomu dojde, vyhrává zlo. [Žádný Démon]',
      },
      {
        id: 'widow',
        reason:
          'Alchymista-Vdova nemá schopnost Vdovy a Vdova je ve hře. Po každé popravě může žijící Alchymista-Vdova veřejně označit žijícího hráče za Vdovu. Pokud má pravdu, Démon musí tuto noc zvolit Vdovu.',
      },
      {
        id: 'wraith',
        reason:
          'Alchymista-Přízrak nemá schopnost Přízraku a Přízrak je ve hře. Po každé popravě může žijící Alchymista-Přízrak veřejně označit žijícího hráče za Přízraka. Pokud má pravdu, Démon musí tuto noc zvolit Přízraka.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Pokud Al-Hadichia zemře popravou a Strůjce je naživu, Al-Hadichia tuto noc zvolí 3 dobré hráče: pokud se všichni 3 rozhodnou žít, vyhrává zlo. Jinak vyhrává dobro.',
      },
      {
        id: 'princess',
        reason:
          'Pokud Princezna ve svůj první den nominovala hráče, který byl popraven, tuto noc nikdo nezemře kvůli Al-Hadichii.',
      },
    ],
  },
  {
    id: 'boffin',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Pokud má Démon schopnost Vůdce sekty, nemůže se kvůli této schopnosti stát dobrým.',
      },
      {
        id: 'drunk',
        reason: 'Démon nemůže mít schopnost Opilce.',
      },
      {
        id: 'goon',
        reason:
          'Pokud má Démon schopnost Hňupa, nemůže se kvůli této schopnosti stát dobrým.',
      },
      {
        id: 'heretic',
        reason: 'Démon nemůže mít schopnost Heretika.',
      },
      {
        id: 'ogre',
        reason: 'Démon nemůže mít schopnost Zlobra.',
      },
      {
        id: 'politician',
        reason: 'Démon nemůže mít schopnost Politiciana.',
      },
      {
        id: 'villageidiot',
        reason:
          'Pokud je k dispozici volný žeton, Boffin může dát Démonovi schopnost Vesnického pobudy.',
      },
    ],
  },
  {
    id: 'bountyhunter',
    hatred: [
      {
        id: 'kazali',
        reason:
          'Pokud Kazali změní Lovce odměn v Přisluhovače, nevznikne zlý Měšťan.',
      },
      {
        id: 'philosopher',
        reason:
          'Pokud Filozof získá schopnost Lovce odměn, některý Měšťan se může stát zlým.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'organgrinder',
        reason:
          'Pokud Cvičitel opic způsobuje hlasování se zavřenými očima, Sluha může zvednout ruku, ale jeho hlas se počítá jen tehdy, pokud hlasoval i jeho pán.',
      },
    ],
  },
  {
    id: 'cannibal',
    hatred: [
      {
        id: 'butler',
        reason: 'Pokud Kanibal získá schopnost Sluhy, Kanibal se o tom dozví.',
      },
      {
        id: 'juggler',
        reason:
          'Pokud Kejklíř hádá ve svůj první den a zemře popravou, žijící Kanibal se tuto noc dozví, kolik tipů měl Kejklíř správně.',
      },
      {
        id: 'princess',
        reason:
          'Pokud Kanibal dnes nominoval Princeznu, která byla popravena a zemřela, Démon tuto noc nezabíjí.',
      },
      {
        id: 'zealot',
        reason: 'Pokud Kanibal získá schopnost Fanatika, Kanibal se to dozví.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'Cerenovus může vybrat hráče, který musí předstírat, že je Skřet.',
      },
    ],
  },
  {
    id: 'heretic',
    hatred: [
      {
        id: 'baron',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'godfather',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'lleech',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'pithag',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'spy',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'widow',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Pokud vznikne Legie, všichni zlí hráči se stanou Legií. Pokud je Legie ve hře, Inženýr to na začátku ví, ale nemá schopnost.',
      },
      {
        id: 'hatter',
        reason:
          'Pokud vznikne Legie, všichni zlí hráči se stanou Legií. Pokud je Legie ve hře, Kloboučník nemá schopnost.',
      },
      {
        id: 'minstrel',
        reason:
          'Pokud dnes Legie zemřela popravou, Legie si ponechá svou schopnost, ale Pěvec se může dozvědět, že je Legie.',
      },
      {
        id: 'politician',
        reason: 'Politician se může Legii jevit jako zlý.',
      },
      {
        id: 'preacher',
        reason:
          'Pokud Kazatel zvolí Legii, Legie si ponechá svou schopnost, ale Kazatel se může dozvědět, že je to Legie.',
      },
      {
        id: 'summoner',
        reason: 'Pokud je vyvolána Legie, všichni zlí hráči se stanou Legií.',
      },
      {
        id: 'zealot',
        reason: 'Fanatik se může Legii jevit jako zlý.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Každou noc* Leviathan zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolená Smrtonoška zemře a získá svou schopnost.',
      },
      {
        id: 'exorcist',
        reason:
          'Pokud Leviathan nominuje hráče zvoleného Exorcistou a ten je popraven, vyhrává dobro.',
      },
      {
        id: 'farmer',
        reason:
          'Každou noc* Leviathan zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolený Farmář použije svou schopnost, ale nezemře.',
      },
      {
        id: 'grandmother',
        reason:
          'Pokud je Leviathan ve hře a vnouče zemře popravou, vyhrává zlo.',
      },
      {
        id: 'hatter',
        reason: 'Leviathan nemůže vstoupit do hry po 5. dni.',
      },
      {
        id: 'innkeeper',
        reason:
          'Pokud Leviathan nominuje hráče chráněného Hostinským a ten je popraven, vyhrává dobro.',
      },
      {
        id: 'king',
        reason:
          'Pokud je Leviathan ve hře a alespoň 1 hráč je mrtvý, Král se každou noc dozví jednu žijící postavu.',
      },
      {
        id: 'mayor',
        reason:
          'Pokud jsou Leviathan a Starosta 5. den naživu a nedojde k popravě, vyhrává dobro.',
      },
      {
        id: 'monk',
        reason:
          'Pokud Leviathan nominuje hráče chráněného Mnichem a ten je popraven, vyhrává dobro.',
      },
      {
        id: 'pithag',
        reason: 'Leviathan nemůže vstoupit do hry po 5. dni.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Každou noc* Leviathan zvolí žijícího hráče (jiného než v předchozích nocích): zvolená Strážkyně krkavců použije svou schopnost, ale nezemře.',
      },
      {
        id: 'sage',
        reason:
          'Každou noc* Leviathan zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolený Mudrc použije svou schopnost, ale nezemře.',
      },
      {
        id: 'soldier',
        reason:
          'Pokud Leviathan nominuje Vojáka a ten je popraven, vyhrává dobro.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'hatter',
        reason:
          "Pokud Kloboučník zemře a Démon zvolí Lil' Monstu, zvolí také Přisluhovače, kterým se stane.",
      },
      {
        id: 'magician',
        reason:
          "Pokud je Kouzelník naživu, Vypravěč zvolí, který Přisluhovač opatruje Lil' Monstu.",
      },
      {
        id: 'poppygrower',
        reason:
          "Pokud jsou Lil' Monsta a Maková panenka naživu, Přisluhovači se probouzejí jeden po druhém, dokud si jeden z nich nevezme žeton Lil' Monsty.",
      },
      {
        id: 'psychopath',
        reason:
          "Pokud Psychopat opatruje Lil' Monstu, zemře, když je popraven.",
      },
      {
        id: 'scarletwoman',
        reason:
          "Pokud Lil' Monsta zemře, když je naživu 5 nebo více hráčů, Šarlatová žena opatruje Lil' Monstu po zbytek hry.",
      },
      {
        id: 'vizier',
        reason: "Pokud Vizír opatruje Lil' Monstu, zemře, když je popraven.",
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Pokud je Strůjce naživu a hostitel Pijavice zemře popravou, Pijavice zůstává naživu, ale ztrácí svou schopnost.',
      },
      {
        id: 'slayer',
        reason: 'Pokud Zabiják zabije hostitele Pijavice, hostitel zemře.',
      },
    ],
  },
  {
    id: 'magician',
    hatred: [
      {
        id: 'legion',
        reason:
          'Pokud je Kouzelník ve hře, během fáze informací pro Démona se Legie probouzí v oddělených skupinách. Každá skupina se dozví, kteří hráči jsou dobří, ale nedozví se, kdo je Kouzelník.',
      },
      {
        id: 'marionette',
        reason:
          'Pokud je Kouzelník naživu, Démon neví, který z jeho sousedů je Marioneta.',
      },
      {
        id: 'spy',
        reason:
          'Když Špeh nahlédne do grimoáru, žetony postav Démona a Kouzelníka jsou z grimoáru odstraněny.',
      },
      {
        id: 'vizier',
        reason:
          'Pokud je Vizír ve hře, Kouzelník nemá schopnost, ale je imunní vůči schopnosti Vizíra.',
      },
      {
        id: 'widow',
        reason:
          'Když Vdova nahlédne do grimoáru, žetony postav Démona a Kouzelníka jsou z grimoáru odstraněny.',
      },
      {
        id: 'wraith',
        reason:
          'Po každé popravě může žijící Kouzelník veřejně označit žijícího hráče za Přízraka. Pokud má pravdu, Démon musí tuto noc zvolit Přízraka.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'balloonist',
        reason:
          'Pokud si Marioneta myslí, že je Balonář, mohl být během přípravy přidán Podivín.',
      },
      {
        id: 'huntsman',
        reason:
          'Pokud si Marioneta myslí, že je Lovec, byla během přípravy přidána Kráska.',
      },
      {
        id: 'kazali',
        reason:
          'Pokud by měla být ve hře Marioneta, vstupuje do hry po Démonovi a musí začínat jako jeho soused.',
      },
      {
        id: 'lilmonsta',
        reason:
          'Pokud by měla být ve hře Marioneta, vstupuje do hry po Démonovi a musí začínat jako jeho soused.',
      },
      {
        id: 'summoner',
        reason:
          'Pokud by měla být ve hře Marioneta, vstupuje do hry po Démonovi a musí začínat jako jeho soused.',
      },
    ],
  },
  {
    id: 'mastermind',
    hatred: [
      {
        id: 'vigormortis',
        reason:
          'Strůjce, který má svou schopnost, si ji ponechá, i když Vigormortis zemře.',
      },
    ],
  },
  {
    id: 'mathematician',
    hatred: [
      {
        id: 'chambermaid',
        reason: 'Komorná může zjistit, zda se Matematik tuto noc probudí.',
      },
      {
        id: 'drunk',
        reason:
          'Matematik se dozví, pokud schopnost Opilce poskytla nesprávnou informaci nebo nefungovala správně.',
      },
      {
        id: 'lunatic',
        reason:
          'Matematik se dozví, pokud Blázen zaútočí na jiného hráče, než na kterého zaútočil skutečný Démon.',
      },
      {
        id: 'marionette',
        reason:
          'Matematik se dozví, pokud schopnost Marionety poskytla nesprávnou informaci nebo nefungovala správně.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Pokud Ježibaba změní zlého hráče ve Vůdce sekty, nemůže se kvůli své vlastní schopnosti stát dobrým.',
      },
      {
        id: 'damsel',
        reason:
          'Pokud Ježibaba vytvoří Krásku, Vypravěč zvolí, který hráč jí bude.',
      },
      {
        id: 'goon',
        reason:
          'Pokud Ježibaba změní zlého hráče v Hňupa, nemůže se kvůli své vlastní schopnosti stát dobrým.',
      },
      {
        id: 'ogre',
        reason:
          'Pokud Ježibaba změní zlého hráče ve Zlobra, nemůže se kvůli své vlastní schopnosti stát dobrým.',
      },
      {
        id: 'politician',
        reason:
          'Pokud Ježibaba změní zlého hráče v Politiciana, nemůže se kvůli své vlastní schopnosti stát dobrým.',
      },
      {
        id: 'villageidiot',
        reason:
          'Pokud je k dispozici volný žeton, Ježibaba může vytvořit dalšího Vesnického pobudu. Pokud to udělá, může se změnit, který Vesnický pobuda je opilý.',
      },
    ],
  },
  {
    id: 'plaguedoctor',
    hatred: [
      {
        id: 'baron',
        reason:
          'Pokud by Vypravěč získal schopnost Barona, až dva hráči se stanou Podivíny.',
      },
      {
        id: 'boomdandy',
        reason:
          'Pokud by Vypravěč získal schopnost Boomdandyho, jeden hráč se stane Boomdandym.',
      },
      {
        id: 'eviltwin',
        reason:
          'Pokud by Vypravěč získal schopnost Zlého dvojčete, jeden hráč se stane Zlým dvojčetem.',
      },
      {
        id: 'fearmonger',
        reason:
          'Pokud by Vypravěč získal schopnost Strachotvůrce, získá ji jeden Přisluhovač a dozví se to.',
      },
      {
        id: 'goblin',
        reason:
          'Pokud by Vypravěč získal schopnost Skřeta, získá ji jeden Přisluhovač a dozví se to.',
      },
      {
        id: 'marionette',
        reason:
          'Pokud by Vypravěč získal schopnost Marionety, jeden z dobrých sousedů Démona se stane Marionetou.',
      },
      {
        id: 'scarletwoman',
        reason:
          'Pokud by Vypravěč získal schopnost Šarlatové ženy, získá ji jeden Přisluhovač a dozví se to.',
      },
      {
        id: 'spy',
        reason:
          'Pokud by Vypravěč získal schopnost Špeha, získá ji jeden Přisluhovač a dozví se to.',
      },
      {
        id: 'wraith',
        reason:
          'Pokud by Vypravěč získal schopnost Přízraku, získá ji jeden Přisluhovač a dozví se to.',
      },
    ],
  },
  {
    id: 'recluse',
    hatred: [
      {
        id: 'ogre',
        reason:
          'Pokud se Samotář jeví Zlobrovi jako zlý, Zlobr se dozví, že je zlý.',
      },
      {
        id: 'sage',
        reason: 'Samotář se může Mudrcovi jevit jako Démon.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'atheist',
        reason:
          'Pokud je během vzpoury nominován Vypravěč, hráči hlasují. Pokud je „na pokraji smrti“, hra končí. Pokud ne, nominuje se znovu.',
      },
      {
        id: 'banshee',
        reason:
          'Každou noc* Riot zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolená Smrtonoška zemře a získá svou schopnost.',
      },
      {
        id: 'exorcist',
        reason:
          'Pokud Riot nominuje hráče zvoleného Exorcistou a ten je popraven, vyhrává dobro.',
      },
      {
        id: 'farmer',
        reason:
          'Každou noc* Riot zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolený Farmář použije svou schopnost, ale nezemře.',
      },
      {
        id: 'grandmother',
        reason: 'Pokud je Riot ve hře a vnouče zemře popravou, vyhrává zlo.',
      },
      {
        id: 'innkeeper',
        reason:
          'Pokud Riot nominuje hráče chráněného Hostinským a ten je popraven, vyhrává dobro.',
      },
      {
        id: 'king',
        reason:
          'Pokud je Riot ve hře a alespoň 1 hráč je mrtvý, Král se každou noc dozví jednu žijící postavu.',
      },
      {
        id: 'mayor',
        reason:
          'Starosta se může rozhodnout vzpouru zastavit. Pokud to udělá, když je naživu jen 1 Riot, vyhrává dobro. Jinak vyhrává zlo.',
      },
      {
        id: 'monk',
        reason:
          'Pokud Riot nominuje hráče chráněného Mnichem a ten je popraven, vyhrává dobro.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Každou noc* Riot zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolená Strážkyně krkavců použije svou schopnost, ale nezemře.',
      },
      {
        id: 'sage',
        reason:
          'Každou noc* Riot zvolí žijícího dobrého hráče (jiného než v předchozích nocích): zvolený Mudrc použije svou schopnost, ale nezemře.',
      },
      {
        id: 'soldier',
        reason: 'Pokud Riot nominuje Vojáka a ten je popraven, vyhrává dobro.',
      },
    ],
  },
  {
    id: 'scarletwoman',
    hatred: [
      {
        id: 'alhadikhia',
        reason:
          'Pokud by měli být ve hře dva Démoni, z nichž jeden byl Šarlatová žena, Šarlatová žena se znovu stane Šarlatovou ženou.',
      },
      {
        id: 'fanggu',
        reason:
          'Pokud by měli být ve hře dva Démoni, z nichž jeden byl Šarlatová žena, Šarlatová žena zůstává Šarlatovou ženou.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'damsel',
        reason: 'Pokud je (nebo byl) Špeh ve hře, Kráska je otrávená.',
      },
      {
        id: 'ogre',
        reason: 'Špeh se Zlobrovi jeví jako zlý.',
      },
      {
        id: 'poppygrower',
        reason: 'Pokud má Maková panenka svou schopnost, Špeh nevidí grimoár.',
      },
    ],
  },
  {
    id: 'summoner',
    hatred: [
      {
        id: 'clockmaker',
        reason: 'Vyvolávač se Hodináři jeví jako Démon.',
      },
      {
        id: 'courtier',
        reason:
          'Pokud žijící Vyvolávač nemá schopnost, schopnost Vyvolávače má Vypravěč.',
      },
      {
        id: 'engineer',
        reason:
          'Pokud je žijící Vyvolávač odstraněn ze hry, schopnost Vyvolávače má Vypravěč.',
      },
      {
        id: 'hatter',
        reason:
          'Pokud Vyvolávač vytvoří druhého žijícího Démona, úmrtí této noci určuje Vypravěč.',
      },
      {
        id: 'kazali',
        reason:
          'Pokud Vyvolávač vytvoří druhého žijícího Démona, úmrtí této noci určuje Vypravěč.',
      },
      {
        id: 'lordoftyphon',
        reason:
          'Pokud je vyvolán Pán bouře, musí sousedit s Přisluhovačem a jeho druhý soused se stane zlým Přisluhovačem.',
      },
      {
        id: 'pithag',
        reason:
          'Pokud Vyvolávač vytvoří druhého žijícího Démona, úmrtí této noci určuje Vypravěč.',
      },
      {
        id: 'poppygrower',
        reason:
          'Pokud je Maková panenka naživu 3. noc, Vyvolávač volí, který Démon, ale ne který hráč.',
      },
      {
        id: 'preacher',
        reason:
          'Pokud žijící Vyvolávač nemá schopnost, schopnost Vyvolávače má Vypravěč.',
      },
      {
        id: 'pukka',
        reason: 'Vyvolávač může vyvolat Pukku 2. noc místo 3.',
      },
      {
        id: 'zombuul',
        reason:
          'Pokud Vyvolávač vyvolá do Zombuula mrtvého hráče, Zombuul už „jednou zemřel“.',
      },
    ],
  },
  {
    id: 'vizier',
    hatred: [
      {
        id: 'alsaahir',
        reason: 'Vypravěč neoznámí, že je Vizír ve hře.',
      },
      {
        id: 'courtier',
        reason:
          'Pokud Vizír ztratí svou schopnost, dozví se to a nemůže zemřít během dne.',
      },
      {
        id: 'fearmonger',
        reason:
          'Vizír se probouzí spolu se Strachotvůrcem, dozví se, koho zvolil, a nemůže rozhodnout o okamžité popravě tohoto hráče.',
      },
      {
        id: 'investigator',
        reason: 'Vypravěč neoznámí, že je Vizír ve hře.',
      },
      {
        id: 'politician',
        reason: 'Politician se může Vizírovi jevit jako zlý.',
      },
      {
        id: 'preacher',
        reason:
          'Pokud Vizír ztratí svou schopnost, dozví se to a nemůže zemřít během dne.',
      },
      {
        id: 'zealot',
        reason: 'Fanatik se může Vizírovi jevit jako zlý.',
      },
    ],
  },
  {
    id: 'vortox',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Pokud Vortox zabije Smrtonošku, všichni hráči se dozví, že Smrtonoška zemřela.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'damsel',
        reason: 'Pokud je (nebo byla) Vdova ve hře, Kráska je otrávená.',
      },
      {
        id: 'poppygrower',
        reason: 'Pokud má Maková panenka svou schopnost, Vdova nevidí grimoár.',
      },
    ],
  },
  {
    id: 'yaggababble',
    hatred: [
      {
        id: 'exorcist',
        reason:
          'Pokud Exorcista zvolí Blabla Jagu, Blabla Jaga tuto noc nezabíjí.',
      },
    ],
  },
]

export default jinxesCs
