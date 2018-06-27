import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import classNames from 'classnames'

const colors = {
  trans: 'transparent',
  link: 'hsl(48, 100%, 91%)',
  linkActive: 'hsl(220, 20%, 10%)',
  linkHover: 'hsla(0, 100%, 42%, 1)',
  lighter: `hsla(220, 20%, 80%, 0.32)`,
  darker: `hsla(220, 20%, 20%, 0.25)`
}

const styles = theme => ({
  root: {
    // minWidth: theme.spacing.unit * 11,
    minWidth: '2.5em',
    minHeight: '2.2em',
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    padding: `0 0.7em`,
    // borderRadius: 4,
    borderRadius: '0.25em',
    // color: theme.palette.text.primary,
    color: colors.link,
    backgroundColor: colors.trans,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': {
      textDecoration: 'none',
      color: colors.linkHover,
      backgroundColor: colors.lighter,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  raised: {
    color: colors.link,
    '&:hover': {
      backgroundColor: colors.lighter,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
})

const AppButton = ({ children, className, isActive, ...rest }) => {
  if (isActive) {
    className = classNames(className, 'Button__Active')
  }

  return (
    <Button className={className} {...rest}>
      {children}
    </Button>
  )
}

export default withStyles(styles, { name: 'MuiButton' })(AppButton)
