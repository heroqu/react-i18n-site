import _ from 'lodash'
import { formatDate_YearMonth } from './time'

/**
 * Normalize loaded projects data:
 *  - renumber badges (in json files they can go with large steps)
 *  - form badgeMinor field if absent
 *  - sort projects by (badge, badgeMinor)
 *  - form badgeFull out of Badge and BadgeMinor
 */
function projectsDataNormalize(projectsData) {
  let projects = Array.isArray(projectsData) ? projectsData : []

  // get list of all the unique badges
  const badges = _
    .chain(projects)
    .map(p => p.badge)
    .sortBy()
    .sortedUniq()
    .value()

  // normalize badge numbers and sort projects
  projects = _
    .chain(projects)
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
  const tags = _
    .chain(projects)
    .reduce((acc, p) => [...acc, ...(p.tags || [])], [])
    .uniq()
    .sortBy()
    .value()

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