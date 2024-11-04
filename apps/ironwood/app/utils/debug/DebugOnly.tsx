import { Badge, Card, Inset, Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

import { useDebugMode } from './useDebug'

/**
 * Convenience component to render children only in debug mode.
 * @param param0
 * @returns
 */
export const DebugOnly = ({ children }: PropsWithChildren) => {
  const { isDebugMode } = useDebugMode()

  return isDebugMode ? (
    <Card variant="classic" my="1">
      <Inset clip="padding-box" side="top" pb="current">
        <Badge size="1" color="red">
          <Text>DEBUG ONLY</Text>
        </Badge>
      </Inset>
      {children}
    </Card>
  ) : null
}
