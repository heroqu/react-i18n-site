// A slightly modified version of original script by Yury Dymov:
// https://github.com/yury-dymov/smashing-react-i18n/blob/solution/scripts/translate.js

const { readFileSync, writeFileSync, ensureDir } = require('fs-extra')
const globSync = require('glob').sync
const parse = require ('intl-messageformat-parser')

const MESSAGES_PATTERN = './translations/extracted/**/*.json'
const DEST_DIR = './translations/sample/'

const ESCAPED_CHARS = {
  '\\': '\\\\',
  '\\#': '\\#',
  '{': '\\{',
  '}': '\\}'
}

const ESAPE_CHARS_REGEXP = /\\#|[{}\\]/g

//export default
function printICUMessage(ast) {
  return ast.elements.reduce((message, el) => {
    let { format, id, type, value } = el

    if (type === 'messageTextElement') {
      return (
        message +
        value.replace(ESAPE_CHARS_REGEXP, char => {
          return ESCAPED_CHARS[char]
        })
      )
    }

    if (!format) {
      return message + `{${id}}`
    }

    let formatType = format.type.replace(/Format$/, '')

    let style, offset, options

    switch (formatType) {
      case 'number':
      case 'date':
      case 'time':
        style = format.style ? `, ${format.style}` : ''
        return message + `{${id}, ${formatType}${style}}`

      case 'plural':
      case 'selectOrdinal':
      case 'select':
        offset = format.offset ? `, offset:${format.offset}` : ''
        options = format.options.reduce((str, option) => {
          let optionValue = printICUMessage(option.value)
          return str + ` ${option.selector} {${optionValue}}`
        }, '')
        return message + `{${id}, ${formatType}${offset},${options}}`
    }
  }, '')
}

const defaultMessages = globSync(MESSAGES_PATTERN)
  .map(filename => readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`)
      }

      collection[id] = defaultMessage
    })

    return collection
  }, {})

ensureDir(DEST_DIR)
writeFileSync(DEST_DIR + 'en.json', JSON.stringify(defaultMessages, null, 2))
