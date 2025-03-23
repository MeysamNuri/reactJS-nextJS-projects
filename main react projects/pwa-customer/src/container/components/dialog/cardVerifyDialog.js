import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { getDialog } from "../../pages/categories/actions";
import "./dialog.less";

function CardVerifyDialog({ verifyText, style }) {
  const open = useSelector(state => state.categoriesReducer.dialog);
  const Dispatch = useDispatch();

  const handleClose = () => {
    Dispatch(getDialog(false));
    document.getElementsByClassName("card-div")[0].style.filter = "blur(0px)";
  };
  const handleClick = () => {
    document.getElementsByClassName("card-div")[0].style.filter = "blur(0px)";
    Dispatch(getDialog(false));
  };
  
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={style}>
          <p>{verifyText}</p>
          <button onClick={handleClick}>بستن</button>
        </div>
      </Dialog>
  );
}

export default React.memo(CardVerifyDialog);
