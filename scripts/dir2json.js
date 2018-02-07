const { readFileSync, writeFileSync, ensureDir } = require('fs-extra')
const path = require('path')
const globSync = require('glob').sync

const NOOP = x => x

function dir2json(srcDir, srcExt, destFile, fileOp) {
  const EXT = `.${srcExt}`.replace(/^\.\./, '.')
  const SRC_PATTERN = path.resolve(srcDir, `*${EXT}`)

  fileOp = fileOp || NOOP

  // take all files with a given extension from the source dir
  // and combine them into a single json file,
  // with each source file's data stored under a key
  // equal to source file name

  const combinedData = globSync(SRC_PATTERN)
    .map(filename => ({
      basename: path.basename(filename, EXT),
      data: fileOp(readFileSync(filename, 'utf8'))
    }))
    .reduce((acc, { basename, data }) => {
      acc[basename] = data
      return acc
    }, {})

  destFile = path.resolve(destFile)
  ensureDir(path.dirname(destFile))

  writeFileSync(destFile, JSON.stringify(combinedData, null, 2))
}

module.exports = dir2json
