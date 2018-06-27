import React from 'react'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

import './Layout.css'

/**
 * Make a Sticky Footer layout with CSS
 */
const Layout = props => {
  return (
    <div className="WholePage">
      <div className="WholePage__ButStickyFooter">
        <Header />
        <Content />
      </div>
      <div className="StickyFooter">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
