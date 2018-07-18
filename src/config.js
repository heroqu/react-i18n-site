export const APP_VERSION = process.env.REACT_APP_APP_VERSION
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE
export const ALLOWED_LOCALES = (
  '' + process.env.REACT_APP_ALLOWED_LOCALES
).split(',')
export const HOME_PAGE = process.env.REACT_APP_HOME_PAGE
export const COOKIE_SECRET = process.env.REACT_APP_COOKIE_SECRET
export const COOKIE_MAX_AGE = process.env.REACT_APP_COOKIE_MAX_AGE
export const MAILER_URL = process.env.REACT_APP_MAILER_URL
export const MAILER_MAX_DISPATCH_TIME = process.env
  .REACT_APP_MAILER_MAX_DISPATCH_TIME
  ? parseInt(process.env.REACT_APP_MAILER_MAX_DISPATCH_TIME, 10)
  : null
export const BUILD_TIMESTAMP = process.env.REACT_APP_BUILD_TIMESTAMP

AssertIsSet('DEFAULT_LOCALE', DEFAULT_LOCALE)

AssertIsSet(
  'ALLOWED_LOCALES',
  Array.isArray(ALLOWED_LOCALES) && ALLOWED_LOCALES.length !== 0
)

function AssertIsSet(attr, value) {
  if (!value) {
    throw new Error(`NODE_ENV: ${process.env.NODE_ENV}:
      Env var ${attr} is not set`)
  }
}
