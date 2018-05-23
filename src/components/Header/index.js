import React from 'react'
import NavBar from '../NavBar'

import './Header.css'

const Header = props => (
  <div className="StickyTop">
    <div className="Header">
      <NavBar {...props} color={'#ffd'} />
    </div>
  </div>
)

export default Header
