import { Box, Flex, Link, Separator, Text } from '@radix-ui/themes'
import { Trans } from 'react-i18next'

export function Footer() {
  return (
    <Box my="9">
      <Separator orientation="horizontal" size="4" />
      <Flex direction="column" p="3">
        <Text size="1" color="gray">
          <Trans
            i18nKey="<0>Blood on the Clocktower</0> script translation tool. Contributions are welcome - <1>https://github.com/stefanbackor/boardgames</1>"
            components={[
              <Link href="https://bloodontheclocktower.com/" target="_blank" />,
              <Link
                href="https://github.com/stefanbackor/boardgames"
                target="_blank"
              />,
            ]}
          />
        </Text>
        <Text size="1" color="gray">
          This site is not affiliated with The Pandemonium Institute. All roles
          and characters are the property of Steven Medway and The Pandemonium
          Institute.
        </Text>
      </Flex>
    </Box>
  )
}
