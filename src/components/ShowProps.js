import React from 'react'
import jsonStringify from 'json-pretty'

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
        <pre className="Yellow Ind">{jsonStringify(mainProps)}</pre>
        {children}
      </div>
    </div>
  )
}

export default ShowProps
