import React from 'react'
import classNames from 'classnames'

/**
 * Link for switching the locale
 */
const AppLocaleLink = ({
  className,
  locale,
  setLocale,
  toLocale,
  children
}) => {
  if (toLocale === locale) {
    className = classNames(className, 'NavLink__Active')
  }

  // allow to use explicit child element, but if absent,
  // just fill in the locale value as text
  if (!children) {
    children = <React.Fragment>{toLocale}</React.Fragment>
  }

  return (
    <div className={className} onClick={() => setLocale(toLocale)}>
      {children}
    </div>
  )
}

export default AppLocaleLink
