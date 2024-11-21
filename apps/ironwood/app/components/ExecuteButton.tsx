import { CheckIcon } from '@radix-ui/react-icons'
import { Button, ButtonProps } from '@radix-ui/themes'
import { forwardRef } from 'react'

type Props = {
  disabled?: ButtonProps['disabled']
  done?: ButtonProps['disabled']
  onClick?: ButtonProps['onClick']
  label?: string
  testId?: string
}

/**
 * Card action execute button.
 * @param param0
 * @returns
 */
export const ExecuteButton = forwardRef<HTMLButtonElement, Props>(
  ({ disabled, done, onClick, label, testId }, ref) => {
    return (
      <Button
        color="green"
        ref={ref}
        size="1"
        disabled={done || disabled}
        onClick={onClick}
        data-testid={testId || 'execute-button'}
      >
        {done && <CheckIcon />}
        {done ? 'Done' : (label ?? 'Execute')}
      </Button>
    )
  },
)

ExecuteButton.displayName = 'ExecuteButton'
