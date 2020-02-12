/**
 * page naming convention:
 *
 * url:             '/some-name' or '/ru/some-name'
 * appUrl (slug):   'some-name'
 * page key:        'some_name'
 * component name:  'Page__some_name'
 */

/**
 * Convert page name (a valif identifier) into a slug:
 *    some_name -> some-name
 *
 * @param  {string} name - page name as identifier
 * @return {string}      - a slug, that can be used for file naming
 */
export function nameToSlug(name) {
  return `${name}`.toLowerCase().replace('_', '-')
}

/**
 * Convert slug (appUrl) into page name, a valid indetifier:
 *    some-name -> some_name
 *
 * @param  {string} slug - page name from url (appUrl part)
 * @return {string}      - a valid indentifier for that page
 */
export function slugToName(slug) {
  return `${slug}`.toLowerCase().replace('-', '_')
}

export default { nameToSlug, slugToName }
