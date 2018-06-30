import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { HOME_PAGE } from '../config'
import LocaleRedirector from './LocaleRedirector'

/**
 * App routing rules are here
 */
const AppRouter = () => (
  <Switch>
    <Redirect exact from="/" to={`/${HOME_PAGE}`} />
    <Route component={LocaleRedirector} />
  </Switch>
)

export default AppRouter
