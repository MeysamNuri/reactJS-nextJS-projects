import { CircularProgress, Divider, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GetUserProfile } from '../../API/api_tweets'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidbar'
import useStyle from './style'
import { useHistory } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TwitterDrawer from '../Drawer/TwitterDrawer'
import { DrawerProvider } from '../../Context/LayoutContext'

const Layout = (props) => {
  const classes = useStyle()
  const history = useHistory()
  const [wait, setWait] = useState(true)
  const theme = useTheme()
  const isTabletSize = useMediaQuery(theme.breakpoints.down("sm"))
  useEffect(() => {
    GetUserProfile((isok, data) => {
      if (!isok) {
        toast.error(data)
        localStorage.clear()
        setWait(false)
        return history.push("/login")
      }
      localStorage.setItem("name", data.name)
      localStorage.setItem("username", data.username)
      localStorage.setItem("img", data.image)
      localStorage.setItem("token", data["x-auth-token"])
      setWait(false)
    })
  }, [])
  if (wait) {
    return <div className={classes.waitPro}>
      <CircularProgress />
      <p style={{ padding: "20px" }}>لطفا صبر کنید</p>
    </div>
  }
  else
    return (
      <DrawerProvider>
        <div className={classes.root}>
          {isTabletSize ? <TwitterDrawer /> : <RightSidebar />}
          <Divider orientation={'vertical'} className={classes.divider} />
          <div className={classes.contet}>
            {props.children}
          </div>
          <Divider orientation={'vertical'} className={classes.divider} />
          <LeftSidebar />

        </div>
      </DrawerProvider>
    );
}

export default Layout;