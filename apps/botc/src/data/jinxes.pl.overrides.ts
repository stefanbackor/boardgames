import { Jinx } from '@/types/jinx'

/**
 * Polish translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array (same order, same pairs) but
 * only the `reason` texts are localized. Role ids stay the same as in the
 * base data.
 */

export const jinxesPl: Array<Jinx> = [
  {
    id: 'alchemist',
    hatred: [
      {
        id: 'boffin',
        reason:
          'Jeśli Alchemist ma zdolność Boffina, Alchemist nie dowiaduje się, jaką zdolność ma Demon.',
      },
      {
        id: 'marionette',
        reason:
          'Alchemist-Marionette nie ma zdolności Marionette, a Marionette jest w grze.',
      },
      {
        id: 'mastermind',
        reason:
          'Alchemist-Geniusz zła nie ma zdolności Geniusza zła, a Geniusz zła nie jest w grze.',
      },
      {
        id: 'organgrinder',
        reason:
          'Jeśli Alchemist ma zdolność Organ Grindera, Organ Grinder jest w grze. Jeśli oboje są trzeźwi, oboje są pijani.',
      },
      {
        id: 'spy',
        reason:
          'Alchemist-Szpieg nie ma zdolności Szpiega, a Szpieg jest w grze. Po każdej egzekucji żywy Alchemist-Szpieg może publicznie wskazać żywego gracza jako Szpiega. Jeśli ma rację, Demon musi tej nocy wybrać Szpiega.',
      },
      {
        id: 'summoner',
        reason:
          'Alchemist-Summoner nie otrzymuje blefów i wybiera, który Demon, ale nie którego gracza. Jeśli umrze wcześniej, zło wygrywa. [Bez Demona]',
      },
      {
        id: 'widow',
        reason:
          'Alchemist-Wdowa nie ma zdolności Wdowy, a Wdowa jest w grze. Po każdej egzekucji żywy Alchemist-Wdowa może publicznie wskazać żywego gracza jako Wdowę. Jeśli ma rację, Demon musi tej nocy wybrać Wdowę.',
      },
      {
        id: 'wraith',
        reason:
          'Alchemist-Wraith nie ma zdolności Wraitha, a Wraith jest w grze. Po każdej egzekucji żywy Alchemist-Wraith może publicznie wskazać żywego gracza jako Wraitha. Jeśli ma rację, Demon musi tej nocy wybrać Wraitha.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Jeśli Al-Hadikhia umrze przez egzekucję, a Geniusz zła żyje, Al-Hadikhia wybiera tej nocy 3 dobrych graczy: jeśli wszyscy 3 wybiorą życie, zło wygrywa. W przeciwnym razie dobro wygrywa.',
      },
      {
        id: 'princess',
        reason:
          'Jeśli Princess w swoim 1. dniu nominowała gracza, który został stracony, tej nocy nikt nie umiera od Al-Hadikhii.',
      },
    ],
  },
  {
    id: 'boffin',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Jeśli Demon ma zdolność Cult Leadera, nie może stać się dobry z powodu tej zdolności.',
      },
      {
        id: 'drunk',
        reason: 'Demon nie może mieć zdolności Pijaka.',
      },
      {
        id: 'goon',
        reason:
          'Jeśli Demon ma zdolność Zbira, nie może stać się dobry z powodu tej zdolności.',
      },
      {
        id: 'heretic',
        reason: 'Demon nie może mieć zdolności Heretica.',
      },
      {
        id: 'ogre',
        reason: "Demon nie może mieć zdolności Ogre'a.",
      },
      {
        id: 'politician',
        reason: 'Demon nie może mieć zdolności Politiciana.',
      },
      {
        id: 'villageidiot',
        reason:
          'Jeśli jest wolny żeton, Boffin może dać Demonowi zdolność Village Idiota.',
      },
    ],
  },
  {
    id: 'bountyhunter',
    hatred: [
      {
        id: 'kazali',
        reason:
          'Jeśli Kazali zmieni Bounty Huntera w Sługusa, zły Mieszczanin nie zostaje utworzony.',
      },
      {
        id: 'philosopher',
        reason:
          'Jeśli Filozof otrzyma zdolność Bounty Huntera, jakiś Mieszczanin może stać się zły.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'organgrinder',
        reason:
          'Jeśli Organ Grinder powoduje głosowanie z zamkniętymi oczami, Lokaj może podnieść rękę, ale jego głos liczy się tylko wtedy, gdy jego pan również głosował.',
      },
    ],
  },
  {
    id: 'cannibal',
    hatred: [
      {
        id: 'butler',
        reason:
          'Jeśli Cannibal otrzyma zdolność Lokaja, Cannibal dowiaduje się o tym.',
      },
      {
        id: 'juggler',
        reason:
          'Jeśli Żongler zgaduje w swoim pierwszym dniu i umiera przez egzekucję, tej nocy żywy Cannibal dowiaduje się, ile trafień miał Żongler.',
      },
      {
        id: 'princess',
        reason:
          'Jeśli Cannibal nominował dziś Princess, która została stracona i umarła, Demon nie zabija tej nocy.',
      },
      {
        id: 'zealot',
        reason:
          'Jeśli Cannibal otrzyma zdolność Zealota, Cannibal dowiaduje się o tym.',
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
    id: 'heretic',
    hatred: [
      {
        id: 'baron',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'godfather',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'lleech',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'pithag',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'spy',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
      {
        id: 'widow',
        reason: 'Tylko 1 przeklęta postać może być w grze.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Jeśli Legion zostanie utworzony, wszyscy źli gracze stają się Legionem. Jeśli Legion jest w grze, Engineer wie o tym od początku, ale nie ma zdolności.',
      },
      {
        id: 'hatter',
        reason:
          'Jeśli Legion zostanie utworzony, wszyscy źli gracze stają się Legionem. Jeśli Legion jest w grze, Hatter nie ma zdolności.',
      },
      {
        id: 'minstrel',
        reason:
          'Jeśli Legion umarł dziś przez egzekucję, Legion zachowuje swoją zdolność, ale Minstrel może dowiedzieć się, że jest Legionem.',
      },
      {
        id: 'politician',
        reason: 'Politician może wydawać się Legionowi zły.',
      },
      {
        id: 'preacher',
        reason:
          'Jeśli Preacher wybierze Legion, Legion zachowuje swoją zdolność, ale Preacher może dowiedzieć się, że to Legion.',
      },
      {
        id: 'summoner',
        reason:
          'Jeśli Legion zostanie przywołany, wszyscy źli gracze stają się Legionem.',
      },
      {
        id: 'zealot',
        reason: 'Zealot może wydawać się Legionowi zły.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Każdej nocy* Leviathan wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrana Banshee umiera i zyskuje swoją zdolność.',
      },
      {
        id: 'exorcist',
        reason:
          'Jeśli Leviathan nominuje gracza wybranego przez Egzorcystę i zostaje on stracony, dobro wygrywa.',
      },
      {
        id: 'farmer',
        reason:
          'Każdej nocy* Leviathan wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrany Farmer używa swojej zdolności, ale nie umiera.',
      },
      {
        id: 'grandmother',
        reason:
          'Jeśli Leviathan jest w grze, a wnuczek umiera przez egzekucję, zło wygrywa.',
      },
      {
        id: 'hatter',
        reason: 'Leviathan nie może wejść do gry po 5. dniu.',
      },
      {
        id: 'innkeeper',
        reason:
          'Jeśli Leviathan nominuje gracza chronionego przez Karczmarza i zostaje on stracony, dobro wygrywa.',
      },
      {
        id: 'king',
        reason:
          'Jeśli Leviathan jest w grze i co najmniej 1 gracz jest martwy, King dowiaduje się każdej nocy o jednej żywej postaci.',
      },
      {
        id: 'mayor',
        reason:
          'Jeśli Leviathan i Burmistrz żyją w 5. dniu i nie ma egzekucji, dobro wygrywa.',
      },
      {
        id: 'monk',
        reason:
          'Jeśli Leviathan nominuje gracza chronionego przez Mnicha i zostaje on stracony, dobro wygrywa.',
      },
      {
        id: 'pithag',
        reason: 'Leviathan nie może wejść do gry po 5. dniu.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Każdej nocy* Leviathan wybiera żywego gracza (innego niż w poprzednich nocach): wybrany Hodowca kruków używa swojej zdolności, ale nie umiera.',
      },
      {
        id: 'sage',
        reason:
          'Każdej nocy* Leviathan wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrany Mędrzec używa swojej zdolności, ale nie umiera.',
      },
      {
        id: 'soldier',
        reason:
          'Jeśli Leviathan nominuje Żołnierza i zostaje on stracony, dobro wygrywa.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'hatter',
        reason:
          "Jeśli Hatter umrze, a Demon wybierze Lil' Monstę, wybiera też Sługusa, którym się staje.",
      },
      {
        id: 'magician',
        reason:
          "Jeśli Magician żyje, Opowiadacz wybiera, który Sługus opiekuje się Lil' Monstą.",
      },
      {
        id: 'poppygrower',
        reason:
          "Jeśli Lil' Monsta i Poppy Grower żyją, Sługusi budzą się pojedynczo, dopóki jeden z nich nie zdecyduje się wziąć żetonu Lil' Monsta.",
      },
      {
        id: 'psychopath',
        reason:
          "Jeśli Psychopath opiekuje się Lil' Monstą, umiera, gdy zostaje stracony.",
      },
      {
        id: 'scarletwoman',
        reason:
          "Jeśli Lil' Monsta umrze, gdy żyje 5 lub więcej graczy, Kochanica diabła opiekuje się Lil' Monstą do końca gry.",
      },
      {
        id: 'vizier',
        reason:
          "Jeśli Vizier opiekuje się Lil' Monstą, umiera, gdy zostaje stracony.",
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Jeśli Geniusz zła żyje, a gospodarz Lleecha umiera przez egzekucję, Lleech żyje, ale traci swoją zdolność.',
      },
      {
        id: 'slayer',
        reason: 'Jeśli Pogromca zabije gospodarza Lleecha, gospodarz umiera.',
      },
    ],
  },
  {
    id: 'magician',
    hatred: [
      {
        id: 'legion',
        reason:
          'Jeśli Magician jest w grze, podczas informacji dla Demona Legion budzi się w osobnych grupach. Każda grupa dowiaduje się, którzy gracze są dobrzy, ale nie dowiaduje się, kto jest Magicianem.',
      },
      {
        id: 'marionette',
        reason:
          'Jeśli Magician żyje, Demon nie wie, który z jego sąsiadów jest Marionette.',
      },
      {
        id: 'spy',
        reason:
          'Kiedy Szpieg widzi Grimuir, żetony postaci Demona i Maga są usunięte.',
      },
      {
        id: 'vizier',
        reason:
          'Jeśli Vizier jest w grze, Magician nie ma zdolności, ale jest odporny na zdolność Viziera.',
      },
      {
        id: 'widow',
        reason:
          'Kiedy Wdowa widzi Grimuir, żetony postaci Demona i Maga są usunięte.',
      },
      {
        id: 'wraith',
        reason:
          'Po każdej egzekucji żywy Magician może publicznie wskazać żywego gracza jako Wraitha. Jeśli ma rację, Demon musi tej nocy wybrać Wraitha.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'balloonist',
        reason:
          'Jeśli Marionette myśli, że jest Balloonistem, podczas przygotowania mógł zostać dodany Obcy.',
      },
      {
        id: 'huntsman',
        reason:
          'Jeśli Marionette myśli, że jest Huntsmanem, podczas przygotowania została dodana Damsel.',
      },
      {
        id: 'kazali',
        reason:
          'Jeśli Marionette miałaby być w grze, wchodzi do gry po Demonie i musi zaczynać jako jego sąsiad.',
      },
      {
        id: 'lilmonsta',
        reason:
          'Jeśli Marionette miałaby być w grze, wchodzi do gry po Demonie i musi zaczynać jako jego sąsiad.',
      },
      {
        id: 'summoner',
        reason:
          'Jeśli Marionette miałaby być w grze, wchodzi do gry po Demonie i musi zaczynać jako jego sąsiad.',
      },
    ],
  },
  {
    id: 'mastermind',
    hatred: [
      {
        id: 'vigormortis',
        reason:
          'Geniusz zła, który ma swoją zdolność, zachowuje ją, jeśli Vigormortis umrze.',
      },
    ],
  },
  {
    id: 'mathematician',
    hatred: [
      {
        id: 'chambermaid',
        reason: 'Pokojówka może wykryć, czy Matematyk obudzi się tej nocy.',
      },
      {
        id: 'drunk',
        reason:
          'Matematyk dowiaduje się, czy zdolność Pijaka dała fałszywą informację lub nie zadziałała poprawnie.',
      },
      {
        id: 'lunatic',
        reason:
          'Matematyk dowiaduje się, czy Szaleniec atakuje innego gracza niż prawdziwy Demon.',
      },
      {
        id: 'marionette',
        reason:
          'Matematyk dowiaduje się, czy zdolność Marionette dała fałszywą informację lub nie zadziałała poprawnie.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Jeśli Jędza zmieni złego gracza w Cult Leadera, nie może on stać się dobry z powodu swojej własnej zdolności.',
      },
      {
        id: 'damsel',
        reason:
          'Jeśli Jędza stworzy Damsel, Opowiadacz wybiera, który gracz nią jest.',
      },
      {
        id: 'goon',
        reason:
          'Jeśli Jędza zmieni złego gracza w Zbira, nie może on stać się dobry z powodu swojej własnej zdolności.',
      },
      {
        id: 'ogre',
        reason:
          "Jeśli Jędza zmieni złego gracza w Ogre'a, nie może on stać się dobry z powodu swojej własnej zdolności.",
      },
      {
        id: 'politician',
        reason:
          'Jeśli Jędza zmieni złego gracza w Politiciana, nie może on stać się dobry z powodu swojej własnej zdolności.',
      },
      {
        id: 'villageidiot',
        reason:
          'Jeśli jest wolny żeton, Jędza może stworzyć dodatkowego Village Idiota. Wtedy może się zmienić, który Village Idiot jest pijany.',
      },
    ],
  },
  {
    id: 'plaguedoctor',
    hatred: [
      {
        id: 'baron',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Barona, do dwóch graczy staje się Obcymi.',
      },
      {
        id: 'boomdandy',
        reason:
          "Jeśli Opowiadacz miałby otrzymać zdolność Boomdandy'ego, jeden gracz staje się Boomdandym.",
      },
      {
        id: 'eviltwin',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Złego bliźniaka, jeden gracz staje się Złym bliźniakiem.',
      },
      {
        id: 'fearmonger',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Fearmongera, otrzymuje ją jeden Sługus i dowiaduje się o tym.',
      },
      {
        id: 'goblin',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Goblina, otrzymuje ją jeden Sługus i dowiaduje się o tym.',
      },
      {
        id: 'marionette',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Marionette, jeden z dobrych sąsiadów Demona staje się Marionette.',
      },
      {
        id: 'scarletwoman',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Kochanicy diabła, otrzymuje ją jeden Sługus i dowiaduje się o tym.',
      },
      {
        id: 'spy',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Szpiega, otrzymuje ją jeden Sługus i dowiaduje się o tym.',
      },
      {
        id: 'wraith',
        reason:
          'Jeśli Opowiadacz miałby otrzymać zdolność Wraitha, otrzymuje ją jeden Sługus i dowiaduje się o tym.',
      },
    ],
  },
  {
    id: 'recluse',
    hatred: [
      {
        id: 'ogre',
        reason:
          "Jeśli Odludek wydaje się Ogre'owi zły, Ogre dowiaduje się, że jest zły.",
      },
      {
        id: 'sage',
        reason: 'Odludek może wydawać się Mędrcowi Demonem.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'atheist',
        reason:
          'Jeśli podczas Riotu zostanie nominowany Opowiadacz, gracze głosują. Jeśli jest „bliski śmierci”, gra się kończy. Jeśli nie, następuje kolejna nominacja.',
      },
      {
        id: 'banshee',
        reason:
          'Każdej nocy* Riot wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrana Banshee umiera i zyskuje swoją zdolność.',
      },
      {
        id: 'exorcist',
        reason:
          'Jeśli Riot nominuje gracza wybranego przez Egzorcystę i zostaje on stracony, dobro wygrywa.',
      },
      {
        id: 'farmer',
        reason:
          'Każdej nocy* Riot wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrany Farmer używa swojej zdolności, ale nie umiera.',
      },
      {
        id: 'grandmother',
        reason:
          'Jeśli Riot jest w grze, a wnuczek umiera przez egzekucję, zło wygrywa.',
      },
      {
        id: 'innkeeper',
        reason:
          'Jeśli Riot nominuje gracza chronionego przez Karczmarza i zostaje on stracony, dobro wygrywa.',
      },
      {
        id: 'king',
        reason:
          'Jeśli Riot jest w grze i co najmniej 1 gracz jest martwy, King dowiaduje się każdej nocy o jednej żywej postaci.',
      },
      {
        id: 'mayor',
        reason:
          'Burmistrz może zdecydować o zatrzymaniu Riotu. Jeśli zrobi to, gdy żyje tylko 1 Riot, dobro wygrywa. W przeciwnym razie zło wygrywa.',
      },
      {
        id: 'monk',
        reason:
          'Jeśli Riot nominuje gracza chronionego przez Mnicha i zostaje on stracony, dobro wygrywa.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Każdej nocy* Riot wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrany Hodowca kruków używa swojej zdolności, ale nie umiera.',
      },
      {
        id: 'sage',
        reason:
          'Każdej nocy* Riot wybiera żywego dobrego gracza (innego niż w poprzednich nocach): wybrany Mędrzec używa swojej zdolności, ale nie umiera.',
      },
      {
        id: 'soldier',
        reason:
          'Jeśli Riot nominuje Żołnierza i zostaje on stracony, dobro wygrywa.',
      },
    ],
  },
  {
    id: 'scarletwoman',
    hatred: [
      {
        id: 'alhadikhia',
        reason:
          'Jeśli miałoby być dwóch Demonów, z których jednym była Kochanica diabła, Kochanica diabła ponownie staje się Kochanicą diabła.',
      },
      {
        id: 'fanggu',
        reason:
          'Jeśli miałoby być dwóch Demonów, z których jednym była Kochanica diabła, Kochanica diabła pozostaje Kochanicą diabła.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'damsel',
        reason: 'Jeśli Szpieg jest (lub był) w grze, Damsel jest zatruta.',
      },
      {
        id: 'ogre',
        reason: "Szpieg wydaje się Ogre'owi zły.",
      },
      {
        id: 'poppygrower',
        reason:
          'Jeśli Poppy Grower ma swoją zdolność, Szpieg nie widzi Grimuiru.',
      },
    ],
  },
  {
    id: 'summoner',
    hatred: [
      {
        id: 'clockmaker',
        reason: 'Summoner wydaje się Zegarmistrzowi Demonem.',
      },
      {
        id: 'courtier',
        reason:
          'Jeśli żywy Summoner nie ma zdolności, zdolność Summonera ma Opowiadacz.',
      },
      {
        id: 'engineer',
        reason:
          'Jeśli żywy Summoner zostanie usunięty z gry, zdolność Summonera ma Opowiadacz.',
      },
      {
        id: 'hatter',
        reason:
          'Jeśli Summoner stworzy drugiego żywego Demona, o zgonach tej nocy decyduje Opowiadacz.',
      },
      {
        id: 'kazali',
        reason:
          'Jeśli Summoner stworzy drugiego żywego Demona, o zgonach tej nocy decyduje Opowiadacz.',
      },
      {
        id: 'lordoftyphon',
        reason:
          'Jeśli zostanie przywołany Lord of Typhon, musi sąsiadować ze Sługusem, a jego drugi sąsiad staje się złym Sługusem.',
      },
      {
        id: 'pithag',
        reason:
          'Jeśli Summoner stworzy drugiego żywego Demona, o zgonach tej nocy decyduje Opowiadacz.',
      },
      {
        id: 'poppygrower',
        reason:
          'Jeśli Poppy Grower żyje w 3. nocy, Summoner wybiera, który Demon, ale nie którego gracza.',
      },
      {
        id: 'preacher',
        reason:
          'Jeśli żywy Summoner nie ma zdolności, zdolność Summonera ma Opowiadacz.',
      },
      {
        id: 'pukka',
        reason: 'Summoner może przywołać Pukkę w 2. nocy zamiast w 3.',
      },
      {
        id: 'zombuul',
        reason:
          'Jeśli Summoner przywoła martwego gracza jako Zombuula, Zombuul już „raz umarł”.',
      },
    ],
  },
  {
    id: 'vizier',
    hatred: [
      {
        id: 'alsaahir',
        reason: 'Opowiadacz nie ogłasza, że Vizier jest w grze.',
      },
      {
        id: 'courtier',
        reason:
          'Jeśli Vizier straci swoją zdolność, dowiaduje się o tym i nie może umrzeć w ciągu dnia.',
      },
      {
        id: 'fearmonger',
        reason:
          'Vizier budzi się razem z Fearmongerem, dowiaduje się, kogo ten wybiera, i nie może zdecydować o natychmiastowej egzekucji tego gracza.',
      },
      {
        id: 'investigator',
        reason: 'Opowiadacz nie ogłasza, że Vizier jest w grze.',
      },
      {
        id: 'politician',
        reason: 'Politician może wydawać się Vizierowi zły.',
      },
      {
        id: 'preacher',
        reason:
          'Jeśli Vizier straci swoją zdolność, dowiaduje się o tym i nie może umrzeć w ciągu dnia.',
      },
      {
        id: 'zealot',
        reason: 'Zealot może wydawać się Vizierowi zły.',
      },
    ],
  },
  {
    id: 'vortox',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Jeśli Vortox zabije Banshee, wszyscy gracze dowiadują się, że Banshee umarła.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'damsel',
        reason: 'Jeśli Wdowa jest (lub była) w grze, Damsel jest zatruta.',
      },
      {
        id: 'poppygrower',
        reason:
          'Jeśli Poppy Grower ma swoją zdolność, Wdowa nie widzi Grimuiru.',
      },
    ],
  },
  {
    id: 'yaggababble',
    hatred: [
      {
        id: 'exorcist',
        reason:
          'Jeśli Egzorcysta wybierze Blabla Jagę, Blabla Jaga nie zabija tej nocy.',
      },
    ],
  },
]

export default jinxesPl
