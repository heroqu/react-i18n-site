import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE } from '../../config'
import localeCookie from '../../utils/localeCookie'
import { localeURLPrefix } from '../../utils/i18n'

const localeFromCookie = localeCookie.get() || ''

const initialState = {
  locale: localeFromCookie
}

const i18nReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    const locale = action.payload
    return { ...state, locale }
  }
  return state
}

export default i18nReducer
