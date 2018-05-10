import React from 'react'
import Tag from './Tag'
import Markdown from 'markdown-to-jsx'
import { FormattedMessage } from 'react-intl'
import ShowProps from '../ShowProps'
import Gallery from '../Gallery'

const FM_Employer = (
  <FormattedMessage id="app.Employer" defaultMessage="Employer" />
)

const ALink = props => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className="LinkInProjectCard"
    onClick={e => e.stopPropagation()}
  >
    {props.children}
  </a>
)

const MarkdownOptions = {
  overrides: {
    a: {
      component: ALink
    },
    Photo: {
      component: Gallery,
      props: {
        className: 'LinkInProjectCard'
      }
    }
  }
}

const ProjectCard = props => {
  if (!props) {
    return null
  }

  // console.log(props)
  const { T: T0 } = props
  const T = attr => T0(props, attr)

  let contents = null
  // <span className="TimeSpan">{props.startDate} - {props.endDate}</span>
  try {
    let description = T('description')
    if (description) {
      description += '\n'
      contents = (
        <div onClick={e => e.stopPropagation()}>
          <div className="ProjectCard__row">
            <span className="Flex__Start Flex__Grow ProjectCard__MonthSpan">
              {props.monthSpan}
            </span>
            <span className="Flex__End ProjectCard__EmployerLabel">
              {FM_Employer}:{' '}
            </span>
            <span className="Flex__End ProjectCard__Employer MarginLeft_1">
              {T('employer')}
            </span>
          </div>
          <div className="ProjectCard__Body">
            <Markdown options={MarkdownOptions}>{description}</Markdown>
          </div>
        </div>
      )
    } else {
      console.log(`----------- NULL`)
      return null
    }
  } catch (e) {
    console.log(`----------- CATCH ERROR`)
    return null
  }

  return <div className="ProjectCard">{contents}</div>
}

export default ProjectCard
