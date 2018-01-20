export const DEFAULT_LOCALE = 'en'
export const ALLOWED_LOCALES = ['en', 'ru']
export const ROOT_PAGE = 'home'
export const COOKIE_SECRET = '10507ae1a11b4c709cdbcdefdb7c3f5f'
export const COOKIE_MAX_AGE = 30 * 24 * 3600

export default {
  DEFAULT_LOCALE,
  ALLOWED_LOCALES,
  ROOT_PAGE,
  COOKIE_SECRET,
  COOKIE_MAX_AGE
}

if (!DEFAULT_LOCALE) {
  throw new Error('DEFAULT_LOCALE is not configured!')
}

if (!Array.isArray(ALLOWED_LOCALES) || ALLOWED_LOCALES.length === 0) {
  throw new Error('ALLOWED_LOCALES are not configured!')
}
