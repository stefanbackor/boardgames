/**
 * Polish translations and overrides for Blood on the Clocktower roles.
 * Generated from the official Trouble Brewing, Sects and Violets & Bad Moon Rising
 * script JSON (`Trouble Brewing.pl.json`, `Sects and Violets.pl.json`,
 * `Bad Moon Rising.pl.json` on botcscripts.com).
 *
 * Only roles that appear in these base scripts are included here – other roles
 * fall back to the base English text from `roles.ts`.
 */

import { RoleTranslation } from './types'

export const roleTranslationsPl: Record<string, RoleTranslation> = {
  washerwoman: {
    name: 'Praczka',
    ability:
      'Na początku gry dowiadujesz się, że jeden z dwóch graczy jest konkretnym Mieszczaninem.',
    reminders: ['Mieszczanin', 'Pomyłka'],
    firstNightReminder:
      'Pokaż żeton postaci Mieszczanina w grze. Wskaż dwóch graczy, z których jeden jest tą postacią.',
  },
  librarian: {
    name: 'Bibliotekarz',
    ability:
      'Na początku gry dowiadujesz się, że jeden z dwóch graczy jest konkretnym Obcym (lub że w grze nie ma żadnych Obcych).',
    reminders: ['Obcy', 'Pomyłka'],
    firstNightReminder:
      'Pokaż żeton postaci Obcego w grze. Wskaż dwóch graczy, z których jeden jest tą postacią.',
  },
  investigator: {
    name: 'Śledczy',
    ability:
      'Na początku gry dowiadujesz się, że jeden z dwóch graczy jest konkretnym Sługusem.',
    reminders: ['Sługus', 'Pomyłka'],
    firstNightReminder:
      'Pokaż żeton postaci Sługusa w grze. Wskaż dwóch graczy, z których jeden jest tą postacią.',
  },
  chef: {
    name: 'Kucharz',
    ability:
      'Na początku gry dowiadujesz się, ile par złych graczy siedzi obok siebie.',
    firstNightReminder:
      'Pokaż na palcach (0, 1, 2, …) liczbę par sąsiadujących złych graczy.',
  },
  empath: {
    name: 'Empata',
    ability:
      'Każdej nocy dowiadujesz się, ilu z twoich dwóch żyjących sąsiadów jest złych.',
    firstNightReminder:
      'Pokaż na palcach (0, 1, 2) liczbę żyjących złych sąsiadów Empaty.',
    otherNightReminder:
      'Pokaż na palcach (0, 1, 2) liczbę żyjących złych sąsiadów Empaty.',
  },
  fortuneteller: {
    name: 'Wróżka',
    ability:
      'Każdej nocy wybierasz 2 graczy – dowiadujesz się, czy któryś z nich jest Demonem. Jeden z dobrych graczy pokazuje ci się jako zły.',
    reminders: ['Czerwona śledź'],
    firstNightReminder:
      'Wróżka wskazuje dwóch graczy. Daj sygnał głową (skinij „tak”, pokręć „nie”), czy któryś z nich jest Demonem.',
    otherNightReminder:
      'Wróżka wskazuje dwóch graczy. Daj sygnał głową (skinij „tak”, pokręć „nie”), czy któryś z nich jest Demonem.',
  },
  undertaker: {
    name: 'Grabarz',
    ability:
      'Każdej nocy* dowiadujesz się, którą postać stracono dziś podczas egzekucji.',
    reminders: ['Stracony'],
    otherNightReminder:
      'Jeśli dziś kogoś stracono: pokaż żeton postaci tego gracza.',
  },
  monk: {
    name: 'Mnich',
    ability:
      'Każdej nocy* wybierasz gracza (nie siebie), który tej nocy będzie chroniony przed Demonem.',
    reminders: ['Chroniony'],
    otherNightReminder:
      'Poprzednio chroniony gracz przestaje być chroniony. Mnich wskazuje gracza (nie siebie). Oznacz go jako „CHRONIONY”.',
  },
  ravenkeeper: {
    name: 'Hodowca kruków',
    ability:
      'Jeśli zginiesz nocą, budzisz się i wybierasz gracza – dowiadujesz się, jaką jest postacią.',
    otherNightReminder:
      'Jeśli Hodowca kruków zginął tej nocy: wskazuje gracza. Pokaż żeton postaci tego gracza.',
  },
  virgin: {
    name: 'Dziewica',
    ability:
      'Gdy po raz pierwszy zostaniesz nominowana, a nominuje cię Mieszczanin, zostaje on natychmiast stracony.',
    reminders: ['Bez zdolności'],
  },
  slayer: {
    name: 'Pogromca',
    ability:
      'Raz w trakcie gry, w ciągu dnia, publicznie wybierasz jednego gracza – jeśli jest Demonem, ginie.',
    reminders: ['Bez zdolności'],
  },
  soldier: {
    name: 'Żołnierz',
    ability: 'Nie możesz zostać zabity przez Demona.',
  },
  mayor: {
    name: 'Burmistrz',
    ability:
      'Jeśli przy trzech żywych graczach nie nastąpi egzekucja, twoja drużyna wygrywa. Jeśli zginiesz nocą, inny gracz może zginąć zamiast ciebie.',
  },
  butler: {
    name: 'Lokaj',
    ability:
      'Każdej nocy wybierasz gracza (nie siebie). Jutro możesz głosować tylko, jeśli ten gracz zagłosuje.',
    reminders: ['Pan'],
    firstNightReminder: 'Lokaj wskazuje gracza. Oznacz go żetonem „PAN”.',
    otherNightReminder: 'Lokaj wskazuje gracza. Oznacz go żetonem „PAN”.',
  },
  drunk: {
    name: 'Pijak',
    ability:
      'Nie wiesz, że jesteś Pijakiem. Myślisz, że jesteś Mieszczaninem, ale twoja zdolność nie działa prawidłowo.',
  },
  recluse: {
    name: 'Odludek',
    ability:
      'Możesz pokazać się jako zły i jako Sługus lub Demon, nawet po śmierci.',
  },
  saint: {
    name: 'Święty',
    ability: 'Jeśli zginiesz przez egzekucję, twoja drużyna przegrywa.',
  },
  poisoner: {
    name: 'Truciciel',
    ability:
      'Każdej nocy wybierasz gracza, którego zdolność nie zadziała tej nocy ani jutro za dnia.',
    reminders: ['Zatruty'],
    firstNightReminder: 'Truciciel wskazuje gracza. Ten gracz zostaje zatruty.',
    otherNightReminder:
      'Poprzednio zatruty gracz przestaje być zatruty. Truciciel wskazuje gracza. Ten gracz zostaje zatruty.',
  },
  spy: {
    name: 'Szpieg',
    ability:
      'Każdej nocy zaglądasz do grymuaru. Możesz pokazać się jako dobry i jako Mieszczanin lub Obcy, nawet po śmierci.',
    firstNightReminder: 'Pokaż Szpiegowi grymuar tak długo, jak potrzebuje.',
    otherNightReminder: 'Pokaż Szpiegowi grymuar tak długo, jak potrzebuje.',
  },
  scarletwoman: {
    name: 'Kochanica diabła',
    ability:
      'Jeśli przy życiu pozostaje 5 lub więcej graczy, a Demon zginie, zostajesz Demonem. (Podróżnicy się nie liczą.)',
    reminders: ['Demon'],
    otherNightReminder:
      'Jeśli Kochanica diabła dziś została Demonem: pokaż kartę „JESTEŚ” i żeton Demona.',
  },
  baron: {
    name: 'Baron',
    ability: 'W grze jest dwóch dodatkowych Obcych. [+2 Obcych]',
  },
  imp: {
    name: 'Chochlik',
    ability:
      'Każdej nocy wybierasz gracza, który umiera. Jeśli zabijesz w ten sposób siebie, Sługus zostaje Demonem.',
    reminders: ['Martwy'],
    otherNightReminder:
      'Chochlik wskazuje gracza. Ten gracz umiera. Jeśli Chochlik wybrał siebie: zamień żeton postaci jednego żywego Sługusa na zapasowy żeton Chochlika. Pokaż kartę „JESTEŚ”, a następnie żeton Chochlika.',
  },
  // Sects & Violets
  clockmaker: {
    name: 'Zegarmistrz',
    ability:
      'Na początku gry dowiadujesz się, ile kroków dzieli Demona od jego najbliższego Sługusa.',
    firstNightReminder:
      'Pokaż na palcach liczbę (0, 1, 2, …) miejsc między Demonem a jego najbliższym Sługusem.',
  },
  dreamer: {
    name: 'Śniączka',
    ability:
      'Każdej nocy wybierz gracza (nie siebie ani Podróżnych). Zobaczysz 1 dobrą i 1 złą postać – jedna z nich jest prawidłowa.',
    firstNightReminder:
      'Śniączka wskazuje gracza. Pokaż 1 żeton dobrej postaci i 1 złej; jeden z nich jest prawidłowy.',
    otherNightReminder:
      'Śniączka wskazuje gracza. Pokaż 1 żeton dobrej postaci i 1 złej; jeden z nich jest prawidłowy.',
  },
  snakecharmer: {
    name: 'Zaklinacz węży',
    ability:
      'Każdej nocy wybierz żywego gracza – jeśli jest Demonem, zamieniacie się postaciami i drużynami, a on zostaje otruty.',
    reminders: ['Otruty'],
    firstNightReminder:
      'Zaklinacz węży wskazuje gracza. Jeśli ten gracz jest Demonem: zamień postaci i drużyny Demona i Zaklinacza. Obudź każdego z nich i poinformuj o nowej roli oraz drużynie. Nowy Zaklinacz jest otruty.',
    otherNightReminder:
      'Zaklinacz węży wskazuje gracza. Jeśli ten gracz jest Demonem: zamień postaci i drużyny Demona i Zaklinacza. Obudź każdego z nich i poinformuj o nowej roli oraz drużynie. Nowy Zaklinacz jest otruty.',
  },
  mathematician: {
    name: 'Matematyk',
    ability:
      'Każdej nocy dowiadujesz się, zdolności ilu graczy zadziałały nieprawidłowo (od świtu) ze względu na zdolność innej postaci.',
    reminders: ['Nieprawidłowo'],
    firstNightReminder:
      'Pokaż na palcach liczbę graczy (0, 1, 2, …), których zdolności zadziałały nieprawidłowo przez inne zdolności.',
    otherNightReminder:
      'Pokaż na palcach liczbę graczy (0, 1, 2, …), których zdolności zadziałały nieprawidłowo przez inne zdolności.',
  },
  flowergirl: {
    name: 'Kwiaciarka',
    ability: 'Każdej nocy* dowiadujesz się, czy Demon dziś głosował.',
    reminders: ['Demon głosował', 'Demon nie głosował'],
    firstNightReminder: 'Umieść żeton „Demon nie głosował”.',
    otherNightReminder:
      'Pokiwaj głową na tak lub pokręć na nie w zależności od tego, czy Demon dziś głosował. Umieść żeton „Demon nie głosował” (zabierz „Demon głosował”, jeśli tam jest).',
  },
  towncrier: {
    name: 'Krzykacz miejski',
    ability: 'Każdej nocy* dowiadujesz się, czy Sługus dziś nominował.',
    reminders: ['Sługus nie nominował', 'Sługus nominował'],
    firstNightReminder: 'Umieść żeton „Sługus nie nominował”.',
    otherNightReminder:
      'Pokiwaj głową na tak lub pokręć na nie w zależności od tego, czy Sługus dziś nominował. Umieść żeton „Sługus nie nominował” (zabierz „Sługus nominował”, jeśli tam jest).',
  },
  oracle: {
    name: 'Wyrocznia',
    ability: 'Każdej nocy* dowiadujesz się, ilu martwych graczy jest złych.',
    otherNightReminder:
      'Pokaż na palcach liczbę martwych złych graczy (0, 1, 2, …).',
  },
  savant: {
    name: 'Uczony',
    ability:
      'Każdego dnia możesz odwiedzić Bajarza, aby na osobności poznać 2 informacje – jedna z nich jest prawdą, druga fałszem.',
  },
  seamstress: {
    name: 'Szwaczka',
    ability:
      'Raz w trakcie gry, nocą, wybierz 2 graczy (nie siebie) – dowiadujesz się, czy są w tej samej drużynie.',
    reminders: ['Brak zdolności'],
    firstNightReminder:
      'Szwaczka albo kręci głową na nie, albo wskazuje dwóch graczy. Jeśli wskazała graczy, pokiwaj lub pokręć głową, czy są w tej samej drużynie.',
    otherNightReminder:
      'Jeśli Szwaczka nie wykorzystała jeszcze zdolności: postępuj jak w pierwszą noc.',
  },
  philosopher: {
    name: 'Filozof',
    ability:
      'Raz w trakcie gry, nocą, wybierz dobrą postać – uzyskasz jej zdolność. Jeśli ta postać jest w grze, jest od teraz pijana.',
    reminders: ['Jest filozofem', 'Pijany'],
    firstNightReminder:
      'Filozof albo kręci głową na nie, albo wskazuje dobrą postać na skrypcie. Jeśli wybrał postać: zamień żeton postaci spoza gry z żetonem Filozofa i oznacz go jako „JEST FILOZOFEM”, lub – jeśli postać jest w grze – oznacz wybranego gracza jako „PIJANY”.',
    otherNightReminder:
      'Jeśli Filozof nie wykorzystał jeszcze swojej zdolności: jak w pierwszą noc.',
  },
  artist: {
    name: 'Artysta',
    ability:
      'Raz w trakcie gry, za dnia, na osobności zadaj Bajarzowi pytanie zamknięte (tak/nie).',
    reminders: ['Brak zdolności'],
  },
  juggler: {
    name: 'Żongler',
    ability:
      'Swojego pierwszego dnia publicznie zgadnij postaci maksymalnie 5 graczy. Następnej nocy dowiesz się, ilu zgadłeś poprawnie.',
    reminders: ['Poprawnie'],
    otherNightReminder:
      'Jeśli dziś był pierwszy dzień Żonglera: pokaż na palcach liczbę „poprawnych” żetonów (0, 1, 2, …), a następnie je zdejmij.',
  },
  sage: {
    name: 'Mędrzec',
    ability:
      'Jeśli zabije cię Demon, dowiadujesz się, że jest to jeden z dwóch graczy.',
    otherNightReminder:
      'Jeśli Demona zabił Mędrca: wskaż dwóch graczy, z których jeden jest Demonem.',
  },
  mutant: {
    name: 'Mutant',
    ability:
      'Jeśli „szalejesz” na punkcie bycia Obcym, możesz zostać stracony.',
  },
  sweetheart: {
    name: 'Cukiereczek',
    ability: 'Po twojej śmierci jeden z graczy będzie pijany.',
    reminders: ['Pijany'],
    otherNightReminder:
      'Jeśli dziś umarł Cukiereczek – wybierz gracza, który będzie pijany.',
  },
  barber: {
    name: 'Balwierz',
    ability:
      'Jeśli umrzesz dziś za dnia bądź tej nocy, Demon może wybrać 2 graczy (ale nie innego Demona), którzy zamienią się postaciami.',
    reminders: ['Nocą strzyżemy'],
    otherNightReminder:
      'Jeśli dziś umarł Balwierz: obudź Demona. Pokaż kartę „TA POSTAĆ CIĘ WYBRAŁA” i żeton Balwierza. Demon wskazuje 0 lub 2 graczy. Jeśli wskazał 2 graczy – zamień ich żetony postaci, obudź ich i pokaż im nowe postacie.',
  },
  klutz: {
    name: 'Fajtłapa',
    ability:
      'Kiedy dowiesz się, że nie żyjesz, publicznie wybierz jednego żywego gracza – jeśli jest zły, twoja drużyna przegrywa.',
  },
  eviltwin: {
    name: 'Zły bliźniak',
    ability:
      'Ty i gracz z przeciwnej drużyny wiecie, kim jesteście. Jeśli dobry bliźniak zostanie stracony, zło wygrywa. Dobro nie może wygrać, jeśli obaj bliźniacy żyją.',
    reminders: ['Bliźniak'],
    firstNightReminder:
      'Obudź Złego bliźniaka i jego bliźniaka. Upewnij się, że się zauważyli. Wskaż na Złego bliźniaka, pokaż jego żeton dobremu bliźniakowi, a następnie pokaż żeton dobrego bliźniaka złemu.',
  },
  witch: {
    name: 'Wiedźma',
    ability:
      'Każdej nocy wybierz gracza – jeśli jutro nominuje, natychmiast umrze. Tracisz tę zdolność przy trzech żywych graczach.',
    reminders: ['Przeklęty'],
    firstNightReminder:
      'Wiedźma wskazuje gracza. Jeśli jutro nominuje, umrze natychmiast.',
    otherNightReminder:
      'Jeśli żyje 4 lub więcej graczy: Wiedźma wskazuje gracza. Jeśli jutro nominuje, umrze natychmiast.',
  },
  cerenovus: {
    name: 'Cerenovus',
    ability:
      'Każdej nocy wybierz gracza i dobrą postać – ma jutro szaleć na punkcie bycia tą postacią, inaczej może zostać stracony.',
    reminders: ['Szaleństwo'],
    firstNightReminder:
      'Cerenovus wskazuje gracza i postać na skrypcie. Obudź tego gracza, pokaż kartę „TA POSTAĆ CIĘ WYBRAŁA” i żeton Cerenovusa, a następnie żeton wybranej postaci.',
    otherNightReminder:
      'Cerenovus wskazuje gracza i postać na skrypcie. Obudź tego gracza, pokaż kartę „TA POSTAĆ CIĘ WYBRAŁA” i żeton Cerenovusa, a następnie żeton wybranej postaci.',
  },
  pithag: {
    name: 'Jędza',
    ability:
      'Każdej nocy* wybierz gracza i postać, którą się stanie (jeśli nie ma jej w grze). Jeśli w ten sposób stworzony zostanie Demon, zgony tej nocy zależą od Bajarza.',
    otherNightReminder:
      'Jędza wskazuje na gracza i postać na skrypcie. Jeśli tej postaci nie ma w grze, obudź gracza i pokaż mu kartę „JESTEŚ” oraz odpowiedni żeton postaci.',
  },
  fanggu: {
    name: 'Fang Gu',
    ability:
      'Każdej nocy* wybierz gracza, który umiera. Pierwszy Obcy, którego tak zabijesz, zostaje złym Fang Gu, a ty giniesz zamiast niego. [+1 Obcy]',
    reminders: ['Zgon'],
    otherNightReminder:
      'Fang Gu wskazuje gracza. Gracz ten umiera. Jeśli jest Obcym i nie ma innego Fang Gu – Demon ginie zamiast niego, a wybrany gracz zostaje złym Fang Gu.',
  },
  vigormortis: {
    name: 'Vigormortis',
    ability:
      'Każdej nocy* wybierz gracza, który umiera. Sługusi, których zabijesz, zachowują swoją zdolność i zatruwają 1 sąsiadującego Mieszczanina. [-1 Obcy]',
    reminders: ['Ma zdolność', 'Otruty', 'Zgon'],
    otherNightReminder:
      'Vigormortis wskazuje gracza. Gracz ten umiera. Jeśli był Sługusem, zachowuje zdolność, a jeden z sąsiadujących Mieszczan zostaje otruty.',
  },
  nodashii: {
    name: 'No Dashii',
    ability:
      'Każdej nocy* wybierz gracza, który umiera. Dwójka sąsiadujących z tobą Mieszczan jest otruta.',
    reminders: ['Otruty', 'Zgon'],
    otherNightReminder: 'No Dashii wskazuje gracza. Gracz ten umiera.',
  },
  vortox: {
    name: 'Vortox',
    ability:
      'Każdej nocy* wybierz gracza, który umiera. Zdolności Mieszczan zwracają fałszywe informacje. Każdego dnia, jeśli nikt nie został stracony, zło wygrywa.',
    reminders: ['Zgon'],
    otherNightReminder: 'Vortox wskazuje gracza. Gracz ten umiera.',
  },
  // Bad Moon Rising
  grandmother: {
    name: 'Babcia',
    ability:
      'Zaczynasz grę znając tożsamość i postać jednego dobrego gracza. Jeśli Demon go zabije, umierasz wraz z nim.',
    reminders: ['Wnuczek'],
    firstNightReminder:
      'Pokaż zaznaczony żeton postaci. Wskaż zaznaczonego gracza.',
    otherNightReminder:
      'Jeśli wnuczek Babci został dziś w nocy zabity przez Demona: Babcia umiera.',
  },
  sailor: {
    name: 'Żeglarz',
    ability:
      'Każdej nocy wybierz żywego gracza. Któryś z was będzie pijany do zmierzchu. Nie możesz umrzeć.',
    reminders: ['Pijany'],
    firstNightReminder:
      'Żeglarz wskazuje żywego gracza. Albo Żeglarz, albo wybrany gracz jest pijany.',
    otherNightReminder:
      'Poprzedni pijany gracz przestaje być pijany. Żeglarz wskazuje żywego gracza. Albo Żeglarz, albo wybrany gracz jest pijany.',
  },
  chambermaid: {
    name: 'Pokojówka',
    ability:
      'Każdej nocy wybierz dwóch żywych graczy (nie siebie). Dowiadujesz się, ilu z nich obudziło się tej nocy ze względu na swoją zdolność.',
    firstNightReminder:
      'Pokojówka wskazuje dwóch graczy. Pokaż na palcach liczbę (0, 1, 2, …) tych, którzy obudzą się dziś w nocy ze względu na zdolność.',
    otherNightReminder:
      'Pokojówka wskazuje dwóch graczy. Pokaż na palcach liczbę (0, 1, 2, …) tych, którzy obudzą się dziś w nocy ze względu na zdolność.',
  },
  exorcist: {
    name: 'Egzorcysta',
    ability:
      'Każdej nocy* wybierz gracza (innego niż poprzedniej nocy). Jeśli jest Demonem, dowiaduje się, kim jesteś, po czym nie budzi się tej nocy.',
    reminders: ['Wybrany'],
    otherNightReminder:
      'Egzorcysta wskazuje gracza innego niż poprzedniej nocy. Jeśli to Demon: obudź Demona, pokaż żeton Egzorcysty i wskaż Egzorcystę. Demon nie działa tej nocy.',
  },
  innkeeper: {
    name: 'Karczmarz',
    ability:
      'Każdej nocy* wybierz 2 graczy: żaden z nich nie może umrzeć tej nocy, ale jeden z nich będzie pijany do następnego zmierzchu.',
    reminders: ['Pijany', 'Chroniony'],
    otherNightReminder:
      'Poprzednio chronieni i pijani gracze tracą swoje żetony. Karczmarz wskazuje dwóch graczy. Ci gracze są chronieni. Jeden z nich jest pijany.',
  },
  gambler: {
    name: 'Hazardzista',
    ability:
      'Każdej nocy* wybierz gracza i zgadnij, jaką jest postacią. Jeśli się pomylisz, umrzesz.',
    reminders: ['Martwy'],
    otherNightReminder:
      'Hazardzista wskazuje gracza i postać na arkuszu. Jeśli się pomylił, umiera.',
  },
  gossip: {
    name: 'Plotkara',
    ability:
      'Każdego dnia możesz wygłosić publiczne oświadczenie. Jeśli było prawdziwe, w nocy ktoś umrze.',
    reminders: ['Martwy'],
    otherNightReminder:
      'Jeśli publiczne oświadczenie Plotkary było prawdziwe: wybierz gracza, który umrze tej nocy.',
  },
  courtier: {
    name: 'Dworzanin',
    ability:
      'Raz w trakcie gry, nocą, wybierz postać. Jest ona pijana przez 3 noce i 3 dni.',
    reminders: ['Pijany 1', 'Pijany 2', 'Pijany 3', 'Brak zdolności'],
    firstNightReminder:
      'Dworzanin albo kręci głową na nie, albo wskazuje postać na skrypcie. Jeśli wykorzystał zdolność i ta postać jest w grze, odpowiedni gracz jest pijany.',
    otherNightReminder:
      'Zmniejsz liczbę pozostałych dni pijaństwa zaznaczonego gracza. Jeśli Dworzanin nie użył jeszcze zdolności, postępuj jak w pierwszą noc.',
  },
  professor: {
    name: 'Profesor',
    ability:
      'Raz w trakcie gry, nocą*, wybierz martwego gracza. Jeśli jest Mieszczaninem, zostaje wskrzeszony.',
    reminders: ['Żywy', 'Brak zdolności'],
    otherNightReminder:
      'Jeśli Profesor nie użył jeszcze zdolności: Profesor albo kręci głową „nie”, albo wskazuje gracza. Jeśli to Mieszczanin, zostaje wskrzeszony.',
  },
  minstrel: {
    name: 'Minstrel',
    ability:
      'Kiedy Sługus zostaje stracony, wszyscy inni gracze (z wyjątkiem Podróżnych) są pijani do następnego zmierzchu.',
    reminders: ['Wszyscy pijani'],
  },
  tealady: {
    name: 'Herbaciarka',
    ability:
      'Jeśli obaj twoi żyjący sąsiedzi są dobrzy, żaden z was nie może umrzeć.',
    reminders: ['Nie może umrzeć'],
  },
  pacifist: {
    name: 'Pacyfista',
    ability: 'Dobrzy gracze poddani egzekucji mogą nie zginąć.',
  },
  fool: {
    name: 'Błazen',
    ability: 'Za pierwszym razem, gdy miałbyś umrzeć, przeżywasz.',
    reminders: ['Brak zdolności'],
  },
  tinker: {
    name: 'Druciarz',
    ability: 'Możesz umrzeć w dowolnym momencie.',
    reminders: ['Martwy'],
  },
  moonchild: {
    name: 'Cyganka',
    ability:
      'Kiedy dowiesz się, że nie żyjesz, publicznie wybierz jednego gracza. Tej nocy, jeśli był to dobry gracz, umiera.',
    reminders: ['Martwy'],
    otherNightReminder:
      'Jeśli Cyganka dziś kogoś wybrała: jeśli był dobry, tej nocy umiera.',
  },
  goon: {
    name: 'Zbir',
    ability:
      'Każdej nocy pierwszy gracz, który wskaże cię za pomocą swojej zdolności, jest pijany do zmierzchu. Przechodzisz na jego stronę.',
    reminders: ['Pijany'],
  },
  lunatic: {
    name: 'Szaleniec',
    ability:
      'Myślisz, że jesteś Demonem, ale nie jesteś. Demon wie, kim jesteś oraz kogo wybierasz nocą.',
    reminders: ['Atak 1', 'Atak 2', 'Atak 3'],
  },
  godfather: {
    name: 'Ojciec chrzestny',
    ability:
      'Na początku gry dowiadujesz się, którzy Obcy są w grze. Jeśli jeden z nich dziś umarł, wybierz nocą gracza, który zginie. [-1 lub +1 Obcy]',
    reminders: ['Martwy', 'Dziś zginął'],
  },
  devilsadvocate: {
    name: 'Adwokat diabła',
    ability:
      'Każdej nocy wybierz żywego gracza (innego niż poprzedniej nocy). Jeśli jutro zostanie stracony, nie umrze.',
    reminders: ['Przeżywa egzekucję'],
  },
  assassin: {
    name: 'Skrytobójca',
    ability:
      'Raz w trakcie gry, w nocy*, wybierz gracza – ginie on, nawet jeśli z jakiegokolwiek powodu nie powinien.',
    reminders: ['Martwy', 'Brak zdolności'],
  },
  mastermind: {
    name: 'Geniusz zła',
    ability:
      'Jeśli Demon zostanie stracony (i gra powinna się skończyć), rozgrywka trwa jeszcze jeden dzień. Jeśli tego dnia ktoś zostanie stracony, jego drużyna przegrywa.',
  },
  zombuul: {
    name: 'Zombuul',
    ability:
      'Każdej nocy*, jeśli dziś nikt nie zginął, wybierz gracza, który umrze. Kiedy umrzesz po raz pierwszy, nadal żyjesz, ale wyglądasz na martwego.',
    reminders: ['Martwy', 'Dziś zginął'],
  },
  pukka: {
    name: 'Pukka',
    ability:
      'Każdej nocy wybierz gracza, który zostanie otruty. Poprzednio otruty gracz umiera, po czym zdrowieje.',
    reminders: ['Martwy', 'Otruty'],
  },
  shabaloth: {
    name: 'Shabaloth',
    ability:
      'Każdej nocy* wybierz 2 graczy, którzy umrą. Martwy gracz wybrany poprzedniej nocy może zostać zwymiotowany.',
    reminders: ['Żywy', 'Martwy'],
  },
  po: {
    name: 'Po',
    ability:
      'Każdej nocy* możesz wybrać gracza, który umrze. Jeśli poprzedniej nocy nikogo nie wybrałeś, tej nocy wybierz 3 graczy.',
    reminders: ['3 ataki', 'Martwy'],
  },
}

export default roleTranslationsPl
