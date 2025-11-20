import { Box, Flex, Link, Separator, Text } from '@radix-ui/themes'

export function Footer() {
  return (
    <Box>
      <Separator orientation="horizontal" size="4" />
      <Flex direction="column" p="3">
        <Text size="1" color="gray">
          <Link href="https://bloodontheclocktower.com/" target="_blank">
            BOTC
          </Link>{' '}
          script tool by{' '}
          <Link href="https://boardgames.backor.sk/" target="_blank">
            Stefan Backor
          </Link>
          . Feedback, suggestions and contributions are welcome -{' '}
          <Link
            href="https://github.com/stefanbackor/boardgames"
            target="_blank"
          >
            https://github.com/stefanbackor/boardgames
          </Link>
        </Text>
        <Text size="1" color="gray">
          *Not affiliated with Pandemonium Institute.
        </Text>
      </Flex>
    </Box>
  )
}
