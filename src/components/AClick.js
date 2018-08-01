import React from 'react'
import PropTypes from 'prop-types'

/**
 * <a> with onClick but without href.
 *
 * Although it is perfectly valid in HTML5 to
 * have <a> tag without a href, some consider it an
 * accessibility violation.
 *
 * But sometimes we just need that simple clickable thing
 * like for some toggle switchers or something,
 * when we wouldn't like to clutter the space
 * with clumsy buttons.
 *
 * Here we do have a href, but it's blocked by design.
 * This suppress annoying linter warnings.
 */
const AClick = ({ children, onClick, ...rest }) => {
  return (
    <a
      onClick={e => {
        e.preventDefault()
        typeof onClick === 'function' && onClick(e)
      }}
      {...rest}
      href="/"
    >
      {children}
    </a>
  )
}

AClick.propTypes = {
  onClick: PropTypes.func
}

export default AClick
