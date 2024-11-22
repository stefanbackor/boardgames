import { Box } from '@radix-ui/themes'

import { Expend } from '../Expend'

export const RoundActionExhausted = () => {
  return (
    <li>
      <Box>Follow the actions from the expended card below:</Box>
      <Expend />
    </li>
  )
}
