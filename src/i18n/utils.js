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
 * belongs to allowed list. Otherwise return undefined
 *
 * @param  {string} locale - locale under examination
 * @return {string} -  locale properly formatted, or undefined
 */
export function sanitizeLocale(locale) {
  const index = ALLOWED_LOCALES.indexOf(sanitize(locale))
  if (index !== -1) {
    return ALLOWED_LOCALES[index]
  }
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
    return null
  }

  locale = sanitizeLocale(locale) || DEFAULT_LOCALE

  const paths = locale === DEFAULT_LOCALE ? [locale] : [locale, DEFAULT_LOCALE]

  // try get nested attr for every path until success
  for (let p of paths) {
    let { [p]: tmp } = obj
    let { [attr]: value } = tmp || {}
    if (value) return value
  }
}

export default { sanitize, sanitizeLocale, getI18nAttr }
