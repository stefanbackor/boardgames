import { type RouteConfig } from '@react-router/dev/routes'
import { flatRoutes } from '@react-router/fs-routes'

// Preserve the existing flat-file route conventions from Remix v2
// (e.g. `game.$botId.round_.action_.$actionId.tsx`).
export default flatRoutes() satisfies RouteConfig
