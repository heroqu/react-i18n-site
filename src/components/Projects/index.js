import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { FormattedMessage } from 'react-intl'
import ProjectList from './ProjectList'
import ProjectFilter from './ProjectFilter'
import './Project.css'

import projectsDataNormalize from './projectsDataNormalize'

import { getI18nAttr } from '../../utils/i18n'

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
    let { projects, tags } = this.state

    /**
     * Attribute getter function, with current locale value injected
     *
     * Basically, if object has some attribute repeated inside
     * different locale branches, this getter jumps directly to the
     * right branch to retrive the right value:
     *     obj = {
     *        en: {
     *          attr: value_in_en
     *        },
     *        ru: {
     *          attr: value_in_ru
     *        }
     *     }
     * now, if locale = 'ru' is injected then
     *     const value = localizedAttrGetter(obj, 'attr')
     * will give value_in_ru
     */
    const localizedAttrGetter = (obj, attr) => getI18nAttr(obj, locale, attr)

    projects = this.visibleProjects(projects)

    return (
      <div className="Projects">
        <div className="Projects__AB">
          <div className="Projects__A" />
          <div className="Projects__B">
            <div className="Projects__CurrentFilter">
              {this.currentFilter()}
            </div>
          </div>
        </div>
        <div className="Projects__AB">
          <div className="Projects__A">
            <ProjectFilter
              tags={tags}
              onToggle={tag => this.onTagToggle(tag)}
              selectedTags={this.state.selectedTags || []}
              reset={() => this.reset()}
            />
          </div>
          <div className="Projects__B">
            <ProjectList {...{ projects, localizedAttrGetter }} />
          </div>
        </div>
      </div>
    )
  }
}

const mapsStateToProps = state => ({
  locale: state.locale
})

export default connect(mapsStateToProps)(Projects)
