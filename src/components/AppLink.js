import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { localeURLPrefix } from '../lib/i18n'

/**
 * A react-router Link component enhancement that takes care
 * of adding a locale prefix to the destination url.
 *
 * The full url is thus composed of locale prefix and
 * a `payload` part, i.e. appUrl which is void of locale info
 *
 * E.g.
 *    locale === 'ru',
 *    appUrl === '/about',
 *    full_url === '/ru/about',
 *    prefix === '/ru'
 *
 * while
 *    locale === 'en' (the default one),
 *    appUrl === '/about',
 *    full_url === '/about'
 *    prefix === ''
 *
 * Now we can write <AppLink to=/about>...</AppLink>
 * in any language.
 */
const AppLink = ({ locale, to, children, className }) => (
  <Link to={`${localeURLPrefix(locale)}${to}`} className={className}>
    {children}
  </Link>
)

AppLink.propTypes = {
  locale: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(AppLink)
