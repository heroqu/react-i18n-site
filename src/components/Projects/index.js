import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { FormattedMessage } from 'react-intl'
import ProjectList from './ProjectList'
import ProjectFilter from './ProjectFilter'
import './Project.css'

import projectsDataNormalize from './projectsDataNormalize'

import { getI18nAttr } from '../../lib/i18n'

/**
 * Data fetching with cache
 *
 * we use memory caching here, which should be enough, considering
 * additional caching layer in browser for the fetching as such
 */

import fetchJsonData from '../../lib/fetchJsonData'
import FetchWithCache from '../../lib/FetchWithCache'

const fetcher = async () => fetchJsonData('/data/projects.json')
const TTL = 3600000 // 1 hour Time to Live
const fetchWithCache = FetchWithCache(fetcher, TTL)

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
      _.chain(projectTags)
        .difference(filterTags)
        .value().length !== projectTags.length)
  )
}

class Projects extends Component {
  static STATE = {
    projects: [],
    tags: [],
    showFilter: false,
    selectedTags: []
  }

  static SET_STATE = (self, newState) => {
    Object.assign(Projects.STATE, newState)

    // re-render
    self.forceUpdate()
  }

  async loadData() {
    const data = await fetchWithCache()
    if (data.isNew) {
      const { projects, tags } = projectsDataNormalize(data.value)

      Projects.SET_STATE(this, { projects, tags })
    }
  }

  componentDidMount() {
    this.loadData().catch(console.error)
  }

  onTagToggle(tag) {
    let selectedTags = [...Projects.STATE.selectedTags]
    const index = Projects.STATE.selectedTags.indexOf(tag)
    if (index !== -1) {
      selectedTags.splice(index, 1)
    } else {
      selectedTags.push(tag)
    }
    Projects.SET_STATE(this, { selectedTags })
  }

  reset() {
    Projects.SET_STATE(this, { selectedTags: [] })
  }

  visibleProjects(projects) {
    if (Projects.STATE.selectedTags.length !== 0) {
      return projects.filter(p =>
        projectMatchFilter(p.tags, Projects.STATE.selectedTags)
      )
    }

    return projects
  }

  currentFilter() {
    const filterBy = Projects.STATE.selectedTags.sort().join(', ')

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
    let { projects, tags } = Projects.STATE

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
              selectedTags={Projects.STATE.selectedTags || []}
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
