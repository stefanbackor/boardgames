import { Flex, Strong } from '@radix-ui/themes'

import { Expend } from '../Expend'
import { Keyword } from '../KeywordButton'

export const RoundActionExalted = () => {
  return (
    <ol>
      <Flex direction="column" gap="2">
        <li>
          If <Keyword.Totem /> is with <Keyword.WoodwalkerWarband />,{' '}
          <Keyword.Woodenbot /> moves <Keyword.WoodwalkerWarrior count="5" />
          to <Keyword.Secure count="5" />. <Strong>End bot&apos;s turn.</Strong>
        </li>
        <li>
          <Strong>Otherwise</Strong> follow the actions from expended card
          bellow:
          <Expend />
        </li>
      </Flex>
    </ol>
  )
}
