/**
 * Check if the app is running in production. Based on the Vercel environment.
 */
export const IS_PRODUCTION = process.env.APP_ENV === 'production'

/**
 * Check if the app is running in development. Based on the Vercel environment.
 */
export const IS_DEVELOPMENT = process.env.APP_ENV === 'development'

/**
 * Check if the app is running in preview. Based on the Vercel environment.
 */
export const IS_PREVIEW = process.env.APP_ENV === 'preview'
