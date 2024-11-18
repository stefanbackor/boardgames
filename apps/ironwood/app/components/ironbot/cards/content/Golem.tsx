import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const Golem = () => {
  return (
    <Box>
      <Keyword.Ironbot /> replaces <Keyword.IroncladWarrior count="1" /> with{' '}
      <Keyword.Golem />. In 1 <Keyword.IroncladWarband />:
      <ul>
        <li>
          closest to <Keyword.Totem />
        </li>
        <li>
          largest <Keyword.IroncladWarband />
        </li>
        <li>
          or roll <Keyword.MagicDie />.
        </li>
      </ul>
    </Box>
  )
}
