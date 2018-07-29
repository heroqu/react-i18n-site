import _ from 'lodash'
import { formatDate_YearMonth } from '../../lib/time'

/**
 * Normalize loaded projects data:
 *  - renumber badges (in json files they can be sparse)
 *  - if badgeMinor field is absent, add { badgeMinor: 0 } default
 *  - sort projects by (badge, badgeMinor)
 *  - add badgeFull, id and monthSpan attributes
 */
function projectsDataNormalize(projectsData) {
  let projects = Array.isArray(projectsData) ? projectsData : []

  // get sorted list of all the unique badges
  const badges = _
    .chain(projects)
    .map(p => p.badge)
    .sortBy()
    .sortedUniq()
    .value()

  projects = _
    .chain(projects)
    .map(p => ({
      ...p,
      // normalize badge numbers
      // to their ascending ordinal number starting from 1
      badge: badges.indexOf(p.badge) + 1,
      // normalize badgeMinor for sorting purposes
      badgeMinor: p.badgeMinor ? parseInt(p.badgeMinor, 10) : 0
    }))
    // apply sorting
    .sortBy(['badge', 'badgeMinor'])
    // add computed attributes:
    .map((p, idx) => ({
      ...p,
      // full badge String presentation (like '7' and '7.1')
      badgeFull: `${p.badge}${p.badgeMinor === 0 ? '' : `.${p.badgeMinor}`}`,
      id: idx,
      monthSpan: monthSpan(p)
    }))
    .value()

  // Extract all tags from all projects
  const tags = Array.from(
    projects
      .map(p => p.tags || [])
      .reduce((acc, tags) => {
        for (let tag of tags) {
          acc.set(tag, true)
        }
        return acc
      }, new Map())
      .keys()
  ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

  return {
    projects,
    tags
  }
}

function monthSpan(project) {
  const emDash = '—'
  const start = formatDate_YearMonth(project.startDate['$date'])
  const end = formatDate_YearMonth(project.endDate['$date'])
  const delimeter = start && end ? ` ${emDash} ` : ''
  return `${start}${delimeter}${end}`
}

export default projectsDataNormalize
