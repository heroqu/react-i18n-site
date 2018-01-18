import React from 'react'

import Aux from '../hoc/Aux'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Layout = props => (
  <Aux>
    <Header />
    <Content />
    <Footer />
  </Aux>
)

export default Layout
