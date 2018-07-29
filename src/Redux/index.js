import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer)

const Redux = ({ children }) => <Provider store={store}>{children}</Provider>

export default Redux
