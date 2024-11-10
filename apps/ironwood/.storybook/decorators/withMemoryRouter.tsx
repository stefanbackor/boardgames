import {
  createMemoryRouter,
  RouterProvider,
} from '@remix-run/react/node_modules/react-router-dom'
import React from 'react'

/**
 * Decorator for Storybook that provides a memory router to the story and
 * its play function.
 * @param Story - The story to wrap with the memory router.
 * @param opts - The options for the decorator.
 * @returns The story wrapped with the memory router.
 */
export const withMemoryRouter = (Story: React.ComponentType, opts: any) => {
  const { routing, routerOpts } = opts.parameters as {
    routing: Parameters<typeof createMemoryRouter>[0]
    routerOpts?: Parameters<typeof createMemoryRouter>[1]
  }
  const router = createMemoryRouter(
    routing.map((route) => ({ ...route, element: <Story /> })),
    routerOpts,
  )
  opts.storyGlobals.router = router
  return <RouterProvider router={router} />
}
