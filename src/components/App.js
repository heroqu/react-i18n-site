import React, { Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppRouter from './routers/AppRouter'

import Intl from './Intl'
import Theme from './Theme'
import Layout from './Layout'

/**
 * What happens here:
 *
 * 1. React-Router provider
 * 2. AppRouter
 *     take care of App routes and redirect logics
 * 3. Intl
 *      React-Intl provider loaded with translation messages
 *      and locale data.
 * 4. Theme
 *      Material-UI theme provider, initiated with our theme
 * 5. Proceed to Layout to display something on the screen
 */
const App = () => (
  <Router>
    <Fragment>
      <AppRouter />
      <Intl>
        <Theme>
          <Layout />
        </Theme>
      </Intl>
    </Fragment>
  </Router>
)

export default App
