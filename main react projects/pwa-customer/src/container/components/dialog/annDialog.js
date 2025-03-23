import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setShowAnnDialogShow } from "../../actions/MainActions";
import "./profile-dialog.less";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import store from "store-js";

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
    height: "auto",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
});

function AnnDialog({ data }) {
  const Dispatch = useDispatch();
  const history = useHistory();
  const open = useSelector((state) => state.MainReducer.annDialog);

  const handleClose = () => {
    Dispatch(setShowAnnDialogShow(false));
    document.getElementsByClassName("main-page")[0].style.filter = "blur(0px)";
  };

  const classes = useStyles();
  const handleClickBtn = (cta) => {
    history.push(cta);
    Dispatch(setShowAnnDialogShow(false));
    document.getElementsByClassName("main-page")[0].style.filter = "blur(0px)";
  };
  
  return (
    <div>
      <Dialog
        open={open}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          container: classes.container,
        }}
        aria-labelledby="profile-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="profile-div-dialog">
          <img
            style={{ position: "absolute", right: "13px", top: "13px" }}
            src="assets/images/close-black.svg"
            alt=""
            onClick={handleClose}
          />
          <div>
            {data !== null && data.data.image_path !== null ? (
              <img src={data.data.image_path} alt="" />
            ) : (
              <img
                style={{ width: "80%", height: "80%" }}
                src="assets/images/campaign.png"
              />
            )}
          </div>

          {data !== null && data.data.title !== null && (
            <h4>{data.data.title}</h4>
          )}
          {data !== null && data.data.description !== null && (
            <p>{data.data.description}</p>
          )}
          {data !== null && data.data.cta_web !== null && (
            <Link
              onClick={() => handleClickBtn(data.data.cta_web)}
              className="ann-btn"
            >
              بزن بریم
            </Link>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default AnnDialog;
