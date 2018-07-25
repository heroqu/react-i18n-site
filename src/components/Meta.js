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
  const { intl, appUrl } = props
  const { messages } = intl

  if (!messages) return null

  const keyTitle = `app.title`
  const keyPage = `nav.${capitalize(appUrl)}`
  const title = `${intl.messages[keyTitle]} : ${intl.messages[keyPage]}`

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

Meta.propTypes = {
  intl: PropTypes.Object,
  appUrl: PropTypes.string
}

export default injectIntl(Meta)

/**
 * Helpers
 */

/**
 * Make first char upper cased
 * @param  {String} txt - input string
 * @return {String}
 */
const capitalize = txt =>
  `${txt.substring(0, 1).toUpperCase()}${txt.substring(1)}`
