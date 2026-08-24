import { Jinx } from '@/types/jinx'

/**
 * German translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array (same order, same pairs) but
 * only the `reason` texts are localized. Role ids stay the same as in the
 * base data.
 */

export const jinxesDe: Array<Jinx> = [
  {
    id: 'alchemist',
    hatred: [
      {
        id: 'boffin',
        reason:
          'Wenn der Alchemist die Boffin-Fähigkeit hat, erfährt der Alchemist nicht, welche Fähigkeit der Dämon hat.',
      },
      {
        id: 'marionette',
        reason:
          'Ein Alchemist-Marionette hat keine Marionette-Fähigkeit und die Marionette ist im Spiel.',
      },
      {
        id: 'mastermind',
        reason:
          'Ein Alchemist-Genie hat keine Genie-Fähigkeit und das Genie ist nicht im Spiel.',
      },
      {
        id: 'organgrinder',
        reason:
          'Wenn der Alchemist die Organ Grinder-Fähigkeit hat, ist der Organ Grinder im Spiel. Sind beide nüchtern, sind beide betrunken.',
      },
      {
        id: 'spy',
        reason:
          'Ein Alchemist-Spion hat keine Spion-Fähigkeit und ein Spion ist im Spiel. Nach jeder Hinrichtung darf ein lebender Alchemist-Spion öffentlich einen lebenden Spieler als Spion benennen. Ist die Vermutung richtig, muss der Dämon heute Nacht den Spion wählen.',
      },
      {
        id: 'summoner',
        reason:
          'Der Alchemist-Summoner erhält keine Bluffs und wählt, welcher Dämon, aber nicht welcher Spieler. Stirbt er vorher, gewinnt das Böse. [Kein Dämon]',
      },
      {
        id: 'widow',
        reason:
          'Ein Alchemist-Widow hat keine Widow-Fähigkeit und eine Widow ist im Spiel. Nach jeder Hinrichtung darf ein lebender Alchemist-Widow öffentlich einen lebenden Spieler als Widow benennen. Ist die Vermutung richtig, muss der Dämon heute Nacht die Widow wählen.',
      },
      {
        id: 'wraith',
        reason:
          'Ein Alchemist-Wraith hat keine Wraith-Fähigkeit und ein Wraith ist im Spiel. Nach jeder Hinrichtung darf ein lebender Alchemist-Wraith öffentlich einen lebenden Spieler als Wraith benennen. Ist die Vermutung richtig, muss der Dämon heute Nacht den Wraith wählen.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Stirbt der Al-Hadikhia durch Hinrichtung und das Genie lebt, wählt der Al-Hadikhia heute Nacht 3 gute Spieler: Entscheiden sich alle 3 zu leben, gewinnt das Böse. Andernfalls gewinnt das Gute.',
      },
      {
        id: 'princess',
        reason:
          'Wenn die Princess an ihrem 1. Tag einen Spieler nominiert hat, der hingerichtet wurde, stirbt heute Nacht niemand durch den Al-Hadikhia.',
      },
    ],
  },
  {
    id: 'boffin',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Wenn der Dämon die Cult Leader-Fähigkeit hat, kann er durch diese Fähigkeit nicht gut werden.',
      },
      {
        id: 'drunk',
        reason: 'Der Dämon kann die Schnapsdrossel-Fähigkeit nicht haben.',
      },
      {
        id: 'goon',
        reason:
          'Wenn der Dämon die Trottel-Fähigkeit hat, kann er durch diese Fähigkeit nicht gut werden.',
      },
      {
        id: 'heretic',
        reason: 'Der Dämon kann die Heretic-Fähigkeit nicht haben.',
      },
      {
        id: 'ogre',
        reason: 'Der Dämon kann die Ogre-Fähigkeit nicht haben.',
      },
      {
        id: 'politician',
        reason: 'Der Dämon kann die Politician-Fähigkeit nicht haben.',
      },
      {
        id: 'villageidiot',
        reason:
          'Wenn ein zusätzlicher Token vorhanden ist, kann der Boffin dem Dämon die Village Idiot-Fähigkeit geben.',
      },
    ],
  },
  {
    id: 'bountyhunter',
    hatred: [
      {
        id: 'kazali',
        reason:
          'Wenn der Kazali den Bounty Hunter in einen Günstling verwandelt, wird kein böser Dorfbewohner erschaffen.',
      },
      {
        id: 'philosopher',
        reason:
          'Wenn der Philosoph die Bounty Hunter-Fähigkeit erhält, könnte ein Dorfbewohner böse werden.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'organgrinder',
        reason:
          'Wenn der Organ Grinder für Abstimmungen mit geschlossenen Augen sorgt, darf der Butler die Hand heben, aber seine Stimme zählt nur, wenn sein Herr ebenfalls abgestimmt hat.',
      },
    ],
  },
  {
    id: 'cannibal',
    hatred: [
      {
        id: 'butler',
        reason:
          'Wenn der Cannibal die Butler-Fähigkeit erhält, erfährt der Cannibal dies.',
      },
      {
        id: 'juggler',
        reason:
          'Wenn der Jongleur an seinem ersten Tag rät und durch Hinrichtung stirbt, erfährt der lebende Cannibal heute Nacht, wie viele Vermutungen des Jongleurs richtig waren.',
      },
      {
        id: 'princess',
        reason:
          'Wenn der Cannibal heute die Princess nominiert hat und diese hingerichtet wurde und starb, tötet der Dämon heute Nacht nicht.',
      },
      {
        id: 'zealot',
        reason:
          'Wenn der Cannibal die Zealot-Fähigkeit erhält, erfährt der Cannibal dies.',
      },
    ],
  },
  {
    id: 'cerenovus',
    hatred: [
      {
        id: 'goblin',
        reason:
          'Der Cerenovus kann wählen, einen Spieler verrückt zu machen, dass er der Goblin ist.',
      },
    ],
  },
  {
    id: 'heretic',
    hatred: [
      {
        id: 'baron',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'godfather',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'lleech',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'pithag',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'spy',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'widow',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Wenn Legion erschaffen wird, werden alle bösen Spieler zu Legion. Ist Legion im Spiel, weiß der Engineer dies von Beginn an, hat aber keine Fähigkeit.',
      },
      {
        id: 'hatter',
        reason:
          'Wenn Legion erschaffen wird, werden alle bösen Spieler zu Legion. Ist Legion im Spiel, hat der Hatter keine Fähigkeit.',
      },
      {
        id: 'minstrel',
        reason:
          'Ist Legion heute durch Hinrichtung gestorben, behält Legion die Fähigkeit, aber der Minnesänger könnte erfahren, dass er Legion ist.',
      },
      {
        id: 'politician',
        reason: 'Der Politician könnte Legion gegenüber als böse gelten.',
      },
      {
        id: 'preacher',
        reason:
          'Wählt der Preacher Legion, behält Legion die Fähigkeit, aber der Preacher könnte erfahren, dass es Legion ist.',
      },
      {
        id: 'summoner',
        reason:
          'Wird Legion herbeigerufen, werden alle bösen Spieler zu Legion.',
      },
      {
        id: 'zealot',
        reason: 'Der Zealot könnte Legion gegenüber als böse gelten.',
      },
    ],
  },
  {
    id: 'leviathan',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Jede Nacht* wählt der Leviathan einen lebenden guten Spieler (jede Nacht einen anderen): eine gewählte Banshee stirbt und erhält ihre Fähigkeit.',
      },
      {
        id: 'exorcist',
        reason:
          'Wenn der Leviathan den vom Exorzist gewählten Spieler nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
      {
        id: 'farmer',
        reason:
          'Jede Nacht* wählt der Leviathan einen lebenden guten Spieler (jede Nacht einen anderen): ein gewählter Farmer nutzt seine Fähigkeit, stirbt aber nicht.',
      },
      {
        id: 'grandmother',
        reason:
          'Ist der Leviathan im Spiel und der Enkel stirbt durch Hinrichtung, gewinnt das Böse.',
      },
      {
        id: 'hatter',
        reason: 'Der Leviathan kann nach Tag 5 nicht mehr ins Spiel kommen.',
      },
      {
        id: 'innkeeper',
        reason:
          'Wenn der Leviathan einen vom Gastwirt geschützten Spieler nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
      {
        id: 'king',
        reason:
          'Ist der Leviathan im Spiel und mindestens 1 Spieler tot, erfährt der King jede Nacht einen lebenden Charakter.',
      },
      {
        id: 'mayor',
        reason:
          'Leben der Leviathan und der Bürgermeister an Tag 5 und findet keine Hinrichtung statt, gewinnt das Gute.',
      },
      {
        id: 'monk',
        reason:
          'Wenn der Leviathan den vom Mönch geschützten Spieler nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
      {
        id: 'pithag',
        reason: 'Der Leviathan kann nach Tag 5 nicht mehr ins Spiel kommen.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Jede Nacht* wählt der Leviathan einen lebenden Spieler (jede Nacht einen anderen): ein gewählter Rabenwärter nutzt seine Fähigkeit, stirbt aber nicht.',
      },
      {
        id: 'sage',
        reason:
          'Jede Nacht* wählt der Leviathan einen lebenden guten Spieler (jede Nacht einen anderen): ein gewählter Weiser nutzt seine Fähigkeit, stirbt aber nicht.',
      },
      {
        id: 'soldier',
        reason:
          'Wenn der Leviathan den Soldat nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'hatter',
        reason:
          "Stirbt der Hatter und der Dämon wählt Lil' Monsta, wählt er auch einen Günstling, zu dem er wird.",
      },
      {
        id: 'magician',
        reason:
          "Lebt der Magician, wählt der Spielleiter, welcher Günstling Lil' Monsta hütet.",
      },
      {
        id: 'poppygrower',
        reason:
          "Leben Lil' Monsta und der Poppy Grower, wachen die Günstlinge einer nach dem anderen auf, bis einer von ihnen den Lil' Monsta-Token nimmt.",
      },
      {
        id: 'psychopath',
        reason:
          "Hütet der Psychopath Lil' Monsta, stirbt er, wenn er hingerichtet wird.",
      },
      {
        id: 'scarletwoman',
        reason:
          "Stirbt Lil' Monsta, während 5 oder mehr Spieler leben, hütet die Frau in Rot Lil' Monsta für den Rest des Spiels.",
      },
      {
        id: 'vizier',
        reason:
          "Hütet der Vizier Lil' Monsta, stirbt er, wenn er hingerichtet wird.",
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Wenn das Genie lebt und der Wirt des Lleech durch Hinrichtung stirbt, lebt der Lleech weiter, verliert aber seine Fähigkeit.',
      },
      {
        id: 'slayer',
        reason:
          'Wenn der Schütze den Wirt des Lleech erschießt, stirbt der Wirt.',
      },
    ],
  },
  {
    id: 'magician',
    hatred: [
      {
        id: 'legion',
        reason:
          'Ist der Magician im Spiel, wacht Legion während der Dämonen-Info in getrennten Gruppen auf. Jede Gruppe erfährt, welche Spieler gut sind, erfährt aber nicht den Magician.',
      },
      {
        id: 'marionette',
        reason:
          'Lebt der Magician, weiß der Dämon nicht, welcher seiner Nachbarn die Marionette ist.',
      },
      {
        id: 'spy',
        reason:
          'Wenn der Spion das Grimoire sieht, werden die Charakter-Marker von Dämon und Magician entfernt.',
      },
      {
        id: 'vizier',
        reason:
          'Ist der Vizier im Spiel, hat der Magician keine Fähigkeit, ist aber immun gegen die Fähigkeit des Viziers.',
      },
      {
        id: 'widow',
        reason:
          'Wenn die Widow das Grimoire sieht, werden die Charakter-Marker von Dämon und Magician entfernt.',
      },
      {
        id: 'wraith',
        reason:
          'Nach jeder Hinrichtung darf der lebende Magician öffentlich einen lebenden Spieler als Wraith benennen. Ist die Vermutung richtig, muss der Dämon heute Nacht den Wraith wählen.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'balloonist',
        reason:
          'Denkt die Marionette, dass sie der Balloonist ist, wurde beim Aufbau möglicherweise ein Außenseiter hinzugefügt.',
      },
      {
        id: 'huntsman',
        reason:
          'Denkt die Marionette, dass sie der Huntsman ist, wurde beim Aufbau die Damsel hinzugefügt.',
      },
      {
        id: 'kazali',
        reason:
          'Wäre eine Marionette im Spiel, kommt sie nach dem Dämon ins Spiel und muss als dessen Nachbar beginnen.',
      },
      {
        id: 'lilmonsta',
        reason:
          'Wäre eine Marionette im Spiel, kommt sie nach dem Dämon ins Spiel und muss als dessen Nachbar beginnen.',
      },
      {
        id: 'summoner',
        reason:
          'Wäre eine Marionette im Spiel, kommt sie nach dem Dämon ins Spiel und muss als dessen Nachbar beginnen.',
      },
    ],
  },
  {
    id: 'mastermind',
    hatred: [
      {
        id: 'vigormortis',
        reason:
          'Ein Genie, das seine Fähigkeit hat, behält sie, wenn der Vigormortis stirbt.',
      },
    ],
  },
  {
    id: 'mathematician',
    hatred: [
      {
        id: 'chambermaid',
        reason:
          'Das Kammermädchen kann feststellen, ob der Mathematiker heute Nacht aufwacht.',
      },
      {
        id: 'drunk',
        reason:
          'Der Mathematiker erfährt, ob die Fähigkeit der Schnapsdrossel falsche Informationen geliefert hat oder nicht richtig funktioniert hat.',
      },
      {
        id: 'lunatic',
        reason:
          'Der Mathematiker erfährt, ob der Wahnsinnige einen anderen Spieler angreift als der echte Dämon.',
      },
      {
        id: 'marionette',
        reason:
          'Der Mathematiker erfährt, ob die Fähigkeit der Marionette falsche Informationen geliefert hat oder nicht richtig funktioniert hat.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'cultleader',
        reason:
          'Verwandelt die Trankbrauerin einen bösen Spieler in den Cult Leader, kann dieser durch seine eigene Fähigkeit nicht gut werden.',
      },
      {
        id: 'damsel',
        reason:
          'Wenn eine Trankbrauerin eine Damsel erschafft, wählt der Spielleiter, welcher Spieler es ist.',
      },
      {
        id: 'goon',
        reason:
          'Verwandelt die Trankbrauerin einen bösen Spieler in den Trottel, kann dieser durch seine eigene Fähigkeit nicht gut werden.',
      },
      {
        id: 'ogre',
        reason:
          'Verwandelt die Trankbrauerin einen bösen Spieler in den Ogre, kann dieser durch seine eigene Fähigkeit nicht gut werden.',
      },
      {
        id: 'politician',
        reason:
          'Verwandelt die Trankbrauerin einen bösen Spieler in den Politician, kann dieser durch seine eigene Fähigkeit nicht gut werden.',
      },
      {
        id: 'villageidiot',
        reason:
          'Wenn ein zusätzlicher Token vorhanden ist, kann die Trankbrauerin einen weiteren Village Idiot erschaffen. In diesem Fall kann sich ändern, welcher Village Idiot betrunken ist.',
      },
    ],
  },
  {
    id: 'plaguedoctor',
    hatred: [
      {
        id: 'baron',
        reason:
          'Würde der Spielleiter die Baron-Fähigkeit erhalten, werden bis zu zwei Spieler zu Außenseitern.',
      },
      {
        id: 'boomdandy',
        reason:
          'Würde der Spielleiter die Boomdandy-Fähigkeit erhalten, wird ein Spieler zum Boomdandy.',
      },
      {
        id: 'eviltwin',
        reason:
          'Würde der Spielleiter die Böser Zwilling-Fähigkeit erhalten, wird ein Spieler zum Bösen Zwilling.',
      },
      {
        id: 'fearmonger',
        reason:
          'Würde der Spielleiter die Fearmonger-Fähigkeit erhalten, erhält sie ein Günstling und erfährt dies.',
      },
      {
        id: 'goblin',
        reason:
          'Würde der Spielleiter die Goblin-Fähigkeit erhalten, erhält sie ein Günstling und erfährt dies.',
      },
      {
        id: 'marionette',
        reason:
          'Würde der Spielleiter die Marionette-Fähigkeit erhalten, wird einer der guten Nachbarn des Dämons zur Marionette.',
      },
      {
        id: 'scarletwoman',
        reason:
          'Würde der Spielleiter die Frau in Rot-Fähigkeit erhalten, erhält sie ein Günstling und erfährt dies.',
      },
      {
        id: 'spy',
        reason:
          'Würde der Spielleiter die Spion-Fähigkeit erhalten, erhält sie ein Günstling und erfährt dies.',
      },
      {
        id: 'wraith',
        reason:
          'Würde der Spielleiter die Wraith-Fähigkeit erhalten, erhält sie ein Günstling und erfährt dies.',
      },
    ],
  },
  {
    id: 'recluse',
    hatred: [
      {
        id: 'ogre',
        reason:
          'Gilt der Einsiedler dem Ogre gegenüber als böse, erfährt der Ogre, dass er böse ist.',
      },
      {
        id: 'sage',
        reason: 'Der Einsiedler könnte dem Weisen gegenüber als Dämon gelten.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'atheist',
        reason:
          'Wird während eines Riots der Spielleiter nominiert, stimmen die Spieler ab. Ist er „todgeweiht“, endet das Spiel. Wenn nicht, wird erneut nominiert.',
      },
      {
        id: 'banshee',
        reason:
          'Jede Nacht* wählt Riot einen lebenden guten Spieler (jede Nacht einen anderen): eine gewählte Banshee stirbt und erhält ihre Fähigkeit.',
      },
      {
        id: 'exorcist',
        reason:
          'Wenn Riot den vom Exorzist gewählten Spieler nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
      {
        id: 'farmer',
        reason:
          'Jede Nacht* wählt Riot einen lebenden guten Spieler (jede Nacht einen anderen): ein gewählter Farmer nutzt seine Fähigkeit, stirbt aber nicht.',
      },
      {
        id: 'grandmother',
        reason:
          'Ist Riot im Spiel und der Enkel stirbt durch Hinrichtung, gewinnt das Böse.',
      },
      {
        id: 'innkeeper',
        reason:
          'Wenn Riot einen vom Gastwirt geschützten Spieler nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
      {
        id: 'king',
        reason:
          'Ist Riot im Spiel und mindestens 1 Spieler tot, erfährt der King jede Nacht einen lebenden Charakter.',
      },
      {
        id: 'mayor',
        reason:
          'Der Bürgermeister darf den Riot beenden. Tut er das, während nur 1 Riot lebt, gewinnt das Gute. Andernfalls gewinnt das Böse.',
      },
      {
        id: 'monk',
        reason:
          'Wenn Riot den vom Mönch geschützten Spieler nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Jede Nacht* wählt Riot einen lebenden guten Spieler (jede Nacht einen anderen): ein gewählter Rabenwärter nutzt seine Fähigkeit, stirbt aber nicht.',
      },
      {
        id: 'sage',
        reason:
          'Jede Nacht* wählt Riot einen lebenden guten Spieler (jede Nacht einen anderen): ein gewählter Weiser nutzt seine Fähigkeit, stirbt aber nicht.',
      },
      {
        id: 'soldier',
        reason:
          'Wenn Riot den Soldat nominiert und dieser hingerichtet wird, gewinnt das Gute.',
      },
    ],
  },
  {
    id: 'scarletwoman',
    hatred: [
      {
        id: 'alhadikhia',
        reason:
          'Gäbe es zwei Dämonen, von denen einer die Frau in Rot war, wird die Frau in Rot wieder zur Frau in Rot.',
      },
      {
        id: 'fanggu',
        reason:
          'Gäbe es zwei Dämonen, von denen einer die Frau in Rot war, bleibt die Frau in Rot die Frau in Rot.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'damsel',
        reason: 'Ist (oder war) der Spion im Spiel, ist die Damsel vergiftet.',
      },
      {
        id: 'ogre',
        reason: 'Der Spion gilt dem Ogre gegenüber als böse.',
      },
      {
        id: 'poppygrower',
        reason:
          'Hat der Poppy Grower seine Fähigkeit, sieht der Spion das Grimoire nicht.',
      },
    ],
  },
  {
    id: 'summoner',
    hatred: [
      {
        id: 'clockmaker',
        reason: 'Der Summoner gilt dem Uhrmacher gegenüber als Dämon.',
      },
      {
        id: 'courtier',
        reason:
          'Hat der lebende Summoner keine Fähigkeit, hat der Spielleiter die Summoner-Fähigkeit.',
      },
      {
        id: 'engineer',
        reason:
          'Wird der lebende Summoner aus dem Spiel entfernt, hat der Spielleiter die Summoner-Fähigkeit.',
      },
      {
        id: 'hatter',
        reason:
          'Erschafft der Summoner einen zweiten lebenden Dämon, sind die Todesfälle in dieser Nacht willkürlich.',
      },
      {
        id: 'kazali',
        reason:
          'Erschafft der Summoner einen zweiten lebenden Dämon, sind die Todesfälle in dieser Nacht willkürlich.',
      },
      {
        id: 'lordoftyphon',
        reason:
          'Wird ein Lord of Typhon herbeigerufen, muss er neben einem Günstling sitzen und sein anderer Nachbar wird zu einem bösen Günstling.',
      },
      {
        id: 'pithag',
        reason:
          'Erschafft der Summoner einen zweiten lebenden Dämon, sind die Todesfälle in dieser Nacht willkürlich.',
      },
      {
        id: 'poppygrower',
        reason:
          'Lebt der Poppy Grower in der 3. Nacht, wählt der Summoner, welcher Dämon, aber nicht welcher Spieler.',
      },
      {
        id: 'preacher',
        reason:
          'Hat der lebende Summoner keine Fähigkeit, hat der Spielleiter die Summoner-Fähigkeit.',
      },
      {
        id: 'pukka',
        reason:
          'Der Summoner darf einen Pukka in der 2. Nacht statt in der 3. herbeirufen.',
      },
      {
        id: 'zombuul',
        reason:
          'Ruft der Summoner einen toten Spieler in den Zombuul, ist der Zombuul schon „einmal gestorben“.',
      },
    ],
  },
  {
    id: 'vizier',
    hatred: [
      {
        id: 'alsaahir',
        reason:
          'Der Spielleiter verkündet nicht, dass der Vizier im Spiel ist.',
      },
      {
        id: 'courtier',
        reason:
          'Verliert der Vizier seine Fähigkeit, erfährt er dies und kann tagsüber nicht sterben.',
      },
      {
        id: 'fearmonger',
        reason:
          'Der Vizier wacht mit dem Fearmonger auf, erfährt, wen dieser wählt, und kann nicht die sofortige Hinrichtung dieses Spielers anordnen.',
      },
      {
        id: 'investigator',
        reason:
          'Der Spielleiter verkündet nicht, dass der Vizier im Spiel ist.',
      },
      {
        id: 'politician',
        reason: 'Der Politician könnte dem Vizier gegenüber als böse gelten.',
      },
      {
        id: 'preacher',
        reason:
          'Verliert der Vizier seine Fähigkeit, erfährt er dies und kann tagsüber nicht sterben.',
      },
      {
        id: 'zealot',
        reason: 'Der Zealot könnte dem Vizier gegenüber als böse gelten.',
      },
    ],
  },
  {
    id: 'vortox',
    hatred: [
      {
        id: 'banshee',
        reason:
          'Tötet der Vortox die Banshee, erfahren alle Spieler, dass die Banshee gestorben ist.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'damsel',
        reason: 'Ist (oder war) die Widow im Spiel, ist die Damsel vergiftet.',
      },
      {
        id: 'poppygrower',
        reason:
          'Hat der Poppy Grower seine Fähigkeit, sieht die Widow das Grimoire nicht.',
      },
    ],
  },
  {
    id: 'yaggababble',
    hatred: [
      {
        id: 'exorcist',
        reason:
          'Wählt der Exorzist die Blabla Jaga, tötet die Blabla Jaga heute Nacht nicht.',
      },
    ],
  },
]

export default jinxesDe
