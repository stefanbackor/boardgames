import { useLanguage } from '@/hooks/useLanguage'
import { Box, Flex, Link, Separator, Text } from '@radix-ui/themes'
import { Trans } from 'react-i18next'

export function Footer() {
  const { language } = useLanguage()

  const LinkGitHub = () => (
    <Link href="https://github.com/stefanbackor/boardgames" target="_blank">
      {'https://github.com/stefanbackor/boardgames'}
    </Link>
  )

  return (
    <Box my="9">
      <Separator orientation="horizontal" size="4" />
      <Flex direction="column" p="3">
        <Text size="1" color="gray">
          <Trans
            i18nKey="Translation and print tool for the <0>Blood on the Clocktower</0> scripts. Contributions and suggestions are welcome - <1>Github link</1>"
            components={[
              <Link href="https://bloodontheclocktower.com/" target="_blank" />,
              <LinkGitHub />,
            ]}
          />
        </Text>
        <Text size="1" color="gray">
          {(() => {
            switch (language) {
              case 'cs':
                return (
                  <>
                    Česká verze dostupná na{' '}
                    <Link href="https://foxinthebox.cz/clocktower">
                      https://foxinthebox.cz
                    </Link>{' '}
                    nebo{' '}
                    <Link href="https://www.old-dawg.cz/krvava-hodina-odbila-predobjednavka-darek/">
                      https://www.old-dawg.cz
                    </Link>
                  </>
                )
              default:
                return null
            }
          })()}
        </Text>
        <Text size="1" color="gray">
          <Trans i18nKey="This site is not affiliated with The Pandemonium Institute. All roles and characters are the property of Steven Medway and The Pandemonium Institute." />
        </Text>
      </Flex>
    </Box>
  )
}
