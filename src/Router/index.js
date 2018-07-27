import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { HOME_PAGE } from '../config'
import LocaleRouter from './LocaleRouter'
import ScrollToTop from './ScrollToTop'

/**
 * App routing rules are here
 */
const Router = ({ children }) => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to={`/${HOME_PAGE}`} />
      <LocaleRouter>
        <ScrollToTop />
        {children}
      </LocaleRouter>
    </Switch>
  </BrowserRouter>
)

export default Router
