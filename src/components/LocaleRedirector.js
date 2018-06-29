import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setLocale, setAppUrl } from '../actions'
import { HOME_PAGE, ALLOWED_LOCALES } from '../config'
import { sanitize, sanitizeLocale } from '../i18n'

const LocaleRedirector = props => {
  return (
    <Switch>
      <Route path="/:part1/:part2" component={Redirector} />
      <Route path="/:part1" component={Redirector} />
      <Redirect from="/" to={`/${HOME_PAGE}`} />
    </Switch>
  )
}

export default LocaleRedirector

/**
 * pre-cache regexes for each locale.
 *
 * E.g. let's say we have current pathname '/ru/about'
 * while the locale is actually 'en' and the correct pathname
 * should instead be '/about'. Then the regex of /^\/ru/ can help
 * removing the '/ru' prefix.
 *
 * Here we do create such regexes for every possible locale
 * beforehand, as we don't want to compile them on each render.
 */
const REGEXES_RM_LOCALE = ALLOWED_LOCALES.reduce((acc, locale) => {
  acc[locale] = new RegExp(`^/${locale}`)
  return acc
}, {})

/**
 * Redirector without redux connectivity stuff
 */
const RedirectorBase = ({
  match: {
    params: { part1, part2 }
  },
  location,
  setLocale,
  setAppUrl,
  defaultLocale,
  locale
}) => {
  const localeFromUrl = sanitizeLocale(part1)

  /**
   * localeFromUrl now is either a valid locale, or undefined.
   * If it is a locale, then then the *payload* is inside part2,
   * otherwise it is inside part1.
   */
  const appUrl = sanitize(localeFromUrl ? part2 : part1)

  /**
   * The effective locale value that we are going to respect
   *
   * browser can hit the site for the first time at arbitrary
   * nested url (coming from search engine e.g.)
   * which can already contain locale prefix. In such a case
   * `props.locale` would be empty (as there is no cookie set yet)
   * so we should extract and use preferred locale from url prefix.
   * If both absent go for default.
   */
  locale = sanitizeLocale(locale) || localeFromUrl || defaultLocale

  /**
   * The following may or may not cause rerender.
   * Redux will take care of it
   * @param {[type]} locale [description]
   */
  // always notify the redux of current locale and setAppUrl,
  // it will take care if there are changes or not
  setLocale(locale)
  setAppUrl(appUrl)

  // Url fixing -------- BEGIN

  /**
   * Cases for fixing:
   * 1. wrong locale prefix:
   *      '/es/...' instead of '/de/...'  (locale='de')
   *      '/...' instead of '/de/...'     (locale='de')
   *      '/en/...' instead of '/...'     (locale='en')
   *              - default locale should go without prefix
   * 2. wrong letter casing
   *      '/About' instead of '/about'
   */

  let newPathName = sanitize(location.pathname)

  if (localeFromUrl) {
    if (localeFromUrl !== locale || localeFromUrl === defaultLocale)
      // url needs deprefixing
      newPathName = newPathName.replace(REGEXES_RM_LOCALE[localeFromUrl], '')
  }

  if (locale && locale !== defaultLocale && locale !== localeFromUrl) {
    // url needs prefixing
    newPathName = `/${locale}${newPathName}`
  }

  // final check is anything at all has changed
  if (newPathName !== location.pathname) {
    // url has been fixed, let's go there
    return <Redirect to={newPathName} />
  }

  // Url fixing -------- END

  // Url is OK now (or we think so)

  // no render, we just do things for others, selflessly.
  return null
}

RedirectorBase.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
  setAppUrl: PropTypes.func.isRequired,
  defaultLocale: PropTypes.string.isRequired,
  locale: PropTypes.string,
  linkPrefix: PropTypes.string,
  appUrl: PropTypes.string
}

/**
 * Let's hydrate RedirectorBase with something from redux
 */

const mapStateToProps = state => ({
  defaultLocale: state.i18n.defaultLocale,
  locale: state.i18n.locale,
  // linkPrefix: state.i18n.linkPrefix,
  // appUrl: state.i18n.appUrl
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
  setAppUrl: appUrl => dispatch(setAppUrl(appUrl))
})

/**
 * Redirector, connected to redux
 */
const Redirector = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectorBase)
