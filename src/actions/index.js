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

export const loadStaticData = () => async dispatch => {
  try {
    const response = await fetch('/static.json')
    const staticData = await response.json()

    dispatch({ type: types.LOAD_STATIC_DATA, payload: staticData })
  } catch (e) {
    console.log(`Error fetching static data:\n${e}`)
  }
}
