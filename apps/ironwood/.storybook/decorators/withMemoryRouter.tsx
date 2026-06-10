import React from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'

type MemoryRouterContext = {
  parameters: {
    memoryRouter?: {
      routes?: Parameters<typeof createMemoryRouter>[0]
      opts?: Parameters<typeof createMemoryRouter>[1]
    }
  }
  storyGlobals: { router?: ReturnType<typeof createMemoryRouter> }
}

/**
 * Decorator for Storybook that provides a memory router to the story and
 * its play function.
 * @param Story - The story to wrap with the memory router.
 * @param options - The options for the decorator.
 * @returns The story wrapped with the memory router.
 */
export const withMemoryRouter = (
  Story: React.ComponentType,
  options: MemoryRouterContext,
) => {
  const { routes, opts } = options.parameters.memoryRouter || {}
  const router = routes
    ? createMemoryRouter(
        routes.map((route) => ({ ...route, element: <Story /> })),
        opts,
      )
    : undefined

  options.storyGlobals.router = router
  return router ? <RouterProvider router={router} /> : <Story />
}
