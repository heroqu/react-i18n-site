import React from 'react'

import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

const Layout = props => {
  const { locale, linkPrefix, setLocale, nextLocale } = props
  return (
    <div className="Cnt">
      Layout
      <Header {...{ locale, linkPrefix, setLocale, nextLocale }} />
      <Content {...props} />
      <Footer {...{ locale }} />
    </div>
  )
}

export default Layout
