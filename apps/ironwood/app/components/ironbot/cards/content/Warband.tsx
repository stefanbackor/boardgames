import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const Warband = () => {
  return (
    <Box>
      If <Keyword.Ferrum /> has 5+ combat units: <Keyword.Ironbot /> moves to{' '}
      <Keyword.Expand />. Otherwise: <Keyword.Ironbot />{' '}
      <Keyword.IronbotRecruits count="1" />{' '}
      <Keyword.IroncladWarrior count="1" />.
    </Box>
  )
}
