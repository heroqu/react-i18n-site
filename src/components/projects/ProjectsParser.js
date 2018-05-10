import _ from 'lodash'

function ProjectsParser(projectsData) {
  let projects = Array.isArray(projectsData) ? projectsData : []

  // get list of all the unique badges
  const badges = _.chain(projects)
    .map(p => p.badge)
    .sortBy()
    .sortedUniq()
    .value()

  // normalize badge numbers and sort projects
  projects = _.chain(projects)
    .map(p => ({
      ...p,
      // normalize badge numbers (to their ascending ordinal number)
      badge: badges.indexOf(p.badge) + 1,
      // normalize badgeMinor for sorting purposes
      badgeMinor: p.badgeMinor ? parseInt(p.badgeMinor, 10) : 0
    }))
    .sortBy(['badge', 'badgeMinor'])
    .map((p, idx) => ({
      ...p,
      // make a full badge String presentation (like '7' and '7.1')
      badgeFull: `${p.badge}${p.badgeMinor === 0 ? '' : `.${p.badgeMinor}`}`,
      // add id field
      id: idx,
      monthSpan: monthSpan(p)
    }))
    .value()

  // Extract all tags from all projects
  const tags = _.chain(projects)
    .reduce((acc, p) => [...acc, ...(p.tags || [])], [])
    .uniq()
    .sortBy()
    .value()

  // console.log(`All tags:`)
  // console.log(tags)

  function Length() {
    return projects.length
  }

  function FirstN(n) {
    return _.slice(projects, 0, n)
  }

  /**
   * Get best available translation of an attribute value
   * - if there is no value for desired locale then
   * default locale value is tried
   * @param       {Object} project
   * @param       {string} attr
   * @param       {string} locale
   * @param       {string} defaultLocale
   */
  function T(project, attr, locale, defaultLocale) {
    let p = project[locale]

    if (p && p[attr]) {
      return p[attr]
    }

    p = project[defaultLocale]

    if (p && p[attr]) {
      return p[attr]
    }
  }

  return {
    projects,
    Length,
    FirstN,
    T,
    tags
  }
}

function monthSpan(project) {
  let start = formatDateField(project.startDate['$date'])
  let end = formatDateField(project.endDate['$date'])
  let delimeter = start || end ? ' - ' : ''
  return `${start}${delimeter}${end}`
}

function formatDateField(DateStr) {
  try {
    const d = new Date(Date.parse(DateStr))
    const m = d.getMonth() + 1
    const y = d.getFullYear()
    return `${y}-${('0' + m).substr(-2)}`
  } catch (e) {
    return ''
  }
}

export default ProjectsParser
