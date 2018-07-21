import React, { Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Redux from './Redux'
import AppRouter from './routers/AppRouter'
import Intl from './Intl'
import Theme from './Theme'
import Layout from './Layout'

/**
 * What happens here:
 *
 * 1. Redux provider
 * 2. React-Router provider
 * 3. AppRouter
 *     takes care of App routes and redirect logic
 * 4. Intl
 *      React-Intl provider loaded with translation messages
 *      and locale data.
 * 5. Theme
 *      Material-UI theme provider, initiated with our theme
 * 6. Proceed to Layout to display something on the screen
 */
const App = () => (
  <Redux>
    <Router>
      <AppRouter>
        <Intl>
          <Theme>
            <Layout />
          </Theme>
        </Intl>
      </AppRouter>
    </Router>
  </Redux>
)

export default App
