import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

/**
 * NavLink enhancement that takes care of adding proper locale prefix
 * that makes full url based on semantic `AppUrl`
 * (which is locale independent) and locale.
 *
 * E.g. AppUrl = '/about', locale='ru', full_url => '/ru/about'
 * while with locale='en' full_url => '/about'
 */
const AppNavLink = ({ linkPrefix, appUrl, to, children, className }) => {
  if (`/${appUrl}` === to) {
    className = classNames(className, 'NavLink__Active')
  }

  return (
    <div className={className}>
      <NavLink to={`${linkPrefix}${to}`}>{children}</NavLink>
    </div>
  )
}

const mapStateToProps = state => ({
  linkPrefix: state.i18n.linkPrefix,
  appUrl: state.appUrl
})

export default connect(mapStateToProps)(AppNavLink)
