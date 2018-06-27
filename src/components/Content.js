import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

import pages from './pages'
import NotFound from './NotFound'

import './Content.css'

class Content extends Component {
  componentDidMount() {
    // this.props.loadProjectsData()
    // this.props.loadGalleryData()
  }

  render() {
    const { defaultLocale, locale, appUrl } = this.props

    const Component =
      (pages[locale] && pages[locale][appUrl]) ||
      (pages[defaultLocale] && pages[defaultLocale][appUrl]) ||
      NotFound

    return (
      <div className="Cnt PadTop">
        <Component {...this.props} />
      </div>
    )
  }
}

Content.propTypes = {
  loadProjectsData: PropTypes.func.isRequired,
  loadGalleryData: PropTypes.func.isRequired,
  defaultLocale: PropTypes.string,
  locale: PropTypes.string,
  appUrl: PropTypes.string
}

const mapsStateToProps = state => ({
  defaultLocale: state.i18n.defaultLocale,
  locale: state.i18n.locale,
  appUrl: state.appUrl
})

const mapsDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapsStateToProps, mapsDispatchToProps)(Content)
