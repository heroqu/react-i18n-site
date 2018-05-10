import React from 'react'
import { DEBUG_MODE } from '../config'

/**
 * Use this component to wrap something you want to see
 * only when DEBUG_MODE env var is set to 'true'
 */
const Debug = ({ children }) => {
  if (DEBUG_MODE) {
    return <span className="Debug">{children}</span>
  }
  return null
}

export default Debug
