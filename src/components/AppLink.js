import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
 *    linkPrefix === '/ru'
 *
 * while
 *    locale === 'en' (the default one),
 *    appUrl === '/about',
 *    full_url === '/about'
 *    linkPrefix === ''
 *
 * Now we can write <AppLink to=/about>...</AppLink>
 * in any language.
 */
const AppLink = ({ linkPrefix, to, children, className }) => (
  <Link to={`${linkPrefix}${to}`} className={className}>
    {children}
  </Link>
)

AppLink.propTypes = {
  linkPrefix: PropTypes.string,
  to: PropTypes.string
}

const mapStateToProps = state => ({
  linkPrefix: state.i18n.linkPrefix
})

export default connect(mapStateToProps)(AppLink)
