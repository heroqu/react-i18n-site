import React from 'react'
import { FormattedMessage } from 'react-intl'

const Footer = ({ locale }) => (
  <div className="Cnt">
    Footer : {locale}
    <p>
      <FormattedMessage
        id="app.hello_world"
        defaultMessage="Hello World!"
        description="Hello world footer greeting"
      />
    </p>
  </div>
)

export default Footer
