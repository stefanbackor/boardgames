import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface CarouselScript {
  key: string
  name: string
  url: string
}

/**
 * Hook that provides carousel scripts with translated names
 * @returns Array of carousel scripts with translated names
 */
export function useCarouselScripts(): CarouselScript[] {
  const { t } = useTranslation()

  const CAROUSEL_SCRIPTS_DATA = [
    {
      name: t('Anonymous Dishonesty'),
      url: 'https://www.botcscripts.com/api/scripts/6391/json/',
    },
    {
      name: t('Contempt'),
      url: 'https://www.botcscripts.com/api/scripts/11420/json/',
    },
    {
      name: t('Devout Theists'),
      url: 'https://www.botcscripts.com/api/scripts/5729/json/',
    },
    {
      name: t("Harold Holt's Revenge "),
      url: 'https://www.botcscripts.com/api/scripts/5078/json/',
    },
    {
      name: t('Insanity and Intuition'),
      url: 'https://www.botcscripts.com/api/scripts/3695/json/',
    },
    {
      name: t('Irrational Behaviour'),
      url: 'https://www.botcscripts.com/api/scripts/13443/json/',
    },
    {
      name: t('The Midnight Oasis'),
      url: 'https://www.botcscripts.com/api/scripts/148/json/',
    },
    {
      name: t('Monkey Do Math'),
      url: 'https://www.botcscripts.com/api/scripts/13552/json/',
    },
    {
      name: t('The Ones You Least Expect'),
      url: 'https://www.botcscripts.com/api/scripts/5085/json/',
    },
    {
      name: t('Punchy'),
      url: 'https://www.botcscripts.com/api/scripts/13007/json/',
    },
    {
      name: t('Quick Maths'),
      url: 'https://www.botcscripts.com/api/scripts/12516/json/',
    },
    {
      name: t('Revenge of the Martian Vampires'),
      url: 'https://www.botcscripts.com/api/scripts/881/json/',
    },
    {
      name: t('Whose Cult Is It Anyway?'),
      url: 'https://www.botcscripts.com/api/scripts/10209/json/',
    },
  ]

  return useMemo(() => {
    return CAROUSEL_SCRIPTS_DATA.map(
      (script) =>
        ({
          key: script.name,
          name: script.name,
          url: script.url,
        }) satisfies CarouselScript,
    )
  }, [])
}
