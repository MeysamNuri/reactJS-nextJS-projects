import { Drawer } from '@material-ui/core';
import React from 'react';
import { useDrawerDispatch, useDrawerState,setToggleDrawer } from '../../Context/LayoutContext';
import RightSidebar from '../RightSidbar';

const TwitterDrawer = () => {
    const {toggleDrawer}=useDrawerState()
    const DrawerDispatch=useDrawerDispatch()
    return (
        <Drawer anchor={"right"} open={toggleDrawer} onClose={()=>{setToggleDrawer(DrawerDispatch)}}>
        <RightSidebar />
      </Drawer>
    )
    
     
}
 
export default TwitterDrawer;