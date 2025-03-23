import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from "@material-ui/core/Snackbar";

import { closeSnackbar } from '../../mainAction/snackbarAction';

function MySnackBar() {
  const dispatch = useDispatch()
  const open = useSelector(state => state.snackbarReducer.open);
  const reduxMsg = useSelector(state => state.snackbarReducer.msg)

  const handleCloseErrMessage =()=>{
    dispatch(closeSnackbar())
  }
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleCloseErrMessage}
      message={reduxMsg}
    />
  );
}

export default MySnackBar;
