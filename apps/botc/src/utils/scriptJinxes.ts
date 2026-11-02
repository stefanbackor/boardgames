import type { Role } from '@/types'
import type { Jinx } from '@/types/jinx'

/** A jinx between two roles of a script, as listed on the Djinn's card */
export interface DjinnJinx {
  id: string
  name: string
  reason: string
  role1Image: string
  role2Image: string
}

/** A role that is jinxed with another role of the script */
export interface JinxedBy {
  id: string
  name: string
  image: string
}

/** Finds all jinxes where both the role and the jinxed role are in the script */
export function getDjinnJinxes(
  scriptRoles: Role[],
  jinxes: Jinx[],
): DjinnJinx[] {
  const scriptRoleIds = new Set(scriptRoles.map((r) => r.id))
  const applicableJinxes: DjinnJinx[] = []

  for (const jinxEntry of jinxes) {
    if (scriptRoleIds.has(jinxEntry.id)) {
      // This role is in the script, check its jinxes
      for (const hatred of jinxEntry.hatred) {
        if (scriptRoleIds.has(hatred.id)) {
          // The jinxed role is also in the script
          const role1 = scriptRoles.find((r) => r.id === jinxEntry.id)
          const role2 = scriptRoles.find((r) => r.id === hatred.id)
          if (role1 && role2) {
            applicableJinxes.push({
              id: `${jinxEntry.id}-${hatred.id}`,
              name: `${role1.name} & ${role2.name}`,
              reason: hatred.reason,
              role1Image: role1.image,
              role2Image: role2.image,
            })
          }
        }
      }
    }
  }

  return applicableJinxes
}

/** Maps each jinxed role id to the script's roles that hate it */
export function getHatedByMap(
  scriptRoles: Role[],
  jinxes: Jinx[],
): Map<string, JinxedBy[]> {
  const map = new Map<string, JinxedBy[]>()
  const scriptRoleIds = new Set(scriptRoles.map((r) => r.id))

  // For each jinx entry, if both roles are in the script, add the "hater" to the "hated" role's list
  for (const jinxEntry of jinxes) {
    if (scriptRoleIds.has(jinxEntry.id)) {
      const haterRole = scriptRoles.find((r) => r.id === jinxEntry.id)
      if (!haterRole) continue

      for (const hatred of jinxEntry.hatred) {
        if (scriptRoleIds.has(hatred.id)) {
          // hatred.id is hated by jinxEntry.id
          if (!map.has(hatred.id)) {
            map.set(hatred.id, [])
          }
          map.get(hatred.id)!.push({
            id: haterRole.id,
            name: haterRole.name,
            image: haterRole.image,
          })
        }
      }
    }
  }

  return map
}
