import { Button, DropdownMenu, Tooltip } from '@radix-ui/themes'
import { Printer, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type PrintSections = {
  roles: boolean
  tables: boolean
  firstNight: boolean
  otherNights: boolean
}

interface PrintDropdownProps {
  onPrint: (sections: PrintSections) => void
  hasScript: boolean
}

export function PrintDropdown({ onPrint, hasScript }: PrintDropdownProps) {
  const { t } = useTranslation()

  const handlePrintSection = (section: keyof PrintSections) => {
    const sections: PrintSections = {
      roles: false,
      tables: false,
      firstNight: false,
      otherNights: false,
    }
    sections[section] = true
    onPrint(sections)
  }

  return (
    <DropdownMenu.Root>
      <Tooltip content={t('Choose a page to print')}>
        <DropdownMenu.Trigger disabled={!hasScript}>
          <Button variant={hasScript ? 'solid' : 'soft'} disabled={!hasScript}>
            <Printer size={16} />
            {t('Print')}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenu.Trigger>
      </Tooltip>
      <DropdownMenu.Content className="no-print">
        <DropdownMenu.Item onSelect={() => handlePrintSection('roles')}>
          {t('Roles')}
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => handlePrintSection('tables')}>
          {t('Travellers, Loric, Fables, Player Distribution')}
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => handlePrintSection('firstNight')}>
          {t('First Night')}
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => handlePrintSection('otherNights')}>
          {t('Other Nights')}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
