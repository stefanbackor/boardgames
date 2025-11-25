import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface SampleScript {
  key: string
  name: string
  url: string
}

/**
 * Hook that provides sample scripts with translated names
 * @returns Array of sample scripts with translated names
 */
export function useBaseScripts(): SampleScript[] {
  const { t } = useTranslation()

  const SAMPLE_SCRIPTS_DATA = {
    tb: {
      name: t('Trouble Brewing'),
      url: 'https://www.botcscripts.com/api/scripts/178/json/',
    },
    snv: {
      name: t('Sects and Violets'),
      url: 'https://www.botcscripts.com/api/scripts/180/json/',
    },
    bmr: {
      name: t('Bad Moon Rising'),
      url: 'https://www.botcscripts.com/api/scripts/181/json/',
    },
  } as const

  return useMemo(() => {
    return Object.entries(SAMPLE_SCRIPTS_DATA).map(([key, script]) => ({
      key,
      name: script.name,
      url: script.url,
    }))
  }, [])
}
