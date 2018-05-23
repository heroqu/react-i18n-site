import React, { Component } from 'react'
import { FaBars, FaClose, FaRemove } from 'react-icons/lib/fa'
import { TiThMenu, TiMinus } from 'react-icons/lib/ti'

import NavLink from '../AppNavLink'
import AppLocaleLink from '../AppLocaleLink'
import Button from '../Button'

import './NavBar.css'
import ResponsiveMenu, { MenuItem } from './ResponsiveNavBar'

import { fmtMessage, navMessages } from '../../i18n/FMessages'
const navMsgs = navMessages()

const TRIGGER_SIZE = '45em'

/**
 * Apply style to a component given a className
 * @param       {React.Component|function} WrappedComponent
 * @param       {string} className
s */
function WithStyle(WrappedComponent, className) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = { className: className }
    }
    render() {
      return (
        <WrappedComponent className={this.state.className} {...this.props} />
      )
    }
  }
}

const IconBars = WithStyle(TiThMenu, 'Icon Icon__Open')
const IconClose = WithStyle(TiMinus, 'Icon Icon__Close')

const MenuItems = props => (
  <React.Fragment>
    {/* {<div className="Flex__Start" />} */}
    {/* {<div className="Flex__Middle" />} */}

    {Object.keys(navMsgs).map(key => (
      <NavLink className="Navlink" to={`/${key.toLowerCase()}`}>
        <Button _className="_Transparent">{navMsgs[key]}</Button>
        {/* {navMsgs[key]} */}
      </NavLink>
    ))}

    {<div className="Flex__Middle" />}

    {<AppLocaleLink className="Flex__End Navlink" {...props} toLocale="en"><Button>EN</Button></AppLocaleLink>}
  {<AppLocaleLink className="Flex__End Navlink" {...props} toLocale="ru"><Button>RU</Button></AppLocaleLink>}

    {/* {<AppLocaleLink className="Flex__End Navlink" {...props} toLocale="ru" />} */}
  </React.Fragment>
)

let bg // = 'yellow'

class Header extends Component {
  render() {
    return (
      <ResponsiveMenu
        menuOpenButton={<IconBars />}
        menuCloseButton={<Button><IconClose /></Button>}
        changeMenuOn={TRIGGER_SIZE}
        largeMenuClassName="large-menu"
        smallMenuClassName="small-menu"
        menu={<MenuItems {...this.props} />}
        bg={bg}
      />
    )
  }
}

export default Header
