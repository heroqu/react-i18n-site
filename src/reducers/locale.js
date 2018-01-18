import { SET_LOCALE } from '../constants/actionTypes'
import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

const initialState = DEFAULT_LOCALE

const sanitizedLocale = locale => {
  locale = ('' + locale).toLowerCase().trim()
  if (ALLOWED_LOCALES.indexOf(locale) !== -1) {
    return locale
  }
}

const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      const locale = sanitizedLocale(action.payload)
      if (locale) {
        return locale
      }
    default:
  }
  return state
}

export default localeReducer
