import { Box, Flex, Heading, Separator, Strong } from '@radix-ui/themes'
import { useState } from 'react'

import { FullInstructionsButton } from '~/components/ironbot/keywords/content/common/FullInstructionsButton'
import { Keyword } from '~/components/KeywordButton'
import { CrystalsButton } from '~/components/woodenbot/CrystalsButton'
import { WagerAttackCardButton } from '~/components/woodenbot/WagerAttackCardButton'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'

type Props = {
  purpose: WagerCardPurpose
}

export const Attack = ({ purpose }: Props) => {
  const [full, setFull] = useState(false)

  return (
    <Flex direction="column" gap="3">
      <Heading>Warband in focus</Heading>

      <ul>
        <li>differential {'>'} 0! (Golem +1, Forge +1)</li>
        <li>skip Drill if empty</li>
        <li>
          <Keyword.MagicDie /> in case of a tie
        </li>
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
        <li>remove Golems first</li>
        <li>
          update crystals if Drill or Ferrum is destroyed{' '}
          <Box>
            <CrystalsButton size="1" />
          </Box>
        </li>
      </ol>

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Separator size="4" />
          <Box>
            The Woodenbot will{' '}
            <Strong>
              only attack an Ironclad Warband if it is at least equal in size
            </Strong>{' '}
            (remember, a Warband with a Golem or a Warband with a Forge is
            larger than a Warband of just Fighters if their numbers are equal),
            otherwise the effect cannot be resolved.
          </Box>
          <Box>
            If there are multiple targets the Woodenbot could attack, it will
            attack the one where the <Strong>difference</Strong> is the largest
            - i.e., where the Woodwalker Warband is bigger than the target
            Ironclad Warband by the most number of Fighters. In case of multiple
            tied options to target or to attack from, use the{' '}
            <Keyword.MagicDie />.
          </Box>
          <Box>
            If the Woodenbot initiates combat, but does not have cards left in
            its hand to wager, then it skips the attack and draws a special card
            instead.
          </Box>
          <Box>
            If the Drill is destroyed while carrying crystals, the Woodenbot
            gains 1 crystal, and the Drill is reset to Ferrum as described in
            the core rules. If it attacks the Drill while there are no Ironclad
            combat units present, the attack is automatically successful. The
            Woodenbot will not try to target and/or attack the Drill if there
            are 0 crystals in the Cargo Area.
          </Box>
          <Box>
            If any attack against Ferrum is successful, the Woodenbot steals
            half of your crystals (round up).{' '}
          </Box>
          <Box>
            <Heading>Combat Procedure versus the Woodenbot </Heading>
            <ol>
              <li>
                You play (or skip playing) a wagered card first, regardless of
                who the attacker is.
              </li>

              <li>
                Then, draw and reveal the top card of the bot’s hand as the
                bot’s wagered card. If the bot’s hand is empty, it does not
                wager a card.{' '}
              </li>
              <li>
                Calculate damage and the victory as described in the core rules,
                however include the Spirits of the Forest bonus: if there is at
                least one marker next to the Spirits of the Forest, it has
                combat bonuses depending on which side of the closed Bot Control
                Aid is face up (either +1 Defense or +1 Damage, in addition to 1
                Dominance).{' '}
              </li>
              <li>
                If the Woodenbot deals more than 1 damage and you have at least
                1 Golem, it prioritizes removing Golems first. It never deals
                only 1 damage to a Golem; instead the bot deals that 1 damage to
                remove an Ironclad Fighter.{' '}
              </li>
              <li>
                If there is at least one marker next to the Spirits of the
                Forest, remove one.{' '}
              </li>
              <li>
                If the bot wins, and forces you to retreat, it forces you to
                move to an adjacent mountain with the fewest (including zero)
                Ironclad combat units, preferring a mountain without a marker
                (i.e., not a possible mountain). In case of a tie, use the{' '}
                <Keyword.MagicDie />.
              </li>
            </ol>
          </Box>
        </>
      )}
    </Flex>
  )
}
