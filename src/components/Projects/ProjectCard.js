import React from 'react'
import MarkDown from './MarkDown'
import { FormattedMessage } from 'react-intl'

const FM = {
  Employer: <FormattedMessage id="app.Employer" defaultMessage="Employer" />
}

const ProjectCard = props => {
  if (!props) {
    return null
  }

  const { T: T0 } = props
  const T = attr => T0(props, attr)

  let contents = null

  try {
    let description = T('description')
    if (description) {
      description += '\n'
      contents = (
        <div onClick={e => e.stopPropagation()}>
          <div className="ProjectCard__Row">
            <span className="Flex__Start Flex__Grow ProjectCard__MonthSpan">
              {props.monthSpan}
            </span>
            <span className="Flex__End ProjectCard__EmployerLabel">
              {FM.Employer}:{' '}
            </span>
            <span className="Flex__End MarginLeft_1">{T('employer')}</span>
          </div>
          <div className="ProjectCard__Body">
            <MarkDown>{description}</MarkDown>
          </div>
        </div>
      )
    } else {
      return null
    }
  } catch (e) {
    return null
  }

  return <div className="ProjectCard">{contents}</div>
}

export default ProjectCard
