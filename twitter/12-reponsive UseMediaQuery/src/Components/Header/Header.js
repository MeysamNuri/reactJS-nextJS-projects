import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import useStyle from '../../pages/Home/style'
import { setToggleDrawer, useDrawerDispatch, useDrawerState } from '../../Context/LayoutContext';

const Header = ({title,icon}) => {
    const theme = useTheme()
const isTabletSize = useMediaQuery(theme.breakpoints.down("sm"))
const {toggleDrawer}=useDrawerState()
const DrawerDispatch=useDrawerDispatch()
    const classes=useStyle()
    return (  

        <div className={classes.header}>
            {isTabletSize && <IconButton onClick={()=>setToggleDrawer(DrawerDispatch)} className={classes.menu}> <MenuRoundedIcon /></IconButton>}
            {icon}
            <Typography className={classes.headerTitle}>
               { title}
            </Typography>


        </div>
    );
}
 
export default Header;