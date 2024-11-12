import { CheckIcon } from '@radix-ui/react-icons'
import { Button, ButtonProps } from '@radix-ui/themes'
import { forwardRef } from 'react'

type Props = {
  done: ButtonProps['disabled']
  onClick: ButtonProps['onClick']
  label?: string
  testId?: string
}

/**
 * Card action execute button.
 * @param param0
 * @returns
 */
export const ExecuteButton = forwardRef<HTMLButtonElement, Props>(
  ({ done, onClick, label, testId }, ref) => {
    return (
      <Button
        ref={ref}
        size="1"
        disabled={done}
        onClick={onClick}
        data-testid={testId || 'execute-button'}
      >
        {done && <CheckIcon />}
        {done ? 'Done' : label ?? 'Execute'}
      </Button>
    )
  },
)

ExecuteButton.displayName = 'ExecuteButton'
