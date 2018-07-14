import React from 'react'
import { FormattedMessage } from 'react-intl'

import AppLink from './AppLink'
import { HOME_PAGE } from '../config'

const NotFound = props => (
  <div className="Cnt">
    <h1 className="Title">
      <FormattedMessage
        id="app.not_found"
        defaultMessage="The page is not found"
      />
    </h1>
    <h4>
      <FormattedMessage
        id="app.you_can_go_to_the"
        defaultMessage="You can go to the"
      />{' '}
      <AppLink to={`/${HOME_PAGE}`}>
        <FormattedMessage id="app.start_page" defaultMessage="site's start page" />
      </AppLink>
    </h4>
  </div>
)

export default NotFound
