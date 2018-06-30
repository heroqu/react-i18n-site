import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

/**
 * Turn an argument into a lowercased trimmed string
 * @param  {any} arg - can be anything
 * @return {string}
 */
export function sanitize(arg) {
  if (arg) {
    return ('' + arg).toLowerCase().trim()
  }
  return ''
}

/**
 * Return a canonic format of locale (lowercased trimmed) if it
 * belongs to allowed list. Otherwise return empty string
 *
 * @param  {string} locale - locale under examination
 * @return {string} -  locale properly formatted, or undefined
 */
export function sanitizeLocale(locale) {
  locale = sanitize(locale)
  if (locale && ALLOWED_LOCALES.indexOf(locale) !== -1) {
    return locale
  }
  return ''
}

/**
 * Extract localized attribute of an object:
 *  - either as `obj[locale][attr]`
 *  - or, if fails, as `obj[DEFAULT_LOCALE][attr]`
 *  - If both fail - return undefined
 *
 * @param  {object} obj - object holding desired nested attribute
 * @param  {string} attr - name of nested attribute
 * @param  {string} locale - desired locale
 * @return {any} - either the value of found nested attr, or undefined
 */
export function getI18nAttr(obj, attr, locale) {
  if (!obj) {
    return undefined
  }

  locale = sanitizeLocale(locale) || DEFAULT_LOCALE

  const pathList = locale === DEFAULT_LOCALE ? [locale] : [locale, DEFAULT_LOCALE]

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
 * const FM = makeFM(this.props)
 * ...
 * const translatedText = FM('app.hello_world')
 */
export const makeFM = ({ intl }) => id => intl.formatMessage({ id })

export default {
  sanitize,
  sanitizeLocale,
  getI18nAttr,
  makeFM
}
