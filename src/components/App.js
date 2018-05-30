import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { DEFAULT_LOCALE } from '../config'
import { IntlProvider } from 'react-intl'
import '../i18n/loadLocaleData'
import combinedMessages from '../i18n/messages.json'

import LocaleRedirector from '../i18n/localeRedirector'
import Layout from '../components/Layout'
import Debug from './Debug'

class App extends Component {
  componentDidMount() {
    this.props.loadProjectsData()
    this.props.loadGalleryData()
  }

  render() {
    const locale = this.props.locale || DEFAULT_LOCALE
    const messages = combinedMessages[locale]

    return (
      <Fragment>
        <Debug>App : connected to redux store</Debug>
        <Router>
          <Fragment>
            <Debug>Router</Debug>
            <LocaleRedirector />
            <IntlProvider locale={locale} messages={messages}>
              <Fragment>
                <Debug>IntlProvider : get locale from props</Debug>
                <Layout {...this.props} locale={locale} />
              </Fragment>
            </IntlProvider>
          </Fragment>
        </Router>
      </Fragment>
    )
  }
}

const mapsStateToProps = state => ({
  defaultLocale: DEFAULT_LOCALE,
  locale: state.i18n.locale,
  linkPrefix: state.i18n.linkPrefix,
  appUrl: state.appUrl,
  projectsData: state.projectsData,
  galleryData: state.galleryData
})

const mapsDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapsStateToProps, mapsDispatchToProps)(App)
