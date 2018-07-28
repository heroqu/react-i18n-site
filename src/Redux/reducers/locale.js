import * as actionTypes from '../constants/actionTypes'
import localeCookie from '../../utils/localeCookie'
import { extractLocale } from '../../utils/i18n'

// Will be a valid locale OR ''
const initialState = extractLocale(localeCookie.get())

const localeReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_LOCALE) {
    return action.payload
  }
  return state
}

export default localeReducer
