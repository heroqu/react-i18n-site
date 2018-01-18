import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SET_LOCALE } from '../constants/actionTypes'

import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    const { locale, setLocale } = this.props
    return (
      <div className="Cnt">
        <Header {...{ locale, setLocale }} />
        <Content />
        <Footer />
      </div>
    )
  }
}

const mapsStateToProps = state => ({
  locale: state.locale
})

const mapsDispatchToProps = dispatch => ({
  setLocale: locale => {
    dispatch({ type: SET_LOCALE, payload: locale })
  }
})

export default connect(mapsStateToProps, mapsDispatchToProps)(App)
