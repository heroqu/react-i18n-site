import React from 'react'
import NavLink from './AppNavLink'
import AppLocaleLink from './AppLocaleLink'
import Debug from './Debug'
import { FormattedMessage } from 'react-intl'

// const Header = ({ locale, linkPrefix, setLocale }) => {
const Header = props => {
  // const p2 = {linkPrefix, setLocale}
  const { locale } = props

  const Home = <FormattedMessage id="nav.Home" defaultMessage="Home" />
  const Intro = <FormattedMessage id="nav.Intro" defaultMessage="Intro" />
  const Skills = <FormattedMessage id="nav.Skills" defaultMessage="Skills" />
  const Experience = (
    <FormattedMessage id="nav.Experience" defaultMessage="Experience" />
  )
  const Foss = <FormattedMessage id="nav.Foss" defaultMessage="Open Source" />
  const Education = (
    <FormattedMessage id="nav.Education" defaultMessage="Education" />
  )
  const About = <FormattedMessage id="nav.About" defaultMessage="About" />
  const Gallery = <FormattedMessage id="nav.Gallery" defaultMessage="Gallery" />
  const Contact = <FormattedMessage id="nav.Contact" defaultMessage="Contact" />

  return (
    <div className="Header">
      <Debug>Header: {locale}</Debug>
      <div className="Flex">
        <nav className="Flex__Start Flex__Grow">CV</nav>

        <nav className="Flex__Middle">
          <NavLink className="Navlink" to="/home">
            {Home}
          </NavLink>
          <NavLink className="Navlink" to="/intro">
            {Intro}
          </NavLink>
          <NavLink className="Navlink" to="/skills">
            {Skills}
          </NavLink>
          <NavLink className="Navlink" to="/experience">
            {Experience}
          </NavLink>
          <NavLink className="Navlink" to="/foss">
            {Foss}
          </NavLink>
          <NavLink className="Navlink" to="/education">
            {Education}
          </NavLink>
          <NavLink className="Navlink" to="/about">
            {About}
          </NavLink>
          <NavLink className="Navlink" to="/contact">
            {Contact}
          </NavLink>
          <span className="Spacer1" />
        </nav>
        <nav className="Flex__End">
          <AppLocaleLink className="Navlink" {...props} toLocale="en" />
          <AppLocaleLink className="Navlink" {...props} toLocale="ru" />
        </nav>
      </div>
    </div>
  )
}

export default Header
// <AppLocaleLink className="Navlink" ><a >EN</a></AppLocaleLink>
