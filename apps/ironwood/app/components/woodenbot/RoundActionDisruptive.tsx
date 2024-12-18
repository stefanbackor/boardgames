import { Box, Flex, Strong } from '@radix-ui/themes'

import { useLocate } from '~/hooks/woodenbot/useLocate'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'

import { Expend } from '../Expend'
import { Keyword } from '../KeywordButton'
import { WagerAttackCardButton } from './WagerAttackCardButton'

export const RoundActionDisruptive = () => {
  const { shouldDisplayDiscovery, render: renderLocateAction } = useLocate({
    key: 'disruptive',
  })

  return (
    <ol>
      <Flex direction="column" gap="2">
        <li>
          <Keyword.Locate /> a <Keyword.Totem />.{renderLocateAction()}
        </li>

        {!shouldDisplayDiscovery ? (
          <>
            <li>
              If you have{' '}
              <Strong>
                5 or more <Keyword.Crystal />
              </Strong>
              , <Keyword.Woodenbot /> moves{' '}
              <Keyword.WoodwalkerWarrior count="5" /> to{' '}
              <Keyword.Plunder count="5" />. Then it{' '}
              <Keyword.WoodenbotAttacks
                purpose={WagerCardPurpose.ATTACK_DISRUPTIVE}
              />{' '}
              <Keyword.Ferrum /> (if applicable) or a controlled{' '}
              <Keyword.Foundation /> (if applicable).{' '}
              <Strong>End bot&apos;s turn.</Strong>
              <Box mt="2">
                <WagerAttackCardButton
                  purpose={WagerCardPurpose.ATTACK_DISRUPTIVE}
                />
              </Box>
            </li>
            <li>
              Otherwise follow the actions from expended card bellow:
              <Expend />
            </li>
          </>
        ) : null}
      </Flex>
    </ol>
  )
}
