import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from '../reducers'

const store = createStore(reducer, applyMiddleware(thunk))

const Redux = ({ children }) => <Provider store={store}>{children}</Provider>

export default Redux
