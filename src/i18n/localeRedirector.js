import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import getStore from '../store'
import { setLocale, setAppUrl } from '../actions'

import { ROOT_PAGE, DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'
import localeCookie from './localeCookie'

const sanitize = obj => {
  if (obj) {
    return ('' + obj).toLowerCase().trim()
  }
  return ''
}

const getFromCookie = () => {
  let locale = sanitize(localeCookie.get())
  if (ALLOWED_LOCALES.indexOf(locale) !== -1) {
    return locale
  }
}

const LocaleRedirector = props => {
  return (
    <Switch>
      <Route exact path="/:locale/:appUrl" component={detector} />
      <Route exact path="/:appUrl" component={detector} />
      <Redirect from="/" to={`/${ROOT_PAGE}`} />
    </Switch>
  )
}

const detector = props => {
  const { match } = props

  const localeFromCookie = getFromCookie()
  const localeFromUrl = sanitize(match.params.locale)

  // the effective locale value that we are going to honour:
  const locale = localeFromCookie || localeFromUrl || DEFAULT_LOCALE

  if (localeFromCookie !== locale) {
    localeCookie.set(locale) // update the cookie
  }

  let appUrl = sanitize(match.params.appUrl)

  let newPathname

  if (locale === DEFAULT_LOCALE) {
    // locale should not appear in url
    if (localeFromUrl) {
      newPathname = `/${appUrl}` // remove it
    }
  } else {
    // locale should appear in url
    if (localeFromUrl !== locale) {
      newPathname = `/${locale}/${appUrl}` // add it
    }
  }

  if (newPathname) {
    // url needs a fix
    return <Redirect to={newPathname} />
  }

  // url is OK

  // update the state
  const store = getStore()
  store.dispatch(setLocale(locale))
  store.dispatch(setAppUrl(appUrl))

  return null
}

export default LocaleRedirector
