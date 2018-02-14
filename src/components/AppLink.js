import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AppLink = ({ linkPrefix, to, children, className }) => (
  <span className={className}>
    <Link to={`${linkPrefix}${to}`}>{children}</Link>
  </span>
)

const mapStateToProps = state => ({
  linkPrefix: state.i18n.linkPrefix
})

export default connect(mapStateToProps)(AppLink)
