import React from 'react'

import Aux from '../hoc/Aux'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Layout = props => (
  <div className="Cnt">
    <Header />
    <Content />
    <Footer />
  </div>
)

export default Layout
