import * as types from '../constants/actionTypes'
import localeCookie from '../i18n/localeCookie'
import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

import makeFetchJsonWithCache from './FetchJsonWithCache'

const fetchJsonWithCache = makeFetchJsonWithCache()

const sanitizedLocale = locale => {
  locale = ('' + locale).toLowerCase().trim()
  if (ALLOWED_LOCALES.indexOf(locale) !== -1) {
    return locale
  }
}

export const setLocale = locale => {
  locale = sanitizedLocale(locale) || DEFAULT_LOCALE
  localeCookie.set(locale)
  return { type: types.SET_LOCALE, payload: locale }
}

export const setAppUrl = appUrl => ({
  type: types.SET_APP_URL,
  payload: appUrl
})

export const loadProjectsData = () => async dispatch => {
  try {
    // console.log(`_____ actions: loadProjectsData  ${Date.now()}`)

    const data = await fetchJsonWithCache('/data/projects.json')

    // console.log(`_____ actions: loadProjectsData: data:`)
    // console.log(data)

    dispatch({ type: types.LOAD_PROJECTS_DATA, payload: data })
  } catch (e) {
    console.log(`Error fetching projects data:\n${e}`)
  }
}

export const loadGalleryData = () => async dispatch => {
  try {
    // console.log(`_____ actions: loadGalleryData   ${Date.now()}`)

    const data = await fetchJsonWithCache('/data/gallery.json')

    // console.log(`_____ actions: loadGalleryData: data:`)
    // console.log(data)

    dispatch({ type: types.LOAD_GALLERY_DATA, payload: data })
  } catch (e) {
    console.log(`Error fetching gallery data:\n${e}`)
  }
}
