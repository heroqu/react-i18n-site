import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'

import LocaleButton from '../buttons/LocaleButton'

import { ALLOWED_LOCALES } from '../../config'

const styles = theme => ({
  root: {
    position: 'fixed',
    top: 3,
    right: 16,
    zIndex: 1150,
    padding: 0,
    margin: 0
  },
  toolBar: {
    justifyContent: 'space-around',
    padding: '2px 0',
    minHeight: '1rem'
  },
  button: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  }
})

const LanguagePanel = ({ classes }) => (
  <div className={classes.root}>
    <Toolbar className={classes.toolBar}>
      {ALLOWED_LOCALES.map((toLocale, idx) => (
        <LocaleButton
          key={`ButtonNumber_${idx}`}
          size="small"
          variant="raised"
          color="inherit"
          className={classes.button}
          toLocale={toLocale}
        >
          {toLocale}
        </LocaleButton>
      ))}
    </Toolbar>
  </div>
)

export default withStyles(styles)(LanguagePanel)
