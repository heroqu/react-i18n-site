import React from 'react'
import { FormattedMessage } from 'react-intl'

import { DEFAULT_LOCALE } from '../config'
import messages from '../i18n/messages.json'

const defaultMessages = messages[DEFAULT_LOCALE]

const defaultNavMessages = Object.keys(defaultMessages)
  .filter(key => key.split('.')[0] === 'nav')
  .reduce((acc, key) => {
    acc[key.split('.')[1]] = defaultMessages[key]
    return acc
  }, {})

// use unbreakable spaces inside menu titles
const unBreakSpace = txt => `${txt}`.replace(/ /g, '\u00a0')

export const navMessages = Object.keys(defaultNavMessages).reduce(
  (acc, attr) => {
    acc[attr.toLowerCase()] = fmtMessage(`nav.${attr}`)
    return acc
  },
  {}
)

export function fmtMessage(id) {
  if (!id) return null

  let defaultMessage = defaultMessages[id]

  if (!defaultMessage) return null

  if (defaultMessage.indexOf(' ') !== -1) {
    defaultMessage = unBreakSpace(defaultMessage)
  }

  return <FormattedMessage {...{ id, defaultMessage }} />
}

export default { fmtMessage, navMessages }
