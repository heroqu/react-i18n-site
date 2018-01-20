import React from 'react'
import NavLink from './AppNavLink'

const Header = ({ locale, linkPrefix, setLocale, nextLocale }) => (
  <div className="Cnt">
    <p>Header: {locale}</p>
    <nav>
      NavLinks{' : '}
      <NavLink to="/home">Home</NavLink>
      {' | '}
      <NavLink to="/intro">Intro</NavLink>
      {' | '}
      <NavLink to="/experience">Experience</NavLink>
      {' | '}
      <NavLink to="/education">Education</NavLink>
      {' | '}
      <NavLink to="/about">About</NavLink>
      {' | '}
      <NavLink to="/contact">Contact</NavLink>
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
