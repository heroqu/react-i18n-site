import React from 'react'
import Tag from './Tag'

const ProjectTitle = props => {
  const { T: fnTranslate } = props
  const T = attr => fnTranslate(props, attr)

  let tags = props.tags || []
  tags = tags.map((t, idx) => <Tag key={`tag_${idx}`}>{t}</Tag>)

  return (
    <div className="ProjectTitle">
      <div className="ProjectTitle__Row ProjectTitle__Row__Top">
        <span className="Badge">{props.badgeFull}</span>
        <span className="ProjectName">{T('name')}</span>
      </div>
      <div className="ProjectTitle__Row ProjectTitle__Row__Wrap">{tags}</div>
    </div>
  )
}

export default ProjectTitle
