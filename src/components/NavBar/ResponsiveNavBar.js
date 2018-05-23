/**
 * Little enhanced version of react-responsive-navbar
 * npm module by Stephanie Tassone. Changes:
 *  - using flexboxes instead of blocks
 *  - no more extra div around regular dropped down items that
 *      go after the Close icon. Now they are all siblings
 *  - onClick to toggle dropdown menu is now fired at level of menu,
 *      and not of individual menu items
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SmallMenu = styled.div`
  display: none;
  text-align: center;
  @media (max-width: ${props => props.size}) {
    flex-flow: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;
  }
`

const SmallMenuBox = styled.div`
  display: none;
  @media (max-width: ${props => props.size}) {
    display: flex;
    flex-flow: row nowrap;
    background: ${props => props.bg || 'hsla(0, 0%, 0%, 0)'};
    font-size: 1.3em;
  }
`

const LargeMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  @media (max-width: ${props => props.size}) {
    display: none;
  }
`

export const MenuItem = styled.div`
  flex: ${props => props.flex || '0 0 auto'};

  @media (max-width: ${props => props.size}) {
    background-image: 'url()';
    font-size: 1.5em;
  }
`

const MenuIcon = ({ icon, ...rest }) => (
  <MenuItem flex="1 1 auto" role="button" {...rest}>
    {icon}
  </MenuItem>
)

class ResponsiveMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  handleClick = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render() {
    const {
      menu,
      largeMenuClassName,
      smallMenuClassName,
      changeMenuOn,
      menuOpenButton,
      menuCloseButton,
      bg
    } = this.props

    return (
      <div>
        <LargeMenu className={largeMenuClassName} size={changeMenuOn}>
          {menu}
        </LargeMenu>
        <SmallMenuBox bg={bg} size={changeMenuOn}>
          <SmallMenu
            onClick={this.handleClick}
            className={smallMenuClassName}
            size={changeMenuOn}
          >
            {!this.state.showMenu ? (
              <MenuIcon icon={menuOpenButton} />
            ) : (
              <React.Fragment>
                <MenuIcon icon={menuCloseButton} />
                {menu}
              </React.Fragment>
            )}
          </SmallMenu>
        </SmallMenuBox>
      </div>
    )
  }
}

ResponsiveMenu.propTypes = {
  menu: PropTypes.node.isRequired,
  largeMenuClassName: PropTypes.string,
  smallMenuClassName: PropTypes.string,
  changeMenuOn: PropTypes.string.isRequired,
  menuOpenButton: PropTypes.node.isRequired,
  menuCloseButton: PropTypes.node.isRequired
}

ResponsiveMenu.defaultProps = {
  largeMenuClassName: '',
  smallMenuClassName: ''
}

export default ResponsiveMenu
