import React, { Fragment } from 'react'

import { connect } from 'react-redux'
import { setLocale } from '../../Redux/actions'

import AppButton from './AppButton'

/**
 * Button for switching the locale
 */
const LocaleButton = ({ locale, toLocale, setLocale, children, ...rest }) => {
  const isActive = toLocale === locale

  // allow using explicit child element, but if absent,
  // just fill in the target locale value as text
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

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale))
})

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(LocaleButton)
