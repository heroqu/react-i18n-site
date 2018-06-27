import React from 'react'
import classNames from 'classnames'

const Tag = ({ children, isActive, className, ...rest }) => {
  className = classNames(['Tag', isActive ? 'Tag__Active' : null, className])

  return (
    <span className={className} {...rest}>
      {children}
    </span>
  )
}

export default Tag
