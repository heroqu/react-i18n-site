import React from 'react'
import './ShowProps.css'

/**
 * Use this component to quickly visualize the props
 */
const ShowProps = props => {
  let { children, ...mainProps } = props

  children = children ? (
    <React.Fragment>
      children:
      <div className="Cnt">{children}</div>
    </React.Fragment>
  ) : null

  return (
    <div className="Cnt">
      <div className="Compact">
        <p>props:</p>
        <pre className="Yellow Ind">{JSON.stringify(mainProps,null,2)}</pre>
        {children}
      </div>
    </div>
  )
}

export default ShowProps
