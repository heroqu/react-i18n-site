import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadProjectsData } from '../../actions'

import { FormattedMessage } from 'react-intl'
import ProjectList from './ProjectList'
import ProjectFilter from './ProjectFilter'
import './Project.css'

import { getI18nAttr } from '../../i18n'

/**
 * we define React-intl formatted mesages here in this verbose format
 * to be able to extract them from site source code in a bulk manner
 */
const FMs = {
  FilterBy: <FormattedMessage id="app.FilterBy" defaultMessage="Filter by" />
}

/**
 * A predicate that shows whether or not the Tag list of
 * given project intersects with the list of Tags
 * selected by user as a filter.
 */
function projectMatchFilter(projectTags, filterTags) {
  return (
    (!projectTags && !filterTags) ||
    (projectTags &&
      filterTags &&
      _
        .chain(projectTags)
        .difference(filterTags)
        .value().length !== projectTags.length)
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

  componentDidMount() {
    this.props.loadProjectsData()
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
    const { projects, tags, locale } = this.props

    const T = (project, attr) => getI18nAttr(project, attr, locale)

    const filterBy = this.state.selectedTags.sort().join(', ')

    const visible = this.visibleProjects(projects)

    return (
      <div className="Projects">
        <div className="Projects__CurrentFilter">
          <div className="Projects__CurrentFilter__Caption">
            {FMs.FilterBy}:
          </div>
          <div className="Projects__CurrentFilter__Value Colored">
            {filterBy}
          </div>
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
    )
  }
}

const mapsStateToProps = state => ({
  // defaultLocale: state.i18n.defaultLocale,
  locale: state.i18n.locale,
  projects: state.projectsData.projects,
  tags: state.projectsData.tags
})

const mapDispatchToProps = dispatch => ({
  loadProjectsData: locale => dispatch(loadProjectsData(locale))
})

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Projects)
