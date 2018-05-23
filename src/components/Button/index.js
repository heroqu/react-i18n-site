import React from 'react'
import './Button.css'
import classNames from 'classnames'

const Button = ({className, children, ...rest}) => {
  className = classNames('bttn-material-flat', 'bttn-sm',)


  return (
    <div className="bttn-material-flat bttn-sm" {...rest}>
      {children}
    </div>
  )
}

export default Button
