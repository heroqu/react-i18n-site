import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import Tag from './Tag'

import AClick from '../AClick'

const FM = {
  ProjectFilter: (
    <FormattedMessage id="app.ProjectFilter" defaultMessage="Project filter" />
  ),
  Reset: <FormattedMessage id="app.Reset" defaultMessage="Reset" />
}

const ProjectFilter = ({ tags, selectedTags, onToggle, reset }) => {
  const Tags = tags.map(tag => (
    <Tag
      key={tag}
      isActive={selectedTags.indexOf(tag) !== -1}
      onClick={() => onToggle(tag)}
      className="Tag__Filter"
    >
      {tag}
    </Tag>
  ))

  return (
    <Fragment>
      <div className="Flex">
        <div className="Flex__Start Flex__Grow Left">{FM.ProjectFilter}</div>
        <div className="Flex__End">
          <AClick onClick={reset}>{FM.Reset}</AClick>
        </div>
      </div>
      <div className="Flex">{Tags}</div>
    </Fragment>
  )
}

export default ProjectFilter
