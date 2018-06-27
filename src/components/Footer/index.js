import React from 'react'
import { FormattedMessage } from 'react-intl'

import './Footer.css'

const Footer = props => (
  <div className="Footer">
    <p>
      <FormattedMessage id="app.footer_text" defaultMessage="©" />
    </p>
  </div>
)

export default Footer
