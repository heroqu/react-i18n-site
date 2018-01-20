import React from 'react'
import { render } from 'react-dom'
import getStore from './store'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import './index.css'

render(
  <Provider store={getStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
