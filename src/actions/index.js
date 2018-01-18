import * as types from '../constants/actionTypes'

export const setLocale = locale => ({ type: types.SET_LOCALE, payload: locale })
export const nextLocale = () => ({ type: types.NEXT_LOCALE })
