import React from 'react'

import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'
import ShowProps from '../components/ShowProps'

const Layout = props => {
  const { locale, linkPrefix, setLocale, nextLocale } = props
  return (
    <div className="Cnt">
      Layout
      <Header {...{ locale, linkPrefix, setLocale, nextLocale }} />
      <ShowProps {...props}>
        <Content {...props} />
      </ShowProps>
      <Footer {...{ locale, nextLocale }} />
    </div>
  )
}


export default Layout
