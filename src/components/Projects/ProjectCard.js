import React from 'react'
import Markdown from 'markdown-to-jsx'
import { FormattedMessage } from 'react-intl'
import Gallery from '../Gallery'

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

/**
 * we are going to replace on the fly:
 *    <a> -> <Alink>
 *    <Photo> -> <Gallery className='LinkInProjectCard'>
 */
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
            <span className="Flex__End MarginLeft_1">
              {T('employer')}
            </span>
          </div>
          <div className="ProjectCard__Body">
            <Markdown options={MarkdownOptions}>{description}</Markdown>
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
