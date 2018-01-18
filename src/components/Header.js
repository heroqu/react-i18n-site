import React from 'react'

const Header = ({ locale, setLocale }) => (
  <div className="Cnt">
    <h2>Header</h2>
    <h3>locale: {locale}</h3>
    <button type="button" onClick={() => setLocale('en')}>
      EN
    </button>
    <button type="button" onClick={() => setLocale('ru')}>
      RU
    </button>
  </div>
)

export default Header
