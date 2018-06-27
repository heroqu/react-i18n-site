import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { IntlProvider } from 'react-intl'

import '../i18n/loadLocaleData'
import messages from '../i18n/messages.json'

/**
 * React-intl provider preloaded with:
 *  - translation messages for current locale
 *  - pluralization and format rules for all allowable locales
 *      (see import of loadLocaleData above)
 */
const Intl = ({ children, defaultLocale, locale }) => {
  // locale is derived from app state (redux store)
  // but it can be empty on the first load as it finally goes from cookie
  locale = locale || defaultLocale

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  )
}

Intl.propTypes = {
  defaultLocale: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
}

const mapsStateToProps = state => ({
  defaultLocale: state.i18n.defaultLocale,
  locale: state.i18n.locale
})

export default connect(mapsStateToProps)(Intl)
