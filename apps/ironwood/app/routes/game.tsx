import { Outlet } from '@remix-run/react'

/**
 * Template for /game route
 * @returns
 */
export default function Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}
