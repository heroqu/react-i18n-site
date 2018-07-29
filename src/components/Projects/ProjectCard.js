import React from 'react'
import MarkDown from './MarkDown'
import { FormattedMessage } from 'react-intl'

const FM = {
  Employer: <FormattedMessage id="app.Employer" defaultMessage="Employer" />
}

const ProjectCard = ({ badgeFull, monthSpan, G }) => {
  // description attribute value of current project in current locale
  let description = G('description')

  if (!description) {
    return null
  }

  try {
    description = <MarkDown>{description + '\n'}</MarkDown>
  } catch (e) {
    console.error(`ERROR parsing Markdown for project ${badgeFull}`, e)
    return null
  }

  return (
    <div className="ProjectCard" onClick={e => e.stopPropagation()}>
      <div className="ProjectCard__Row">
        <span className="Flex__Start Flex__Grow ProjectCard__MonthSpan">
          {monthSpan}
        </span>
        <span className="Flex__End ProjectCard__EmployerLabel">
          {FM.Employer}:{' '}
        </span>
        <span className="Flex__End MarginLeft_1">{G('employer')}</span>
      </div>
      <div className="ProjectCard__Body">{description}</div>
    </div>
  )
}

export default ProjectCard
