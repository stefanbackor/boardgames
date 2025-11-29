import { RoleName } from './role'

export type Jinx = {
  id: RoleName
  hatred: Array<{
    id: RoleName
    reason: string
  }>
}
