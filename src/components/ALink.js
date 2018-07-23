import React from 'react'

import A from './A'
import Link from './Link'

/**
 * Selectively renders 3 different components:
 *
 * if href is mailto on empty - render <a>
 * if href is http(s)         - render <A>
 *    otherwise
 * if href is internal        - render <Link>
 */
const ALink = props => {
  const { href, ...rest } = props
  let component = 'a' // the default one

  if (!href || /^mailto/.test(href)) {
    // no href OR email - use default
  } else if (/^http/.test(href)) {
    // link is external
    component = A
  } else {
    // link is internal
    component = Link
    // replace 'href' with 'to'
    props = { to: href, ...rest }
  }
  return makeElement(component, props)
}

export default ALink

/**
 * helpers
 */

/**
 * Make React element
 *
 * The difference with React.createElement is that
 * we only take 2 arguments here: component and props,
 * where props is all props, including children
 *
 * @param {Function} component - a React component
 * @param {Object} props       - full props
 */
const makeElement = (component, { children, ...rest }) =>
  React.createElement(component, rest, ...(children || []))
