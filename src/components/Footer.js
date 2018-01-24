import React from 'react'
import { FormattedMessage } from 'react-intl'

const Footer = ({ locale }) => (
  <div className="Cnt">
    Footer : {locale}
    <h3>
      <FormattedMessage
        id="app.hello_world"
        defaultMessage="Hello World!"
        description="Hello world header greeting"
      />
    </h3>
  </div>
)

export default Footer
