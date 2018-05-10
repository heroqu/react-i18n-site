import * as actionTypes from '../constants/actionTypes'

const initialState = ''

const appUrlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_URLS:
      return action.payload
    default:
  }
  return state
}

export default appUrlsReducer
