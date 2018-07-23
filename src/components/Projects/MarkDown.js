import React from 'react'
import Markdown from 'markdown-to-jsx'

import Gallery from '../Gallery'
import ALink from '../ALink'

/**
 * we are going to replace on the fly:
 *    <a> -> <ALink>
 *    <Photo> -> <Gallery className='LinkInProjectCard'>
 */
const MarkdownOptions = {
  overrides: {
    a: {
      component: ALink,
      props: {
        className: 'LinkInProjectCard',
        onClick: e => e.stopPropagation()
      }
    },
    Photo: {
      component: Gallery,
      props: {
        className: 'LinkInProjectCard',
        onClick: e => e.stopPropagation()
      }
    }
  }
}

/**
 * A MarkDown rendering compoent,
 * injected with predefined options
 * especially to be used inside ProjectCard
 */
const MarkDown = ({ children, ...rest }) => (
  <Markdown {...rest} options={MarkdownOptions}>
    {children}
  </Markdown>
)

export default MarkDown