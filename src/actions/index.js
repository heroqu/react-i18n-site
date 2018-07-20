import * as types from '../constants/actionTypes'
import localeCookie from '../i18n/localeCookie'
import { resolveLocale } from '../i18n'

export const setLocale = locale => {
  locale = resolveLocale(locale)
  localeCookie.set(locale)
  return { type: types.SET_LOCALE, payload: locale }
}

export const setAppUrl = appUrl => ({
  type: types.SET_APP_URL,
  payload: appUrl
})
