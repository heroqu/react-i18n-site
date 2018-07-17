import React, { Fragment } from 'react'
import { BUILD_TIMESTAMP } from '../config'
import { formatTimestamp_Full } from '../utils/time'

import { FormattedMessage } from 'react-intl'

const BUILD_TIMESTAMP_FMT = formatTimestamp_Full(BUILD_TIMESTAMP)

const LastBuilt = () =>
  BUILD_TIMESTAMP_FMT ? (
    <Fragment>
      <FormattedMessage id="app.last_built" defaultMessage="Last built at" />:{' '}
      {BUILD_TIMESTAMP_FMT}
    </Fragment>
  ) : null

export default LastBuilt
