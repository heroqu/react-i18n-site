import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { IntlProvider } from 'react-intl'
import '../i18n/loadLocaleData'
import combinedMessages from '../i18n/messages.json'

import LocaleRedirector from '../i18n/localeRedirector'
import Layout from '../components/Layout'

const App = props => {
  return (
    <div className="Cnt">
      App : connected to redux store
      <IntlProvider
        locale={props.locale}
        messages={combinedMessages[props.locale]}
      >
        <div className="Cnt">
          IntlProvider : get locale from props
          <Router>
            <div className="Cnt">
              Router
              <LocaleRedirector />
              <Layout {...props} />
            </div>
          </Router>
        </div>
      </IntlProvider>
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
