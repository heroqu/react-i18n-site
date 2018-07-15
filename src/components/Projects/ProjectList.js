import React, { Component } from 'react'
import ProjectTitle from './ProjectTitle'
import ProjectCard from './ProjectCard'
import { FormattedMessage } from 'react-intl'

import {
  Accordion,
  AccordionSection,
  actionTypes,
  actionsToMsg
} from 'react-accordion-composable'
// } from '../accordion'

const FM_ProjectList = (
  <FormattedMessage id="app.ProjectList" defaultMessage="Project list" />
)
const FM_CollapseAll = (
  <FormattedMessage id="app.CollapseAll" defaultMessage="Collapse All" />
)
const FM_ExpandAll = (
  <FormattedMessage id="app.ExpandAll" defaultMessage="Expand All" />
)

class ProjectList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accordionMsg: actionsToMsg({ type: actionTypes.accordionOff })
    }
  }

  accordionDispatch(actions) {
    console.log(`accordionDispatch: fire`)
    this.setState({
      accordionMsg: actionsToMsg(actions)
    })
  }

  collapseAll() {
    console.log(`collapseAll: fire`)
    this.accordionDispatch({ type: actionTypes.collapseAll })
  }
  expandAll() {
    console.log(`expandAll: fire`)
    this.accordionDispatch({ type: actionTypes.expandAll })
  }

  render() {
    const { projects, T } = this.props

    if (!Array.isArray(projects) || projects.lengh === 0) {
      return null
    }

    const sections = projects.map((p, idx) => (
      <AccordionSection
        id={`p_${p.id}`}
        key={`p_${p.id}`}
        className="AccordionSection"
      >
        <ProjectTitle {...p} T={T} />
        <ProjectCard {...p} T={T} />
      </AccordionSection>
    ))

    return (
      <div className="XLeft">
        <div className="Flex MarginBottom_03">
          <div className="Flex__Middle">{FM_ProjectList}</div>
          <div className="Flex__End MarginLeft_1">
            <a className="_NoBorder" onClick={() => this.collapseAll()}>
              {FM_CollapseAll}
            </a>
          </div>
          <div className="Flex__End MarginLeft_1">
            <a className="_NoBorder" onClick={() => this.expandAll()}>
              {FM_ExpandAll}
            </a>
          </div>
        </div>
        <Accordion className="Accordion" msg={this.state.accordionMsg}>
          {sections}
        </Accordion>
      </div>
    )
  }
}

export default ProjectList
