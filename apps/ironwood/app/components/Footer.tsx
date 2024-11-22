import {
  /*Button,*/ Flex,
  Link,
  Separator,
  Strong,
  Text,
} from '@radix-ui/themes'

// import { useDebugMode } from '~/utils/debug/useDebug'

export const Footer = () => {
  // const { isDebugMode, toggleDebugMode } = useDebugMode()

  return (
    <Flex direction="column" gap="5" py="9">
      <Separator size="4" />
      <Text size="1" align="center">
        <Link
          href="https://mindclashgames.com/our-games/ironwood/"
          target="_blank"
        >
          <Strong>Ironwood</Strong>
        </Link>{' '}
        solo app by{' '}
        <Link href="https://boardgames.backor.sk" target="_blank" wrap="nowrap">
          <Strong>Stefan Backor</Strong>
        </Link>
        <br />
        *Not affiliated with Mindclash Games. Feedback, suggestions and
        contributions are welcome.
      </Text>

      {/* <Flex justify="center" style={{ opacity: 0.3 }}>
        {isDebugMode ? (
          <Button
            size="1"
            variant="ghost"
            color="gray"
            onClick={toggleDebugMode}
          >
            Disable Debug
          </Button>
        ) : (
          <Button
            size="1"
            variant="ghost"
            color="gray"
            onClick={toggleDebugMode}
          >
            Enable Debug
          </Button>
        )}
      </Flex> */}
    </Flex>
  )
}
