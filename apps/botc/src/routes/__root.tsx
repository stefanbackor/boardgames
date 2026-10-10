import { Outlet, createRootRoute } from '@tanstack/react-router'
import { CookieConsent } from '@/components/CookieConsent'
import { ANALYTICS_AVAILABLE } from '@/utils/consent'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <main style={{ width: '100%' }}>
      <Outlet />
      {ANALYTICS_AVAILABLE && <CookieConsent />}
    </main>
  )
}
