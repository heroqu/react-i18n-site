import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setLocale, setAppUrl, setAppUrls } from '../actions'

import { ROOT_PAGE, DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

import { sanitize, sanitizeLocale } from './utils'

/**
 * pre-cache regexes for each locale:
 * E.g. if we have a pathname like '/ru/something' while it should
 * just be '/something' then the regex of /^\/ru/ can help
 * removing the '/ru' prefix. We create such regexes for
 * every possible locale beforehand here.
 */
const REGEXES_RM_LOCALE = ALLOWED_LOCALES.reduce((acc, locale) => {
  acc[locale] = new RegExp(`^/${locale}`)
  return acc
}, {})

const LocaleRedirector = props => {
  return (
    <Switch>
      <Route path="/:part1/:part2/:part3/:part4" component={detector} />
      <Route path="/:part1/:part2/:part3" component={detector} />
      <Route path="/:part1/:part2" component={detector} />
      <Route path="/:part1" component={detector} />
      <Redirect from="/" to={`/${ROOT_PAGE}`} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  locale: state.i18n.locale,
  appUrl: state.i18n.appUrl,
  appUrls: state.i18n.appUrls
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
  setAppUrl: appUrl => dispatch(setAppUrl(appUrl)),
  setAppUrls: appUrls => dispatch(setAppUrls(appUrls))
})

const detector = connect(mapStateToProps, mapDispatchToProps)(props => {
  const { match, location, setLocale, setAppUrl } = props

  let { part1, part2, part3, part4 } = match.params

  let localeFromUrl = sanitizeLocale(part1)

  if (localeFromUrl) {
    // first part is actually a locale, not a *payload* part
    // of full address line: let's shift the payload parts
    ;[part1, part2, part3] = [part2, part3, part4]
  }

  ;[part1, part2, part3] = [part1, part2, part3].map(sanitize)

  // locale independent addressing
  const appUrls = [part1, part2, part3]

  /**
   * The effective locale value that we are going to respect
   *
   * browser can hit the site for the first time at arbitrary nested url
   * which can already contain locale prefix. In such a case
   * props.locale  would be empty (as there is no cookie set yet)
   * so we should extract and use preferred locale from url prefix.
   * If both absent go for default.
   */
  const locale = props.locale || localeFromUrl || DEFAULT_LOCALE

  const appUrl = part1

  /**
   * Url fixing -------- BEGIN
   *
   * Cases for fixing:
   * - url has locale prefix that contradict to just calculated 'correct'
   * locale ('/es/...' instead of '/de/...')
   * - there is a prefix for default locale '/en/...' which
   * should not be there (business rule)
   * - calculated locale differes from default but locale prefix is not there in the url
   * - url contains uppercase chars (the boredom is in danger, political correctness
   * is heavily insulted, punishment is closing)
   */

  let newPathName = sanitize(location.pathname)

  if (localeFromUrl) {
    if (localeFromUrl !== locale || localeFromUrl === DEFAULT_LOCALE)
      // url needs deprefixing
      newPathName = newPathName.replace(REGEXES_RM_LOCALE[localeFromUrl], '')
  }

  if (locale && locale !== DEFAULT_LOCALE && locale !== localeFromUrl) {
    // url needs prefixing
    newPathName = `/${locale}${newPathName}`
  }

  // final check is anything at all has changed
  if (newPathName !== location.pathname) {
    // url needs a fix
    return <Redirect to={newPathName} />
  }

  /**
   * Url fixing -------- END
   */

  // url is OK (or we think so)

  // update the state store
  setLocale(locale)
  setAppUrl(appUrl)
  setAppUrls(appUrls)

  return null
})

export default LocaleRedirector
