import React from 'react'
import { FormattedMessage } from 'react-intl'

import LastBuilt from '../LastBuilt'

import './Footer.css'

const Footer = props => (
  <div className="Footer">
    <div className="Footer__Item Left" />
    <div className="Footer__Item">
      <FormattedMessage id="app.footer_text" defaultMessage="©" />
    </div>
    <div className="Footer__Item Right">
      <LastBuilt />
    </div>
  </div>
)

export default Footer
