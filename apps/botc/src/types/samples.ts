import type { ScriptData } from './script'

/**
 * Sample script with translated name
 */
export interface SampleScript {
  key: string
  json: ScriptData
}

/**
 * Carousel script (experimental scripts)
 */
export interface CarouselScript {
  key: string
  name: string
  url: string
  flavor: string
}
