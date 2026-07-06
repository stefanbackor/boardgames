import { Outlet, createRootRoute } from '@tanstack/react-router'
import { CookieConsent } from '@/components/CookieConsent'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <main style={{ width: '100%' }}>
      <Outlet />
      <CookieConsent />
    </main>
  )
}
