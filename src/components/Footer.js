import React from 'react'
import { FormattedMessage } from 'react-intl'
import Debug from './Debug'

const Footer = ({ locale }) => (
  <div className="Footer">
    <Debug>Footer : {locale}</Debug>
    <p>
      <FormattedMessage
        id="app.footer_text"
        defaultMessage="©"
      />
    </p>
  </div>
)

export default Footer
