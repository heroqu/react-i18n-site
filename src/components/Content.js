import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import pages from './pages'
import NotFound from './NotFound'
import Meta from './Meta'

import { getI18nAttr } from '../utils/i18n'
import { slugToName } from '../utils/pageNaming'

import './Content.css'

const Content = props => {
  const { locale, appUrl } = props

  const pageKey = slugToName(appUrl)
  const Page = getI18nAttr(pages, locale, pageKey) || NotFound

  return (
    <Fragment>
      <Meta {...{ appUrl }} />
      <div className="Content">
        <Page {...props} />
      </div>
    </Fragment>
  )
}

Content.propTypes = {
  locale: PropTypes.string,
  appUrl: PropTypes.string
}

const mapsStateToProps = state => ({
  locale: state.locale,
  appUrl: state.appUrl
})

export default connect(mapsStateToProps)(Content)
