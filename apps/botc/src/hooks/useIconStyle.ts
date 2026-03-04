import { useSyncExternalStore } from 'react'

export type IconStyle = 'wiki' | 'kickstarter'

const STORAGE_KEY = 'botc-icon-style'

function getSnapshot(): IconStyle {
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'kickstarter' ? 'kickstarter' : 'wiki'
}

function getServerSnapshot(): IconStyle {
  return 'wiki'
}

let listeners: Array<() => void> = []

function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

export function setIconStyle(style: IconStyle) {
  localStorage.setItem(STORAGE_KEY, style)
  emitChange()
}

export function useIconStyle() {
  const iconStyle = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    iconStyle,
    setIconStyle,
  }
}
