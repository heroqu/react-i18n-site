import { combineReducers } from 'redux'
import i18n from './i18n'
import appUrl from './appUrl'
import staticData from './staticData'

const rootReducer = combineReducers({
  i18n,
  appUrl,
  staticData
})

export default rootReducer
