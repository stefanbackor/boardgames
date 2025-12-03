import { Jinx } from '@/types/jinx'

/**
 * German translations for jinx reasons from `jinxes.en.ts`.
 *
 * Structure mirrors the base `jinxes` array but only the `reason` texts
 * are localized. Role ids stay the same as in the base data.
 */

export const jinxesDe: Array<Jinx> = [
  {
    id: 'chambermaid',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Die Chambermaid erfährt, ob der Mathematician heute Nacht aufwacht oder nicht, obwohl die Chambermaid zuerst aufwacht.',
      },
    ],
  },
  {
    id: 'butler',
    hatred: [
      {
        id: 'cannibal',
        reason:
          'Wenn der Cannibal die Butler-Fähigkeit erhält, erfährt der Cannibal dies.',
      },
    ],
  },
  {
    id: 'lunatic',
    hatred: [
      {
        id: 'mathematician',
        reason:
          'Der Mathematician erfährt, ob der Lunatic einen anderen Spieler angreift als der echte Dämon.',
      },
    ],
  },
  {
    id: 'pithag',
    hatred: [
      {
        id: 'heretic',
        reason: 'Ein Pit-Hag kann keinen Heretic erschaffen.',
      },
      {
        id: 'damsel',
        reason:
          'Wenn ein Pit-Hag eine Damsel erschafft, wählt der Spielleiter, welcher Spieler es ist.',
      },
      {
        id: 'politician',
        reason: 'Ein Pit-Hag kann keinen bösen Politician erschaffen.',
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
    id: 'leviathan',
    hatred: [
      {
        id: 'soldier',
        reason:
          'Wenn Leviathan den Soldier nominiert und hinrichtet, stirbt der Soldier nicht.',
      },
      {
        id: 'monk',
        reason:
          'Wenn Leviathan den vom Monk gewählten Spieler nominiert und hinrichtet, stirbt dieser Spieler nicht.',
      },
      {
        id: 'innkeeper',
        reason:
          'Wenn Leviathan einen vom Innkeeper gewählten Spieler nominiert und hinrichtet, stirbt dieser Spieler nicht.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Wenn Leviathan im Spiel ist und der Ravenkeeper durch Hinrichtung stirbt, wacht er in dieser Nacht auf, um seine Fähigkeit zu nutzen.',
      },
      {
        id: 'sage',
        reason:
          'Wenn Leviathan im Spiel ist und der Sage durch Hinrichtung stirbt, wacht er in dieser Nacht auf, um seine Fähigkeit zu nutzen.',
      },
      {
        id: 'farmer',
        reason:
          'Wenn Leviathan im Spiel ist und ein Farmer durch Hinrichtung stirbt, wird in dieser Nacht ein guter Spieler zum Farmer.',
      },
      {
        id: 'mayor',
        reason:
          'Wenn Leviathan im Spiel ist und an Tag 5 keine Hinrichtung stattfindet, gewinnt Gut.',
      },
    ],
  },
  {
    id: 'alhadikhia',
    hatred: [
      {
        id: 'scarlet woman',
        reason:
          'Wenn es zwei lebende Al-Hadikhias gibt, wird die Scarlet Woman Al-Hadikhia wieder zur Scarlet Woman.',
      },
      {
        id: 'mastermind',
        reason:
          'Nur 1 verfluchter Charakter kann im Spiel sein. Böse Spieler erfahren zu Beginn, welcher Spieler und Charakter es ist.',
      },
    ],
  },
  {
    id: 'lilmonsta',
    hatred: [
      {
        id: 'poppygrower',
        reason:
          "Wenn der Poppy Grower im Spiel ist, wachen Günstlinge nicht zusammen auf. Sie werden einzeln geweckt, bis einer von ihnen wählt, den Lil' Monsta-Marker zu nehmen.",
      },
      {
        id: 'magician',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'scarletwoman',
        reason:
          "Wenn 5 oder mehr Spieler leben und der Spieler mit dem Lil' Monsta-Marker stirbt, erhält die Scarlet Woman heute Nacht den Lil' Monsta-Marker.",
      },
    ],
  },
  {
    id: 'lycanthrope',
    hatred: [
      {
        id: 'gambler',
        reason:
          'Wenn der Lycanthrope lebt und der Gambler sich nachts selbst tötet, kann heute Nacht kein anderer Spieler sterben.',
      },
    ],
  },
  {
    id: 'legion',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Legion und Engineer können nicht beide zu Spielbeginn im Spiel sein. Wenn der Engineer Legion erschafft, werden die meisten Spieler (einschließlich aller bösen Spieler) zu böser Legion.',
      },
      {
        id: 'preacher',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
    ],
  },
  {
    id: 'fanggu',
    hatred: [
      {
        id: 'scarletwoman',
        reason:
          'Wenn der Fang Gu einen Außenseiter wählt und stirbt, wird die Scarlet Woman nicht zum Fang Gu.',
      },
    ],
  },
  {
    id: 'spy',
    hatred: [
      {
        id: 'magician',
        reason:
          'Wenn der Spy das Grimoire sieht, werden die Charakter-Marker von Dämon und Magician entfernt.',
      },
      {
        id: 'alchemist',
        reason: 'Der Alchemist kann nicht die Spy-Fähigkeit haben.',
      },
      {
        id: 'poppygrower',
        reason:
          'Wenn der Poppy Grower im Spiel ist, sieht der Spy das Grimoire erst, wenn der Poppy Grower stirbt.',
      },
      {
        id: 'damsel',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'heretic',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
    ],
  },
  {
    id: 'widow',
    hatred: [
      {
        id: 'magician',
        reason:
          'Wenn die Widow das Grimoire sieht, werden die Charakter-Marker von Dämon und Magician entfernt.',
      },
      {
        id: 'poppygrower',
        reason:
          'Wenn der Poppy Grower im Spiel ist, sieht die Widow das Grimoire erst, wenn der Poppy Grower stirbt.',
      },
      {
        id: 'alchemist',
        reason: 'Der Alchemist kann nicht die Widow-Fähigkeit haben.',
      },
      {
        id: 'damsel',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'heretic',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
    ],
  },
  {
    id: 'godfather',
    hatred: [
      {
        id: 'heretic',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
    ],
  },
  {
    id: 'baron',
    hatred: [
      {
        id: 'heretic',
        reason: 'Der Baron fügt möglicherweise nur 1 Außenseiter hinzu, nicht 2.',
      },
    ],
  },
  {
    id: 'marionette',
    hatred: [
      {
        id: 'lilmonsta',
        reason:
          "Die Marionette ist Nachbar eines Günstlings, nicht des Dämons. Die Marionette wird nicht geweckt, um zu wählen, wer den Lil' Monsta-Marker nimmt.",
      },
      {
        id: 'poppygrower',
        reason:
          'Wenn der Poppy Grower stirbt, erfährt der Dämon die Marionette, aber die Marionette erfährt nichts.',
      },
      {
        id: 'snitch',
        reason:
          'Die Marionette erfährt keine 3 nicht im Spiel befindlichen Charaktere. Der Dämon erfährt stattdessen 3 zusätzliche.',
      },
      {
        id: 'balloonist',
        reason:
          'Wenn die Marionette denkt, sie sei der Balloonist, wurde +1 Außenseiter hinzugefügt.',
      },
      {
        id: 'damsel',
        reason: 'Die Marionette erfährt nicht, dass eine Damsel im Spiel ist.',
      },
      {
        id: 'huntsman',
        reason:
          'Wenn die Marionette denkt, sie sei der Huntsman, wurde die Damsel hinzugefügt.',
      },
    ],
  },
  {
    id: 'riot',
    hatred: [
      {
        id: 'engineer',
        reason:
          'Riot und Engineer können nicht beide zu Spielbeginn im Spiel sein.\nWenn der Engineer Riot erschafft, werden die bösen Spieler zu Riot.',
      },
      {
        id: 'golem',
        reason: 'Wenn der Golem Riot nominiert, stirbt der Riot-Spieler nicht.',
      },
      {
        id: 'snitch',
        reason:
          'Wenn der Snitch im Spiel ist, erhält jeder Riot-Spieler 3 zusätzliche Bluffs.',
      },
      {
        id: 'saint',
        reason:
          'Wenn ein guter Spieler den Saint nominiert und tötet, verliert das Team des Saint.',
      },
      {
        id: 'butler',
        reason: 'Der Butler kann seinen Herrn nicht nominieren.',
      },
      {
        id: 'pithag',
        reason:
          'Wenn der Pit-Hag Riot erschafft, werden alle bösen Spieler zu Riot.\nWenn der Pit-Hag Riot nach Tag 3 erschafft, geht das Spiel noch einen weiteren Tag weiter.',
      },
      {
        id: 'mayor',
        reason:
          'Wenn der 3. Tag mit nur drei lebenden Spielern beginnt, können die Spieler (als Gruppe) wählen, überhaupt nicht zu nominieren. Falls ja (und ein Mayor lebt), gewinnt das Team des Mayor.',
      },
      {
        id: 'monk',
        reason:
          'Wenn ein Riot-Spieler den vom Monk geschützten Spieler nominiert und tötet, stirbt der geschützte Spieler nicht.',
      },
      {
        id: 'farmer',
        reason:
          'Wenn ein Riot-Spieler einen Farmer nominiert und tötet, nutzt der Farmer heute Nacht seine Fähigkeit.',
      },
      {
        id: 'innkeeper',
        reason:
          'Wenn ein Riot-Spieler einen vom Innkeeper geschützten Spieler nominiert, stirbt der geschützte Spieler nicht.',
      },
      {
        id: 'sage',
        reason:
          'Wenn ein Riot-Spieler einen Sage nominiert und tötet, nutzt der Sage heute Nacht seine Fähigkeit.',
      },
      {
        id: 'ravenkeeper',
        reason:
          'Wenn ein Riot-Spieler den Ravenkeeper nominiert und tötet, nutzt der Ravenkeeper heute Nacht seine Fähigkeit.',
      },
      {
        id: 'soldier',
        reason:
          'Wenn ein Riot-Spieler den Soldier nominiert, stirbt der Soldier nicht.',
      },
      {
        id: 'grandmother',
        reason:
          'Wenn ein Riot-Spieler das Enkelkind nominiert und tötet, stirbt auch die Grandmother.',
      },
      {
        id: 'king',
        reason:
          'Wenn ein Riot-Spieler den King nominiert und tötet und der Choirboy lebt, nutzt der Choirboy heute Nacht seine Fähigkeit.',
      },
      {
        id: 'exorcist',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'minstrel',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'flowergirl',
        reason: 'Nur 1 verfluchter Charakter kann im Spiel sein.',
      },
      {
        id: 'undertaker',
        reason:
          'Spieler, die durch Nominierung sterben, zählen für den Undertaker als hingerichtet.',
      },
      {
        id: 'cannibal',
        reason:
          'Spieler, die durch Nominierung sterben, zählen für den Cannibal als hingerichtet.',
      },
      {
        id: 'pacifist',
        reason:
          'Spieler, die durch Nominierung sterben, zählen für den Pacifist als hingerichtet.',
      },
      {
        id: 'devilsadvocate',
        reason:
          "Spieler, die durch Nominierung sterben, zählen für den Devil's Advocate als hingerichtet.",
      },
      {
        id: 'investigator',
        reason: 'Riot zählt für den Investigator als Günstling.',
      },
      {
        id: 'clockmaker',
        reason: 'Riot zählt für den Clockmaker als Günstling.',
      },
      {
        id: 'towncrier',
        reason: 'Riot zählt für den Town Crier als Günstling.',
      },
      {
        id: 'damsel',
        reason: 'Riot zählt für die Damsel als Günstling.',
      },
      {
        id: 'preacher',
        reason: 'Riot zählt für den Preacher als Günstling.',
      },
    ],
  },
  {
    id: 'lleech',
    hatred: [
      {
        id: 'mastermind',
        reason:
          'Wenn der Mastermind lebt und der Wirt des Lleech durch Hinrichtung stirbt, lebt der Lleech, verliert aber seine Fähigkeit.',
      },
      {
        id: 'slayer',
        reason: 'Wenn der Slayer den Wirt des Lleech erschlägt, stirbt der Wirt.',
      },
      {
        id: 'heretic',
        reason:
          'Wenn der Lleech den Heretic vergiftet hat und der Lleech stirbt, bleibt der Heretic vergiftet.',
      },
    ],
  },
]

export default jinxesDe
