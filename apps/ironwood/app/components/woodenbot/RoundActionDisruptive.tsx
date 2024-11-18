import { Box, Flex, Strong } from '@radix-ui/themes'

import { WBVisionLocatePurpose } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'

import { Keyword } from '../KeywordButton'
import { Expend } from './Expend'
import { useLocate } from './useLocate'
import { WagerAttackCardButton } from './WagerAttackCardButton'

export const RoundActionDisruptive = () => {
  const { shouldDisplayDiscovery, render: renderLocateAction } = useLocate({
    purpose: WBVisionLocatePurpose.MAIN,
  })

  return (
    <ol>
      <Flex direction="column" gap="2">
        <li>
          <Keyword.Locate /> a <Keyword.Totem /> (if a <Keyword.Totem /> is
          discovered, expend a card and end bot&apos;s turn)
          {renderLocateAction()}
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
              <Keyword.WoodenbotAttacks /> <Keyword.Ferrum /> (if applicable) or
              a controlled <Keyword.Foundation /> (if applicable). End
              bot&apos;s turn.
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
