import * as types from '../constants/actionTypes'
import localeCookie from '../i18n/localeCookie'
import { resolveLocale } from '../i18n'

import makeFetchJsonWithCache from '../utils/FetchJsonWithCache'
import projectsDataNormalize from '../utils/projectsDataNormalize'

const fetchJsonWithCache = makeFetchJsonWithCache()

export const setLocale = locale => {
  locale = resolveLocale(locale)
  localeCookie.set(locale)
  return { type: types.SET_LOCALE, payload: locale }
}

export const setAppUrl = appUrl => ({
  type: types.SET_APP_URL,
  payload: appUrl
})

export const loadProjectsData = () => async dispatch => {
  try {
    const data = await fetchJsonWithCache('/data/projects.json')

    const { projects, tags } = projectsDataNormalize(data)

    dispatch({ type: types.LOAD_PROJECTS_DATA, payload: { projects, tags } })
  } catch (e) {
    console.log(`Error fetching projects data:\n${e}`)
  }
}

export const loadGalleryData = () => async dispatch => {
  try {
    const data = await fetchJsonWithCache('/data/gallery.json')

    dispatch({ type: types.LOAD_GALLERY_DATA, payload: data })
  } catch (e) {
    console.log(`Error fetching gallery data:\n${e}`)
  }
}
