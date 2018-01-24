let filename

if (process.env.NODE_ENV === 'production') {
  filename = 'prod'
} else {
  filename = 'dev'
}

module.exports = require(`./${filename}`)
