import React, { Fragment } from 'react'
import { BUILD_TIMESTAMP } from '../config'
import { timestampFullFormat } from '../utils/time'

import { FormattedMessage } from 'react-intl'

const buildTsFormatted =
  BUILD_TIMESTAMP && typeof BUILD_TIMESTAMP === 'string'
    ? timestampFullFormat(parseInt(BUILD_TIMESTAMP, 10))
    : null

const LastUpdated = () => {
  if (!buildTsFormatted) return null

  return (
    <Fragment>
      <FormattedMessage
        id="app.last_updated"
        defaultMessage="Last updated at"
      />: {buildTsFormatted}
    </Fragment>
  )
}

export default LastUpdated
