import { useTranslation } from 'react-i18next'
import { Team } from '@/constants'

/**
 * Hook that provides translated team labels for UI components
 * Uses direct t() calls for static analysis compatibility
 */
export function useTeamLabels(): Record<
  Team,
  { label: string; addLabel: string; replaceLabel: string }
> {
  const { t } = useTranslation()

  return {
    [Team.Townsfolk]: {
      label: t('Townsfolk'),
      addLabel: t('Add Townsfolk'),
      replaceLabel: t('Replace Townsfolk'),
    },
    [Team.Outsider]: {
      label: t('Outsiders'),
      addLabel: t('Add Outsiders'),
      replaceLabel: t('Replace Outsiders'),
    },
    [Team.Minion]: {
      label: t('Minions'),
      addLabel: t('Add Minions'),
      replaceLabel: t('Replace Minions'),
    },
    [Team.Demon]: {
      label: t('Demons'),
      addLabel: t('Add Demons'),
      replaceLabel: t('Replace Demons'),
    },
    [Team.Traveler]: {
      label: t('Recommended Travelers'),
      addLabel: t('Add Recommended Travelers'),
      replaceLabel: t('Replace Recommended Travelers'),
    },
    [Team.Fabled]: {
      label: t('Fabled'),
      addLabel: t('Add Fabled'),
      replaceLabel: t('Replace Fabled'),
    },
    [Team.Loric]: {
      label: t('Loric'),
      addLabel: t('Add Loric'),
      replaceLabel: t('Replace Loric'),
    },
  }
}

