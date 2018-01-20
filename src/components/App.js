import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

import LocaleRedirector from '../i18n/localeRedirector'
import Layout from '../components/Layout'

const App = props => {
  return (
    <div className="Cnt">
      App : connected to redux store
      <Router>
        <div className="Cnt">
          <React.Fragment>
            Router
            <LocaleRedirector />
            <Layout {...props} />
          </React.Fragment>
        </div>
      </Router>
    </div>
  )
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale,
  linkPrefix: state.i18n.linkPrefix,
  appUrl: state.appUrl
})

const mapsDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapsStateToProps, mapsDispatchToProps)(App)
