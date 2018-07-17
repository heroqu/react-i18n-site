import React, { Fragment } from 'react'
import { BUILD_TIMESTAMP } from '../config'
import { formatTimestamp_Full } from '../utils/time'

import { FormattedMessage } from 'react-intl'

const dateString = formatTimestamp_Full(BUILD_TIMESTAMP)

const LastBuilt = () =>
  dateString ? (
    <Fragment>
      <FormattedMessage id="app.last_built" defaultMessage="Last built at" />:{' '}
      {dateString}
    </Fragment>
  ) : null

export default LastBuilt
