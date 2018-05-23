import React from 'react'
import { FormattedMessage } from 'react-intl'

const defaultMessages = {
  nav: {
    Home: 'Home',
    Intro: 'Intro',
    Skills: 'Skills',
    Experience: 'Experience',
    Foss: 'Open Source',
    Education: 'Education',
    About: 'About',
    Contact: 'Contact'
  }
}

export function navMessages() {
  return Object.keys(defaultMessages.nav).reduce((acc, attr) => {
    acc[attr] = fmtMessage(`nav.${attr}`)
    return acc
  }, {})
}

export function fmtMessage(id) {
  // console.log(`fmtMessage: id: ${id}`)
  if (!id) return null

  const defaultMessage =
    `${id}`.split('.').reduce((val, attr) => {
      if (attr && val) {
        val = val[attr]
      }
      return val
    }, defaultMessages) || ''

  // console.log(`fmtMessage: defaultMessage: ${defaultMessage}`)

  if (!defaultMessage) return null

  return <FormattedMessage id={id} defaultMessage={defaultMessage} />
}

export default { fmtMessage, navMessages }
