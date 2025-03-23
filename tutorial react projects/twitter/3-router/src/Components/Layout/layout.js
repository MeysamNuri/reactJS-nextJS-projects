import { Divider } from '@material-ui/core'
import React from 'react'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidbar'
import useStyle from './style'
const Layout = (props) => {
  const classes = useStyle()
  return (

    <div className={classes.root}>

      <RightSidebar />
      <Divider orientation={'vertical'} className={classes.divider} />
      <div className={classes.contet}>
     {props.children}
      </div>
      <Divider orientation={'vertical'} className={classes.divider} />
      <LeftSidebar />

    </div>
  );
}

export default Layout;