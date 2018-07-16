import React from 'react'

/**
 * Incapsulate what exactly should happen when a user clicks on
 * `download resume` link
 */
const ResumeDownload = ({ children }) => <a href="/data/resume.pdf">{children}</a>

export default ResumeDownload
