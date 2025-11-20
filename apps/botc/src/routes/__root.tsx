import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <main style={{ width: '100%' }}>
      <Outlet />
    </main>
  )
}
