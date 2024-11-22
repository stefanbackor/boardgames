import { Box, DataList, Flex, Heading, Strong } from '@radix-ui/themes'
import { useState } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { CrystalsButton } from '~/components/woodenbot/CrystalsButton'
import { useDeck } from '~/hooks/useDeck'

import { FullInstructionsButton } from './common/FullInstructionsButton'

export const MovingDrill = () => {
  const [full, setFull] = useState(false)
  const { drawCard } = useDeck()

  return (
    <Flex direction="column" gap="3">
      <Heading>Target mountain:</Heading>
      <ul>
        <Flex direction="column" gap="3">
          <li>
            3+ crystals in cargo = unload <CrystalsButton size="1" />
            <ol>
              <li>closest Forge with the largest Ironclad Warband</li>
              <li>
                closest Forge with the smallest Woodwalker Warband adjacent
              </li>
              <li>mountain with largest Ironclad Warband</li>
              <li>mountain with the smallest Woodwalker Warband</li>
              <li>mountain adjacent to the largest Ironclad Warband</li>
              <li>
                use <Keyword.MagicDie /> if tied
              </li>
            </ol>
          </li>
          <li>
            0-2 crystals in cargo = continue collecting if possible
            <ol>
              <li>mountain with the largest Ironclad Warband</li>
              <li>mountain with the smallest Woodwalker Warband</li>
              <li>mountain adjacent to the largest Ironclad Warband</li>
              <li>mountain with Forge</li>
              <li>
                use <Keyword.MagicDie /> if tied
              </li>
            </ol>
          </li>
          <Strong>Rewards:</Strong>
          <DataList.Root mt="2" style={{ gap: 'var(--space-2)' }}>
            <DataList.Item>
              <DataList.Label minWidth="88px">Crystals</DataList.Label>
              <DataList.Value>
                {/* <CrystalsButton size="1" /> */}
                Add crystals to Drill cargo
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Warrior</DataList.Label>
              <DataList.Value>
                Recruit a warrior to the mountain.
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Vision Card</DataList.Label>
              <DataList.Value>Shuffle random one back if 1+</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Card</DataList.Label>
              <DataList.Value>
                <ExecuteButton label="Draw" onClick={() => drawCard()} />
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </ul>

      <FullInstructionsButton full={full} onClick={() => setFull(!full)} />

      {full && (
        <>
          <Box>
            If there are at least 3 crystals in the Drill’s cargo area , it
            moves towards the closest Forge; otherwise it moves to a mountain
            without a Forge (if possible). If there are multiple eligible
            mountains, it moves to the one with a larger Ironclad Warband and/or
            with the smaller Woodwalker Warband adjacent. If there is no
            adjacent mountain with an Ironclad Warband on it, the Drill moves to
            a mountain that is adjacent to a larger Ironclad Warband. In case of
            a tie, use the <Keyword.MagicDie />.
          </Box>
          <Box>
            When moving to a mountain without a Forge, advance on the Drill
            track with the bot gaining the indicated benefit.
          </Box>
          <Box>
            When the bot resolves this reward, it does not survey your vision
            deck. Instead,{' '}
            <Strong>if you have more than one vision card in your hand</Strong>,
            you must select one of them randomly and shuffle it back into the
            vision deck. If you have one or no vision cards in your hand,
            nothing happens.
          </Box>
          <Box>
            When moving to a mountain with a Forge: reset its tracker to the
            starting position, and the bot gains all crystals accumulated by the
            Drill.
          </Box>
        </>
      )}
    </Flex>
  )
}
