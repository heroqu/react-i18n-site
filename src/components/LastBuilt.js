import React, { Fragment } from 'react'
import { BUILD_TIMESTAMP } from '../config'
import { formatTimestamp_as_GMT } from '../lib/time'

import { FormattedMessage } from 'react-intl'

const dateString = formatTimestamp_as_GMT(BUILD_TIMESTAMP)

const LastBuilt = () =>
  dateString ? (
    <Fragment>
      <FormattedMessage id="app.last_built" defaultMessage="Last built at" />:{' '}
      {dateString}
    </Fragment>
  ) : null

export default LastBuilt
