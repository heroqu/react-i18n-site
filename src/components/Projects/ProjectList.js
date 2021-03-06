import React, { Fragment, Component } from 'react'
import ProjectTitle from './ProjectTitle'
import ProjectCard from './ProjectCard'
import { FormattedMessage } from 'react-intl'

import {
  Accordion,
  AccordionSection,
  actionTypes,
  actionsToMsg,
} from 'react-accordion-composable'

import AClick from '../AClick'

const FM = {
  ProjectList: (
    <FormattedMessage id="app.ProjectList" defaultMessage="Project list" />
  ),
  CollapseAll: (
    <FormattedMessage id="app.CollapseAll" defaultMessage="Collapse All" />
  ),
  ExpandAll: (
    <FormattedMessage id="app.ExpandAll" defaultMessage="Expand All" />
  ),
}

class ProjectList extends Component {
  state = {
    accordionMsg: actionsToMsg({ type: actionTypes.accordionOff }),
  }

  accordionDispatch(actions) {
    this.setState({
      accordionMsg: actionsToMsg(actions),
    })
  }

  collapseAll() {
    this.accordionDispatch({ type: actionTypes.selectIds, ids: [] })
  }
  expandAll() {
    this.accordionDispatch({ type: actionTypes.expandAll })
  }

  render() {
    const { projects, localizedAttrGetter } = this.props

    if (!Array.isArray(projects) || projects.lengh === 0) {
      return null
    }

    const sections = projects.map(p => {
      /**
       * localized attribute getter injected with current project
       *
       * Can be used to directly get any attribute of current project
       * in current locale branch
       */
      const G = attr => localizedAttrGetter(p, attr)

      const hasIndent = !!p.badgeMinor
      let className = `AccordionSection${hasIndent ? ' Indent' : ''}`

      return (
        <AccordionSection
          id={`p_${p.id}`}
          key={`p_${p.id}`}
          className={`${className}`}
        >
          <ProjectTitle {...p} {...{ G }} />
          <ProjectCard {...p} {...{ G }} />
        </AccordionSection>
      )
    })

    return (
      <Fragment>
        <div className="Flex MarginBottom_03_">
          <div className="ProjectList__TitleControls">
            <AClick onClick={() => this.collapseAll()}>{FM.CollapseAll}</AClick>
          </div>
          <div className="ProjectList__TitleControls MarginLeft_1">
            <AClick onClick={() => this.expandAll()}>{FM.ExpandAll}</AClick>
          </div>
        </div>
        <div className="ProjectList__Annotation">{FM.ProjectList}</div>
        <Accordion msg={this.state.accordionMsg}>{sections}</Accordion>
      </Fragment>
    )
  }
}

export default ProjectList
