import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import classNames from 'classnames'

const colors = {
  link: 'hsl(48, 100%, 91%)',
  linkHover: 'hsl(0, 100%, 42%)',
  lighter: 'hsla(220, 20%, 80%, 0.32)'
}

const styles = theme => ({
  root: {
    minWidth: '2.5em',
    minHeight: '2.2em',
    padding: '0 0.7em',
    borderRadius: '0.25em',
    color: colors.link,
    backgroundColor: 'transparent',
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
