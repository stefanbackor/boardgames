import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import React from 'react'

/**
 * Decorator for Storybook that provides a memory router to the story and
 * its play function.
 * @param Story - The story to wrap with the memory router.
 * @param options - The options for the decorator.
 * @returns The story wrapped with the memory router.
 */
export const withMemoryRouter = (Story: React.ComponentType, options: any) => {
  const { routes, opts } = (options.parameters.memoryRouter || {}) as {
    routes?: Parameters<typeof createMemoryRouter>[0]
    opts?: Parameters<typeof createMemoryRouter>[1]
  }
  const router = routes
    ? createMemoryRouter(
        routes.map((route) => ({ ...route, element: <Story /> })),
        opts,
      )
    : undefined

  options.storyGlobals.router = router
  return router ? <RouterProvider router={router} /> : <Story />
}
