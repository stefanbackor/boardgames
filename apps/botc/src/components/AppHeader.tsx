import { Flex, Select } from '@radix-ui/themes'
import { Languages } from 'lucide-react'

interface AppHeaderProps {
  language: string
  onLanguageChange: (language: string) => void
}

export function AppHeader({ language, onLanguageChange }: AppHeaderProps) {
  return (
    <Flex
      justify="end"
      align="center"
      gap="3"
      p="3"
      className="no-print"
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--color-background)',
        zIndex: 1000,
      }}
    >
      <Flex gap="2" align="center">
        <Languages size={16} />
        <Select.Root value={language} onValueChange={onLanguageChange}>
          <Select.Trigger />
          <Select.Content position="popper" sideOffset={5}>
            <Select.Group>
              <Select.Item value="cs">Čeština</Select.Item>
              <Select.Item value="en">English</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  )
}
