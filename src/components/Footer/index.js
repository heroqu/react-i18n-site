import React from 'react'
import { FormattedMessage } from 'react-intl'

import LastBuilt from '../LastBuilt'
import ResumeDownload from '../ResumeDownload'

import './Footer.css'

const Footer = props => (
  <div className="Footer">
    <div className="Footer__Item Left">
      <ResumeDownload>
        <FormattedMessage
          id="app.download_my_resume"
          defaultMessage="My resume in PDF"
        />
      </ResumeDownload>
    </div>
    <div className="Footer__Item Footer__Item__Wide">
      <FormattedMessage id="app.footer_text" defaultMessage="©" />
    </div>
    <div className="Footer__Item Right">
      <LastBuilt />
    </div>
  </div>
)

export default Footer
