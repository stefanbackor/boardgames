import {
  Button,
  Flex,
  Heading,
  RadioCards,
  Section,
  Text,
} from '@radix-ui/themes'
import type { MetaFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { useCallback, useState } from 'react'

import { Bot } from '~/utils/state/types'

export const meta: MetaFunction = () => {
  return [
    { title: 'Ironwood: Pick a bot' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const [selectedBot, setSelectedBot] = useState<Bot>(Bot.WOODENBOT)
  const navigate = useNavigate()

  const onConfirm = useCallback(
    () => navigate(`/game/${selectedBot}/setup`),
    [navigate, selectedBot],
  )

  return (
    <>
      <Section style={{ textAlign: 'center' }}>
        <Flex direction="column" align="center">
          <Heading size={{ initial: '8', xs: '9' }}>IRONWOOD</Heading>
          <Text>
            Ironwood is a highly asymmetric, card-driven tactical game for 1-2
            players. This is a solo mode assistant. Pick a bot you want to play
            against!
          </Text>
        </Flex>
      </Section>
      <Section size="1">
        <Flex direction="column" gap="3">
          <RadioCards.Root
            defaultValue={selectedBot}
            columns={{ initial: '1', xs: '2' }}
            onValueChange={(value: Bot) => setSelectedBot(value)}
          >
            <RadioCards.Item
              value={Bot.WOODENBOT}
              style={{ cursor: 'var(--cursor-link)' }}
            >
              <Flex direction="column" width="100%">
                <Heading as="h2" weight="bold">
                  Woodenbot
                </Heading>
                <Text color="gray">
                  Play as an <Text weight="bold">Ironclad</Text> against
                  tree-hugging Woodenbot.
                </Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item
              disabled
              value={Bot.IRONBOT}
              style={{ cursor: 'var(--cursor-link)' }}
            >
              <Flex direction="column" width="100%">
                <Heading as="h2" weight="bold">
                  Ironbot
                </Heading>
                <Text color="gray">
                  Play as a Woodwalker against ruthless Ironbot. Soon.
                </Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>

          <Button size="3" onClick={onConfirm}>
            Let&apos;s go
          </Button>
        </Flex>
      </Section>
    </>
  )
}
