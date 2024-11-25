import { Box, Flex, Heading, Separator } from '@radix-ui/themes'
import { useState } from 'react'

import { WagerAttackCardButton } from '~/components/ironbot/WagerAttackCardButton'
import { Keyword } from '~/components/KeywordButton'
import { WagerCardPurpose } from '~/hooks/ironbot/useWagerCard'

import { FullInstructionsButton } from './common/FullInstructionsButton'

type Props = {
  purpose: WagerCardPurpose
}

export const Attack = ({ purpose }: Props) => {
  const [full, setFull] = useState(false)

  return (
    <Flex direction="column" gap="3">
      <Heading>Warband in focus</Heading>

      <ul>
        <li>adjacent to Ironclad Warband</li>
        <li>with totem fading (unless last turn)</li>
        <li>with totem closer to outer forest</li>
        <li>with totem</li>
        <li>largest warband closest to totem</li>
        <li>smallest warband</li>

        <li>
          if tied:
          <ul>
            <li>differential {'>'}</li>
            <li>
              <Keyword.MagicDie size="2" />
            </li>
          </ul>
        </li>
      </ul>

      <ul>
        <li>attacks with largest adjacent Ironclad Warband</li>
        <li>differential {'>'} 0!</li>
      </ul>

      <Heading>Combat Procedure</Heading>

      <ol>
        <li>you wager card first (or skip)</li>
        <li>
          bot reveals wagered card
          <Box>
            <WagerAttackCardButton purpose={purpose} />
          </Box>
        </li>
        <li>calculate damage and the victory</li>
      </ol>

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Separator size="4" />
          <Box>
            Select the <Keyword.WarbandInFocus />, ignoring any Woodwalker
            Warband that has absolutely no Ironclad Warbands adjacent to them.
            The bot attacks the Warband in focus with the largest adjacent
            Ironclad Warband. To resolve, use the Combat Procedure (see below).
            If the Ironbot initiates combat, but does not have cards left in its
            hand to wager, then it skips the attack and draws a special card
            instead.
          </Box>
          <Heading>Combat Procedure versus the Ironbot</Heading>
          <ol>
            <li>
              You play (or skip playing) a wagered card first, regardless who
              the attacker is.
            </li>
            <li>
              Then, draw and reveal the top card of the bot’s hand as the bot’s
              wagered card. If the bot’s hand is empty, it does not wager a
              card.
              <Box my="2">
                <WagerAttackCardButton purpose={purpose} />
              </Box>
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
              If the bot wins and forces you to retreat, it forces you to move
              away from the mountain that was involved in the combat (so your
              retreating Warband is no longer adjacent). It moves you to or
              towards a forest with a smaller (or no) Woodwalker Warband, but it
              never moves you towards a forest with a Totem. Use the Magic die
              if multiple forests are tied.
            </li>
            <li>
              If there is no combat unit on Ferrum after a battle, the bot
              recruits 1 Ironclad Fighter to Ferrum after the battle is resolved
              (without spending any crystals).
            </li>
          </ol>
        </>
      )}
    </Flex>
  )
}
