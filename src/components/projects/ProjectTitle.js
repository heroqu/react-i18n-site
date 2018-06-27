import React from 'react'
import Tag from './Tag'

const ProjectTitle = props => {
  const { T: fnTranslate } = props
  const T = attr => fnTranslate(props, attr)

  let tags = props.tags || []
  tags = tags.map((t, idx) => <Tag key={`tag_${idx}`}>{t}</Tag>)

  return (
    <div className="ProjectTitle">
      <div className="ProjectTitle__row Row__Top">
        <span className="Badge">{props.badgeFull}</span>
        <span className="ProjectName">{T('name')}</span>
      </div>
      <div className="ProjectTitle__row Row__Wrap">{tags}</div>
    </div>
  )
}

export default ProjectTitle

// class ProjectTitle extends React.PureComponent {
//   render() {
//     const props = this.props
//     const { T: fnTranslate } = props
//     const T = attr => fnTranslate(props, attr)
//
//     let tags = props.tags || []
//     tags = tags.map((t, idx) => <Tag key={`tag_${idx}`}>{t}</Tag>)
//
//     return (
//       <div ref="ProjectTitle" className="ProjectTitle">
//         <div className="ProjectTitle__row Row__Top">
//           <span className="Badge">{props.badgeFull}</span>
//           <span className="ProjectName">{T('name')}</span>
//         </div>
//         <div className="ProjectTitle__row Row__Wrap">{tags}</div>
//       </div>
//     )
//   }
// }

// <div
//   ref="ProjectTitle"
//   className="ProjectTitle"
//   onClick={() => {
//     const self = this.refs.ProjectTitle
//     setTimeout(() => {
//       self.scrollIntoView()
//     }, 0)
//   }}
// >

// "document.getElementById('middle').scrollIntoView();"
