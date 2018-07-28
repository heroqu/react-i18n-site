import React from 'react'
import PropTypes from 'prop-types'

import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'

/**
 * Set document title based on current page (appUrl),
 * in current language.
 *
 * require appUrl in props
 */
const Meta = props => {
  const {
    intl: { messages },
    appUrl
  } = props

  if (!messages) return null

  let title = messages[`app.title`]

  const pageName = messages[`nav.${appUrl}`]
  if (pageName) {
    title = `${title} : ${pageName}`
  }

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

Meta.propTypes = {
  intl: PropTypes.object.isRequired,
  appUrl: PropTypes.string.isRequired
}

export default injectIntl(Meta)
