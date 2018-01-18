import React from 'react'

const Footer = ({ locale, nextLocale }) => (
  <div className="Cnt">
    <h2>Footer : {locale}</h2>
    <button type="button" onClick={nextLocale}>
      Next Locale
    </button>
  </div>
)

export default Footer
