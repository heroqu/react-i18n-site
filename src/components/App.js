import React, { Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import LocaleRedirector from './LocaleRedirector'
import Intl from './Intl'
import Theme from './Theme'
import Layout from './Layout'

/**
 * What happens here:
 *
 * 1. React-Router
 * 2. LocaleRedirector
 *     make sure the url matches locale,
 *     and if it doesn't then do a React-router's Redirect
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
      <LocaleRedirector />
      <Intl>
        <Theme>
          <Layout />
        </Theme>
      </Intl>
    </Fragment>
  </Router>
)

export default App
