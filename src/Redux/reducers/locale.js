import * as actionTypes from '../constants/actionTypes'
import { get as localeCookieGet } from '../../utils/localeCookie'
import { extractLocale } from '../../utils/i18n'

// Will be a valid locale OR ''
const initialState = extractLocale(localeCookieGet())

const localeReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    return action.payload
  }
  return state
}

export default localeReducer
