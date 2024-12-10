import { Box } from '@radix-ui/themes'

import { Keyword } from '~/components/KeywordButton'

export const MovementSourceFull = () => {
  return (
    <Box>
      The Woodenbot always prefers adjacent forests as the source of the
      movement. It moves the indicated number (on the Action chart) of
      Woodwalker Fighters into the targeted forest (if there are fewer Fighters
      than indicated in the adjacent forests, the bot moves as many as it can).
      The bot prefers to move Fighters from outer forests first (if applicable),
      then from smaller Warbands. In case of a tie, use the <Keyword.MagicDie />
      .
    </Box>
  )
}
