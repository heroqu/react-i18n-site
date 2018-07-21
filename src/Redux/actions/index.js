import * as types from '../constants/actionTypes'
import localeCookie from '../../utils/localeCookie'
import { resolveLocale } from '../../utils/i18n'

export const setLocale = locale => {
  locale = resolveLocale(locale)
  localeCookie.set(locale)
  return { type: types.SET_LOCALE, payload: locale }
}

export const setAppUrl = appUrl => ({
  type: types.SET_APP_URL,
  payload: appUrl
})
