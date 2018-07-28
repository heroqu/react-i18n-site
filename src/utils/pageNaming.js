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
  * @param  {String} name - page name as identifier
  * @return {String}      - a slug, that can be used for file naming
  */
export function nameToSlug(name) {
  return `${name}`.toLowerCase().replace('_', '-')
}

/**
 * Convert slug (appUrl) into page name, a valid indetifier:
 *    some-name -> some_name
 *
 * @param  {String} slug - page name from url (appUrl part)
 * @return {String}      - a valid indentifier for that page
 */
export function slugToName(slug) {
  return `${slug}`.toLowerCase().replace('-', '_')
}

export default { nameToSlug, slugToName }
