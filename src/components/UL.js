import React from 'react'
import classNames from 'classnames'

/**
 * Add `List` class to the class names of the <ul>
 *
 *   - just for the brevity at page authoring stage... and 
 *   because we're not going to spoil classless <ul>
 *   elements by applying some CSS to them.
 */
const UL = ({ className, children, ...rest }) => (
  <ul className={classNames('List', className)} {...rest}>
    {children}
  </ul>
)

export default UL
