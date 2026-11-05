import { useTranslation } from 'react-i18next'
import type { NightMarker } from '@/constants/nightMarkers'
import type { ParsedRole, Role } from '@/types'
import { formatRoleDisplayName } from '@/utils/roleDisplayName'
import { useDisplayOptionsStore } from '@/stores/displayOptionsStore'

/**
 * One step of a night sheet: a role, whose image a custom role may lack, or a
 * marker for a step that belongs to no role. Never both.
 */
export type NightItem = {
  id: string
  name: string
  reminder: string
} & (
  | { marker: NightMarker; image?: undefined; isCustom?: undefined }
  | {
      marker?: undefined
      image?: string
      /** A custom character's image is shown as the script gives it */
      isCustom?: boolean
    }
)

/**
 * A role on a night sheet. Parsed roles say whether they are custom; a plain
 * role is taken as official.
 */
type NightRole = Role & Partial<Pick<ParsedRole, 'isCustom'>>

/** A step with its place in the night */
type OrderedNightItem = NightItem & { order: number }

const markerStep = (
  marker: NightMarker,
  id: string,
  name: string,
  order: number,
  reminder = '',
): OrderedNightItem => ({ id, name, marker, order, reminder })

const inOrder = (steps: OrderedNightItem[]) =>
  steps.sort((a, b) => a.order - b.order)

/**
 * The steps of the first night, in waking order.
 *
 * @param roles - The roles of the script
 * @returns The steps to list on the first night's sheet
 */
export function useFirstNightItems(roles: NightRole[]): NightItem[] {
  const { t: tContent } = useTranslation('content')
  const showEnglishNames = useDisplayOptionsStore(
    (state) => state.showEnglishNames,
  )

  const roleSteps = roles
    .filter((role) => role.firstNight > 0)
    .map(
      (role): OrderedNightItem => ({
        id: role.id,
        name: formatRoleDisplayName(role, showEnglishNames),
        image: role.image,
        isCustom: role.isCustom,
        reminder: role.firstNightReminder,
        order: role.firstNight,
      }),
    )

  return inOrder([
    ...roleSteps,
    markerStep('dusk', 'dusk', tContent('Dusk'), 1),
    markerStep('dawn', 'dawn', tContent('Dawn'), 78),
    markerStep(
      'minion',
      'minion-info',
      tContent('Info for Minion'),
      20,
      tContent(
        'If there are 7 or more players, wake all Minions: Show the THIS IS THE DEMON token. Point to the Demon. Show the THESE ARE YOUR MINIONS token. Point to the other Minions.',
      ),
    ),
    markerStep(
      'demon',
      'demon-info',
      tContent('Info for Demon'),
      24,
      tContent(
        'If there are 7 or more players, wake the Demon: Show the THESE ARE YOUR MINIONS token. Point to all Minions. Show the THESE CHARACTERS ARE NOT IN PLAY token. Show 3 not-in-play good character tokens.',
      ),
    ),
  ])
}

/**
 * The steps of every other night, in waking order.
 *
 * @param roles - The roles of the script
 * @returns The steps to list on the other nights' sheet
 */
export function useOtherNightItems(roles: NightRole[]): NightItem[] {
  const { t: tContent } = useTranslation('content')
  const showEnglishNames = useDisplayOptionsStore(
    (state) => state.showEnglishNames,
  )

  const roleSteps = roles
    .filter((role) => role.otherNight > 0)
    .map(
      (role): OrderedNightItem => ({
        id: role.id,
        name: formatRoleDisplayName(role, showEnglishNames),
        image: role.image,
        isCustom: role.isCustom,
        reminder: role.otherNightReminder,
        order: role.otherNight,
      }),
    )

  return inOrder([
    markerStep('dusk', 'dusk', tContent('Dusk'), 1),
    markerStep('dawn', 'dawn', tContent('Dawn'), 98),
    ...roleSteps,
  ])
}
