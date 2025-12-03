import { Jinx } from '@/types/jinx'

/**
 * Polish translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array but only the `reason` texts
 * are localized. Role ids stay the same as in the base data.
 */

export const jinxesPl: Array<Jinx> = [
  {
    id: 'chambermaid',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Chambermaid dowiaduje się, czy Mathematician budzi się tej nocy, mimo że Chambermaid budzi się pierwsza.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'cannibal',
        reason:
          'Jeśli Cannibal otrzyma zdolność Butlera, Cannibal dowiaduje się o tym.',
      },
    ],
  },
  {
    id: 'lunatic',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Mathematician dowiaduje się, czy Lunatic atakuje innego gracza niż prawdziwy Demon.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'heretic',
        reason: 'Pit-Hag nie może stworzyć Heretyka.',
      },
      {
        id: 'damsel',
        reason:
          'Jeśli Pit-Hag stworzy Damsel, Opowiadacz wybiera, który gracz nią jest.',
      },
      {
        id: 'politician',
        reason: 'Pit-Hag nie może stworzyć złego Politiciana.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'Cerenovus może zdecydować się sprawić, że gracz będzie przekonany, że jest Goblinem.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'soldier',
        reason:
          'Jeśli Leviathan nominuje i egzekwuje Żołnierza, Żołnierz nie umiera.',
      },
      {
        id: 'monk',
        reason:
          'Jeśli Leviathan nominuje i egzekwuje gracza wybranego przez Mnicha, ten gracz nie umiera.',
      },
      {
        id: 'innkeeper',
        reason:
          'Jeśli Leviathan nominuje i egzekwuje gracza wybranego przez Oberżystę, ten gracz nie umiera.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Jeśli Leviathan jest w grze i Ravenkeeper umiera przez egzekucję, budzi się tej nocy, aby użyć swojej zdolności.',
      },
      {
        id: 'sage',
        reason:
          'Jeśli Leviathan jest w grze i Sage umiera przez egzekucję, budzi się tej nocy, aby użyć swojej zdolności.',
      },
      {
        id: 'farmer',
        reason:
          'Jeśli Leviathan jest w grze i Farmer umiera przez egzekucję, dobry gracz staje się Farmerem tej nocy.',
      },
      {
        id: 'mayor',
        reason:
          'Jeśli Leviathan jest w grze i nie ma egzekucji w dniu 5, dobro wygrywa.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'scarlet woman',
        reason:
          'Jeśli są dwaj żywi Al-Hadikhia, Scarlet Woman Al-Hadikhia ponownie staje się Scarlet Woman.',
      },
      {
        id: 'mastermind',
        reason:
          'Tylko 1 przeklęta postać może być w grze. Źli gracze na początku wiedzą, który gracz i postać to jest.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'poppygrower',
        reason:
          "Jeśli Poppy Grower jest w grze, Poplecznicy nie budzą się razem. Budzą się pojedynczo, dopóki jeden z nich nie zdecyduje się wziąć żeton Lil' Monsta.",
      },
      {
        id: 'magician',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'scarletwoman',
        reason:
          "Jeśli żyje 5 lub więcej graczy i gracz trzymający żeton Lil' Monsta umiera, Scarlet Woman otrzymuje żeton Lil' Monsta tej nocy.",
      },
    ],
  },
  {
    id: 'lycanthrope',
    hatred: [
      {
        id: 'gambler',
        reason:
          'Jeśli Lycanthrope żyje i Gambler zabija się w nocy, żaden inny gracz nie może umrzeć tej nocy.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Legion i Engineer nie mogą być jednocześnie w grze na początku. Jeśli Engineer stworzy Legion, większość graczy (w tym wszyscy źli gracze) staje się złym Legionem.',
      },
      {
        id: 'preacher',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
    ],
  },
  {
    id: 'fanggu',
    hatred: [
      {
        id: 'scarletwoman',
        reason:
          'Jeśli Fang Gu wybierze Outsidera i umiera, Scarlet Woman nie staje się Fang Gu.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'magician',
        reason:
          'Kiedy Szpieg widzi Grimuir, żetony postaci Demona i Maga są usunięte.',
      },
      {
        id: 'alchemist',
        reason: 'Alchemik nie może mieć zdolności Szpiega.',
      },
      {
        id: 'poppygrower',
        reason:
          'Jeśli Poppy Grower jest w grze, Szpieg nie widzi Grimuiru, dopóki Poppy Grower nie umrze.',
      },
      {
        id: 'damsel',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'heretic',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'magician',
        reason:
          'Kiedy Wdowa widzi Grimuir, żetony postaci Demona i Maga są usunięte.',
      },
      {
        id: 'poppygrower',
        reason:
          'Jeśli Poppy Grower jest w grze, Wdowa nie widzi Grimuiru, dopóki Poppy Grower nie umrze.',
      },
      {
        id: 'alchemist',
        reason: 'Alchemik nie może mieć zdolności Wdowy.',
      },
      {
        id: 'damsel',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'heretic',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
    ],
  },
  {
    id: 'godfather',
    hatred: [
      {
        id: 'heretic',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
    ],
  },
  {
    id: 'baron',
    hatred: [
      {
        id: 'heretic',
        reason: 'Baron może dodać tylko 1 Outsidera, a nie 2.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'lilmonsta',
        reason:
          "Marionetka sąsiaduje z Poplecznikiem, a nie Demonem. Marionetka nie jest budzona, aby wybrać, kto bierze żeton Lil' Monsta.",
      },
      {
        id: 'poppygrower',
        reason:
          'Kiedy Poppy Grower umiera, Demon dowiaduje się o Marionecie, ale Marionetka niczego się nie dowiaduje.',
      },
      {
        id: 'snitch',
        reason:
          'Marionetka nie dowiaduje się o 3 postaciach spoza gry. Zamiast tego Demon dowiaduje się o 3 dodatkowych.',
      },
      {
        id: 'balloonist',
        reason:
          'Jeśli Marionetka myśli, że jest Ballonistą, dodano +1 Outsidera.',
      },
      {
        id: 'damsel',
        reason: 'Marionetka nie dowiaduje się, że Damsel jest w grze.',
      },
      {
        id: 'huntsman',
        reason:
          'Jeśli Marionetka myśli, że jest Myśliwym, Damsel została dodana.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Riot i Engineer nie mogą być jednocześnie w grze na początku.\nJeśli Engineer stworzy Riot, źli gracze stają się Riot.',
      },
      {
        id: 'golem',
        reason: 'Jeśli Golem nominuje Riot, gracz Riot nie umiera.',
      },
      {
        id: 'snitch',
        reason:
          'Jeśli Snitch jest w grze, każdy gracz Riot otrzymuje 3 dodatkowe blefuje.',
      },
      {
        id: 'saint',
        reason:
          'Jeśli dobry gracz nominuje i zabija Świętego, drużyna Świętego przegrywa.',
      },
      {
        id: 'butler',
        reason: 'Butler nie może nominować swojego pana.',
      },
      {
        id: 'pithag',
        reason:
          'Jeśli Pit-Hag stworzy Riot, wszyscy źli gracze stają się Riot.\nJeśli Pit-Hag stworzy Riot po dniu 3, gra trwa jeszcze jeden dzień.',
      },
      {
        id: 'mayor',
        reason:
          'Jeśli 3. dzień rozpoczyna się z tylko trzema żywymi graczami, gracze mogą (jako grupa) zdecydować się w ogóle nie nominować. Jeśli tak (i Mayor żyje), drużyna Mayora wygrywa.',
      },
      {
        id: 'monk',
        reason:
          'Jeśli gracz Riot nominuje i zabija gracza chronionego przez Mnicha, chroniony gracz nie umiera.',
      },
      {
        id: 'farmer',
        reason:
          'Jeśli gracz Riot nominuje i zabija Farmera, Farmer używa swojej zdolności tej nocy.',
      },
      {
        id: 'innkeeper',
        reason:
          'Jeśli gracz Riot nominuje gracza chronionego przez Oberżystę, chroniony gracz nie umiera.',
      },
      {
        id: 'sage',
        reason:
          'Jeśli gracz Riot nominuje i zabija Sage, Sage używa swojej zdolności tej nocy.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Jeśli gracz Riot nominuje i zabija Ravenkeepeera, Ravenkeeper używa swojej zdolności tej nocy.',
      },
      {
        id: 'soldier',
        reason:
          'Jeśli gracz Riot nominuje Żołnierza, Żołnierz nie umiera.',
      },
      {
        id: 'grandmother',
        reason:
          'Jeśli gracz Riot nominuje i zabija Wnuka, Babcia również umiera.',
      },
      {
        id: 'king',
        reason:
          'Jeśli gracz Riot nominuje i zabija Króla, a Choirboy żyje, Choirboy używa swojej zdolności tej nocy.',
      },
      {
        id: 'exorcist',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'minstrel',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'flowergirl',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'undertaker',
        reason:
          'Gracze, którzy umierają przez nominację, są rejestrowane jako egzekwowani dla Undertakera.',
      },
      {
        id: 'cannibal',
        reason:
          'Gracze, którzy umierają przez nominację, są rejestrowane jako egzekwowani dla Cannibala.',
      },
      {
        id: 'pacifist',
        reason:
          'Gracze, którzy umierają przez nominację, są rejestrowane jako egzekwowani dla Pacyfisty.',
      },
      {
        id: 'devilsadvocate',
        reason:
          "Gracze, którzy umierają przez nominację, są rejestrowane jako egzekwowani dla Devil's Advocate.",
      },
      {
        id: 'investigator',
        reason: 'Riot jest rejestrowany jako Poplecznik dla Investigatora.',
      },
      {
        id: 'clockmaker',
        reason: 'Riot jest rejestrowany jako Poplecznik dla Zegarmistrza.',
      },
      {
        id: 'towncrier',
        reason: 'Riot jest rejestrowany jako Poplecznik dla Town Criera.',
      },
      {
        id: 'damsel',
        reason: 'Riot jest rejestrowany jako Poplecznik dla Damsel.',
      },
      {
        id: 'preacher',
        reason: 'Riot jest rejestrowany jako Poplecznik dla Kaznodziei.',
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Jeśli Mastermind żyje i gospodarz Lleeecha umiera przez egzekucję, Lleech żyje, ale traci swoją zdolność.',
      },
      {
        id: 'slayer',
        reason: 'Jeśli Slayer zabija gospodarza Lleeecha, gospodarz umiera.',
      },
      {
        id: 'heretic',
        reason:
          'Jeśli Lleech otruł Heretyka, a następnie Lleech umiera, Heretyk pozostaje otruty.',
      },
    ],
  },
]

export default jinxesPl
