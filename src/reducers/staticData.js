import * as actionTypes from '../constants/actionTypes'

const initialState = {}

const appUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_STATIC_DATA:
      return action.payload
    default:
  }
  return state
}

export default appUrlReducer
