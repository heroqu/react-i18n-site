import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setLocale, setAppUrl } from '../Redux/actions'
import { extractLocale, resolveLocale, localeURLPrefix } from '../utils/i18n'
import normalizeString from '../utils/normalizeString'

const LocaleRouter = ({
  location: { pathname },
  locale,
  appUrl,
  setLocale,
  setAppUrl,
  children
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
  return <Fragment>{children}</Fragment>
}

LocaleRouter.propTypes = {
  location: PropTypes.object.isRequired,
  locale: PropTypes.string,
  appUrl: PropTypes.string,
  setLocale: PropTypes.func.isRequired,
  setAppUrl: PropTypes.func.isRequired
}

/**
 * Let'c connect to Redux
 */

const mapStateToProps = state => ({
  locale: state.locale,
  appUrl: state.appUrl
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
  setAppUrl: appUrl => dispatch(setAppUrl(appUrl))
})

/**
 * Let's also `connect` to React-router,
 * giving access to { match, history, location } props
 */

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocaleRouter)
)

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
  return normalizeString(path)
    .split('/')
    .filter(Boolean)
}
