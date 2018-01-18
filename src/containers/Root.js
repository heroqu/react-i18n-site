import React from 'react'
import App from './App'

const Root = props => (
  <div className="Cnt">
    Root
    <App {...props} />
  </div>
)

export default Root
