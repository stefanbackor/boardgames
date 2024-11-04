import { ResetIcon } from '@radix-ui/react-icons'
import {
  AlertDialog,
  Button,
  Flex,
  Heading,
  IconButton,
  Section,
} from '@radix-ui/themes'
import { Link, Outlet, useParams } from '@remix-run/react'

import { DifficultyLevelButton } from '~/components/woodenbot/DifficultyLevelButton'
import { useDebugMode } from '~/utils/debug/useDebug'

export const meta = () => []

export default function Layout() {
  const { botId } = useParams()
  const { isDebugMode } = useDebugMode()

  return (
    <>
      <Flex direction="row" justify="between" align="center">
        <Heading as="h1" size="1">
          {botId?.toLocaleUpperCase()} Game{' '}
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <IconButton variant="ghost">
                <ResetIcon />
              </IconButton>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Reset game</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure you want to reset current game?
              </AlertDialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button asChild color="red">
                    <Link to="/">Confirm</Link>
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
          {isDebugMode ? (
            <a href={`/game/${botId}/setup`} color="red">
              Setup again
            </a>
          ) : null}
        </Heading>
        <DifficultyLevelButton />
      </Flex>
      <Section size="1">
        <Outlet />
      </Section>
    </>
  )
}
