import React from 'react'
import jsonStringify from 'json-pretty'

const ShowProps = props => {
  const { children, ...mainProps } = props

  return (
    <div className="Cnt">
      <div className="Compact">
        <p>props:</p>
        <pre className="Yellow Ind">{jsonStringify(mainProps)}</pre>
        <p>children:</p>
        <div className="Cnt">{children}</div>
      </div>
    </div>
  )
}

export default ShowProps
