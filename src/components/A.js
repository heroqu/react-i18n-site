import React from 'react'
import PropTypes from 'prop-types'

/**
 * The wrap around the standard html `a` tag prepopulated with
 *    target="_blank"
 *    and
 *    rel="noopener noreferrer"
 * attributes to make external links inside content authoring
 * less verbose.
 * Now instead of
 *     <a href="https://github.com/heroqu/react-i18n-site/blob/master/README.md"
 *         target="_blank"
 *         rel="noopener noreferrer"
 *      >
 *      README
 *      </a>
 * one can write a somewhat terser:
 *     <A href="https://github.com/heroqu/react-i18n-site/blob/master/README.md">
 *      README
 *      </A>
 */
const A = ({ children, ...rest }) => (
  <a target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
)

A.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string
}

export default A
