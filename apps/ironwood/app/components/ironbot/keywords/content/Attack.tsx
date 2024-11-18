import { Box, Flex, Heading } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const Attack = () => {
  return (
    <Flex direction="column" gap="5">
      <Heading>Warband in focus</Heading>
      <Box>
        When the bot plans to attack you, it focuses on one of your Woodwalker
        Warbands following this priority list:
      </Box>
      <ul>
        <li>
          Select a Woodwalker Warband with a Totem (unless the Totem is fading
          and it is the last turn of the round).
        </li>
        <li>
          If multiple Woodwalker Warbands have a Totem, break ties in the
          following priority order:
          <ul>
            <li>
              Select one with a fading Totem (unless it is the last turn of the
              round).
            </li>
            <li>Select one closer to an outer forest.</li>
            <li>
              Use the <Keyword.MagicDie />.
            </li>
          </ul>
        </li>
        <li>
          If no Woodwalker Warband has a Totem, select the largest Woodwalker
          Warband closest to a Totem.
        </li>
        <li>
          If no Totem is on the main board, select the smallest Woodwalker
          Warband available to select.
        </li>
      </ul>
      <Box>
        If it’s tied for multiple options, select the one where the differential
        in combat units is more favorable to the bot. If still tied, use the
        Magic die to select one (based on their forest’s numbers). The
        differential of combat units must be at least 0 or higher, otherwise the
        Ironbot will not attack.
      </Box>
      <Box>The selected Woodwalker Warband will be the Warband in focus.</Box>
      <Box>
        Select the Warband in focus, ignoring any Woodwalker Warband that has
        absolutely no Ironclad Warbands adjacent to them. The bot attacks the
        Warband in focus with the largest adjacent Ironclad Warband. To resolve,
        use the Combat Procedure (see below). If the Ironbot initiates combat,
        but does not have cards left in its hand to wager, then it skips the
        attack and draws a special card instead.
      </Box>
      <Heading>Combat Procedure versus the Ironbot</Heading>
      <ol>
        <li>
          You play (or skip playing) a wagered card first, regardless who the
          attacker is.
        </li>
        <li>
          Then, draw and reveal the top card of the bot’s hand as the bot’s
          wagered card. If the bot’s hand is empty, it does not wager a card.
        </li>
        <li>
          Calculate damage as in the core rules, making sure to include the
          bot’s stance bonus listed below. Determine the victor.
          <ol>
            <li>In Expansive stance, it has +1 Damage.</li>
            <li>In Aggressive stance, it has +1 Dominance.</li>
            <li>In Defensive stance, it has +1 Defense.</li>
          </ol>
        </li>
        <li>
          If the bot wins and forces you to retreat, it forces you to move away
          from the mountain that was involved in the combat (so your retreating
          Warband is no longer adjacent). It moves you to or towards a forest
          with a smaller (or no) Woodwalker Warband, but it never moves you
          towards a forest with a Totem. Use the Magic die if multiple forests
          are tied.
        </li>
        <li>
          If there is no combat unit on Ferrum after a battle, the bot recruits
          1 Ironclad Fighter to Ferrum after the battle is resolved (without
          spending any crystals).
        </li>
      </ol>
    </Flex>
  )
}
