import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AppLink = ({ linkPrefix, to, children, ...rest }) => (
  <Link to={`${linkPrefix}${to}`} {...rest}>
    {children}
  </Link>
)

const mapStateToProps = state => ({
  linkPrefix: state.i18n.linkPrefix
})

export default connect(mapStateToProps)(AppLink)
