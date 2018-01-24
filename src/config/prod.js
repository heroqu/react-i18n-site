//  prod.js

module.exports = {
  env: process.env.NODE_ENV,
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
  ALLOWED_LOCALES: (''+process.env.ALLOWED_LOCALES).split(','),
  ROOT_PAGE: process.env.ROOT_PAGE,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE
}
