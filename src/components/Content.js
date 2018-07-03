import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import pages from './pages'
import NotFound from './NotFound'

import { getI18nAttr } from '../i18n'

import './Content.css'

class Content extends Component {
  render() {
    const { locale, appUrl } = this.props

    const Component = getI18nAttr(pages, appUrl, locale) || NotFound

    return (
      <div className="Cnt PadTop">
        <Component {...this.props} />
      </div>
    )
  }
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
