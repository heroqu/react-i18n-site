import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { FormattedMessage } from 'react-intl'
import ProjectList from './ProjectList'
import ProjectFilter from './ProjectFilter'
import './Project.css'

import projectsDataNormalize from './projectsDataNormalize'

import { getI18nAttr } from '../../i18n'

/**
 * we define React-intl formatted mesages here in this verbose format
 * to be able to extract them from site source code in a bulk manner
 */
const FM = {
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
      projects: [],
      tags: [],
      showFilter: false,
      selectedTags: []
    }
  }

  async loadData() {
    const response = await fetch('/data/projects.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    const items = (await response.json()) || []

    if (!Array.isArray(items)) {
      // not empty and not an array
      throw new Error('Projects data is not loaded properly')
    }

    const { projects, tags } = projectsDataNormalize(items)

    this.setState({ projects, tags })
  }

  componentDidMount() {
    this.loadData().catch(console.error)
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

  currentFilter() {
    const filterBy = this.state.selectedTags.sort().join(', ')

    return filterBy ? (
      <Fragment>
        <div className="Projects__CurrentFilter__Caption">{FM.FilterBy}:</div>
        <div className="Projects__CurrentFilter__Value Colored">{filterBy}</div>
      </Fragment>
    ) : (
      <Fragment>&nbsp;</Fragment>
    )
  }

  render() {
    const { locale } = this.props
    const { projects, tags } = this.state

    /**
     * Attribute translator function, with current locale value injected
     */
    const T = (project, attr) => getI18nAttr(project, attr, locale)

    const visible = this.visibleProjects(projects)

    return (
      <div className="Projects">
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
            <div className="Projects__CurrentFilter">
              {this.currentFilter()}
            </div>
            <ProjectList projects={visible} T={T} />
          </div>
        </div>
      </div>
    )
  }
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale
})

export default connect(mapsStateToProps)(Projects)
