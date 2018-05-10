//  prod.js

export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE
export const ALLOWED_LOCALES = ('' + process.env.ALLOWED_LOCALES).split(',')
export const ROOT_PAGE = process.env.ROOT_PAGE
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE
export const DEBUG_MODE = process.env.DEBUG_MODE === 'true'
