import React from 'react'
import { FormattedMessage } from 'react-intl'

import AppLink from './AppLink'
import { ROOT_PAGE } from '../config'

const NotFound = props => (
  <div className="Cnt">
    <h1 className="Title">
      <FormattedMessage
        id="app.not_found"
        defaultMessage="The page is not found"
      />
    </h1>
    <h4>
      You can go to the <AppLink to={`/${ROOT_PAGE}`}>homepage</AppLink>
    </h4>
  </div>
)

export default NotFound
