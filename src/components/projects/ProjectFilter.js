import React from 'react'
import { FormattedMessage } from 'react-intl'

const FM_ProjectFilter = (
  <FormattedMessage id="app.ProjectFilter" defaultMessage="Project filter" />
)

const FM_Reset = <FormattedMessage id="app.Reset" defaultMessage="Reset" />

const ProjectFilter = ({ tags, selectedTags, onToggle, reset }) => {
  // console.log(`ProjectFilter: selectedTags:`)
  // console.log(selectedTags)

  const Tags = tags.map(tag => {
    const isSelected = selectedTags.indexOf(tag) !== -1
    const className = isSelected ? 'Tag Tag__Selected' : 'Tag'
    return (
      <span className={className} key={tag} onClick={() => onToggle(tag)}>
        {tag}
      </span>
    )
  })

  return (
    <div className="Cnt__Trans">
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
