import { Divider } from '@material-ui/core'
import React from 'react'
import Home from '../../pages/Home/Home'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidbar'
import useStyle from './style'
const Layout = () => {
  const classes = useStyle()
  return (

    <div className={classes.root}>

      <RightSidebar />
      <Divider orientation={'vertical'} className={classes.divider}/>
  <Home />
<Divider orientation={'vertical'} className={classes.divider}/>
 <LeftSidebar />

    </div>
  );
}

export default Layout;