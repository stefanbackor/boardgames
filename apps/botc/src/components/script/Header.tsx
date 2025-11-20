import { Flex, Heading, Text } from '@radix-ui/themes'

interface Props {
  name: string
  author?: string
  byText: string
}

export function Header({ name, author, byText }: Props) {
  return (
    <Flex direction="row" justify="center" align="baseline" gap="2">
      <Heading size="8">{name}</Heading>
      {author && (
        <Text size="3" color="gray">
          {byText} {author}
        </Text>
      )}
    </Flex>
  )
}
