import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const AppNavLink = ({ linkPrefix, to, children, ...rest }) => (
  <NavLink to={`${linkPrefix}${to}`}>
    {children}
  </NavLink>
)

const mapStateToProps = state => ({
  linkPrefix: state.i18n.linkPrefix
})

export default connect(mapStateToProps)(AppNavLink)
