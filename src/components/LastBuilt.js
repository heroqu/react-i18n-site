import React, { Fragment } from 'react'
import { BUILD_TIMESTAMP } from '../config'
import { tsFormatter } from '../utils/time'

import { FormattedMessage } from 'react-intl'

const BUILD_TIMESTAMP_FMT = tsFormatter(BUILD_TIMESTAMP)

const LastBuilt = () =>
  BUILD_TIMESTAMP_FMT ? (
    <Fragment>
      <FormattedMessage id="app.last_built" defaultMessage="Last built at" />:{' '}
      {BUILD_TIMESTAMP_FMT}
    </Fragment>
  ) : null

export default LastBuilt
