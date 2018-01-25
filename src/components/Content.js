import React from 'react'

import About from './pages/About'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Intro from './pages/Intro'

const componentByProps = props => {
  switch (('' + props.appUrl).toLowerCase().trim()) {
    case 'about':
      return <About {...props} />
    case 'contact':
      return <Contact {...props} />
    case 'education':
      return <Education {...props} />
    case 'experience':
      return <Experience {...props} />
    case 'home':
      return <Home {...props} />
    case 'intro':
      return <Intro {...props} />
    default:
  }
  return <Home {...props} />
}

const Content = props => {
  const { locale, appUrl } = props
  return (
    <div className="Cnt">
      Content : {locale} : {appUrl}
      {componentByProps(props)}
    </div>
  )
}

export default Content
