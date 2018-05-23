import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Debug from './Debug'

const Layout = props => {
  const { locale, linkPrefix, setLocale } = props
  return (
    <div className="WholePage">
      <div className="WholePage__ButFooter">
        <Debug>Layout</Debug>
        <Header {...{ locale, linkPrefix, setLocale }} />
        <Content {...props} />
      </div>
      <Footer {...props} />
    </div>
  )
}

export default Layout
