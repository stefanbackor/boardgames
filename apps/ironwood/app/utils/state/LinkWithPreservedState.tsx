import { Link, useLocation } from '@remix-run/react'

import { LocationState } from './types'

type LinkProps = Parameters<typeof Link>[0]
type LocationStateLinkProps = LinkProps & {
  preserveStateKey?: Array<keyof LocationState>
}

function filterByKeys(
  obj: Record<string, unknown>,
  prefix: LocationStateLinkProps['preserveStateKey'],
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => prefix?.some((p) => key === p)),
  )
}

export const LinkWithPreservedState = (props: LocationStateLinkProps) => {
  const { preserveStateKey, state, ...rest } = props
  const location = useLocation()

  return (
    <Link
      {...rest}
      state={
        preserveStateKey?.length
          ? {
              ...(state || {}),
              ...filterByKeys(location.state || {}, preserveStateKey || 'yay_'),
            }
          : null
      }
    />
  )
}
