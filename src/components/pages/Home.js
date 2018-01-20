import React from 'react'
import ShowProps from '../ShowProps'

const Home = props => (
  <div className="Cnt">
    <h2>[ Home ]</h2>
    <ShowProps {...props} />
  </div>
)

export default Home
