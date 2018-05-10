import * as actionTypes from '../constants/actionTypes'

const initialState = {}

const galleryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_GALLERY_DATA:
      return action.payload
    default:
  }
  return state
}

export default galleryDataReducer
