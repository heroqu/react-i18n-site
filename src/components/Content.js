import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import pages from './pages'
import NotFound from './NotFound'

import { getI18nAttr } from '../i18n'

import './Content.css'

const Content = props => {
  const { locale, appUrl } = props

  const Component = getI18nAttr(pages, appUrl, locale) || NotFound

  return (
    <div className="Cnt PadTop">
      <Component {...props} />
    </div>
  )
}

Content.propTypes = {
  locale: PropTypes.string,
  appUrl: PropTypes.string
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale,
  appUrl: state.appUrl
})

export default connect(mapsStateToProps)(Content)
