import React from 'react'

import Redux from './Redux'
import Router from './Router'
import Intl from './Intl'
import Theme from './Theme'
import Layout from './Layout'

/**
 * What happens here:
 *
 * 1. Redux provider
 * 2. Router
 *     takes care of App routes and redirect logic
 * 3. Intl
 *      React-Intl provider loaded with translation messages
 *      and locale data.
 * 4. Theme
 *      Material-UI theme provider, initiated with our theme
 * 5. Proceed to Layout to display something on the screen
 */
const App = () => (
  <Redux>
    <Router>
      <Intl>
        <Theme>
          <Layout />
        </Theme>
      </Intl>
    </Router>
  </Redux>
)

export default App
