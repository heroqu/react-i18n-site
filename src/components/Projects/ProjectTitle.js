import React from 'react'
import Tag from './Tag'
import { FormattedMessage } from 'react-intl'

const FM = {
  EmployerLabel: (
    <FormattedMessage id="app.EmployerLabel" defaultMessage="employer" />
  ),
}

const ProjectTitle = ({ badgeFull, tags, G }) => {
  // here G is localized attributed getter for current project object

  const Tags = (tags || []).map((t, idx) => (
    <Tag key={`tag_${idx}`} className="Tag__InTitle">
      {t}
    </Tag>
  ))

  const employer = G('employer') ? (
    <>
      <div className="ProjectTitle__EmployerLabel">{FM.EmployerLabel}:</div>{' '}
      {G('employer')}
    </>
  ) : null

  return (
    <div className="ProjectTitle">
      <div className="ProjectTitle__Row">
        <div className="Badge">{badgeFull}</div>
        <div className="ProjectTitle__Name">{G('name')}</div>

        <div className="ProjectTitle__Employer">{employer}</div>
      </div>
      <div className="ProjectTitle__Row ProjectTitle__Row__Wrap">{Tags}</div>
    </div>
  )
}

export default ProjectTitle
