import { Badge, Text } from '@radix-ui/themes'

import { useDifficulty } from '~/hooks/ironbot/useDifficulty'

export const DifficultyLevelButton = () => {
  const { getDifficultyLevel } = useDifficulty()

  return (
    <Text size="1" wrap="nowrap">
      Difficulty Level:{' '}
      <Badge highContrast>{getDifficultyLevel() || '0'}</Badge>
    </Text>
  )
}
