import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'
import normalizeString from '../utils/normalizeString'

/**
 * Try to interpret given value as a valid locale.
 * If fails to do so - return empty string.
 *
 * @param  {string} locale - locale under examination
 * @return {string} -  valid locale or ''
 */
export function extractLocale(value) {
  value = normalizeString(value)
  if (value && ALLOWED_LOCALES.indexOf(value) !== -1) {
    return value
  }
  return ''
}

/**
 * Try to resolve one or more gived candidate values
 * as a valid locale and return the first one
 * successfully resolved.
 * If none does resolve, return the DEFAULT_LOCALE
 *
 * @example
 *   ( assuming that
 *      ALLOWED_LOCALES === ['en', 'ru']
 *      DEFAULT_LOCALE='en' )
 *
 *    'ru' === resolveLocale('RU')
 *    'ru' === resolveLocale('ru','de')
 *    'ru' === resolveLocale('de','ru')
 *    'ru' === resolveLocale('de', 'ar', 'ru')
 *    'en' === resolveLocale('de')
 *    'en' === resolveLocale('de','ar')
 *    'en' === resolveLocale('rus')
 *    'en' === resolveLocale()
 *
 * @param  {string[]} args - array of locale candidates
 * @return {string}        - a valid locale
 */
export function resolveLocale(...values) {
  return [...values, DEFAULT_LOCALE].map(extractLocale).find(Boolean)
}

/**
 * Create a prefix to be used before payload part of an URL
 *
 * @example
 *   ( assuming that
 *      ALLOWED_LOCALES === ['en', 'ru']
 *      DEFAULT_LOCALE='en' )
 *
 *    locale = 'en', prefix = ''
 *    locale = 'ru', prefix = '/ru'
 *    locale = 'any invalid locale', prefix = ''
 *
 * @param  {string} locale
 * @return {string}     correct prefix
 */
export function localeURLPrefix(locale) {
  locale = extractLocale(locale)
  if (locale && locale !== DEFAULT_LOCALE) {
    return `/${locale}`
  }
  return ''
}

/**
 * Extract localized attribute of an object:
 *  - either as `obj[locale][attr]`
 *  - or, if fails, as `obj[DEFAULT_LOCALE][attr]`
 *  - If both fail - return undefined
 *
 * @param  {Object} obj - object holding desired nested attribute
 * @param  {string} attr - name of nested attribute
 * @param  {string} locale - desired locale
 * @return {any} - either the value of found nested attr, or undefined
 */
export function getI18nAttr(obj, locale, attr) {
  if (!obj) {
    return undefined
  }

  locale = resolveLocale(locale)

  if (!locale) {
    return undefined
  }

  /**
   * term `path` here stands for intermediate attribute to get to the
   * final attribute, like e.g. if we want
   *
   *    value = obj['en'][attr]
   *
   * then 'en' is the path.
   */
  const pathList =
    locale === DEFAULT_LOCALE ? [locale] : [locale, DEFAULT_LOCALE]

  // try to get nested attr for every path in the list until success
  for (let p of pathList) {
    let { [p]: tmp } = obj
    let { [attr]: value } = tmp || {}
    if (value !== undefined) return value
  }
}

/**
 * factory that makes a FM (FormatMessage) function
 * based on `intl` object received through props
 *
 * to get it work the host component should be
 * injected with react-intl:
 *
 * import { injectIntl } from 'react-intl'
 * ...
 * export default injectIntl(<current component>)
 *
 * then use this function to extract translation values directly:
 *
 * // somewhere inside `render`:
 * const fm = makeFM(this.props)
 * ...
 * const translatedText = fm('app.hello_world')
 */
export const makeFM = ({ intl }) => id => intl.formatMessage({ id })

export default {
  extractLocale,
  resolveLocale,
  localeURLPrefix,
  getI18nAttr,
  makeFM
}
