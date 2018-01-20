import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setLocale, setAppUrl } from '../actions'

import { ROOT_PAGE, DEFAULT_LOCALE } from '../config'

const sanitize = obj => {
  if (obj) {
    return ('' + obj).toLowerCase().trim()
  }
  return ''
}

const LocaleRedirector = props => {
  return (
    <Switch>
      <Route exact path="/:locale/:appUrl" component={detector} />
      <Route exact path="/:appUrl" component={detector} />
      <Redirect from="/" to={`/${ROOT_PAGE}`} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  locale: state.i18n.locale,
  appUrl: state.i18n.appUrl
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
  setAppUrl: appUrl => dispatch(setAppUrl(appUrl))
})

const detector = connect(mapStateToProps, mapDispatchToProps)(props => {
  const { match, setLocale, setAppUrl } = props

  const localeFromUrl = sanitize(match.params.locale)

  /**
  * The effective locale value that we are going to honour
  *
  * new user can hit the site for the first time at arbitrary nested url
  * which can already be localized. In such a case props.locale woudl be empty
  * and we should extract prefered locale from url prefix
  */
  const locale = props.locale || localeFromUrl || DEFAULT_LOCALE

  const appUrl = sanitize(match.params.appUrl)

  /**
  * Let's see if url needs a repair
  * ----- BEGIN
  */
  let newPathname

  if (locale === DEFAULT_LOCALE) {
    // locale should not appear in url
    if (localeFromUrl) {
      newPathname = `/${appUrl}` // remove it
    }
  } else {
    // locale should appear in url
    if (localeFromUrl !== locale) {
      newPathname = `/${locale}/${appUrl}` // add it
    }
  }

  if (newPathname) {
    // url needs a fix
    return <Redirect to={newPathname} />
  }
  /**
  * ----- END
  */

  // url is OK

  // update the state store
  setLocale(locale)
  setAppUrl(appUrl)

  return null
})

export default LocaleRedirector
