import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setLocale, setAppUrl } from '../actions'
import {
  sanitize,
  extractLocale,
  resolveLocale,
  localeURLPrefix
} from '../i18n'

/**
 * We wrap Redirector in Route to make sure we get access
 * to location object through a prop
 */
const LocaleRedirector = () => <Route component={Redirector} />

export default LocaleRedirector

/**
 * Redirector not yet connected to redux
 */
const RedirectorBase = ({
  location: { pathname },
  locale,
  appUrl,
  setLocale,
  setAppUrl
}) => {
  const parts = pathToParts(pathname)

  const localeFromUrl = extractLocale(parts[0]) // -> a valid locale OR ''

  /**
   * The effective locale value that we are going to respect
   *
   * browser can hit the site for the first time at an arbitrary
   * nested url (coming from search engine e.g.)
   * which can already contain locale prefix. In such a case
   * `props.locale` would be empty (as there is no cookie set yet)
   * so we should extract and use preferred locale from url prefix.
   * If both absent go for default.
   */
  const newLocale = resolveLocale(locale, localeFromUrl)

  if (newLocale !== locale) {
    // update redux state after the render is finished
    execAfterThisTick(() => setLocale(newLocale))
  }

  // chunks of the pathname without locale chunk
  const payloadParts = parts.slice(localeFromUrl ? 1 : 0)

  const newAppUrl = payloadParts[0] || ''

  if (newAppUrl !== appUrl) {
    execAfterThisTick(() => setAppUrl(newAppUrl))
  }

  const newPathName = `${localeURLPrefix(newLocale)}/${payloadParts.join('/')}`

  if (newPathName !== pathname) {
    /**
     * url needs a fix
     *
     * Possible reasons:
     * 1. wrong locale prefix:
     *      '/es/...' instead of '/de/...'  (locale='de')
     *      '/...' instead of '/de/...'     (locale='de')
     *      '/en/...' instead of '/...'     (locale='en')
     *              - default locale should go without prefix
     * 2. wrong letter casing
     *      '/About' instead of '/about'
     */
    return <Redirect to={newPathName} />
  }

  // url is OK, no operation
  return null
}

RedirectorBase.propTypes = {
  location: PropTypes.object.isRequired,
  locale: PropTypes.string,
  appUrl: PropTypes.string,
  setLocale: PropTypes.func.isRequired,
  setAppUrl: PropTypes.func.isRequired
}

/**
 * Redirector, connected to redux
 */

const mapStateToProps = state => ({
  locale: state.i18n.locale,
  appUrl: state.i18n.appUrl
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
  setAppUrl: appUrl => dispatch(setAppUrl(appUrl))
})

const Redirector = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectorBase)

/**
 * Helpers
 */

/**
 * setImmediate, sort of
 */
function execAfterThisTick(fnc) {
  setTimeout(fnc, 0)
}

/**
 * Split pathname into chunks separated by forward slash
 * Empty chunks are discarded
 * Examples:
 *    '/de/about' -> ['de', 'about']
 *    '//de// /about/' -> ['de', 'about']
 *    '/' -> []
 *    '' -> []
 *
 * @param  {string} path
 * @return {[string]}    An array of chunks
 */
function pathToParts(path) {
  return sanitize(path)
    .split('/')
    .filter(Boolean)
}
