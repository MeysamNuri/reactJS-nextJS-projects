import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogoutDialogShow,
  setShowSlideMenu,
  getNotiNumber,
  setHasAddCard,
} from "../../actions/MainActions";
import "./popUpDialog.less";
import { makeStyles } from "@material-ui/core/styles";
import store from "store-js";
import useDataApi from "../fetchData/useDataApi";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  paper: {
    width: "70%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    textAlign: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    height: "180px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
});

function LogoutDialog() {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.MainReducer.logoutDialog);
  const [url, setUrl] = useState("");
  const method = "post";
  const params = true;
  const history = useHistory()
  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );

  const handleClose = () => {
    Dispatch(setLogoutDialogShow(false));
    document.getElementsByClassName("App")[0].style.filter = "blur(0px)";
  };

  const handleExit = () => {
     setUrl("logout");
    localStorage.removeItem("profile_data");
    localStorage.removeItem("cards_data");
    localStorage.removeItem("token");
    localStorage.removeItem("favorites_data");
    localStorage.removeItem("credit_data");
    localStorage.removeItem("transactions_data");
    localStorage.removeItem("card_transactions");
    Dispatch(setShowSlideMenu(false));
    store.set("showMainLogin", true);
    store.set("isSignIn", false);
    Dispatch(setHasAddCard(true));
    Dispatch(getNotiNumber(0));
    history.push("/main");
    handleClose()
  };

  const classes = useStyles();

  return (
    <div>
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
        <div
          className="logout-dialog"
          style={{ height: "100%", justifyContent: "center" }}
        >
          <img
            src="assets/images/close-black.svg"
            alt=""
            onClick={handleClose}
          />
          <p>آیا میخواهید از برنامه خارج شوید ؟</p>
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button className="deniedBtn" onClick={handleClose}>
              انصراف
            </button>
            <button className="agreeBtn" onClick={handleExit}>
              خروج
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default LogoutDialog;
