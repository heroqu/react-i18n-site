const { readFileSync, writeFileSync, ensureDir } = require('fs-extra')
const path = require('path')
const globSync = require('glob').sync

const SRC_PATTERN = './translations/edited/*.json'
const DEST_DIR = './src/i18n'
const destFile = path.resolve(DEST_DIR, 'messages.json')

ensureDir(DEST_DIR)

// takes en.json, ru.json ... and combines them all into
// a single file messages.json under root keys of 'en', 'ru' etc.

const combinedMessages = globSync(SRC_PATTERN)
  .map(filename => ({
    basename: path.basename(filename, '.json'),
    data: JSON.parse(readFileSync(filename, 'utf8'))
  }))
  .reduce((acc, { basename, data }) => {
    acc[basename] = data
    return acc
  }, {})

writeFileSync(destFile, JSON.stringify(combinedMessages, null, 2))
