import React from 'react'
import NavLink from './AppNavLink'

const Header = ({ locale, linkPrefix, setLocale, nextLocale }) => (
  <div className="Cnt">
    <p>Header: {locale}</p>
    <nav>
      NavLinks{' : '}
      <NavLink to="/aaa">AAA</NavLink>
      {' | '}
      <NavLink to="/bbb">BBB</NavLink>
      {' | '}
      <NavLink to="/ccc">CCC</NavLink>
    </nav>
    <button type="button" onClick={() => setLocale('en')}>
      EN
    </button>
    <button type="button" onClick={() => setLocale('ru')}>
      RU
    </button>
    <button type="button" onClick={nextLocale}>
      Next Locale
    </button>
  </div>
)

export default Header
