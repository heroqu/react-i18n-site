import React, { Fragment } from 'react'
import { BUILD_TIMESTAMP } from '../config'
import { timestampFullFormat } from '../utils/time'

import { FormattedMessage } from 'react-intl'

const buildTsFormatted =
  BUILD_TIMESTAMP && typeof BUILD_TIMESTAMP === 'string'
    ? timestampFullFormat(parseInt(BUILD_TIMESTAMP, 10))
    : null

const LastBuilt = () => {
  if (!buildTsFormatted) return null

  return (
    <Fragment>
      <FormattedMessage
        id="app.last_built"
        defaultMessage="Last built at"
      />: {buildTsFormatted}
    </Fragment>
  )
}

export default LastBuilt
