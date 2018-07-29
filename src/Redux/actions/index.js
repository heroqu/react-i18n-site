import * as types from '../constants/actionTypes'
import { set as localeCookieSet } from '../../lib/localeCookie'
import { resolveLocale } from '../../lib/i18n'

export const setLocale = locale => {
  locale = resolveLocale(locale)
  localeCookieSet(locale)
  return { type: types.SET_LOCALE, payload: locale }
}

export const setAppUrl = appUrl => ({
  type: types.SET_APP_URL,
  payload: appUrl
})
