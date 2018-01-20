import { createStore } from 'redux'
import reducer from '../reducers'

let store

const getStore = (() => () => (store = store || createStore(reducer)))()

export default getStore
