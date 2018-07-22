import React from 'react'
import classNames from 'classnames'

/**
 * Add `List` class to the class names of the <ul>
 *
 */
const UL = ({ className, children, ...rest }) => (
  <ul className={classNames('List', className)} {...rest}>
    {children}
  </ul>
)

export default UL
