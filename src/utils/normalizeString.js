/**
 * Turn argument into a lowercased trimmed string
 * @param  {any} arg - can be anything
 * @return {string}
 */
export function normalizeString(arg) {
  if (arg) {
    return ('' + arg).toLowerCase().trim()
  }
  return ''
}
