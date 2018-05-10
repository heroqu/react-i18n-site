import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE } from '../config'
import localeCookie from '../i18n/localeCookie'

const initialState = {
  defaultLocale: DEFAULT_LOCALE,
  locale: localeCookie.get() || '',
  linkPrefix: ''
}

const i18nReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    const locale = action.payload
    const linkPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
    return { ...state, locale, linkPrefix }
  }
  return state
}

export default i18nReducer
