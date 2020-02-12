import React from 'react'
import A from '../A'
import { RESUME_PATH } from '../../config'

import './ResumeDownload.css'

/**
 * Incapsulate what exactly should happen when a user clicks on
 * `download resume` link
 */
const ResumeDownload = ({ children }) => (
  <A className="ResumeDownload" href={RESUME_PATH}>
    {children}
  </A>
)

export default ResumeDownload
