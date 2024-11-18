import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const Drill = () => {
  return (
    <Box>
      <Keyword.Ironbot /> moves the <Keyword.Drill />. <Keyword.Ironbot /> moves
      up to <Keyword.IroncladWarrior count="2" /> of an adjacent{' '}
      <Keyword.IroncladWarband /> to Drill (if able).
    </Box>
  )
}
