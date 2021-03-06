import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import AppButton from '../buttons/AppButton'
import NavButton from '../buttons/NavButton'

import navMessages from '../../Intl/navMessages'

const colors = {
  fgDark: 'hsla(220, 20%, 40%, 1)',
  bgLighterTrans: 'hsla(220, 20%, 55%, 0.75)',
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    background: 'transparent',
    left: '0.5rem',
    top: '0.5rem',
    height: 'auto',
  },
  list: {
    margin: 0,
    width: '10rem',
    minWidth: '35vw',
    background: 'transparent',
    color: colors.fgDark,
    marginBottom: 0,
  },
  button: {
    textTransform: 'none',
    fontFamily: 'Arsenal',
    fontSize: '1.2rem',
    borderRadius: 0,
    background: colors.bgLighterTrans,
    marginTop: '1px',
    '&:hover': {
      backgroundColor: 'transparent',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&:disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
  menuButton: {
    position: 'fixed',
    top: 5,
    left: 10,
  },
})

class MenuLeft extends React.Component {
  state = {
    isOpen: false,
  }

  showDrawer = () => {
    this.setState({
      isOpen: true,
    })
  }

  hideDrawer = () => {
    this.setState({
      isOpen: false,
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
          variant="contained"
          size="small"
          aria-label="menu"
          className={classes.menuButton}
          onClick={this.showDrawer}
        >
          <MenuIcon />
        </AppButton>
        <Drawer
          classes={{
            paper: classes.paper,
          }}
          open={this.state.isOpen}
          onClose={this.hideDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.hideDrawer}
            onKeyDown={this.hideDrawer}
          >
            {itemList}
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

MenuLeft.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MenuLeft)
