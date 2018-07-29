import * as actionTypes from '../constants/actionTypes'
import { get as localeCookieGet } from '../../lib/localeCookie'
import { extractLocale } from '../../lib/i18n'

// Will be a valid locale OR ''
const initialState = extractLocale(localeCookieGet())

const localeReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    return action.payload
  }
  return state
}

export default localeReducer
