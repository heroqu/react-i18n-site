import React from 'react'
import NavLink from './AppNavLink'

const Header = ({ locale, linkPrefix, setLocale }) => (
  <div className="Cnt">
    Header: {locale}
    <nav>
      <NavLink className="Navlink" to="/home">Home</NavLink>
      <NavLink className="Navlink" to="/intro">Intro</NavLink>
      <NavLink className="Navlink" to="/skills">Skills</NavLink>
      <NavLink className="Navlink" to="/experience">Experience</NavLink>
      <NavLink className="Navlink" to="/foss">Open Source</NavLink>
      <NavLink className="Navlink" to="/education">Education</NavLink>
      <NavLink className="Navlink" to="/about">About</NavLink>
      <NavLink className="Navlink" to="/contact">Contact</NavLink>
    </nav>
    <button type="button" onClick={() => setLocale('en')}>
      EN
    </button>
    <button type="button" onClick={() => setLocale('ru')}>
      RU
    </button>
  </div>
)

export default Header
