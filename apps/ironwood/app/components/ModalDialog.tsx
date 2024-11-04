import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface ModalProps {
  action?: ReactNode
  cancel?: ReactNode
  children?: ReactNode
  title?: ReactNode
  description?: ReactNode
  trigger?: ReactNode
  dialogProps?: Dialog.RootProps
  contentProps?: Dialog.ContentProps
}

export const ModalDialog = ({
  title,
  description,
  trigger,
  children,
  action,
  cancel,
  dialogProps,
  contentProps,
}: ModalProps) => {
  return (
    <Dialog.Root {...dialogProps}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}

      <Dialog.Content size="4" maxWidth="550px" {...contentProps}>
        <Dialog.Close
          style={{
            position: 'absolute',
            top: 'var(--dialog-content-padding)',
            right: 'var(--dialog-content-padding)',
          }}
        >
          <IconButton variant="ghost" size="4" color="gray">
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>

        {title && <Dialog.Title size="7">{title}</Dialog.Title>}
        {description && (
          <Dialog.Description size="2">{description}</Dialog.Description>
        )}

        {children}

        <Flex gap="3" mt="3" justify="between">
          <Dialog.Close>
            {cancel || (
              <Button variant="soft" color="gray">
                Close
              </Button>
            )}
          </Dialog.Close>
          {action && <Dialog.Close>{action}</Dialog.Close>}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
