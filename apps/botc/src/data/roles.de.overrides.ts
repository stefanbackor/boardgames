/**
 * German translations and overrides for Blood on the Clocktower roles.
 * Generated from the Trouble Brewing, Sects and Violets & Bad Moon Rising
 * script JSON (`Trouble Brewing.de.json`, `Sects and Violets.de.json`,
 * `Bad Moon Rising.de.json` from RealVidy/botc-translations).
 *
 * Only roles that appear in these base scripts are included here – other roles
 * fall back to the base English text from `roles.ts`.
 */

import { RoleTranslation } from './types'

export const roleTranslationsDe: Record<string, RoleTranslation> = {
  undertaker: {
    name: 'Bestatter',
    ability:
      'Du erfährst jede Nacht*, welcher Charakter bei der Hinrichtung des vorherigen Tages gestorben ist.',
    reminders: ['Exekutiert'],
    otherNightReminder:
      'Wenn ein Spieler heute exekutiert wurde: Zeige dem Bestatter den Charaktertoken dieses Spielers.',
  },
  librarian: {
    name: 'Bibliothekarin',
    ability:
      'Du beginnst das Spiel mit dem Wissen, dass 1 von 2 Spielern ein spezifischer Aussenseiter ist. (Oder, dass 0 im Spiel sind.)',
    reminders: ['Außenseiter', 'Falsch'],
    firstNightReminder:
      'Zeige den Charaktertoken eines im Spiel befindlichen Außenseiters. Zeige auf zwei Spieler, von denen einer den Charakter spielt.',
  },
  flowergirl: {
    name: 'Blumenmädchen',
    ability: 'Du erfährst jede Nacht*, ob ein Dämon am Tag abgestimmt hat.',
    reminders: ['Dämon abgestimmt', 'Dämon nicht abgestimmt'],
    otherNightReminder:
      "Nicke (ja) mit dem Kopf wenn der Dämon am Tag abgestimmt hat, ansonsten schüttle den Kopf (nein). Platziere den 'Dämon nicht abgestimmt' Marker, bzw. entferne diesen.",
  },
  mayor: {
    name: 'Bürgermeister',
    ability:
      'Wenn nur noch 3 Spieler leben und am Tag keine Hinrichtung stattfindet, gewinnt dein Team. Wenn du in der Nacht sterben solltest, könnte ein anderer Spieler an deiner Stelle sterben.',
  },
  empath: {
    name: 'Empath',
    ability:
      'Du erfährst jede Nacht, wie viele deiner beiden lebenden Nachbarn böse sind.',
    firstNightReminder:
      'Zeige mit der Hand (0, 1, 2)  wieviele lebende Nachbarn des Empathen böse sind.',
    otherNightReminder:
      'Zeige mit der Hand (0, 1, 2)  wieviele lebende Nachbarn des Empathen böse sind.',
  },
  investigator: {
    name: 'Ermittler',
    ability:
      'Du beginnst das Spiel mit dem Wissen, dass 1 von 2 Spielern ein spezifischer Untergebener ist.',
    reminders: ['Untergebener', 'falsch'],
    firstNightReminder:
      'Zeige den Charaktertokens eines Untergebenen, der sich im Spiel befindet. Zeige auf zwei Spieler, von denen einer diesen Untergebenen spielt.',
  },
  exorcist: {
    name: 'Exorzist',
    ability:
      'Jede Nacht*, wähle 1 Spieler (nicht denselben wie die Nacht zuvor): der Dämon, falls ausgewählt, erfährt wer du bist und wacht diese Nacht nicht auf.',
    reminders: ['Auserwählt'],
    otherNightReminder:
      'Der Exorzist zeigt auf einen Spieler (einen anderen als vorherige Nacht). Ist dieser Spieler der Dämon: Wecke den Dämon. Zeige ihm den Token des Exorzisten. Zeige auf den Spieler des Exorzisten. Der Dämon darf heute Nacht keine Aktion durchführen.',
  },
  innkeeper: {
    name: 'Gastwirt',
    ability:
      'Jede Nacht*, wähle 2 Spieler: beide können diese Nacht nicht sterben, aber 1 von ihnen ist bis Sonnenuntergang betrunken.',
    reminders: ['Beschützt', 'Betrunken'],
    otherNightReminder:
      'Die zuvor beschützten und betrunkenen Spieler verlieren die Marker. Der Gastwirt zeigt auf zwei Spieler. Diese Spieler sind beschützt. Einer von ihnen ist betrunken.',
  },
  savant: {
    name: 'Gelehrter',
    ability:
      'Du kannst jeden Tag privat zum Erzähler gehen und 2 Aussagen erhalten: 1 stimmt, 1 ist falsch',
  },
  gambler: {
    name: 'Glücksspieler',
    ability:
      'Jede Nacht*, wähle 1 Spieler und versuche, dessen Charakter zu erraten: rätst du falsch, stirbst du.',
    reminders: ['Tot'],
    otherNightReminder:
      'Der Glücksspieler zeigt auf einen Spieler und einen Charakter auf dem Charakterbogen. Liegt er falsch, stirbt der Glücksspieler.',
  },
  grandmother: {
    name: 'Großmutter',
    ability:
      'Du beginnst das Spiel mit dem Wissen, dass ein bestimmter guter Spieler ein bestimmter Charakter ist. Wird der Spieler vom Dämon getötet, stirbst du auch.',
    reminders: ['Enkel'],
    firstNightReminder:
      'Zeige auf den als Enkel markierten Charaktertoken. Zeige auf den markierten Spieler.',
    otherNightReminder:
      'Stirbt der Enkel der Großmutter heute Nacht: Die Großmutter stirbt.',
  },
  juggler: {
    name: 'Jongleur',
    ability:
      'An deinem ersten Tag, versuche öffentlich die Charaktere von bis zu 5 Spielern zu erraten. In der darauffolgenden Nacht erfährst du, mit wie vielen du richtig lagst.',
    reminders: ['Korrekt'],
    otherNightReminder:
      'Wenn heute der erste Tag des Jongleurs war: Zeige mit der Hand wieviele Charaktere der Jongleur richtig erraten hat.',
  },
  virgin: {
    name: 'Jungfrau',
    ability:
      'Wenn du das erste Mal zur Hinrichting nominiert wirst, falls der Nominierende ein Dorfbewohner ist, wird dieser sofort hingerichtet.',
    reminders: ['Keine Fähigkeit'],
  },
  chambermaid: {
    name: 'Kammermädchen',
    ability:
      'Jede Nacht, wähle 2 lebende Spieler (nicht dich selbst): du erfährst, wie viele von ihnen diese Nacht aufgrund ihrer Charakterfähigkeit erwachten.',
    firstNightReminder:
      'Das Kammermädchen zeigt auf zwei Spieler. Zeige dem Spieler wieviele (0, 1 oder 2) dieser Spieler in der letzten Nacht erwacht sind um ihre Fähigkeit zu verwenden.',
    otherNightReminder:
      'Das Kammermädchen zeigt auf zwei Spieler. Zeige dem Spieler wieviele (0, 1 oder 2) dieser Spieler in der letzten Nacht erwacht sind um ihre Fähigkeit zu verwenden.',
  },
  chef: {
    name: 'Koch',
    ability:
      'Du beginnst das Spiel mit dem Wissen, wie viele Paare von bösen Spielern nebeneinander sitzen.',
    firstNightReminder:
      'Zeige mit der Hand die Anzahl (0, 1, 2, …) von benachbarten bösen Spielern',
  },
  artist: {
    name: 'Künstlerin',
    ability:
      'Einmal pro Spiel, am Tag, stelle dem Erzähler privat 1 beliebge Ja/Nein-Frage.',
    reminders: ['Keine Fähigkeit'],
  },
  mathematician: {
    name: 'Mathematiker',
    ability:
      'Du erfährst jede Nacht, wie viele Fähigkeiten (seit Sonnenaufgang) aufgrund der Fähigkeit eines anderen Charakters nicht so funktionierten, wie sie sollten.',
    reminders: ['Abnormal'],
    firstNightReminder:
      'Zeige die Anzahl der Spieler, deren Fähigkeiten beeinträchtigt wurden mit der Hand.',
    otherNightReminder:
      'Zeige die Anzahl der Spieler, deren Fähigkeiten beeinträchtigt wurden mit der Hand.',
  },
  minstrel: {
    name: 'Minnesänger',
    ability:
      'Wenn ein Untergebener durch eine Hinrichtung stirbt, sind alle anderen Spieler (mit Ausnahme von Reisenden) bis Sonnenuntergang des darauffolgenden Tages betrunken.',
    reminders: ['Alle sind betrunken'],
  },
  monk: {
    name: 'Mönch',
    ability:
      'Jede Nacht*, wähle 1 Spieler (nicht dich selbst): dieser Spieler ist vor dem Dämon geschützt.',
    reminders: ['Beschützt'],
    otherNightReminder:
      'Der zuvor beschützte Spieler ist nicht mehr beschützt. Der Spieler zeigt auf einen Spieler (nicht sich selbst). Markiere diesen Spieler als "beschützt".',
  },
  fool: {
    name: 'Narr',
    ability: 'Das erste Mal, dass du sterben solltest, stirbst du nicht.',
    reminders: ['Keine Fähigkeit'],
  },
  oracle: {
    name: 'Orakel',
    ability: 'Du erfährst jede Nacht*, wie viele tote Spieler böse sind.',
    otherNightReminder:
      'Zeige mit deinen Fingern die Anzahl der bösen Spieler, die gestorben sind',
  },
  pacifist: {
    name: 'Pazifist',
    ability: 'Hingerichtete gute Spieler könnten überleben.',
  },
  philosopher: {
    name: 'Philosoph',
    ability:
      'Einmal pro Spiel, in der Nacht, wähle 1 guten Charakter: du erhälst dessen Fähigkeit. Wählst du jedoch einen Charakter, der bereits im Spiel ist, ist dieser betrunken.',
    firstNightReminder:
      'Der Philosoph schüttelt den Kopf (Nein) oder zeigt auf einen guten CHarakter am Charakterbogen. Wenn er einen Charakter gewählt hat: Tausche den Charaktertoken des Philosophs mit dem neuen Charaktertoken aus. Sollte sich der Charakter bereits im Spiel befunden wird der originale Spieler betrunken.',
    otherNightReminder:
      'Wenn der Philosoph seine Fähigkeit noch nicht eingesetzt hat: Der Philosoph schüttelt den Kopf (Nein) oder zeigt auf einen guten CHarakter am Charakterbogen. Wenn er einen Charakter gewählt hat: Tausche den Charaktertoken des Philosophs mit dem neuen Charaktertoken aus. Sollte sich der Charakter bereits im Spiel befunden wird der originale Spieler betrunken.',
  },
  professor: {
    name: 'Professor',
    ability:
      'Einmal pro Spiel, in der Nacht*, wähle 1 toten Spieler: ist der Spieler ein Dorfbewohner, wird er wiederbelebt.',
    reminders: ['Am Leben', 'Keine Fähigkeit'],
    otherNightReminder:
      'Wenn der Professor seine Fähigkeit noch nicht eingestzt hat: Der Professor zeigt Nein durch Kopfschütteln oder zeigt auf einen toten Spieler: Ist der Spieler ein Dorfbewohnerm wird er wiederbelebt.',
  },
  ravenkeeper: {
    name: 'Rabenwärter',
    ability:
      'Wenn du in der Nacht stirbst, wirst du geweckt, um einen Spieler auszusuchen: du erfährst den Charakter dieses Spielers.',
    otherNightReminder:
      'Wenn der Rabenwärter heute starb: Der Rabenwärter zeigt auf einen Spieler. Zeige dem Rabenwärter den Charaktertoken des Spielers.',
  },
  snakecharmer: {
    name: 'Schlangenbeschwörer',
    ability:
      'Jede Nacht, wähle 1 lebenden Spieler: wählst du den Dämonen, so tauschst du Charakter und Gesinnung (gut oder böse) mit ihm und er wird vergiftet.',
    reminders: ['Vergiftet'],
    firstNightReminder:
      'Der Schlangenbeschwörer zeigt auf einen Spieler. Wenn dieser Spieler der Dämon ist: Tausche die Charaktere und die Gesinnung von Schlangenbeschwörer und Dämon. Wecke beide Spieler und informiere sie über die neue Rolle und die neue Gesinnung. Der neue Schlangenbeschwörer ist vergiftet.',
    otherNightReminder:
      'Der Schlangenbeschwörer zeigt auf einen Spieler. Wenn dieser Spieler der Dämon ist: Tausche die Charaktere und die Gesinnung von Schlangenbeschwörer und Dämon. Wecke beide Spieler und informiere sie über die neue Rolle und die neue Gesinnung. Der neue Schlangenbeschwörer ist vergiftet.',
  },
  courtier: {
    name: 'Schmeichler',
    ability:
      'Einmal pro Spiel, in der Nacht, wähle 1 Charakter: falls im Spiel, ist dieser für 3 Nächte und 3 Tage betrunken.',
    reminders: ['Betrunken 1', 'Betrunken 2', 'Betrunken 3', 'keine Fähigkeit'],
    firstNightReminder:
      'Der Schmeichler schüttelt entweder den Kopf (Nein) oder zeigt auf einen Charakter am Charakterbogen. Wenn der Schmeichler seine Fähigkeit nutzt: Der ausgewählte Charakter ist für drei Tage und Nächte betrunken, wenn er sich im Spiel befindet.',
    otherNightReminder:
      'Reduziere die Anzahl der Tage, die der ausgewählte Spieler betrunken ist. Falls der Schmeichler seine Fähigkeit noch nicht benutzt hat: Der Schmeichler schüttelt entweder den Kopf (Nein) oder zeigt auf einen Charakter am Charakterbogen. Wenn der Schmeichler seine Fähigkeit nutzt: Der ausgewählte Charakter ist für drei Tage und Nächte betrunken, wenn er sich im Spiel befindet.',
  },
  seamstress: {
    name: 'Schneiderin',
    ability:
      'Einmal pro Spiel, in der Nacht, wähle 2 Spieler (nicht dich selbst): du erfährst, ob sie die selbe Gesinnung besitzen.',
    reminders: ['Keine Fähigkeit'],
    firstNightReminder:
      'Die Schneiderin schüttelt entweder den Kopf (Nein) oder zeigt auf zwei Spieler. Sollte die Schneider Spieler auswählen, nicke (Ja) oder schüttle den Kopf (Nein) wenn die bbeiden Spieler die gleiche Gesinnung haben.',
    otherNightReminder:
      'Wenn die Schneider ihre Fähigkeit noch nicht einsetzt hat: Die Schneiderin schüttelt entweder den Kopf (Nein) oder zeigt auf zwei Spieler. Sollte die Schneider Spieler auswählen, nicke (Ja) oder schüttle den Kopf (Nein) wenn die bbeiden Spieler die gleiche Gesinnung haben.',
  },
  slayer: {
    name: 'Schütze',
    ability:
      'Einmal pro Spiel, am Tag, wähle öffentlich einen Spieler: wenn dieser Spieler der Dämon ist, stirbt er.',
    reminders: ['Keine Fähigkeit'],
  },
  gossip: {
    name: 'Schwätzer',
    ability:
      'Du darfst jeden Tag eine öffentliche Aussage treffen. Die darauffolgende Nacht, wenn die Aussage zutraf, stirbt ein Spieler.',
    reminders: ['Tot'],
    otherNightReminder:
      'Wenn das öffentliche Statement des Schwätzers zutrifft: Wähle einen Spieler, der nicht vor dem Tod beschützt ist. Dieser Spieler stirbt',
  },
  sailor: {
    name: 'Seemann',
    ability:
      'Jede Nacht, wähle 1 lebenden Spieler: entweder du oder er ist bis Sonnenuntergang betrunken. Du kannst nicht sterben.',
    reminders: ['Betrunken'],
    firstNightReminder:
      'Der Seemann zeigt auf einen lebenden Spieler. Entweder der Seemann oder der gewählte Spieler ist betrunken.',
    otherNightReminder:
      'Der Spieler der zuvor betrunken wurde ist wieder nüchtern. Der Seemann zeigt auf einen lebenden Spieler. Entweder der Seemann oder der gewählte Spieler ist betrunken.',
  },
  soldier: {
    name: 'Soldat',
    ability: 'Du bist vor dem Dämon geschützt.',
  },
  towncrier: {
    name: 'Stadtschreier',
    ability:
      'Du erfährst jede Nacht*, ob ein Untergebener am Tag jemanden nominiert hat.',
    reminders: ['Untergebener nicht nominiert', 'Untergebener nominiert'],
    otherNightReminder:
      "Nicke (Ja) oder schüttle den Kopf (Nein) um zu zeigen, ob ein Untergebener heute nominiert hat. Platziere den 'Untergebener hat nicht nominiert' bzw. 'Untergebener hat nominiert'.",
  },
  tealady: {
    name: 'Teedame',
    ability:
      'Wenn beide deiner lebenden Nachbarn gut sind, können sie nicht sterben.',
    reminders: ['Kann nicht sterben'],
  },
  dreamer: {
    name: 'Träumer',
    ability:
      'Jede Nacht, wähle 1 Spieler (nicht dich selbst): du erfährst 1 guten und 1 bösen Charakter, wovon einer richtig ist.',
    firstNightReminder:
      'Der Träumer zeigt auf einen Spieler. Zeige 1 guten und 1 bösen Charaktertoken: einer der Tokens ist richtig.',
    otherNightReminder:
      'Der Träumer zeigt auf einen Spieler. Zeige 1 guten und 1 bösen Charaktertoken: einer der Tokens ist richtig.',
  },
  clockmaker: {
    name: 'Uhrmacher',
    ability:
      'Du beginnst das Spiel mit dem Wissen, wie viele Plätze der Dämon von seinem nähesten Untergebenen entfernt sitzt.',
    firstNightReminder:
      'Zeige mit der Hand die Zahl der Plätze zwischen Dämon und dem nächsten Minion.',
  },
  fortuneteller: {
    name: 'Wahrsagerin',
    ability:
      'Jede Nacht, wähle 2 Spieler: du erfährst, ob sich unter ihnen ein Dämon befindet. Es gibt jedoch einen guten Spieler, der für dich auch als Dämon registriert.',
    reminders: ['Köder'],
    firstNightReminder:
      'Die Wahrsagerin zeigt auf zwei Spieler. Ist einer dieser Spieler der Dämon nicke mit dem Kopf, andernfalls schūttle den Kopf.',
    otherNightReminder:
      'Die Wahrsagerin zeigt auf zwei Spieler. Ist einer dieser Spieler der Dämon nicke mit dem Kopf, andernfalls schūttle den Kopf.',
  },
  washerwoman: {
    name: 'Waschfrau',
    ability:
      'Du beginnst das Spiel mit dem Wissen, dass 1 von 2 Spielern ein spezifischer Dorfbewohner ist.',
    reminders: ['Dorfbewohner', 'Falsch'],
    firstNightReminder:
      'Zeige den Charaktertoken eines Dorfbewohners im Spiel. Zeige auf zwei Spieler, von denen einer diesen Charakter spielt.',
  },
  sage: {
    name: 'Weiser',
    ability:
      'Wenn der Dämon dich tötet, erfährst du, dass 1 von 2 Spielern der Dämon ist.',
    otherNightReminder:
      'Wenn der Weise vom Dämon getötet wird: Zeige auf zwei Spieler, von denen einer der Dämon ist.',
  },
  butler: {
    name: 'Butler',
    ability:
      'Jede Nacht, wähle 1 Spieler (nicht dich selbst): am folgenden Tag kannst du nur abstimmen, wenn dieser Spieler auch abstimmt.',
    reminders: ['Meister'],
    firstNightReminder:
      "Der Butler zeigt auf einen Spieler. Markiere diesen Spieler als 'Meister'.",
    otherNightReminder:
      "Der Butler zeigt auf einen Spieler. Markiere diesen Spieler als 'Meister'.",
  },
  recluse: {
    name: 'Einsiedler',
    ability:
      'Du kannst kannst als böse, bzw. als Untergebener oder Dämon registrieren, sogar wenn du tot bist.',
  },
  tinker: {
    name: 'Erfinder',
    ability: 'Du könntest zu jederzeit sterben.',
    reminders: ['Tot'],
    otherNightReminder: 'Der Erfinder könnte sterben.',
  },
  barber: {
    name: 'Friseur',
    ability:
      'Wenn du am Tag oder diese Nacht gestorben bist, kann der Dämon 2 Spieler wählen (nicht einen anderen Dämon), welche Charaktere tauschen.',
    reminders: ["Heute gibt's Haarschnitte"],
    otherNightReminder:
      'Wenn der Friseur heute gestorben ist: Wecke den Dämon. Zeige ihm die "Dieser Charakter wählte dich aus" Karte und dann die Karte des Friseurs. Der Dämon zeigt entweder ein "Nein" Signal mit dem Kopf oder zeigt auf zwei Spieler. Wenn er Spieler gewählt hat: Tausche die Charakterkarten. Wecke die Spieler. Zeige Ihnen: "Du bist\' und danach ihren neuen Charakter.',
  },
  saint: {
    name: 'Heiliger',
    ability: 'Wenn du durch eine Hinrichtung stirbst, verliert dein Team.',
  },
  sweetheart: {
    name: 'Liebling',
    ability: 'Wenn du stirbst, dann ist 1 Spieler von dem Moment an betrunken.',
    reminders: ['Betrunken'],
    otherNightReminder: 'Wähle einen Spieler, der betrunken wird.',
  },
  moonchild: {
    name: 'Mondkind',
    ability:
      'Wenn du erfährst, dass du gestorben bist, wähle öffentlich 1 lebenden Spieler. Die darauffolgende Nacht, wenn der  Spieler gut war, stirbt er.',
    reminders: ['Tot'],
    otherNightReminder:
      'Wenn das Mondkind am Tag stirbt und seine Fähigkeit einsetzt um einen Spieler auszuwählen: Ist dieser Spieler gut, stirbt er.',
  },
  mutant: {
    name: 'Mutant',
    ability:
      'Wenn du "besessen" davon bist, ein Außenseiter zu sein, könntest du hingerichtet werden',
  },
  drunk: {
    name: 'Schnapsdrossel',
    ability:
      'Du weißt nicht, dass du die Schnapsdrossel bist. Du denkst, du seist ein Dorfbewohner, aber deine Fähigkeit schlägt fehl.',
  },
  klutz: {
    name: 'Tollpatsch',
    ability:
      'Wenn du erfährst, dass du gestorben bist, wähle öffentlich 1 lebenden Spieler. Wenn der Spieler böse ist, verliert dein Team.',
  },
  goon: {
    name: 'Trottel',
    ability:
      'Jede Nacht: der erste Spieler, der dich mit seiner Fähigkeit wählt, ist betrunken bis Sonnenuntergang. Du nimmst dessen Gesinnung an (gut oder böse).',
    reminders: ['Betrunken'],
  },
  lunatic: {
    name: 'Wahnsinniger',
    ability:
      'Du weißt nicht, dass du der Wahnsinnige bist. Du denkst, du seist ein Dämon, bist du aber nicht. Der Dämon weiß, wer du bist und wen du angreifst.',
    reminders: ['Angriff 1', 'Angriff 2', 'Angriff 3'],
    firstNightReminder:
      "Bei 7 oder mehr Spielern: Zeige dem Wahnisnnigen  die Anzahl an falschen 'Untergebenen', die im Spiel sind.Wenn der Dämon, den der Wahnsinnige sieht ein Dämon ist, der in der Nacht erwacht: Erlaube dem Wahnsinnigen Dämonenaktionen durchzuführen. Platziere den 'Attacke' Marker. Wenn der Wahnsinnige einen Spieler auswählt: Wecke den Dämon. Zeige ihm den 'Attackiere' Marker, dann zeige auf jeden vom Wahnsinnigen markierten Spieler. Entferne die Attacke Marker des Wahnsinnigen.",
    otherNightReminder:
      "Erlaube dem Wahnsinnigen Dämonenaktionen durchzuführen. Platziere den 'Attacke' Marker. Wenn der Wahnsinnige einen Spieler auswählt: Wecke den Dämon. Zeige ihm den 'Attackiere' Marker, dann zeige auf jeden vom Wahnsinnigen markierten Spieler. Entferne die Attacke Marker des Wahnsinnigen.",
  },
  assassin: {
    name: 'Assassine',
    ability:
      'Einmal pro Spiel, in der Nacht*, wähle 1 Spieler: der Spieler stirbt, auch wenn er eigentlich aus irgendeinem Grund überleben sollte.',
    reminders: ['Keine Fähigkeit', 'Tot'],
    otherNightReminder:
      "Hat der Assassine seine Fähigkeit noch nicht verwendet: Der Assassnie zeigt entweder ein 'Nein' Signal mit dem Kopf oder zeigt auf einen Spieler. Dieser Spieler stirbt.",
  },
  baron: {
    name: 'Baron',
    ability: 'Es sind zusätzliche Außenseiter im Spiel. [+2 Außenseiter]',
  },
  eviltwin: {
    name: 'Böser Zwilling',
    ability:
      'Du und ein Spieler des gegnerischen Teams kennen einander. Wenn der gute Spieler hingerichtet wird, gewinnt das böse Team. Das gute Team kann nicht gewinnen, wenn ihr beide noch lebt.',
    reminders: ['Zwilling'],
    firstNightReminder:
      'Wecke den bösen Zwilling und den Zwilling. Achte darauf, dass sich beide Zwillinge gefunden haben. Zeige auf den bösen Zwilling und zeige dem anderen Zwilling die Spielkarte des bösen Zwilling. Zeige auf den anderen Zwilling und zeige seine Spielkarte dem Spieler des bösen Zwilling.',
  },
  cerenovus: {
    name: 'Cerenovus',
    ability:
      'Jede Nacht, wähle 1 Spieler und 1 guten Charakter: der Spieler ist am kommenden Tag "besessen" davon, dass er dieser Charakter ist, ansonsten könnte er hingerichtet werden.',
    reminders: ['Verrückt'],
    firstNightReminder:
      "Der Cerenovus zeigt auf einen Spieler, dann auf einen Charakter auf dem Charakterbogen. Wecke diesen Spieler. Zeige ihm die 'Dieser Charakter hat dich ausgewählt' Karte und den Token des Cerenovus. Zeige den ausgewählten Charaktertoken. Wenn der Spieler am nächten Tag nicht besessen von diesem Charakter ist, kann er exekutiert werden.",
    otherNightReminder:
      "Der Cerenovus zeigt auf einen Spieler, dann auf einen Charakter auf dem Charakterbogen. Wecke diesen Spieler. Zeige ihm die 'Dieser Charakter hat dich ausgewählt' Karte und den Token des Cerenovus. Zeige den ausgewählten Charaktertoken. Wenn der Spieler am nächten Tag nicht besessen von diesem Charakter ist, kann er exekutiert werden.",
  },
  scarletwoman: {
    name: 'Frau in Rot',
    ability:
      'Wenn 5 oder mehr Spieler noch am Leben sind und der Dämon stirbt, wirst du zum Dämon. (Reisende zählen nicht)',
    reminders: ['Dämon'],
    otherNightReminder:
      "Wenn die Frau in Rot heute der Dämon wurde: Zeige ihr die 'Du bist' Karte und dann den Dämontoken.",
  },
  mastermind: {
    name: 'Genie',
    ability:
      'Wenn der Dämon durch eine Hinrichtung stirbt (und das Spiel beenden würde), spiele für einen weiteren Tag. Wird am darauffolgenden Tag ein Spieler hingerichtet, verliert das Team mit derselben Gesinnung wie der Spieler.',
  },
  poisoner: {
    name: 'Giftmischer',
    ability:
      'Jede Nacht, wähle 1 Spieler: der Spieler ist bis Sonnenuntergang vergiftet.',
    reminders: ['Vergiftet'],
    firstNightReminder:
      'Der Giftmischer zeigt auf einen Spieler. Dieser Spieler ist vergiftet.',
    otherNightReminder:
      'Der vorherige Spieler ist nicht mehr vergiftet. Der Giftmischer zeigt auf einen Spieler. Dieser Spieler ist vergiftet.',
  },
  witch: {
    name: 'Hexe',
    ability:
      'Jede Nacht, wähle 1 Spieler: wenn dieser Spieler am kommenden Tag jemanden nominiert, stirbt er. Wenn nur noch 3 Spieler leben, verlierst du diese Fähigkeit.',
    reminders: ['Verflucht'],
    firstNightReminder:
      'Die Hexe zeigt auf einen Spieler. Wenn dieser Spieler morgen jemanden nominiert, stirbt er auf der Stelle.',
    otherNightReminder:
      'Wenn vier oder mehr Spieler am Leben sind: Die Hexe zeigt auf einen Spieler. Wenn dieser Spieler morgen jemanden nominiert, stirbt er auf der Stelle.',
  },
  godfather: {
    name: 'Pate',
    ability:
      'Du beginnst das Spiel mit dem Wissen, welche Außenseiter im Spiel sind. Wenn einer am Tag gestorben ist, wähle in der darauffolgenden Nacht 1 Spieler: er stirbt. [+1 oder -1 Außenseiter]',
    reminders: ['Starb heute', 'Tot'],
    firstNightReminder:
      'Zeige alle Außenseiter Spielsteine, die sich im Spiel befinden',
    otherNightReminder:
      'Wenn heute ein Außenseiter stirbt: Der Pate zeigt auf einen Spieler, dieser Spieler stirbt.',
  },
  spy: {
    name: 'Spion',
    ability:
      'Du darfst jede Nacht das Grimoire anschauen. Du kannst als gut, bzw. als Dorfbewohner oder Außenseiter registrieren, sogar wenn du tot bist.',
    firstNightReminder: 'Zeige dem Spion das Grimoire so lange er es braucht.',
    otherNightReminder: 'Zeige dem Spion das Grimoire so lange er es braucht.',
  },
  devilsadvocate: {
    name: 'Teufels Anwalt',
    ability:
      'Jede Nacht, wähle 1 lebenden Spieler (nicht denselben wie die Nacht zuvor): wird der Spieler morgen hingerichtet, stirbt er nicht.',
    reminders: ['Überlebt Exekution'],
    firstNightReminder:
      'Des Teufels Anwalt zeigt auf einen lebenden Spieler. Dieser Spieler übberlebt die Exekution morgen.',
    otherNightReminder:
      'Des Teufels Anwalt zeigt auf einen (anderen) lebenden Spieler. Dieser Spieler übberlebt die Exekution morgen.',
  },
  pithag: {
    name: 'Trankbrauerin',
    ability:
      'Jede Nacht*, wähle 1 Spieler und 1 Charakter zu dem er wird (falls nicht bereits im Spiel). Wenn du auf diesem Weg einen Dämon erschaffst, sind Tode diese Nacht willkürlich. Spieler ändern nur Charakter, nicht Gesinnung.',
    otherNightReminder:
      "Die Trankbrauerin zeigt auf einen Spieler und auf einen Charakter am Charakterbogen. Wenn dieser Charakter nicht im Spiel ist, wecke den Spieler und zeige ihm die 'Du bist' Karte und den Charaktertoken. Befindet sich der Charakter im Spiel, passiert nichts.",
  },
  fanggu: {
    name: 'Fang Gu',
    ability:
      'Jede Nacht*, wähle 1 Spieler: er stirbt. Der erste Außenseiter, den du so tötest, wird zum bösen Fang Gu und du stirbst an seiner Stelle. [+1 Außenseiter]',
    reminders: ['Einmalig', 'Tot'],
    otherNightReminder:
      "Der Fang Gu zeigt auf einen Spieler. Dieser Spieler stirbt. Falls dieser Spieler ein Außenseiter war nud kein anderer Fang Gu im Spiel ist: Der Fang Gu stirbt an seiner Stelle. Der ausgewählte Spieler wird der neue Fang Gu. Wecke den neuen Fang Gu. Zeige ihm die 'Du bist' Karte und den Token des Fang Gu. Danach zeige ihm die 'Du bist' Karte und ein Daumen nach unten (böse) Zeichen",
  },
  imp: {
    name: 'Imp',
    ability:
      'Jede Nacht*, wähle 1 Spieler: dieser Spieler stirbt. Wenn du dich selbst auf diesem Weg tötest, wird ein Untergebener zum Imp.',
    reminders: ['Tot'],
    otherNightReminder:
      "Der Imp zeigt auf einen Spieler. Dieser Spieler stirbt. Wenn sich der Imp selbst wählt: Ersetze den Charakter eines lebenden Untergebenen mit einem übrigen Imp Token. Zeige ihm die 'Du bist' Karte und dann den Imp Token.",
  },
  nodashii: {
    name: 'No Dashii',
    ability:
      'Jede Nacht*, wähle 1 Spieler: er stirbt. Deine beiden Dorfbewohner-Nachbarn sind vergiftet.',
    reminders: ['Tot', 'vergiftet'],
    otherNightReminder:
      'Der No Dashii zeigt auf einen Spieler. Dieser Spieler stirbt.',
  },
  po: {
    name: 'Pou',
    ability:
      'Jede Nacht* kannst du 1 Spieler wählen: er stirbt. Wenn deine letzte Wahl niemand war, wähle 3 Spieler diese Nacht.',
    reminders: ['3 Angriffe', 'Tot'],
    otherNightReminder:
      'Wenn der Pou niemanden in der letzten Nacht gewählt hat: Der Pou zeigt auf drei Spieler. Andernfalls: Der Pou zeigt entweder Nein durch Kopfschütteln oder zeigt auf einen Spieler. Ausgewählte Spieler sterben.',
  },
  pukka: {
    name: 'Pukka',
    ability:
      'Jede Nacht, wähle 1 Spieler: er ist vergiftet. Der zuvor vergiftete Spieler stirbt und wird dann gesund.',
    reminders: ['Tot', 'Vergiftet'],
    firstNightReminder:
      'Der Pukka zeigt auf einen Spieler. Dieser Spieler ist vergiftet.',
    otherNightReminder:
      'Der Pukka zeigt auf einen Spieler. Dieser Spieler ist vergiftet. Der Spieler der zuvor vergiftet wurde, stirbt.',
  },
  shabaloth: {
    name: 'Shabaloth',
    ability:
      'Jede Nacht*, wähle 2 Spieler: sie sterben. Ein toter Spieler, den du die Nacht zuvor gewählt hast, könnte wieder ausgespuckt werden.',
    reminders: ['Keine Fähigkeit', 'tot'],
    otherNightReminder:
      'Einer der Spieler, die der Shabaloth in der vorherigen Nacht gewählt, hat kann wiederauferstehen. Der Shabaloth zeigt auf zwei Spieler. Diese Spieler sterben.',
  },
  vigormortis: {
    name: 'Vigormortis',
    ability:
      'Jede Nacht*, wähle 1 Spieler: er stirbt. Untergebene, die du tötest, behalten ihre Fähigkeit und vergiften 1 ihrer Dorfbewohner-Nachbarn. [-1 Außenseiter]',
    reminders: ['Tot', 'hat Fähigkeit', 'vergiftet'],
    otherNightReminder:
      'Der Vigormortis zeigt auf einen Spieler. Dieser Spieler stirbt. Ist es ein Untergebener, behält er seine Fähigkeit und ein Dorfbewohner ist vergiftet.',
  },
  vortox: {
    name: 'Vortox',
    ability:
      'Jede Nacht*, wähle 1 Spieler: er stirbt. Dorfbewohner-Fähigkeiten erzielen ausschliesslich Falschinformationen. Jeden Tag, wenn niemand hingerichtet wird, gewinnt das böse Team.',
    reminders: ['Tot'],
    otherNightReminder:
      'Der Vortox zeigt auf einen Spieler. Dieser Spieler stirbt.',
  },
  zombuul: {
    name: 'Zombuul',
    ability:
      'Jede Nacht*, wenn am Tag niemand gestorben ist, wähle 1 Spieler: er stirbt. Das erste Mal, dass du sterben solltest, stirbst du nicht, registrierst aber dennoch als tot.',
    reminders: ['Tot', 'starb heute'],
    otherNightReminder:
      'Wenn niemand am Tag gestorben ist: Der Zombuul zeigt auf einen Spieler. Dieser Spieler stirbt.',
  },
  alchemist: {
    ability:
      'Du hast die Fähigkeit eines nicht im Spiel befindlichen Günstlings.',
    firstNightReminder:
      'Zeige dem Alchemist einen nicht im Spiel befindlichen Günstling-Marker.',
  },
  alsaahir: {
    ability:
      'Jeden Tag, wenn du öffentlich errätst, welche Spieler Günstlinge und welche Dämonen sind, gewinnt Gut.',
  },
  amnesiac: {
    ability:
      'Du weißt nicht, was deine Fähigkeit ist. Jeden Tag rate privat, was sie ist: Du erfährst, wie genau du liegst.',
    reminders: ['?'],
    firstNightReminder:
      'Entscheide die Fähigkeit des Amnesiac. Falls die Fähigkeit des Amnesiac sie heute Nacht aufweckt: Wecke den Amnesiac und führe ihre Fähigkeit aus.',
    otherNightReminder:
      'Falls die Fähigkeit des Amnesiac sie heute Nacht aufweckt: Wecke den Amnesiac und führe ihre Fähigkeit aus.',
  },
  atheist: {
    ability:
      'Der Spielleiter kann die Spielregeln brechen. Wenn du hingerichtet wirst, gewinnt Gut, selbst wenn du tot bist. [Keine bösen Charaktere]',
  },
  balloonist: {
    ability:
      'Jede Nacht erfährst du 1 Spieler jedes Charaktertyps, bis es keine weiteren Typen zu lernen gibt. [+1 Außenseiter]',
    reminders: [
      'Dorfbewohner gesehen',
      'Außenseiter gesehen',
      'Günstling gesehen',
      'Dämon gesehen',
      'Reisender gesehen',
    ],
    firstNightReminder:
      'Wähle einen Charaktertyp. Zeige auf einen Spieler, dessen Charakter von diesem Typ ist. Platziere den Balloonist-Erinnerungsmarker.',
    otherNightReminder:
      "Wähle einen Charaktertyp, der noch keinen 'Gesehen'-Marker hat. Zeige auf einen Spieler dieses Charaktertyps, falls vorhanden. Platziere den Balloonist-Erinnerungsmarker.",
  },
  bountyhunter: {
    ability:
      'Du erfährst zu Beginn 1 bösen Spieler. Wenn der Spieler, den du kennst, stirbt, erfährst du heute Nacht einen anderen bösen Spieler. [1 Dorfbewohner ist böse]',
    reminders: ['Bekannt'],
    firstNightReminder:
      "Zeige auf 1 bösen Spieler. Wecke den bösen Dorfbewohner und zeige ihm das 'Du bist'-Zeichen.",
    otherNightReminder:
      'Falls der bekannte böse Spieler gestorben ist, zeige auf einen anderen bösen Spieler.',
  },
  cannibal: {
    ability:
      'Du hast die Fähigkeit des zuletzt hingerichteten Spielers. Wenn dieser böse ist, bist du vergiftet, bis ein guter Spieler durch Hinrichtung stirbt.',
    reminders: ['Vergiftet', 'Heute gestorben'],
  },
  choirboy: {
    ability:
      'Wenn der Dämon den King tötet, erfährst du, welcher Spieler der Dämon ist. [+ den King]',
    otherNightReminder:
      'Falls der King vom Dämon getötet wurde, wecke den Choirboy und zeige auf den Dämon-Spieler.',
  },
  cultleader: {
    ability:
      'Jede Nacht nimmst du die Gesinnung eines lebenden Nachbarn an. Wenn alle guten Spieler deiner Sekte beitreten, gewinnt dein Team.',
    firstNightReminder:
      'Falls der Cult Leader die Gesinnung gewechselt hat, zeige ihm das Daumen-hoch-Signal für Gut oder das Daumen-runter-Signal für Böse.',
    otherNightReminder:
      'Falls der Cult Leader die Gesinnung gewechselt hat, zeige ihm das Daumen-hoch-Signal für Gut oder das Daumen-runter-Signal für Böse.',
  },
  engineer: {
    ability:
      'Einmal pro Spiel, nachts, wähle welche Günstlinge oder welcher Dämon im Spiel ist.',
    reminders: ['Keine Fähigkeit'],
    firstNightReminder: 'Der Engineer zeigt auf einen Charakter.',
    otherNightReminder: 'Der Engineer zeigt auf einen Charakter.',
  },
  farmer: {
    ability:
      'Wenn du nachts stirbst, wird ein lebender guter Spieler zum Farmer.',
    otherNightReminder:
      'Falls heute Nacht ein Farmer gestorben ist, wähle einen anderen guten Spieler und mache ihn zum Farmer. Wecke diesen Spieler und zeige ihm den Farmer-Marker.',
  },
  fisherman: {
    ability:
      'Einmal pro Spiel, tagsüber, besuche den Spielleiter für einen Ratschlag, der dir beim Gewinnen hilft.',
    reminders: ['Keine Fähigkeit'],
  },
  general: {
    ability:
      'Jede Nacht erfährst du, welche Gesinnung der Spielleiter für gewinnend hält: Gut, Böse oder keine.',
    firstNightReminder:
      'Zeige dem General Daumen hoch für Gut gewinnt, Daumen runter für Böse gewinnt oder Daumen zur Seite für weder noch.',
    otherNightReminder:
      'Zeige dem General Daumen hoch für Gut gewinnt, Daumen runter für Böse gewinnt oder Daumen zur Seite für weder noch.',
  },
  huntsman: {
    ability:
      'Einmal pro Spiel, nachts, wähle einen lebenden Spieler: die Damsel wird, falls gewählt, zu einem nicht im Spiel befindlichen Dorfbewohner. [+die Damsel]',
    reminders: ['Keine Fähigkeit'],
    firstNightReminder: 'Der Huntsman schüttelt den Kopf.',
    otherNightReminder: 'Der Huntsman schüttelt den Kopf.',
  },
  king: {
    ability:
      'Jede Nacht, wenn die Toten die Lebenden überzählen, erfährst du 1 lebenden Charakter. Der Dämon weiß, wer du bist.',
    firstNightReminder: 'Wecke den Dämon und zeige ihm den King-Marker.',
    otherNightReminder:
      'Falls es mehr Tote als Lebende gibt, zeige dem King einen Charakter-Marker eines lebenden Spielers.',
  },
  lycanthrope: {
    ability:
      'Jede Nacht*, wähle einen lebenden Spieler: Wenn er gut ist, stirbt er, aber er ist der einzige Spieler, der heute Nacht sterben kann.',
    reminders: ['Tot'],
    otherNightReminder:
      'Der Lycanthrope zeigt auf einen lebenden Spieler: Falls gut, stirbt er und niemand sonst kann heute Nacht sterben.',
  },
  magician: {
    ability:
      'Der Dämon hält dich für einen Günstling. Günstlinge halten dich für einen Dämon.',
  },
  nightwatchman: {
    ability:
      'Einmal pro Spiel, nachts, wähle einen Spieler: Er erfährt, wer du bist.',
    reminders: ['Keine Fähigkeit'],
    firstNightReminder:
      'Der Nightwatchman kann auf einen Spieler zeigen. Wecke diesen Spieler und zeige ihm den Nightwatchman-Marker.',
    otherNightReminder:
      'Der Nightwatchman kann auf einen Spieler zeigen. Wecke diesen Spieler und zeige ihm den Nightwatchman-Marker.',
  },
  noble: {
    ability: 'Du erfährst zu Beginn 3 Spieler, von denen 1 und nur 1 böse ist.',
    reminders: ['Gesehen'],
    firstNightReminder:
      'Zeige auf 3 Spieler, einschließlich eines bösen Spielers, in beliebiger Reihenfolge.',
  },
  pixie: {
    ability:
      'Du erfährst zu Beginn 1 im Spiel befindlichen Dorfbewohner. Wenn du verrückt warst, dass du dieser Charakter bist, erhältst du seine Fähigkeit, wenn er stirbt.',
    reminders: ['Verrückt', 'Hat Fähigkeit'],
    firstNightReminder:
      'Zeige dem Pixie 1 im Spiel befindlichen Dorfbewohner-Marker.',
  },
  poppygrower: {
    ability:
      'Günstlinge und Dämonen kennen einander nicht. Wenn du stirbst, erfahren sie in dieser Nacht, wer sie sind.',
    reminders: ['Böse erwacht'],
    firstNightReminder:
      'Informiere Dämon/Günstlinge nicht darüber, wer sie sind.',
    otherNightReminder:
      'Falls der Poppy Grower gestorben ist, zeige den Günstlingen/Dämon, wer sie sind.',
  },
  preacher: {
    ability:
      'Jede Nacht wähle einen Spieler: Ein Günstling erfährt dies, falls gewählt. Alle gewählten Günstlinge haben keine Fähigkeit.',
    reminders: ['Bei einer Predigt'],
    firstNightReminder:
      'Der Preacher wählt einen Spieler. Falls ein Günstling gewählt wurde, wecke den Günstling und zeige den Preacher-Marker.',
    otherNightReminder:
      'Der Preacher wählt einen Spieler. Falls ein Günstling gewählt wurde, wecke den Günstling und zeige den Preacher-Marker.',
  },
  princess: {
    ability:
      'An deinem 1. Tag, wenn du einen Spieler nominiert und hingerichtet hast, tötet der Dämon heute Nacht nicht.',
    reminders: ['Tötet nicht'],
    otherNightReminder:
      'Falls es der erste Tag der Princess war und sie nominiert und hingerichtet hat, tötet der Dämon nicht.',
  },
  knight: {
    ability: 'Du erfährst zu Beginn 2 Spieler, die nicht der Dämon sind.',
    reminders: ['Weiß', 'Weiß'],
    firstNightReminder: 'Zeige auf die 2 markierten Spieler.',
  },
  shugenja: {
    ability:
      'Du erfährst zu Beginn, ob dein nächster böser Spieler im Uhrzeigersinn oder gegen den Uhrzeigersinn ist. Bei gleicher Entfernung ist diese Info beliebig.',
    firstNightReminder:
      'Falls der nächste böse Spieler im Uhrzeigersinn ist, zeige horizontal in diese Richtung. Falls gegen den Uhrzeigersinn, zeige horizontal in diese Richtung. Falls gleich weit entfernt, zeige horizontal in eine beliebige Richtung.',
  },
  banshee: {
    ability:
      'Wenn der Dämon dich tötet, erfahren es alle Spieler. Von nun an kannst du zweimal pro Tag nominieren und zweimal pro Nominierung abstimmen.',
    reminders: ['Hat Fähigkeit'],
    otherNightReminder:
      'Falls die Banshee vom Dämon getötet wurde, verkünde, dass die Banshee gestorben ist.',
  },
  steward: {
    ability: 'Du erfährst zu Beginn 1 guten Spieler.',
    reminders: ['Weiß'],
    firstNightReminder: 'Zeige auf den markierten Spieler.',
  },
  highpriestess: {
    ability:
      'Jede Nacht erfährst du, mit welchem Spieler der Spielleiter denkt, dass du am meisten reden solltest.',
    firstNightReminder: 'Zeige auf einen Spieler.',
    otherNightReminder: 'Zeige auf einen Spieler.',
  },
  villageidiot: {
    ability:
      'Jede Nacht wähle einen Spieler: Du erfährst seine Gesinnung. [+0 bis +2 Village Idiots. 1 der Extras ist betrunken]',
    reminders: ['Betrunken'],
    firstNightReminder:
      'Der Village Idiot zeigt auf einen Spieler; zeige Daumen hoch, falls dieser Spieler gut ist, oder Daumen runter, falls er böse ist.',
    otherNightReminder:
      'Der Village Idiot zeigt auf einen Spieler; zeige Daumen hoch, falls dieser Spieler gut ist, oder Daumen runter, falls er böse ist.',
  },
  acrobat: {
    ability:
      'Jede Nacht*, wenn einer deiner guten lebenden Nachbarn betrunken oder vergiftet ist, stirbst du.',
    reminders: ['Tot'],
    otherNightReminder:
      'Falls ein guter lebender Nachbar betrunken oder vergiftet ist, stirbt der Acrobat.',
  },
  damsel: {
    ability:
      'Alle Günstlinge wissen, dass du im Spiel bist. Wenn ein Günstling dich öffentlich errät (einmal), verliert dein Team.',
    reminders: ['Raten verbraucht'],
    firstNightReminder:
      'Wecke alle Günstlinge und zeige ihnen den Damsel-Marker.',
    otherNightReminder:
      'Falls vom Huntsman gewählt, wecke die Damsel und zeige den neuen Charakter.',
  },
  golem: {
    ability:
      'Du darfst nur einmal pro Spiel nominieren. Wenn du es tust und der Nominierte nicht der Dämon ist, stirbt er.',
    reminders: ['Kann nicht nominieren'],
  },
  hatter: {
    ability:
      'Wenn du heute oder heute Nacht gestorben bist, können Günstling- und Dämon-Spieler neue Günstling- und Dämon-Charaktere wählen.',
    reminders: ['Tee-Party heute Nacht'],
    otherNightReminder:
      'Wecke Günstlinge und Dämon. Jeder Spieler schüttelt den Kopf oder zeigt auf einen anderen Charakter desselben Typs. Ändere jeden Spieler zum gewählten Charakter.',
  },
  heretic: {
    ability:
      'Wer gewinnt, verliert und wer verliert, gewinnt, selbst wenn du tot bist.',
  },
  plaguedoctor: {
    ability:
      'Wenn du stirbst, erhält der Spielleiter eine Günstling-Fähigkeit.',
    reminders: ['Spielleiter-Fähigkeit'],
  },
  politician: {
    ability:
      'Wenn du der Spieler warst, der am meisten dafür verantwortlich ist, dass dein Team verliert, wechselst du die Gesinnung und gewinnst, selbst wenn tot.',
  },
  hermit: {
    ability: 'Du hast alle Außenseiter-Fähigkeiten. [-0 oder -1 Außenseiter]',
    reminders: ['1', '2', '3'],
  },
  puzzlemaster: {
    ability:
      '1 Spieler ist betrunken, selbst wenn du stirbst. Wenn du (einmal) errätst, wer es ist, erfährst du den Dämon-Spieler, aber rate falsch und erhalte falsche Info.',
    reminders: ['Betrunken', 'Raten verbraucht'],
  },
  snitch: {
    ability:
      'Günstlinge erfahren zu Beginn 3 nicht im Spiel befindliche Charaktere.',
    firstNightReminder:
      'Nach Günstling-Info wecke jeden Günstling und zeige ihm drei nicht im Spiel befindliche Charakter-Marker.',
  },
  zealot: {
    ability:
      'Wenn 5 oder mehr Spieler leben, musst du für jede Nominierung stimmen.',
  },
  ogre: {
    ability:
      'In deiner 1. Nacht wähle einen Spieler (nicht dich selbst): Du nimmst seine Gesinnung an (du weißt es nicht). Wenn er gut ist, gewinnt er auch, wenn du gewinnst.',
    reminders: ['Freund'],
    firstNightReminder:
      'Der Ogre zeigt auf einen Spieler (nicht sich selbst) und nimmt dessen Gesinnung an.',
  },
  boffin: {
    ability:
      'Der Dämon (selbst wenn betrunken oder vergiftet) hat eine nicht im Spiel befindliche gute Fähigkeit.',
    firstNightReminder:
      'Wecke den Boffin und zeige den Marker der guten Fähigkeit, die der Dämon hat. Wecke den Dämon, zeige den Boffin-Marker, dann den Marker der guten Fähigkeit.',
  },
  boomdandy: {
    ability:
      'Wenn du hingerichtet wirst, sterben alle bis auf 3 Spieler. 1 Minute später stirbt der Spieler mit den meisten Fingern, die auf ihn zeigen.',
  },
  wizard: {
    ability:
      'Einmal pro Spiel wähle, einen Wunsch zu äußern. Wenn gewährt, kann er einen Preis haben und einen Hinweis auf seine Natur hinterlassen.',
    reminders: ['?', '?'],
    firstNightReminder:
      'Falls der Wizard einen Wunsch geäußert hat, verarbeite ihn.',
    otherNightReminder:
      'Falls der Wizard einen Wunsch geäußert hat, verarbeite ihn.',
  },
  organgrinder: {
    ability:
      'Alle Spieler halten ihre Augen geschlossen beim Abstimmen und das Abstimmungsergebnis ist geheim. Jede Nacht wähle, ob du bis zur Abenddämmerung betrunken bist.',
    reminders: ['Gleich sterben', 'Betrunken'],
    firstNightReminder:
      'Wecke den Organ Grinder. Falls er das Daumen-hoch-Signal gibt, ist er betrunken.',
    otherNightReminder:
      'Wecke den Organ Grinder. Falls er das Daumen-hoch-Signal gibt, ist er betrunken.',
  },
  fearmonger: {
    ability:
      'Jede Nacht wähle einen Spieler. Wenn du ihn nominierst und hinrichtest, verliert sein Team. Alle Spieler wissen, wenn du einen neuen Spieler wählst.',
    reminders: ['Angst'],
    firstNightReminder:
      'Der Fearmonger zeigt auf einen Spieler. Platziere den Angst-Marker und verkünde, dass ein neuer Spieler mit der Fearmonger-Fähigkeit gewählt wurde.',
    otherNightReminder:
      'Der Fearmonger zeigt auf einen Spieler. Falls anders als letzte Nacht, platziere den Angst-Marker und verkünde, dass ein neuer Spieler gewählt wurde.',
  },
  goblin: {
    ability:
      'Wenn du öffentlich behauptest, der Goblin zu sein, wenn du nominiert wirst, und an diesem Tag hingerichtet wirst, gewinnt dein Team.',
    reminders: ['Behauptet'],
  },
  harpy: {
    ability:
      'Jede Nacht wähle 2 Spieler: Morgen ist der 1. Spieler verrückt, dass der 2. böse ist, oder einer oder beide könnten sterben.',
    reminders: ['Verrückt', '2.'],
    firstNightReminder:
      'Die Harpy zeigt auf zwei Spieler. Wecke den 1. Spieler und zeige ihm die Harpy- und den 2. Spieler-Marker.',
    otherNightReminder:
      'Die Harpy zeigt auf zwei Spieler. Wecke den 1. Spieler und zeige ihm die Harpy- und den 2. Spieler-Marker.',
  },
  marionette: {
    ability:
      'Du denkst, du bist ein guter Charakter, bist es aber nicht. Der Dämon weiß, wer du bist. [Du bist Nachbar des Dämons]',
    firstNightReminder:
      'Wähle einen der guten Spieler neben dem Dämon und platziere den Marionette-Marker. Wecke den Dämon und zeige ihm die Marionette.',
  },
  mezepheles: {
    ability:
      'Du erfährst zu Beginn ein geheimes Wort. Der 1. gute Spieler, der dieses Wort sagt, wird in dieser Nacht böse.',
    reminders: ['Wird böse', 'Keine Fähigkeit'],
    firstNightReminder: 'Zeige dem Mezepheles sein geheimes Wort.',
    otherNightReminder:
      'Wecke den 1. guten Spieler, der das Wort des Mezepheles gesagt hat, und zeige ihm, dass er böse ist.',
  },
  wraith: {
    ability:
      'Du kannst wählen, nachts deine Augen zu öffnen. Du erwachst, wenn andere böse Spieler erwachen.',
    firstNightReminder:
      'Wecke den Wraith immer, wenn andere böse Spieler erwachen.',
    otherNightReminder:
      'Wecke den Wraith immer, wenn andere böse Spieler erwachen.',
  },
  psychopath: {
    ability:
      'Jeden Tag, vor Nominierungen, kannst du öffentlich einen Spieler wählen: Er stirbt. Wenn hingerichtet, stirbst du nur, wenn du Schere-Stein-Papier verlierst.',
  },
  summoner: {
    ability:
      'Du erhältst 3 Bluffs. In der 3. Nacht wähle einen Spieler: Er wird ein böser Dämon deiner Wahl. [Kein Dämon]',
    reminders: ['Nacht 1', 'Nacht 2', 'Nacht 3'],
    firstNightReminder:
      'Zeige dem Summoner 3 nicht im Spiel befindliche Charaktere.',
    otherNightReminder:
      'Falls es die 3. Nacht ist, wecke den Summoner. Er zeigt auf einen Spieler und einen Dämon. Dieser Spieler wird dieser Dämon.',
  },
  vizier: {
    ability:
      'Alle Spieler wissen, dass du der Vizier bist. Du kannst nicht tagsüber sterben. Wenn Gute gestimmt haben, kannst du wählen, sofort hinzurichten.',
    firstNightReminder: 'Verkünde den Vizier-Spieler.',
  },
  widow: {
    ability:
      'In deiner 1. Nacht siehst du das Grimoire und wählst einen Spieler: Er ist vergiftet. 1 guter Spieler weiß, dass eine Widow im Spiel ist.',
    reminders: ['Vergiftet'],
    firstNightReminder:
      'Zeige der Widow das Grimoire. Die Widow zeigt auf einen Spieler. Dieser Spieler ist vergiftet. Wecke einen guten Spieler und zeige den Widow-Marker.',
  },
  xaan: {
    ability:
      'In Nacht X sind alle Dorfbewohner bis zur Abenddämmerung vergiftet. [X Außenseiter]',
    reminders: ['Nacht 1', 'Nacht 2', 'Nacht 3', 'X'],
    firstNightReminder: 'Füge den Xaan-Nachtmarker hinzu.',
    otherNightReminder: 'Ändere den Xaan-Nachtmarker.',
  },
  alhadikhia: {
    ability:
      'Jede Nacht* wähle 3 Spieler (alle Spieler erfahren wer): Jeder wählt still zu leben oder zu sterben, aber wenn alle leben, sterben alle.',
    reminders: ['1', '2', '3', 'Wählte Tod', 'Wählte Leben'],
    otherNightReminder:
      'Al-Hadikhia wählt 3 Spieler. Verkünde den ersten Spieler, wecke ihn zum Nicken (leben) oder Kopfschütteln (sterben), töte oder erwecke entsprechend, dann schlafen legen und nächsten verkünden. Falls alle 3 danach leben, sterben alle 3.',
  },
  yaggababble: {
    ability:
      'Du erfährst zu Beginn eine geheime Phrase. Für jedes öffentliche Aussprechen tagsüber kann ein Spieler sterben.',
    reminders: ['Tot', 'Tot', 'Tot'],
    firstNightReminder: 'Zeige dem Yaggababble seine geheime Phrase.',
    otherNightReminder:
      'Wähle eine Anzahl von Spielern bis zur Gesamtzahl, wie oft Yaggababble heute öffentlich seine geheime Phrase gesagt hat. Diese Spieler sterben.',
  },
  kazali: {
    ability:
      'Jede Nacht* wähle einen Spieler: Er stirbt. [Du wählst, welche Spieler welche Günstlinge sind. -? bis +? Außenseiter]',
    reminders: ['Tot'],
    firstNightReminder:
      'Der Kazali zeigt auf einen Spieler und einen Günstling. Dies für so viele Günstlinge wie im Spiel sein sollten. Ändere diese Spieler zu Günstlingen.',
    otherNightReminder:
      'Der Kazali zeigt auf einen Spieler. Dieser Spieler stirbt.',
  },
  legion: {
    ability:
      'Jede Nacht* kann ein Spieler sterben. Hinrichtungen scheitern, wenn nur Böse gestimmt haben. Du zählst auch als Günstling. [Die meisten Spieler sind Legion]',
    reminders: ['Tot', 'Stirbt gleich'],
    otherNightReminder: 'Wähle einen Spieler, dieser Spieler stirbt.',
  },
  leviathan: {
    ability:
      'Wenn mehr als 1 guter Spieler hingerichtet wird, gewinnst du. Alle Spieler wissen, dass du im Spiel bist. Nach Tag 5 gewinnt Böse.',
    reminders: [
      'Tag 1',
      'Tag 2',
      'Tag 3',
      'Tag 4',
      'Tag 5',
      'Guter Spieler hingerichtet',
    ],
    firstNightReminder: 'Platziere den Leviathan-Tag-Marker.',
    otherNightReminder: 'Ändere den Leviathan-Tag-Marker für den nächsten Tag.',
  },
  lilmonsta: {
    ability:
      "Jede Nacht wählen Günstlinge, wer Lil' Monsta babysittet. Ein Spieler ist Lil' Monsta. Babysitter sterben, wenn Lil' Monsta ein Dorfbewohner ist. [+1 Günstling]",
    firstNightReminder:
      "Wecke alle Günstlinge zusammen, erlaube ihnen zu wählen, wer Lil' Monsta babysittet.",
    otherNightReminder:
      "Wecke alle Günstlinge zusammen, erlaube ihnen zu wählen, wer Lil' Monsta babysittet.",
  },
  lleech: {
    ability:
      'Jede Nacht* wähle einen Spieler: Er stirbt. Du beginnst mit der Wahl eines lebenden Spielers: Er ist vergiftet - du stirbst nur, wenn er stirbt.',
    reminders: ['Tot', 'Vergiftet'],
    firstNightReminder:
      'Der Lleech zeigt auf einen Spieler. Platziere den Vergiftet-Marker.',
    otherNightReminder:
      'Der Lleech zeigt auf einen Spieler. Dieser Spieler stirbt.',
  },
  ojo: {
    ability:
      'Jede Nacht* wähle einen Charakter: Er stirbt. Wenn er nicht im Spiel ist, wählt der Spielleiter, wer stirbt.',
    reminders: ['Tot'],
    otherNightReminder:
      'Der Ojo zeigt auf einen Charakter. Falls im Spiel, stirbt dieser Spieler. Falls nicht im Spiel, wählt der Spielleiter, wer stattdessen stirbt.',
  },
  lordoftyphon: {
    ability:
      'Jede Nacht* wähle einen Spieler: Er stirbt. [Böse Charaktere sind in einer Linie. Du bist in der Mitte. +1 Günstling. -? bis +? Außenseiter]',
    reminders: ['Tot'],
    firstNightReminder:
      "Wecke die Spieler auf beiden Seiten des Dämons. Zeige ihnen den 'Dies sind eure Günstlinge'-Marker.",
    otherNightReminder:
      'Der Lord of Typhon zeigt auf einen Spieler. Dieser Spieler stirbt.',
  },
  riot: {
    ability:
      'Nominierte sterben, können aber sofort wieder nominieren (an Tag 3 müssen sie). Nach Tag 3 gewinnt Böse. [Alle Günstlinge sind Riot]',
  },
  apprentice: {
    ability:
      'In deiner 1. Nacht erhältst du eine Dorfbewohner-Fähigkeit (falls gut) oder eine Günstling-Fähigkeit (falls böse).',
    reminders: ['Ist der Apprentice'],
    firstNightReminder:
      "Zeige dem Apprentice den 'Du hast'-Marker und einen Charakter-Marker.",
  },
  barista: {
    ability:
      'Jede Nacht, bis zur Abenddämmerung, 1) wird ein Spieler nüchtern, gesund und erhält wahre Info, oder 2) seine Fähigkeit wirkt zweimal. Er erfährt, welches.',
    reminders: ['Nüchtern & Gesund', 'Fähigkeit zweimal'],
    firstNightReminder:
      'Wähle einen Spieler, wecke ihn und sage ihm, welche Barista-Kraft ihn betrifft. Behandle ihn entsprechend.',
    otherNightReminder:
      'Wähle einen Spieler, wecke ihn und sage ihm, welche Barista-Kraft ihn betrifft. Behandle ihn entsprechend.',
  },
  beggar: {
    ability:
      'Du musst einen Abstimmungsmarker verwenden, um abzustimmen. Tote Spieler können dir ihren geben. Falls ja, erfährst du ihre Gesinnung. Du bist nüchtern und gesund.',
  },
  bishop: {
    ability:
      'Nur der Spielleiter kann nominieren. Mindestens 1 gegnerischer Spieler muss jeden Tag nominiert werden.',
    reminders: ['Nominiere Gut', 'Nominiere Böse'],
  },
  bonecollector: {
    ability:
      'Einmal pro Spiel, nachts, wähle einen toten Spieler: Er erhält seine Fähigkeit bis zur Abenddämmerung zurück.',
    reminders: ['Keine Fähigkeit', 'Hat Fähigkeit'],
    otherNightReminder:
      'Der Bone Collector schüttelt den Kopf oder zeigt auf einen toten Spieler. Falls auf einen toten Spieler gezeigt, platziere den Bone Collector-Marker.',
  },
  bureaucrat: {
    ability:
      'Jede Nacht wähle einen Spieler (nicht dich selbst): Seine Stimme zählt morgen als 3 Stimmen.',
    reminders: ['3 Stimmen'],
    firstNightReminder:
      'Der Bureaucrat zeigt auf einen Spieler. Platziere den Bureaucrat-Marker.',
    otherNightReminder:
      'Der Bureaucrat zeigt auf einen Spieler. Platziere den Bureaucrat-Marker.',
  },
  butcher: {
    ability: 'Jeden Tag, nach der 1. Hinrichtung, kannst du erneut nominieren.',
  },
  cacklejack: {
    ability:
      'Jeden Tag wähle einen Spieler: Ein anderer Spieler wechselt heute Nacht den Charakter.',
    reminders: ['Nicht ich'],
    otherNightReminder:
      'Ersetze den Charakter-Marker eines Spielers (außer dem vom Cacklejack heute gewählten) durch einen anderen. Wecke diesen Spieler und zeige den neuen Charakter.',
  },
  deviant: {
    ability: 'Wenn du heute lustig warst, kannst du nicht durch Exil sterben.',
  },
  gangster: {
    ability:
      'Einmal pro Tag kannst du wählen, einen lebenden Nachbarn zu töten, wenn dein anderer lebender Nachbar zustimmt.',
  },
  gnome: {
    ability:
      'Alle Spieler erfahren zu Beginn einen Spieler deiner Gesinnung. Du kannst wählen, jeden zu töten, der ihn nominiert.',
    reminders: ['Amigo'],
  },
  gunslinger: {
    ability:
      'Jeden Tag, nachdem die 1. Abstimmung gezählt wurde, kannst du einen Spieler wählen, der gestimmt hat: Er stirbt.',
  },
  harlot: {
    ability:
      'Jede Nacht* wähle einen lebenden Spieler: Falls er zustimmt, erfährst du seinen Charakter, aber ihr könntet beide sterben.',
    reminders: ['Tot'],
    otherNightReminder:
      'Die Harlot zeigt auf einen Spieler. Wecke den gewählten Spieler und zeige den Harlot-Marker.',
  },
  judge: {
    ability:
      'Einmal pro Spiel, wenn ein anderer Spieler nominiert hat, kannst du wählen, die aktuelle Hinrichtung durchzusetzen oder scheitern zu lassen.',
    reminders: ['Keine Fähigkeit'],
  },
  matron: {
    ability:
      'Jeden Tag kannst du bis zu 3 Sets von 2 Spielern wählen, um Plätze zu tauschen. Spieler dürfen ihre Plätze nicht verlassen, um privat zu sprechen.',
  },
  scapegoat: {
    ability:
      'Wenn ein Spieler deiner Gesinnung hingerichtet wird, könntest du stattdessen hingerichtet werden.',
  },
  thief: {
    ability:
      'Jede Nacht wähle einen Spieler (nicht dich selbst): Seine Stimme zählt morgen negativ.',
    reminders: ['Negative Stimme'],
    firstNightReminder:
      'Der Thief zeigt auf einen Spieler. Platziere den Thief-Marker.',
    otherNightReminder:
      'Der Thief zeigt auf einen Spieler. Platziere den Thief-Marker.',
  },
  voudon: {
    ability:
      'Nur du und die Toten können abstimmen. Sie wissen es nicht. Ein Toter kann nur einmal pro Nominierung abstimmen.',
  },
  tor: {
    ability:
      'Spieler erfahren nicht, wenn sie sterben. Wenn sie nachts sterben, erfährt der Tor es morgen. Tote wählen.',
    otherNightReminder:
      "Falls ein Spieler nachts stirbt, wecke ihn, zeige das 'Du bist'-Zeichen, seinen Charakter-Marker, und Daumen hoch oder runter für Gesinnung.",
  },
  bigwig: {
    ability:
      'Jeder Nominierte wählt einen Spieler: Bis zur Abstimmung darf nur dieser sprechen und er ist verrückt, dass der Nominierte gut ist, oder er könnte sterben.',
  },
  bootlegger: {
    ability: 'Dieses Skript hat Homebrew-Charaktere oder -Regeln.',
  },
  gardener: {
    ability:
      'Der Spielleiter weist 1 oder mehr Spielern Aufgaben zu. Wenn sie erfüllt werden, erhält dieser Spieler eine starke Fähigkeit.',
  },
  stormcatcher: {
    ability:
      'Nenne einen guten Charakter. Falls im Spiel, kann er nur durch Hinrichtung sterben, aber böse Spieler erfahren, welcher Spieler es ist.',
    firstNightReminder:
      "Verkünde zu Beginn der Nacht, welcher Charakter sturmgefangen ist. Falls im Spiel, markiere diesen Spieler als STURMGEFANGEN. Wecke jeden bösen Spieler und zeige den Charakter-Marker, dann den markierten Spieler. Falls nicht im Spiel, wecke jeden bösen Spieler, zeige 'Diese Charaktere sind nicht im Spiel' und den relevanten Charakter-Marker.",
  },
  zenomancer: {
    ability:
      'Ein oder mehrere Spieler haben jeweils ein Ziel. Wenn erreicht, erfährt dieser Spieler eine wahre Information.',
  },
  doomsayer: {
    ability:
      'Falls 4 oder mehr Spieler leben, kann jeder lebende Spieler öffentlich wählen (einmal pro Spiel), dass ein Spieler seiner eigenen Gesinnung stirbt.',
  },
  angel: {
    ability:
      'Demjenigen, der am meisten für den Tod eines neuen Spielers verantwortlich ist, könnte etwas Schlimmes passieren.',
    reminders: ['Schütze', 'Etwas Schlimmes'],
  },
  buddhist: {
    ability:
      'In den ersten 2 Minuten jeden Tages dürfen erfahrene Spieler nicht sprechen.',
  },
  hellslibrarian: {
    ability:
      'Demjenigen, der spricht, wenn der Spielleiter um Ruhe gebeten hat, könnte etwas Schlimmes passieren.',
    reminders: ['Etwas Schlimmes'],
  },
  revolutionary: {
    ability:
      '2 benachbarte Spieler sind bekanntermaßen von derselben Gesinnung. Einmal pro Spiel zählt einer von ihnen falsch.',
    reminders: ['Verwendet'],
  },
  fiddler: {
    ability:
      'Einmal pro Spiel wählt der Dämon heimlich einen gegnerischen Spieler: Alle Spieler wählen, welcher dieser 2 Spieler gewinnt.',
  },
  toymaker: {
    ability:
      'Der Dämon kann wählen, nicht anzugreifen und muss dies mindestens einmal pro Spiel tun. Böse Spieler erhalten normale Startinfo.',
    reminders: ['Letzte Nacht: Kein Angriff'],
    otherNightReminder:
      "Falls es eine Nacht ist, in der ein Dämon-Angriff das Spiel beenden könnte, und der Dämon mit 'Letzte Nacht: Kein Angriff' markiert ist, handelt der Dämon heute Nacht nicht.",
  },
  fibbin: {
    ability:
      'Einmal pro Spiel könnte 1 guter Spieler falsche Information erhalten.',
    reminders: ['Verwendet'],
  },
  duchess: {
    ability:
      'Jeden Tag können 3 Spieler wählen, dich zu besuchen. Nachts* erfährt jeder Besucher, wie viele Besucher böse sind, aber 1 erhält falsche Info.',
    reminders: ['Besucher', 'Falsche Info'],
    otherNightReminder:
      "Wecke jeden mit 'Besucher' oder 'Falsche Info' markierten Spieler einzeln. Zeige den Duchess-Marker, dann Finger (1, 2, 3) gleich der Anzahl böser Spieler mit 'Besucher' oder, falls 'Falsche Info', zeige eine andere Fingerzahl.",
  },
  sentinel: {
    ability: 'Es könnte 1 Außenseiter mehr oder weniger im Spiel sein.',
  },
  spiritofivory: {
    ability: 'Es kann keine zusätzlichen bösen Spieler geben.',
    reminders: ['Kein extra Böse'],
  },
  djinn: {
    ability: 'Verwende die Djinn-Fähigkeit.',
  },
  deusexfiasco: {
    ability:
      'Mindestens einmal pro Spiel wird der Spielleiter einen Fehler machen, ihn korrigieren und öffentlich zugeben.',
  },
  ferryman: {
    ability:
      'Am letzten Tag erhalten alle toten Spieler ihren Abstimmungsmarker zurück.',
  },
  hindu: {
    name: 'Hindu',
    ability:
      'Die ersten 4 Spieler, die sterben, werden sofort als Reisende derselben Gesinnung reinkarniert.',
  },
  pope: {
    name: 'Papst',
    ability:
      'Es gibt doppelte gute Charaktere im Spiel. Sie könnten auch Bluffs sein.',
  },
}
