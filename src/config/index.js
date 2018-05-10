import * as dev from './dev'
import * as prod from './prod'

let config, nodeEnv

if (process.env.NODE_ENV === 'production') {
  config = prod
  nodeEnv = 'production'
} else {
  config = dev
  nodeEnv = 'development'
}

let errorCap = `NODE_ENV: ${nodeEnv}`

export const DEFAULT_LOCALE = config.DEFAULT_LOCALE
export const ALLOWED_LOCALES = config.ALLOWED_LOCALES
export const ROOT_PAGE = config.ROOT_PAGE
export const COOKIE_SECRET = config.COOKIE_SECRET
export const COOKIE_MAX_AGE = config.COOKIE_MAX_AGE
export const DEBUG_MODE = config.DEBUG_MODE

export default config

if (!DEFAULT_LOCALE) {
  throw new Error(`${errorCap} DEFAULT_LOCALE is not configured!`)
}

if (!Array.isArray(ALLOWED_LOCALES) || ALLOWED_LOCALES.length === 0) {
  throw new Error(`${errorCap} ALLOWED_LOCALES are not configured!`)
}
