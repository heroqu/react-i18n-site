import React from 'react'

import './index.css'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import '../assets/fonts'

const theme = createMuiTheme({
  breakpoints: {
    // We choose to have somewhat narrower breakpoints
    // as compared to the default set
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
  spacing: { unit: 5 },
  palette: {
    primary: {
      light: 'hsla(220, 40%, 60%, 1)',
      main: 'hsla(220, 30%, 50%, 1)',
      dark: 'hsla(220, 20%, 45%, 1)',
      contrastText: '#fff'
    },
    error: {
      light: 'hsla(40, 100%, 80%, 1)',
      main: 'hsla(0, 50%, 45%, 1)',
      dark: 'hsla(20, 100%, 60%, 1)',
      contrastText: '#fff'
    }
  }
})

const Theme = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)

export default Theme
