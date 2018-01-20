import { combineReducers } from 'redux'
import i18n from './i18n'
import appUrl from './appUrl'

const rootReducer = combineReducers({
  i18n,
  appUrl
})

export default rootReducer
