import React from 'react'
import _ from 'lodash'

import pages from './pages'

const componentFromProps = props => {
  const component =
    pages[props.locale][props.appUrl] ||
    pages[props.defaultLocale][props.appUrl]
  if (component) {
    return React.createElement(component, { ...props })
  }
  return null
}

const Content = props => {
  const { locale, appUrl } = props
  return (
    <div className="Cnt">
      Content : {locale} : {appUrl}
      {componentFromProps(props)}
    </div>
  )
}

export default Content
