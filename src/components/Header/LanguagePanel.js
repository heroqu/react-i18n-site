import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'

import LocaleButton from '../Buttons/LocaleButton'

import { connect } from 'react-redux'

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
    minHeight: '1em'
  },
  button: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  }
})

const LanguagePanel = props => {
  const { classes, allowedLocales } = props

  return (
    <div className={classes.root}>
      <Toolbar _color="inherit" className={classes.toolBar}>
        {allowedLocales.map((toLocale, idx) => (
          <LocaleButton
            key={`ButtonNumber_${idx}`}
            size="small"
            variant="raised"
            color="inherit"
            className={classes.button}
            // locale={locale}
            toLocale={toLocale}
          >
            {toLocale}
          </LocaleButton>
        ))}
      </Toolbar>
    </div>
  )
}

const mapsStateToProps = state => ({
  allowedLocales: state.i18n.allowedLocales
})

export default withStyles(styles)(connect(mapsStateToProps)(LanguagePanel))
