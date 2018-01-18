import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

const App = ({ locale, setLocale, nextLocale }) => {
  return (
    <div className="Cnt">
      App
      <Header {...{ locale, setLocale }} />
      <Content {...{ locale }} />
      <Footer {...{ locale, nextLocale }} />
    </div>
  )
}

const mapsStateToProps = state => ({
  locale: state.locale
})

const mapsDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapsStateToProps, mapsDispatchToProps)(App)
