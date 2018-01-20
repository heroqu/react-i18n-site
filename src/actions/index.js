import * as types from '../constants/actionTypes'
import localeCookie from '../i18n/localeCookie'
import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

const sanitize = input => {
  if (input) {
    return ('' + input).toLowerCase().trim()
  }
  return ''
}

const sanitizedLocale = locale => {
  locale = sanitize(locale)
  if (ALLOWED_LOCALES.indexOf(locale) !== -1) {
    return locale
  }
}

export const setLocale = locale => {
  locale = sanitizedLocale(locale) || DEFAULT_LOCALE
  localeCookie.set(locale)
  // if (locale !== localeCookie.get()) {
  //   return {
  //     type: types.SET_LOCALE,
  //     payload: 'Unable to save locale to cookie',
  //     error: true
  //   }
  // }
  return { type: types.SET_LOCALE, payload: locale }
}

export const nextLocale = () => {
  let locale = sanitizedLocale(localeCookie.get())
  if (locale) {
    let index = ALLOWED_LOCALES.indexOf(locale) + 1
    if (index >= ALLOWED_LOCALES.length) {
      index = 0
    }
    locale = ALLOWED_LOCALES[index]
  } else {
    locale = DEFAULT_LOCALE
  }
  return setLocale(locale)
}

export const setAppUrl = appUrl => ({
  type: types.SET_APP_URL,
  payload: appUrl
})
