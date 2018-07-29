import { COOKIE_SECRET, COOKIE_MAX_AGE } from '../config'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const maxAge = COOKIE_MAX_AGE || 30 * 24 * 3600
const KEY = `LOCALE_${COOKIE_SECRET}`

export const get = () => cookies.get(KEY)

export const set = locale => cookies.set(KEY, locale, { path: '/', maxAge })

export default { get, set }
