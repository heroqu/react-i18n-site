const dir2json = require('./dir2json')

dir2json(
  './translations/edited/',
  'json',
  './src/i18n/messages.json',
  JSON.parse
)
