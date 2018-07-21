import React from 'react'
import PropTypes from 'prop-types'

/**
 * The wrap around the standard html `a` tag prepopulated with
 *    target="_blank" rel="noopener noreferrer"
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
