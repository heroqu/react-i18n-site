import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Drawer, List, ListItem } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import AppButton from '../Buttons/AppButton'
import NavButton from '../Buttons/NavButton'

import { navMessages } from '../../i18n/FMessages'

const colors = {
  trans: 'hsla(0, 0%, 0%, 0)',
  fgLink: 'hsla(48, 100%, 90%, 1)',
  fgDark: 'hsla(220, 20%, 40%, 1)',
  bgDark: 'hsla(220, 20%, 50%, 1)',
  bgDarker: 'hsla(220, 20%, 40%, 1)',
  bgDarkerTrans: 'hsla(220, 20%, 35%, 0.4)',
  bgLight: 'hsla(220, 20%, 55%, 1)',
  bgLighter: 'hsla(220, 20%, 65%, 1)',
  bgLighterTrans: 'hsla(220, 20%, 55%, 0.75)'
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  paper: {
    background: colors.trans,
    left: '0.5em',
    top: '0.5em',
    height: 'auto'
  },
  list: {
    margin: 0,
    width: '10em',
    minWidth: '35vw',
    background: 'transparent',
    color: colors.fgDark,
    marginBottom: 0
  },
  button: {
    textTransform: 'none',
    fontFamily: 'Arsenal',
    fontSize: '1.2em',
    borderRadius: 0,
    background: colors.bgLighterTrans,
    marginTop: '1px !important',
    '&:hover': {
      backgroundColor: 'transparent',
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      },
      '&:disabled': {
        backgroundColor: 'transparent'
      }
    }
  },
  menuButton: {
    position: 'fixed',
    top: 5,
    left: 10
  }
})

class MenuLeft extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { classes } = this.props

    const itemList = (
      <List className={classes.list}>
        {Object.keys(navMessages).map((key, idx) => (
          <ListItem
            key={`ButtonNumber_${idx}`}
            to={`/${key}`}
            component={NavButton}
            className={classes.button}
          >
            {navMessages[key]}
          </ListItem>
        ))}
      </List>
    )

    return (
      <Fragment>
        <AppButton
          variant="raised"
          size="small"
          aria-label="menu"
          className={classes.menuButton}
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon />
        </AppButton>
        <Drawer
          classes={{
            paper: classes.paper
          }}
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {itemList}
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

MenuLeft.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuLeft)
