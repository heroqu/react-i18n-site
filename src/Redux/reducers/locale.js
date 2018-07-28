import * as actionTypes from '../constants/actionTypes'
import { DEFAULT_LOCALE } from '../../config'
import localeCookie from '../../utils/localeCookie'
import { extractLocale } from '../../utils/i18n'

const initialState = extractLocale(localeCookie.get())

const localeReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    return action.payload
  }
  return state
}

export default localeReducer
