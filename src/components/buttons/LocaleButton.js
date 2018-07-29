import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

LocaleButton.propTypes = {
  locale: PropTypes.string.isRequired,
  toLocale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired
}

const mapsStateToProps = state => ({
  locale: state.locale
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale))
})

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(LocaleButton)
