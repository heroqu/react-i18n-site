import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { IntlProvider } from 'react-intl'

import '../i18n/loadLocaleData'
import { resolveLocale } from '../i18n'
import messages from '../i18n/messages.json'

/**
 * React-intl provider preloaded with:
 *  - translation messages for current locale
 *  - pluralization and format rules for all allowable locales
 *      (see import of loadLocaleData above)
 */
const Intl = ({ children, locale }) => {
  // props.locale comes from from app state (redux store),
  // but it can be empty on the first load
  // because ultimately it comes from cookie.
  // But here we need a valid locale no matter what:
  locale = resolveLocale(locale)

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  )
}

Intl.propTypes = {
  locale: PropTypes.string.isRequired
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale
})

export default connect(mapsStateToProps)(Intl)
