import React, { Fragment } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setLocale } from '../../actions'

import AppButton from './AppButton'

/**
 * Link for switching the locale
 */
const LocaleButton = ({ locale, toLocale, setLocale, children, ...rest }) => {
  const isActive = toLocale === locale

  // allow to use explicit child element, but if absent,
  // just fill in the locale value as text
  if (!children) {
    children = <Fragment>{toLocale}</Fragment>
  }

  return (
    <AppButton
      onClick={() => setLocale(toLocale)}
      {...rest}
      isActive={isActive}
    >
      {children}
    </AppButton>
  )
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale
})

const mapsDispatchToProps = dispatch =>
  bindActionCreators({ setLocale }, dispatch)

export default connect(mapsStateToProps, mapsDispatchToProps)(LocaleButton)
