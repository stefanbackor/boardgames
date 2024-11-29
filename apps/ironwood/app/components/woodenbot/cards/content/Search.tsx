import { Box, Flex, RadioGroup, Strong } from '@radix-ui/themes'
import { useCallback, useState } from 'react'

import { ExecuteButton } from '~/components/ExecuteButton'
import { Keyword } from '~/components/KeywordButton'
import { VisionCardBadge } from '~/components/woodenbot/VisionCardBadge'
import { WBStance, WBVisionPile, WWCard } from '~/constants/woodenbot'
import { useVisionDeck } from '~/hooks/woodenbot/useVisionDeck'
import { useVisionDeckDiscovery } from '~/hooks/woodenbot/useVisionDeckDiscovery'
import { useLocationState } from '~/utils/state/useLocationState'

type Props = {
  card: WWCard
  red?: boolean
}

export const Search = ({ card, red }: Props) => {
  const [stance] = useLocationState('woodenbot_action_stance')
  const { deck } = useVisionDeck()
  const { discoveryDone, discoveryCard, discoveryMarked, discoverVisionCard } =
    useVisionDeckDiscovery({
      key: `${card[0]}/search/${red}`,
    })

  const [discoverCardName, setDiscoverCardName] = useState('')
  const onDiscover = useCallback(() => {
    discoverVisionCard(discoverCardName)
  }, [discoverVisionCard, discoverCardName])

  return (
    <>
      {!stance && <Box>Unknown stance</Box>}

      {stance === WBStance.DISRUPTIVE && (
        <>
          <Box>
            If <Keyword.WoodwalkerWarband /> on inner <Keyword.Forest /> is
            adjacent to possible & uncontrolled <Keyword.Mountain />:
            <Keyword.Woodenbot /> <Keyword.Discovers /> there.
            <Flex direction="column" align="start" gap="3">
              {!discoveryDone && (
                <RadioGroup.Root onValueChange={setDiscoverCardName}>
                  {deck.get(WBVisionPile.DRAW).map((card) => (
                    <RadioGroup.Item key={card[0]} value={card[0]}>
                      <VisionCardBadge card={card} />
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )}
              {discoveryDone && (
                <>
                  <ul>
                    <li>
                      Place a <Keyword.Totem /> on a inner forest adjacent to{' '}
                      <VisionCardBadge card={discoveryCard} /> with, or closest
                      to the largest Woodwalker Warband. Use{' '}
                      <Keyword.MagicDie /> if tied.
                    </li>
                    <li>
                      Remove marker from
                      <VisionCardBadge card={discoveryCard} />
                    </li>
                    <li>
                      Add marker to
                      {discoveryMarked?.map((card) => (
                        <VisionCardBadge key={card[0]} card={card} />
                      ))}
                    </li>
                    <li>
                      <Strong>End bot&apos;s turn</Strong>
                    </li>
                  </ul>
                </>
              )}
              <ExecuteButton done={discoveryDone} onClick={onDiscover} />
            </Flex>
          </Box>
          <Box>
            Otherwise: <Keyword.Woodenbot /> moves{' '}
            <Keyword.WoodwalkerWarrior count="3" /> to{' '}
            <Keyword.Secure count="3" />.
          </Box>
        </>
      )}

      {stance === WBStance.EXALTED && (
        <>
          <Box>
            <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="3" />{' '}
            without <Keyword.Totem /> to <Keyword.Secure count="3" /> and moves{' '}
            <Keyword.WoodwalkerWarrior count="1" /> to{' '}
            <Keyword.Secure count="1" />.
          </Box>
        </>
      )}
    </>
  )
}
