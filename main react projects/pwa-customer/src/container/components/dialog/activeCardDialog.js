import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCardDialog,
  setActiveCard,
  setCardList,
} from "../card/action";
import "./popUpDialog.less";
import { makeStyles } from "@material-ui/core/styles";
import store from "store-js";
import useDataApi from "../fetchData/useDataApi";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import base_url from "../../../constants/base_url";
import CircularProgress from "@material-ui/core/CircularProgress";

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

function ActiveCardDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.cardReducer.activeCard);
  const cardId = useSelector((state) => state.cardReducer.cardId);
  const [url, setUrl] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [params, setParams] = useState();
  const [method, setMethod] = useState("post");
  const [loading, setLoading] = useState(false);
  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );

  const handleCloseErrMessage = () => {
    setOpenSnack(false);
  };

  const handleClose = () => {
    dispatch(setActiveCardDialog(false));
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(0px)";
  };

  const handleActiveCard = () => {
    setUrl("profile/card/active/mobile");
    setParams({ card_id: cardId });
    setLoading(true);
    // dispatch(setActiveCard(true));
    // dispatch(setActiveCardDialog(false));
    // handleClose()
  };

  const token = store.get("token");
  const getCardData = () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${base_url}cards`, { headers: headers })
      .then((res) => {
        setLoading(false);
        store.set("cards_data", res.data.data);
        dispatch(setCardList(res.data.data));
        handleClose();
      })
      .catch((err) => {
        setSnackMsg(err);
        setOpenSnack(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isError && !isLoading && url === "profile/card/active/mobile") {
      setMethod("get");
      setUrl("cards");
      getCardData();
      setLoading(false);
    } else if (isError) {
      setOpenSnack(true);
      setSnackMsg(errMessage);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseErrMessage}
          message={snackMsg}
          style={{ width: "200px", left: "50%", bottom: "5%", right: "24%" }}
        />
        <div
          className="logout-dialog"
          style={{ height: "100%", justifyContent: "center" }}
        >
          <img
            src="assets/images/close-black.svg"
            alt=""
            onClick={handleClose}
          />
          <p>آیا میخواهید کارت را فعال کنید؟</p>
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
            <button className="agreeBtn" onClick={handleActiveCard}>
              {loading ? (
                <CircularProgress size="15px" color="inherit" />
              ) : (
                <span>تایید</span>
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ActiveCardDialog;
