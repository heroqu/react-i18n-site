import { combineReducers } from 'redux'
import locale from './locale'
import appUrl from './appUrl'

const rootReducer = combineReducers({
  locale,
  appUrl
})

export default rootReducer
