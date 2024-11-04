import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface ModalProps {
  action?: ReactNode
  cancel?: ReactNode
  children: ReactNode
  title?: ReactNode
  trigger: ReactNode
}

export const ModalAlert = ({
  title,
  trigger,
  children,
  action,
  cancel,
}: ModalProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        {title ? <AlertDialog.Title size="7">{title}</AlertDialog.Title> : null}
        <AlertDialog.Description size="2">{children}</AlertDialog.Description>

        <Flex gap="3" mt="3" justify="end">
          <AlertDialog.Cancel>
            {cancel || (
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            )}
          </AlertDialog.Cancel>
          {action ? <AlertDialog.Action>{action}</AlertDialog.Action> : null}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
