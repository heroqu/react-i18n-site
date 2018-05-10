import * as types from '../constants/actionTypes'
import localeCookie from '../i18n/localeCookie'
import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

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

export const setAppUrls = appUrls => ({
  type: types.SET_APP_URLS,
  payload: appUrls
})

export const loadProjectsData = () => async dispatch => {
  try {
    const response = await fetch('/data/projects.json')
    const data = await response.json()

    dispatch({ type: types.LOAD_PROJECTS_DATA, payload: data })
  } catch (e) {
    console.log(`Error fetching projects data:\n${e}`)
  }
}

export const loadGalleryData = () => async dispatch => {
  try {
    const response = await fetch('/data/gallery.json')
    const data = await response.json()

    dispatch({ type: types.LOAD_GALLERY_DATA, payload: data })
  } catch (e) {
    console.log(`Error fetching gallery data:\n${e}`)
  }
}
