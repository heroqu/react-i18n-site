import React from 'react'
import Tag from './Tag'

const ProjectTitle = ({ badgeFull, tags, G }) => {
  // here G is localized attributed getter for current project object

  const Tags = (tags || []).map((t, idx) => <Tag key={`tag_${idx}`}>{t}</Tag>)

  return (
    <div className="ProjectTitle">
      <div className="ProjectTitle__Row ProjectTitle__Row__Top">
        <span className="Badge">{badgeFull}</span>
        <span className="ProjectName">{G('name')}</span>
      </div>
      <div className="ProjectTitle__Row ProjectTitle__Row__Wrap">{Tags}</div>
    </div>
  )
}

export default ProjectTitle
