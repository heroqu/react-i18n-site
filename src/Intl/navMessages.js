import React from 'react'
import { FormattedMessage } from 'react-intl'

import { DEFAULT_LOCALE } from '../config'
import messages from './messages.json'

/**
 * Only messages from default language branch
 */
const defaultMessages = messages[DEFAULT_LOCALE]

/**
 * Extract only those of them, that have keys like 'nav.something'.
 *
 * Example:
 *
 * {
 *   en:
 *    {
 *      nav.intro: 'Intro',
 *      nav.opensource: 'Open Source',
 *      nav.about: 'About',
 *      ...
 *    },
 *    ...
 * }
 *   ===>
 * {
 *   intro: 'Intro',
 *   opensource: 'Open Source'
 *   about: 'About'
 *   ...
 * }
 */
const defaultNavMessages = Object.keys(defaultMessages)
  .filter(key => key.split('.')[0] === 'nav')
  .reduce((acc, key) => {
    acc[key.split('.')[1]] = defaultMessages[key]
    return acc
  }, {})

/**
 * Replace spaces with unbreakable spaces
 * (we need that for menu titles)
 */
const unBreakSpace = txt => `${txt}`.replace(/ /g, '\u00a0')

/**
 * When making <FormattedMessage> the `id` key is not enough,
 * as `defaultMessage` is also obligatory.
 * Here we take care of automatically prepopulating defaultMessage attribute. *
 * @param  {string} id          - message key
 * @return {FormattedMessage}   - the component from React-intl package
 */
const makeFormattedMessage = id => {
  let defaultMessage = (id && defaultMessages && defaultMessages[id]) || null
  if (!defaultMessage) {
    return null
  }
  defaultMessage = unBreakSpace(defaultMessage)
  return <FormattedMessage {...{ id, defaultMessage }} />
}

/**
 * For each key starting with `nav.` we create a <FormattedMessage>
 * component in advance. This goes in the form of:
 *
 * {
 *   intro: <FormattedMessage ... />,
 *   about: <FormattedMessage ... />,
 *   ...
 * }
 *
 */
export const navMessages = Object.keys(defaultNavMessages).reduce(
  (acc, attr) => {
    acc[attr.toLowerCase()] = makeFormattedMessage(`nav.${attr}`)
    return acc
  },
  {},
)

export default navMessages
