import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppLink from '../AppLink'
import AppButton from './AppButton'

class NavButton extends Component {
  constructor(props) {
    super(props)
    this.innerRef = React.createRef()
  }

  handleClick(e) {
    this.innerRef.current.click()
  }

  render() {
    const { appUrl, to, children, ...rest } = this.props
    const isActive = `/${appUrl}` === to

    // dispatch function sometimes slippes here
    // while is not allowed for <a> tag
    // simply get rid of it
    delete rest.dispatch

    return (
      /**
       * What's going on here is:
       *
       * - inner component (AppLink) carries no label and thus occupies
       *      no surface area on screen
       * - text label is outside of AppLink and is being
       *      rendered directly by Button (as {children})
       * - all the mouse clicks are catched by Button and redirected
       *      to a AppLink to do its job of navigating
       *
       * All of these together makes a clear separation of concerns:
       *    Button plays representational role
       *      (taking care of label color among other things)
       *    AppLink plays functional (navigational) role only
       *      (not mixing with the label coloring
       *      - as it otherwise would be, be the label placed inside the AppLink)
       */
      <AppButton
        {...rest}
        onClick={() => this.handleClick()}
        isActive={isActive}
      >
        {children}
        <div
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <AppLink to={to}>
            <span ref={this.innerRef} />
          </AppLink>
        </div>
      </AppButton>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.i18n.locale,
  appUrl: state.appUrl
})

export default connect(mapStateToProps)(NavButton)
