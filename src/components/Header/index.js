import React, { Fragment } from 'react'
import { Hidden } from '@material-ui/core'

import MenuTop from './MenuTop'
import MenuLeft from './MenuLeft'
import LanguagePanel from './LanguagePanel'

/**
 * when width >= 768px shows MenuTop
 * when width < 768px shows MenuLeft
 * always show LanguagePanel
 */
const Header = () => (
  <Fragment>
    <Hidden smDown>
      <MenuTop />
    </Hidden>
    <Hidden mdUp>
      <MenuLeft />
    </Hidden>
    <LanguagePanel />
  </Fragment>
)

export default Header
