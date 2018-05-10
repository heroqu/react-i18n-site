import React from 'react'
import Tag from './Tag'

// const ProjectTitle = props => {

class ProjectTitle extends React.Component {
  render() {
    // console.log(`ProjectTitle: this.props:`)
    // console.log(this.props)
    const props = this.props
    const { T: T0 } = props
    const T = attr => T0(props, attr)

    let tags = props.tags || []
    tags = tags.map((t, idx) => <Tag key={`tag_${idx}`} text={t} />)

    return (
      <div ref="ProjectTitle" className="ProjectTitle">
        <div className="ProjectTitle__row Row__Top">
          <span className="Badge">{props.badgeFull}</span>
          <span className="ProjectName">{T('name')}</span>
        </div>
        <div className="ProjectTitle__row Row__Wrap">{tags}</div>
      </div>
    )
  }
}

export default ProjectTitle

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
