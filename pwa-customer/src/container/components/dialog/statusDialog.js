import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { setStatusDialog } from "../../actions/MainActions";
import { useDispatch, useSelector } from "react-redux";

const StatusDialog = ({ title,title_close }) => {
  const open = useSelector((state) => state.MainReducer.statusDialog);
  const Dispatch = useDispatch();

  const handleClose = () => {
    Dispatch(setStatusDialog(false));
    document.getElementsByClassName("card-div")[0].style.filter = "blur(0px)";
  };
  const handleClick = () => {
    document.getElementsByClassName("card-div")[0].style.filter = "blur(0px)";
    Dispatch(setStatusDialog(false));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        <p>{title}</p>
        <button onClick={handleClick}>{title_close}</button>
      </div>
    </Dialog>
  );
};
export default StatusDialog;
