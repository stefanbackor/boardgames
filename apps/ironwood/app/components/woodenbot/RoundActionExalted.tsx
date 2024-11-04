import { Flex, Strong } from '@radix-ui/themes'

import { Expend } from './Expend'
import { Keyword } from './keywords/KeywordButton'

export const RoundActionExalted = () => {
  return (
    <ol>
      <Flex direction="column" gap="2">
        <li>
          If <Keyword.Totem /> is with <Keyword.WoodwalkerWarband />,{' '}
          <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="5" /> to{' '}
          <Keyword.Secure count="5" /> and end bot&apos;s turn.
        </li>
        <li>
          <Strong>Otherwise</Strong> follow the actions from <Keyword.Expend />{' '}
          card bellow:
          <Expend />
        </li>
      </Flex>
    </ol>
  )
}
