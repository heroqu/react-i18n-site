import React, { Component } from 'react'
import Debug from './Debug'
import { FormattedMessage } from 'react-intl'

const NotFound = ({ locale }) => (
  <div className="Cnt">
    <Debug>NotFound: {locale}</Debug>
    <h1 className="Title">
      <FormattedMessage
        id="app.not_found"
        defaultMessage="The page is not found"
      />
    </h1>
  </div>
)

export default NotFound
