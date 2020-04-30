import React from 'react'
import { FormattedMessage } from 'react-intl'

import AppLink from './AppLink'
import VSpacer from './VSpacer'
import { HOME_PAGE } from '../config'

const NotFound = props => (
  <div className="Center">
    <h1 className="Title Pale">
      <FormattedMessage
        id="app.not_found"
        defaultMessage="The page is not found"
      />
    </h1>
    <VSpacer height="3rem" />
    <FormattedMessage
      id="app.you_can_go_to_the"
      defaultMessage="You can go to the"
    />
    <VSpacer />
    <AppLink to={`/${HOME_PAGE}`}>
      <FormattedMessage
        id="app.start_page"
        defaultMessage="site's start page"
      />
    </AppLink>
  </div>
)

export default NotFound
