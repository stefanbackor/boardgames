export type Role = {
  id: string
  image?: string
  name: string
  edition: 'tb' | 'snv' | 'bmr' | ''
  team: 'townsfolk' | 'outsider' | 'minion' | 'demon' | 'traveler' | 'loric'
  firstNight: number
  firstNightReminder: string
  otherNight: number
  otherNightReminder: string
  reminders: string[]
  remindersGlobal?: string[]
  special?: Array<
    | { name: 'replace-character'; type: 'reveal' }
    | {
        name: 'bag-disabled'
        type: 'selection'
      }
    | {
        name: 'bag-duplicate'
        type: 'selection'
      }
    | {
        name: 'grimoire'
        type: 'signal'
        time: 'night'
      }
    | {
        name: 'multiplier'
        type: 'vote'
        value: string
      }
    | {
        name: 'pointing'
        type: 'ability'
        time?: 'night'
        global?: 'minion'
      }
    | {
        name: 'open-eyes'
        type: 'player'
        time: 'night'
      }
    | {
        name: 'hidden'
        type: 'vote'
      }
  >
  setup: boolean
  ability: string
  flavor?: string
  source?: 'cs'
}

export interface RoleTranslation {
  name?: string
  ability?: string
  flavor?: string
  reminders?: string[]
  firstNightReminder?: string
  otherNightReminder?: string
}
