import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDialog } from "../../pages/profile/action";
import "./profile-dialog.less";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    width: "60%",
    left: "50%",
    top: "50%",
    transform: "translate(-27%,-35%)",
    position: "absolute",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
    right: "0",
  },
});

function DialogProfileChange(props) {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.profileReducer.profileDialog);

  const handleClose = () => {
    Dispatch(getProfileDialog(false));
    document.getElementsByClassName("profile-div")[0].style.filter =
      "blur(0px)";
      props.handleCancle()
  };

  const handleYesBtn = () => {
   props.fileChangedHandler()
    document.getElementsByClassName("profile-div")[0].style.filter =
      "blur(0px)";
    Dispatch(getProfileDialog(false));

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
        <div className="profile-div-dialog">
          <p>تغییرات ذخیره شود؟</p>
          <div className="dialog-btn-div">
            <button className="yesBtn" onClick={handleYesBtn}>
              بله
            </button>
            <button className="noBtn" onClick={handleClose}>
              خیر
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogProfileChange;
