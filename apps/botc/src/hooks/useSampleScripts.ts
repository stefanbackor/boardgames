import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface SampleScript {
  key: string
  name: string
  url: string
}

const SAMPLE_SCRIPTS_DATA = {
  tb: {
    name: 'Trouble Brewing',
    url: 'https://www.botcscripts.com/api/scripts/178/json/',
  },
  snv: {
    name: 'Sects and Violets',
    url: 'https://www.botcscripts.com/api/scripts/180/json/',
  },
  bmr: {
    name: 'Bad Moon Rising',
    url: 'https://www.botcscripts.com/api/scripts/181/json/',
  },
} as const

/**
 * Hook that provides sample scripts with translated names
 * @returns Array of sample scripts with translated names
 */
export function useSampleScripts(): SampleScript[] {
  const { t } = useTranslation()

  return useMemo(() => {
    return Object.entries(SAMPLE_SCRIPTS_DATA).map(([key, script]) => ({
      key,
      name: t(script.name),
      url: script.url,
    }))
  }, [t])
}
