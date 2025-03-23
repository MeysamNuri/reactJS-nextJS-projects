/**
 *
 * SignOutDialog
 *
 */

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
// import store from 'store-js'
import './signout-dialog.less'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getSignoutDialog } from '../../../containers/Profile/actions'
//  --------------------- images ----------------------

const useStyles = makeStyles({
  paper: {
    padding:'15px'
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  paperWidthSm: {
    height: "141px",
    width:'75%',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius:'8px '
  },
});

function SignOutDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const signOutDialog = useSelector(state => state.ProfileReducer.signoutDialog)

  const handleIgnorSignOut = (e) =>{
    dispatch(getSignoutDialog(false));
    document.getElementsByClassName("profile-div")[0].style.filter = "blur(0)";
  }

  const handleSignOut = (e) =>{
    history.push('sign-in')
  }

  return (
    <div>
      <Dialog
        open={signOutDialog}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          container: classes.container,
        }}
        onClose={e=> handleIgnorSignOut(e)}
        aria-labelledby="credit-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className='dialog-content'>
          <p>می‌خواهید از حساب کاربری خود خارج شوید؟</p>
          <div className='dialog-btn'>
            <button className='ignor-btn' onClick={e=> handleIgnorSignOut(e)}>انصراف</button>
            <button className='exit-btn' onClick={e=> handleSignOut(e)}>خروج</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SignOutDialog;
