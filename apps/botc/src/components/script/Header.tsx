import { Flex, Heading, Text } from '@radix-ui/themes'
import { Trans } from 'react-i18next'

interface Props {
  name: string
  author?: string
}

export function Header({ name, author }: Props) {
  if (!author) {
    return (
      <Flex direction="row" justify="center" align="baseline" gap="2">
        <Heading size="8">{name}</Heading>
      </Flex>
    )
  }

  return (
    <Flex direction="row" justify="start" align="baseline" gap="2">
      <Trans
        i18nKey="<0>{{name}}</0> <1>by {{author}}</1>"
        values={{ name, author }}
        components={[
          <Heading key="name" size="8" />,
          <Text key="author" size="3" color="gray" />,
        ]}
      />
    </Flex>
  )
}
