import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

/**
 * NavLink enhancement that takes care of adding proper locale prefix
 * that makes full url based on semantic `AppUrl`
 * (which is locale independent) and locale.
 *
 * E.g. AppUrl = '/about', locale='ru', full_url => '/ru/about'
 * while with locale='en' full_url => '/about'
 */
const AppNavLink = ({ linkPrefix, appUrl, to, children, className }) => {
  className += (`/${appUrl}` === to ? '__Active' : '')
  return (
    <span className={className}>
      <NavLink to={`${linkPrefix}${to}`}>{children}</NavLink>
    </span>
  )
}

const mapStateToProps = state => ({
  linkPrefix: state.i18n.linkPrefix,
  appUrl: state.appUrl
})

export default connect(mapStateToProps)(AppNavLink)
