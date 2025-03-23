import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setPopUpDialogShow } from "../card/action";
import "./popUpDialog.less";
import { makeStyles } from "@material-ui/core/styles";

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

function DialogPopUp() {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.cardReducer.showPopUp);

  const handleClose = () => {
    Dispatch(setPopUpDialogShow(false));
    document.getElementsByClassName("card-content-div")[0].style.filter =
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
        <div className="popUp-dialog">
          <p>تنظیمات اعلان مرورگر شما غیر فعال می باشد، برای فعال کردن آن لطفا به این آدرس مراجعه کنید: </p>
          <span style={{ marginTop:'10px'}}>Setting -- Safari -- Block Pop-ups</span>
          <div onClick={handleClose} className='big-btn' style={{ width:'70%', marginTop:'15px'}}>تایید</div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogPopUp;
