import _ from 'lodash'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ProjectsParser from './ProjectsParser'
import ProjectList from './ProjectList'
import ProjectFilter from './ProjectFilter'
import './Project.css'

import AppLink from '../AppLink'

const FM_Experience = (
  <FormattedMessage id="app.Experience" defaultMessage="Experience" />
)

const FM_UnderMicroscope = (
  <FormattedMessage
    id="app.UnderMicroscope"
    defaultMessage="Under microscope"
  />
)

const FM_Here = <FormattedMessage id="app.here" defaultMessage="here" />

const FM_FilterBy = (
  <FormattedMessage id="app.FilterBy" defaultMessage="Filter by" />
)

function projectMatchFilter(pTags, fTags) {
  return (
    (!pTags && !fTags) ||
    (pTags &&
      fTags &&
      _.chain(pTags)
        .difference(fTags)
        .value().length !== pTags.length)
  )
}

class Projects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFilter: false,
      selectedTags: []
    }
  }

  onTagToggle(tag) {
    let selectedTags = [...this.state.selectedTags]
    const index = this.state.selectedTags.indexOf(tag)
    if (index !== -1) {
      selectedTags.splice(index, 1)
    } else {
      selectedTags.push(tag)
    }
    this.setState({
      ...this.state,
      selectedTags
    })
  }

  reset() {
    this.setState({
      ...this.state,
      selectedTags: []
    })
  }

  visibleProjects(projects) {
    if (this.state.selectedTags.length !== 0) {
      return projects.filter(p =>
        projectMatchFilter(p.tags, this.state.selectedTags)
      )
    }

    return projects
  }

  render() {
    const { projectsData, locale, defaultLocale } = this.props
    const { projects, tags, T: T0 } = ProjectsParser(projectsData)
    const T = (project, attr) => T0(project, attr, locale, defaultLocale)

    const filterBy = this.state.selectedTags.sort().join(', ')

    const visible = this.visibleProjects(projects)

    return (
      <div className="Cnt">
        <h1 className="Title UnderMic">{FM_Experience}</h1>
        <p className="Title">
          {FM_UnderMicroscope} <AppLink to="/resume">{FM_Here}</AppLink>
        </p>

        <div className="Projects">
          <div className="Projects__CurrentFilter">
            <div className="Projects__CurrentFilter__Caption">{FM_FilterBy}:</div>
            <div className="Projects__CurrentFilter__Value Colored">{filterBy}</div>
          </div>

          <div className="Projects__FilterAndList">
            <div className="Projects__Filter">
              <ProjectFilter
                tags={tags}
                onToggle={tag => this.onTagToggle(tag)}
                selectedTags={this.state.selectedTags || []}
                reset={() => this.reset()}
              />
            </div>
            <div className="Projects__List">
              <ProjectList projects={visible} T={T} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Projects
