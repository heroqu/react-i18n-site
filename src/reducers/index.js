import { combineReducers } from 'redux'
import i18n from './i18n'
import appUrl from './appUrl'
import projectsData from './projectsData'

const rootReducer = combineReducers({
  i18n,
  appUrl,
  projectsData
})

export default rootReducer
