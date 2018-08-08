const fs = require('fs')

const ENV_FILE = './.env.production'
const VAR = 'REACT_APP_BUILD_TIMESTAMP'

/**
 * Write down build timestamp into environment variable.
 *
 * Run this module each time the app is being building
 */
function timestampTheBuild() {
  let content = ''

  try {
    if (fs.existsSync(ENV_FILE)) {
      content = fs.readFileSync(ENV_FILE, 'utf8')

      // remove the var if already there
      content = content.replace(new RegExp(`^\s*${VAR}=.*$`, 'gm'), '')

      // remove trailing blank chars or lines
      content = content.replace(/\s*$/g, '')
    }

    // append the var assignment at the end
    content = `${content}
${VAR}=${Date.now()}
`
    fs.writeFileSync(ENV_FILE, content, 'utf8')
  } catch (err) {
    console.log('ERROR timestamping the build:', err)
  }
}

timestampTheBuild()
