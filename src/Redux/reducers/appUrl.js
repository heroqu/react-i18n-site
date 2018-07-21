import * as actionTypes from '../constants/actionTypes'

const initialState = ''

const appUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_URL:
      return action.payload
    default:
  }
  return state
}

export default appUrlReducer
