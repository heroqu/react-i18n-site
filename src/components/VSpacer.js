import React from 'react'

const VSpacer = props => {
  const { height } = props
  const style = {
    height: height || '1rem'
  }
  return <div style={style} />
}

export default VSpacer
