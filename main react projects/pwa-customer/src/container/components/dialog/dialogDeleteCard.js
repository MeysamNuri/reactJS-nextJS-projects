import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteDialog } from "../../components/card/action";
import "./profile-dialog.less";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    width: "60%",
    left: "50%",
    top: "47%",
    transform: "translate(-27%,-35%)",
    position: "absolute",
    textAlign:'center',
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    height: "110px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
    right: "0",
  },
});

function DialogProfileChange(props) {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.cardReducer.deleteDialog);

  const handleClose = () => {
    Dispatch(getDeleteDialog(false));
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(0px)";
  };

  const handleYesBtn = () => {
   props.handleDelete()
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(0px)";
    Dispatch(getDeleteDialog(false));

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
          <p>آیا از حذف کارت خود اطمینان دارید؟</p>
          <div className="dialog-btn-div">
            <button className="yesBtn" onClick={handleYesBtn} style={{marginLeft:'5px'}}>
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
