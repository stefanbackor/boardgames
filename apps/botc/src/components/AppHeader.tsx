import { Flex, Select, Heading } from '@radix-ui/themes'
import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AppHeaderProps {
  language: string
  onLanguageChange: (language: string) => void
}

export function AppHeader({ language, onLanguageChange }: AppHeaderProps) {
  const { t } = useTranslation()

  return (
    <Flex
      justify="between"
      align="stretch"
      gap="3"
      py="2"
      px="3"
      className="no-print"
      style={{
        position: 'sticky',
        top: 0,
        backgroundImage: 'url(/bg-tile-purple-pattern.webp)',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px',
        zIndex: 1000,
        color: '#f1ead8',
      }}
    >
      <Flex gap="4" align="baseline">
        <Heading
          size="8"
          mt="2"
          style={{
            fontFamily: "'LHF Unlovable', serif",
            fontWeight: 'normal',
            wordSpacing: '-10px',
            textDecoration: 'none',
          }}
        >
          <a href="/" className="hidden md:block">
            {t('Blood on the Clocktower')}
          </a>
          <a href="/" className="block md:hidden">
            {t('BotC')}
          </a>
        </Heading>
        <Heading size="2">{t('Script Tool')}</Heading>
      </Flex>
      <Flex gap="2" align="center">
        <Languages size={16} color="white" />
        <Select.Root value={language} onValueChange={onLanguageChange}>
          <Select.Trigger />
          <Select.Content position="popper" sideOffset={5}>
            <Select.Group>
              <Select.Item value="cs">Čeština</Select.Item>
              <Select.Item value="de">Deutsch</Select.Item>
              <Select.Item value="en">English</Select.Item>
              <Select.Item value="hu">Magyar</Select.Item>
              <Select.Item value="pl">Polski</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  )
}
