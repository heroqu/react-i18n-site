import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE } from '../config'

const initialState = {
  locale: DEFAULT_LOCALE,
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
