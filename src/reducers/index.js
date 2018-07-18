import { combineReducers } from 'redux'
import i18n from './i18n'
import appUrl from './appUrl'
import projectsData from './projectsData'
import galleryData from './galleryData'

const rootReducer = combineReducers({
  i18n,
  appUrl,
  projectsData,
  galleryData
})

export default rootReducer
