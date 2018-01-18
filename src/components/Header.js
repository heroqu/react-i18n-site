import React from 'react'

const Header = ({ locale, setLocale }) => (
  <div className="Cnt">
    <h2>Header: {locale}</h2>
    <button type="button" onClick={() => setLocale('en')}>
      EN
    </button>
    <button type="button" onClick={() => setLocale('ru')}>
      RU
    </button>
  </div>
)

export default Header
