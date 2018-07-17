import React from 'react'
import A from '../A'

import './ResumeDownload.css'

/**
 * Incapsulate what exactly should happen when a user clicks on
 * `download resume` link
 */
const ResumeDownload = ({ children }) => (
  <A className="ResumeDownload" href="/data/resume.pdf">
    {children}
  </A>
)

export default ResumeDownload
