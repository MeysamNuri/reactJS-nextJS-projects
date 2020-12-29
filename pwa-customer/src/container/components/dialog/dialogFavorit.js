import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritDialog } from "../../actions/MainActions";
import "./profile-dialog.less";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "./success.json";

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
    height: "230px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
});

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function DialogProfileChange(props) {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.MainReducer.favoritDialog);

  const handleClose = () => {
    Dispatch(setFavoritDialog(false));
    document.getElementsByClassName(props.text)[0].style.filter =
      "blur(0px)";
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
        aria-labelledby="profile-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="favorit-dialog">
          <Lottie options={defaultOptions} height={120} width={"35%"} />
          <span>درخواست شما با موفقیت ثبت شد</span>
          <p style={{fontSize:'.8rem'}}>{props.favorite}</p>
          <img
            style={{ position: "absolute", top: "8%", right: "8%" }}
            src="assets/images/exit.svg"
            alt=""
            onClick={handleClose}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default DialogProfileChange;
