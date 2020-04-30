import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import Tag from './Tag'
import highlightedTagsSet from './hiTags'

import AClick from '../AClick'

const FM = {
  ProjectFilter: (
    <FormattedMessage id="app.ProjectFilter" defaultMessage="Project filter" />
  ),
  Reset: <FormattedMessage id="app.Reset" defaultMessage="Reset" />,
}

const TO_LOWERCASE = s => String(s).toLowerCase()

const ProjectFilter = ({ tags, selectedTags, onToggle, reset }) => {
  const selectedTagsSet = new Set(selectedTags)

  const Tags = tags.map(tag => {
    const isHi = highlightedTagsSet.has(TO_LOWERCASE(tag))
    const className = `Tag__Filter${isHi ? ' Tag__Highlighted' : ''}`

    return (
      <Tag
        key={tag}
        isActive={selectedTagsSet.has(tag)}
        onClick={() => onToggle(tag)}
        className={className}
      >
        {tag}
      </Tag>
    )
  })

  return (
    <Fragment>
      <div className="Flex">
        <div className="Flex__End MarginLeftAuto">
          <AClick onClick={reset}>{FM.Reset}</AClick>
        </div>
      </div>
      <div className="ProjectList__Annotation">{FM.ProjectFilter}</div>

      <div className="Flex">{Tags}</div>
    </Fragment>
  )
}

export default ProjectFilter
