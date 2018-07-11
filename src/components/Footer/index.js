import React from 'react'
import { FormattedMessage } from 'react-intl'

import LastUpdated from '../LastUpdated'

import './Footer.css'

const Footer = props => (
  <div className="Footer">
    <div className="Footer__Item Left" />
    <div className="Footer__Item">
      <FormattedMessage id="app.footer_text" defaultMessage="©" />
    </div>
    <div className="Footer__Item Right">
      <LastUpdated />
    </div>
  </div>
)

export default Footer
