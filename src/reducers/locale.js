import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

if (!Array.isArray(ALLOWED_LOCALES) || ALLOWED_LOCALES.length === 0) {
  throw new Error('ALLOWED_LOCALES are not configured!')
}

function nextLocale(locale) {
  locale = sanitizedLocale(locale)
  if (!locale) {
    return DEFAULT_LOCALE
  }

  let index = ALLOWED_LOCALES.indexOf(locale) + 1
  if (index >= ALLOWED_LOCALES.length) {
    index = 0
  }
  return ALLOWED_LOCALES[index]
}

const initialState = DEFAULT_LOCALE

const sanitizedLocale = locale => {
  locale = ('' + locale).toLowerCase().trim()
  if (ALLOWED_LOCALES.indexOf(locale) !== -1) {
    return locale
  }
}

const localeReducer = (state = initialState, action) => {
  let locale
  switch (action.type) {
    case actionTypes.SET_LOCALE:
      locale = sanitizedLocale(action.payload)
      if (locale) {
        return locale
      }
    case actionTypes.NEXT_LOCALE:
      locale = sanitizedLocale(state)
      if (!locale) {
        return DEFAULT_LOCALE
      }
      let index = ALLOWED_LOCALES.indexOf(locale) + 1
      if (index >= ALLOWED_LOCALES.length) {
        index = 0
      }
      return ALLOWED_LOCALES[index]
    default:
  }
  return state
}

export default localeReducer
