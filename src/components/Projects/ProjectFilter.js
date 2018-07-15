import React from 'react'
import { FormattedMessage } from 'react-intl'
import Tag from './Tag'

const FM_ProjectFilter = (
  <FormattedMessage id="app.ProjectFilter" defaultMessage="Project filter" />
)

const FM_Reset = <FormattedMessage id="app.Reset" defaultMessage="Reset" />

const ProjectFilter = ({ tags, selectedTags, onToggle, reset }) => {
  const Tags = tags.map(tag => (
    <Tag
      key={tag}
      isActive={selectedTags.indexOf(tag) !== -1}
      onClick={() => onToggle(tag)}
    >
      {tag}
    </Tag>
  ))

  return (
    <div className="Cnt">
      <div className="Flex">
        <div className="Flex__Start Flex__Grow Title">{FM_ProjectFilter}</div>
        <div className="Flex__End">
          <a
            onClick={() => {
              reset()
              return false
            }}
          >
            {FM_Reset}
          </a>
        </div>
      </div>
      <div className="Flex">{Tags}</div>
    </div>
  )
}

export default ProjectFilter
