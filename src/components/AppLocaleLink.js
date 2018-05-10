import React from 'react'

/**
 * Link for switching the locale
 */
const AppLocaleLink = ({ className, locale, setLocale, toLocale }) => {
  className += (toLocale === locale ? '__Active' : '')
  return (
    <span className={className} onClick={() => setLocale(toLocale)}>
      <a>{toLocale}</a>
    </span>
  )
}

export default AppLocaleLink
