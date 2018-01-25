import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { IntlProvider } from 'react-intl'
import '../i18n/loadLocaleData'
import combinedMessages from '../i18n/messages.json'

import LocaleRedirector from '../i18n/localeRedirector'
import Layout from '../components/Layout'

class App extends Component {
  componentDidMount() {
    this.props.loadStaticData()
  }

  render() {
    const locale = this.props.locale
    const messages = combinedMessages[locale]

    return (
      <div className="Cnt">
        App : connected to redux store
        <Router>
          <div className="Cnt">
            Router
            <LocaleRedirector />
            <div className="Cnt">
              IntlProvider : get locale from props
              <IntlProvider locale={locale} messages={messages}>
                <Layout {...this.props} />
              </IntlProvider>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale,
  linkPrefix: state.i18n.linkPrefix,
  appUrl: state.appUrl,
  staticData: state.staticData
})

const mapsDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapsStateToProps, mapsDispatchToProps)(App)
