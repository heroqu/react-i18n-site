import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE } from '../config'
import localeCookie from '../i18n/localeCookie'

const initialState = {
  locale: localeCookie.get() || '',
  linkPrefix: ''
}

const i18nReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCALE:
      const locale = action.payload
      const linkPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
      return { locale, linkPrefix }
    default:
  }
  return state
}

export default i18nReducer
