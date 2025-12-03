import { Jinx } from '@/types/jinx'

/**
 * Czech GPT-5.1 translations for jinx reasons from `jinxes.ts`.
 *
 * Structure mirrors the base `jinxes` array but only the `reason` texts
 * are localized. Role ids stay the same as in the base data.
 */

export const jinxesCs: Array<Jinx> = [
  {
    id: 'chambermaid',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Komorná se dozví, zda se Matematik tuto noc probouzí nebo ne, i když se Komorná probouzí dříve.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'cannibal',
        reason: 'Pokud Kanibal získá schopnost Sluhy, Kanibal se o tom dozví.',
      },
    ],
  },
  {
    id: 'lunatic',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Matematik se dozví, pokud Blázen zaútočí na jiného nebo jiné hráče, než na které zaútočil skutečný Démon.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'heretic',
        reason: 'Ježibaba nemůže vytvořit Heretika.',
      },
      {
        id: 'damsel',
        reason:
          'Pokud Ježibaba vytvoří Krásku, Storyteller zvolí, který hráč jí bude.',
      },
      {
        id: 'politician',
        reason: 'Ježibaba nemůže vytvořit zlého Politician.',
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
    id: 'leviathan',
    hatred: [
      {
        id: 'soldier',
        reason: 'Pokud Leviathan nominuje a popraví Vojáka, Voják nezemře.',
      },
      {
        id: 'monk',
        reason:
          'Pokud Leviathan nominuje a popraví hráče, kterého si vybral Mnich, tento hráč nezemře.',
      },
      {
        id: 'innkeeper',
        reason:
          'Pokud Leviathan nominuje a popraví hráče, kterého si vybral Hostinský, tento hráč nezemře.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Pokud je ve hře Leviathan a Strážkyně krkavců zemře popravou, tuto noc se probudí a použije svou schopnost.',
      },
      {
        id: 'sage',
        reason:
          'Pokud je ve hře Leviathan a Mudrc zemře popravou, tuto noc se probudí a použije svou schopnost.',
      },
      {
        id: 'farmer',
        reason:
          'Pokud je ve hře Leviathan a Farmář zemře popravou, tuto noc se z jednoho dobrého hráče stane Farmář.',
      },
      {
        id: 'mayor',
        reason:
          'Pokud je ve hře Leviathan a pátý den nedojde k žádné popravě, vyhrává dobro.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'scarlet woman',
        reason:
          'Pokud jsou ve hře dvě živé Al-Hadichie, Šarlatová žena, která se stala Al-Hadichií, se znovu stane Šarlatovou ženou.',
      },
      {
        id: 'mastermind',
        reason:
          'Ve hře může být jen 1 prokletá postava. Zlí hráči na začátku vědí, který hráč a která postava to je.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'poppygrower',
        reason:
          "Pokud je ve hře Maková panenka, Přisluhovači se neprobouzejí společně. Probouzejí se jeden po druhém, dokud si některý z nich nezvolí, že si vezme žeton Lil' Monsta.",
      },
      {
        id: 'magician',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'scarletwoman',
        reason:
          "Pokud je naživu 5 nebo více hráčů a hráč držící žeton Lil' Monsta zemře, Šarlatová žena dostane tuto noc žeton Lil' Monsta.",
      },
    ],
  },
  {
    id: 'lycanthrope',
    hatred: [
      {
        id: 'gambler',
        reason:
          'Pokud je Vlkodlak naživu a Gambler se v noci zabije, žádný další hráč tuto noc nemůže zemřít.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Na začátku hry nemohou být zároveň ve hře Legie a Engineer. Pokud Engineer vytvoří Legii, většina hráčů (včetně všech zlých) se stane zlými Legie.',
      },
      {
        id: 'preacher',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
    ],
  },
  {
    id: 'fanggu',
    hatred: [
      {
        id: 'scarletwoman',
        reason:
          'Pokud Fang Gu vybere Podivína a zemře, Šarlatová žena se nestane Fang Gu.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'magician',
        reason:
          'Když Špeh nahlédne do grimoáru, žetony postav Démona a Kouzelníka jsou z grimoáru odstraněny.',
      },
      {
        id: 'alchemist',
        reason: 'Alchymista nemůže mít schopnost Špeha.',
      },
      {
        id: 'poppygrower',
        reason:
          'Pokud je ve hře Maková panenka, Špeh nevidí grimoár, dokud Maková panenka nezemře.',
      },
      {
        id: 'damsel',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'heretic',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'magician',
        reason:
          'Když Vdova nahlédne do grimoáru, žetony postav Démona a Kouzelníka jsou z grimoáru odstraněny.',
      },
      {
        id: 'poppygrower',
        reason:
          'Pokud je ve hře Maková panenka, Vdova nevidí grimoár, dokud Maková panenka nezemře.',
      },
      {
        id: 'alchemist',
        reason: 'Alchymista nemůže mít schopnost Vdovy.',
      },
      {
        id: 'damsel',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'heretic',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
    ],
  },
  {
    id: 'godfather',
    hatred: [
      {
        id: 'heretic',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
    ],
  },
  {
    id: 'baron',
    hatred: [
      {
        id: 'heretic',
        reason: 'Baron možná přidá jen 1 Podivína, ne 2.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'lilmonsta',
        reason:
          "Marioneta sousedí s Přisluhovačem, ne s Démonem. Marioneta není probouzena, aby vybírala, kdo si vezme žeton Lil' Monsta.",
      },
      {
        id: 'poppygrower',
        reason:
          'Když Maková panenka zemře, Démon se dozví, kdo je Marioneta, ale Marioneta se nedozví nic.',
      },
      {
        id: 'snitch',
        reason:
          'Marioneta se nedozví 3 postavy, které nejsou ve hře. Místo toho se těchto 3 navíc dozví Démon.',
      },
      {
        id: 'balloonist',
        reason:
          'Pokud si Marioneta myslí, že je Balonář, byl do hry přidán +1 Podivín.',
      },
      {
        id: 'damsel',
        reason: 'Marioneta se nedozví, že je ve hře Kráska.',
      },
      {
        id: 'huntsman',
        reason:
          'Pokud si Marioneta myslí, že je Lovec, byla do hry přidána Kráska.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Na začátku hry nemohou být zároveň ve hře Riot a Engineer.\nPokud Engineer vytvoří Riot, zlí hráči se stanou Riot.',
      },
      {
        id: 'golem',
        reason: 'Pokud Golem nominuje Riot, hráč Riot nezemře.',
      },
      {
        id: 'snitch',
        reason:
          'Pokud je ve hře Práskač, každý hráč Riot dostane 3 dodatečné bluffy.',
      },
      {
        id: 'saint',
        reason:
          'Pokud dobrý hráč nominuje a zabije Světce, tým Světce prohrává.',
      },
      {
        id: 'butler',
        reason: 'Sluha nemůže nominovat svého pána.',
      },
      {
        id: 'pithag',
        reason:
          'Pokud Ježibaba vytvoří Riot, všichni zlí hráči se stanou Riot.\nPokud Ježibaba vytvoří Riot po 3. dni, hra pokračuje ještě o jeden den.',
      },
      {
        id: 'mayor',
        reason:
          'Pokud třetí den začíná jen se třemi živými hráči, mohou se hráči společně rozhodnout vůbec nenominovat. Pokud se tak stane (a Starosta je naživu), vyhrává tým Starosty.',
      },
      {
        id: 'monk',
        reason:
          'Pokud hráč Riot nominuje a zabije hráče chráněného Mnichem, tento chráněný hráč nezemře.',
      },
      {
        id: 'farmer',
        reason:
          'Pokud hráč Riot nominuje a zabije Farmáře, Farmář tuto noc použije svou schopnost.',
      },
      {
        id: 'innkeeper',
        reason:
          'Pokud hráč Riot nominuje hráče chráněného Hostinským, tento chráněný hráč nezemře.',
      },
      {
        id: 'sage',
        reason:
          'Pokud hráč Riot nominuje a zabije Mudrce, Mudrc tuto noc použije svou schopnost.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Pokud hráč Riot nominuje a zabije Strážkyni krkavců, Strážkyně krkavců tuto noc použije svou schopnost.',
      },
      {
        id: 'soldier',
        reason: 'Pokud hráč Riot nominuje Vojáka, Voják nezemře.',
      },
      {
        id: 'grandmother',
        reason: 'Pokud hráč Riot nominuje a zabije vnouče, zemře také Babička.',
      },
      {
        id: 'king',
        reason:
          'Pokud hráč Riot nominuje a zabije Krále a Zpěváček je naživu, Zpěváček tuto noc použije svou schopnost.',
      },
      {
        id: 'exorcist',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'minstrel',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'flowergirl',
        reason: 'Ve hře může být jen 1 prokletá postava.',
      },
      {
        id: 'undertaker',
        reason:
          'Hráči, kteří zemřou nominací, se pro Hrobníka počítají jako popraveni.',
      },
      {
        id: 'cannibal',
        reason:
          'Hráči, kteří zemřou nominací, se pro Kanibala počítají jako popraveni.',
      },
      {
        id: 'pacifist',
        reason:
          'Hráči, kteří zemřou nominací, se pro Pacifistu počítají jako popraveni.',
      },
      {
        id: 'devilsadvocate',
        reason:
          'Hráči, kteří zemřou nominací, se pro Ďáblova advokáta počítají jako popraveni.',
      },
      {
        id: 'investigator',
        reason: 'Pro Vyšetřovatele se Riot počítá jako Přisluhovač.',
      },
      {
        id: 'clockmaker',
        reason: 'Pro Hodináře se Riot počítá jako Přisluhovač.',
      },
      {
        id: 'towncrier',
        reason: 'Pro Městského vyvolávače se Riot počítá jako Přisluhovač.',
      },
      {
        id: 'damsel',
        reason: 'Pro Krásku se Riot počítá jako Přisluhovač.',
      },
      {
        id: 'preacher',
        reason: 'Pro Kazatele se Riot počítá jako Přisluhovač.',
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
      {
        id: 'heretic',
        reason:
          'Pokud Pijavice otrávila Heretika, Pijavice zemře, ale Heretik zůstává otrávený.',
      },
    ],
  },
]

export default jinxesCs
