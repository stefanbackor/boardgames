import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { SampleScript } from '@/types'

// Re-export for backward compatibility
export type { SampleScript }

/**
 * Hook that provides sample scripts with translated names
 * @returns Array of sample scripts with translated names
 */
export function useBaseScripts(): SampleScript[] {
  const { t } = useTranslation()

  return useMemo(() => {
    const SAMPLE_SCRIPTS_DATA = [
      {
        key: 'tb',
        json: [
          {
            id: '_meta',
            name: t('Trouble Brewing'),
            author: 'The Pandemonium Institute',
          },
          {
            id: 'washerwoman',
          },
          {
            id: 'librarian',
          },
          {
            id: 'investigator',
          },
          {
            id: 'chef',
          },
          {
            id: 'empath',
          },
          {
            id: 'fortuneteller',
          },
          {
            id: 'undertaker',
          },
          {
            id: 'monk',
          },
          {
            id: 'ravenkeeper',
          },
          {
            id: 'virgin',
          },
          {
            id: 'slayer',
          },
          {
            id: 'soldier',
          },
          {
            id: 'mayor',
          },
          {
            id: 'butler',
          },
          {
            id: 'drunk',
          },
          {
            id: 'recluse',
          },
          {
            id: 'saint',
          },
          {
            id: 'poisoner',
          },
          {
            id: 'spy',
          },
          {
            id: 'scarletwoman',
          },
          {
            id: 'baron',
          },
          {
            id: 'imp',
          },
          {
            id: 'scapegoat',
          },
          {
            id: 'gunslinger',
          },
          {
            id: 'beggar',
          },
          {
            id: 'bureaucrat',
          },
          {
            id: 'thief',
          },
        ],
      },
      {
        key: 'snv',
        json: [
          {
            id: '_meta',
            name: t('Sects and Violets'),
            author: 'The Pandemonium Institute',
          },
          {
            id: 'clockmaker',
          },
          {
            id: 'dreamer',
          },
          {
            id: 'snakecharmer',
          },
          {
            id: 'mathematician',
          },
          {
            id: 'flowergirl',
          },
          {
            id: 'towncrier',
          },
          {
            id: 'oracle',
          },
          {
            id: 'savant',
          },
          {
            id: 'seamstress',
          },
          {
            id: 'philosopher',
          },
          {
            id: 'artist',
          },
          {
            id: 'juggler',
          },
          {
            id: 'sage',
          },
          {
            id: 'mutant',
          },
          {
            id: 'sweetheart',
          },
          {
            id: 'barber',
          },
          {
            id: 'klutz',
          },
          {
            id: 'eviltwin',
          },
          {
            id: 'witch',
          },
          {
            id: 'cerenovus',
          },
          {
            id: 'pithag',
          },
          {
            id: 'fanggu',
          },
          {
            id: 'vigormortis',
          },
          {
            id: 'nodashii',
          },
          {
            id: 'vortox',
          },
          {
            id: 'butcher',
          },
          {
            id: 'bonecollector',
          },
          {
            id: 'harlot',
          },
          {
            id: 'barista',
          },
          {
            id: 'deviant',
          },
        ],
      },
      {
        key: 'bmr',
        json: [
          {
            id: '_meta',
            name: t('Bad Moon Rising'),
            author: 'The Pandemonium Institute',
          },
          {
            id: 'grandmother',
          },
          {
            id: 'sailor',
          },
          {
            id: 'chambermaid',
          },
          {
            id: 'exorcist',
          },
          {
            id: 'innkeeper',
          },
          {
            id: 'gambler',
          },
          {
            id: 'gossip',
          },
          {
            id: 'courtier',
          },
          {
            id: 'professor',
          },
          {
            id: 'minstrel',
          },
          {
            id: 'tealady',
          },
          {
            id: 'pacifist',
          },
          {
            id: 'fool',
          },
          {
            id: 'tinker',
          },
          {
            id: 'moonchild',
          },
          {
            id: 'goon',
          },
          {
            id: 'lunatic',
          },
          {
            id: 'godfather',
          },
          {
            id: 'devilsadvocate',
          },
          {
            id: 'assassin',
          },
          {
            id: 'mastermind',
          },
          {
            id: 'zombuul',
          },
          {
            id: 'pukka',
          },
          {
            id: 'shabaloth',
          },
          {
            id: 'po',
          },
          {
            id: 'apprentice',
          },
          {
            id: 'matron',
          },
          {
            id: 'voudon',
          },
          {
            id: 'judge',
          },
          {
            id: 'bishop',
          },
        ],
      },
    ]

    return SAMPLE_SCRIPTS_DATA.map((script) => ({
      key: script.key,
      json: script.json,
    }))
  }, [t])
}
