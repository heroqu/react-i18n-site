import React from 'react'
import pages from './pages'
import Projects from './projects/Projects'
import Gallery from './Gallery'
import NotFound from './NotFound'

import './Content.css'
import Debug from './Debug'

const componentFromProps = props => {
  let component =
    pages[props.locale][props.appUrl] ||
    pages[props.defaultLocale][props.appUrl]

  if (!component) {
    // not a static page, could also be a special
    // (we have only one such page currently)
    if (props.appUrl === 'experience') {
      component = Projects
    } else {
      component = NotFound
    }
  }

  if (component) {
    return React.createElement(component, { ...props })
  }
  return null
}

const Content = props => {
  const { locale, appUrl } = props
  return (
    <div className="Cnt PadTop">
      <Debug>
        Content : {locale} : {appUrl}
      </Debug>
      {componentFromProps(props)}
    </div>
  )
}

export default Content
