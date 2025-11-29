import { Box, Flex, Link, Separator, Text } from '@radix-ui/themes'
import { Trans } from 'react-i18next'

export function Footer() {
  return (
    <Box>
      <Separator orientation="horizontal" size="4" />
      <Flex direction="column" p="3">
        <Text size="1" color="gray">
          <Trans
            i18nKey="<0>Blood on the Clocktower</0> script translation tool by <1>Stefan Backor</1> - <2>https://github.com/stefanbackor/boardgames</2>"
            components={[
              <Link href="https://bloodontheclocktower.com/" target="_blank" />,
              <Link href="https://boardgames.backor.sk/" target="_blank" />,
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
