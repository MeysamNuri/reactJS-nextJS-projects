/**
 *
 * LogoutDialog
 *
 */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutPopUpDialogShow } from "../../../mainAction/logoutAction";
import "./logout.less";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "./warning.json";
import { useHistory } from 'react-router-dom'


const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles({
  paper: {
    width: "70%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    textAlign: "center",
    margin:'0 !important'
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    height: "180px",
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px",
    alignItems: "center",
  },
});

function LogoutDialog() {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.logoutReducer.open);
  const history = useHistory();

  const handleClose = () => {
    Dispatch(setLogoutPopUpDialogShow(false));
    document.getElementsByClassName('MuiDialog-root')[0].style.display = 'none'
    history.push('sign-in')
  };

  const classes = useStyles();
  
    return (
        <Dialog
          open={open} 
          onClose={handleClose}
          classes={{
            paper: classes.paper,
            paperWidthSm: classes.paperWidthSm,
            container: classes.container,
          }}
          
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <div className="logout-dialog">
            <img src='assets/images/close-black.svg' alt="" onClick={handleClose}/>
            <Lottie options={defaultOptions} height={120} width={"38%"} />
            <p>شما ازبرنامه خارج شدید!</p>
          </div>
        </Dialog>
    );
  
}

export default LogoutDialog;

