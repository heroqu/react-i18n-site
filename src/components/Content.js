import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import pages from './pages'
import NotFound from './NotFound'
import Meta from './Meta'

import { getI18nAttr } from '../utils/i18n'

import './Content.css'

const Content = props => {
  const { locale, appUrl } = props

  const Component = getI18nAttr(pages, appUrl, locale) || NotFound

  return (
    <Fragment>
      <Meta {...{ appUrl }} />
      <div className="Center PadTop">
        <Component {...props} />
      </div>
    </Fragment>
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
