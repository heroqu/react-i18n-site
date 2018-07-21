import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE } from '../../config'
import localeCookie from '../../utils/localeCookie'

const linkPrefixFromLocale = locale =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`

const localeFromCookie = localeCookie.get() || ''

const initialState = {
  locale: localeFromCookie,
  linkPrefix: linkPrefixFromLocale(localeFromCookie)
}

const i18nReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    const locale = action.payload
    const linkPrefix = linkPrefixFromLocale(locale)
    return { ...state, locale, linkPrefix }
  }
  return state
}

export default i18nReducer
