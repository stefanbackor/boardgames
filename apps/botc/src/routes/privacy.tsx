import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import { AppHeader } from '@/components/AppHeader'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { reopenConsent } from '@/utils/consent'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()

  return (
    <>
      <AppHeader language={language} onLanguageChange={changeLanguage} />
      <Container size="4" p="4">
        <Flex direction="column" gap="9">
          <Box style={{ maxWidth: 680 }}>
            <Link href="/" size="2">
              {'← '}
              {t('Back to the tool')}
            </Link>

            <Heading as="h1" size="7" mt="4" mb="2">
              {t('Privacy & Cookies')}
            </Heading>
            <Text as="p" size="2" color="gray" mb="5">
              {t(
                'This is a free, fan-made tool. This page explains what is stored on your device and what data, if any, is shared with others.',
              )}
            </Text>

            <Separator size="4" mb="5" />

            <Heading as="h2" size="4" mb="2">
              {t('Essential storage (always on)')}
            </Heading>
            <Text as="p" size="2" mb="5">
              {t(
                'Your saved scripts, your language preference, and in-progress edits are stored locally in your browser (localStorage and sessionStorage). This data never leaves your device and is required for the tool to work, so it does not need consent.',
              )}
            </Text>

            <Heading as="h2" size="4" mb="2">
              {t('Analytics cookies (your choice)')}
            </Heading>
            <Text as="p" size="2" mb="5">
              {t(
                'We use Google Analytics to understand how the tool is used so we can improve it. It is switched off by default and only runs if you choose "Allow" in the cookie banner. When enabled, it sets cookies and sends usage data — such as pages viewed, actions taken, approximate location, and device and browser type — to Google, which may process it in the United States. It is not used for advertising.',
              )}
            </Text>

            <Heading as="h2" size="4" mb="2">
              {t('Sharing scripts')}
            </Heading>
            <Text as="p" size="2" mb="5">
              {t(
                'When you share a script, its contents — including any author name you enter — are encoded into the shareable link and rendered by our host (Vercel), which keeps standard server logs that may include IP addresses.',
              )}
            </Text>

            <Heading as="h2" size="4" mb="2">
              {t('Changing or withdrawing your choice')}
            </Heading>
            <Text as="p" size="2" mb="3">
              {t(
                'You can change your mind at any time. Rejecting stops analytics cookies from being used going forward.',
              )}
            </Text>
            <Box>
              <Button onClick={reopenConsent}>
                {t('Change cookie settings')}
              </Button>
            </Box>
          </Box>

          <Footer />
        </Flex>
      </Container>
    </>
  )
}
