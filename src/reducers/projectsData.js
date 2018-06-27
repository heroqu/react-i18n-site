import * as actionTypes from '../constants/actionTypes'

const initialState = {
  projects: [],
  tags: []
}

const projectsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PROJECTS_DATA:
      return action.payload
    default:
  }
  return state
}

export default projectsDataReducer
