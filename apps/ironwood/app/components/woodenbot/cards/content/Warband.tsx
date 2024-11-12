import { Box } from '@radix-ui/themes'

import { WBStance } from '~/constants/woodenbot'
import { useLocationState } from '~/utils/state/useLocationState'

import { Keyword } from '../../keywords/KeywordButton'

export const Warband = () => {
  const [stance] = useLocationState('woodenbot_action_stance')

  return (
    <>
      {stance === WBStance.DISRUPTIVE && (
        <>
          <Box>
            <Keyword.Woodenbot /> <Keyword.Recruits count="1" />{' '}
            <Keyword.WoodwalkerWarrior count="1" />
          </Box>
        </>
      )}

      {stance === WBStance.EXALTED && (
        <>
          <Box>
            If <Keyword.Totem /> is with <Keyword.WoodwalkerWarband />:{' '}
            <Keyword.Woodenbot /> <Keyword.Recruits count="1" />{' '}
            <Keyword.WoodwalkerWarrior count="1" /> to that{' '}
            <Keyword.WoodwalkerWarband />
          </Box>
          <Box>
            <Keyword.Woodenbot /> <Keyword.Recruits count="1" />{' '}
            <Keyword.WoodwalkerWarrior count="1" />
          </Box>
        </>
      )}
    </>
  )
}
