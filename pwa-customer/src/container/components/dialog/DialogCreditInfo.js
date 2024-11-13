import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { getCreditDialog } from "../../actions/MainActions";
import { setAuthSheba } from "../../actions/MainActions";
import { Link } from "react-router-dom";
import "./credit-dialog.less";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    paper: {
      width: '80%',
      left: "50%",
      top: "50%",
      
      transform: "translate(-50%,-50%)"
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    paperWidthSm: {
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      alignItems: 'center',
      right:'-35%'
    }
  });

function DialogCreditInfo({ info }) {
  const Dispatch = useDispatch();
  const open = useSelector(state => state.MainReducer.creditDialog);

  const handleClose = () => {
    Dispatch(getCreditDialog(false));
    document.getElementsByClassName("wallet")[0].style.filter = "blur(0px)";
  };

  const handleAuthSheba = () => {
    Dispatch(setAuthSheba(true));
    Dispatch(getCreditDialog(false));
    document.getElementsByClassName("wallet")[0].style.filter = "blur(0px)";
  };
  
  const classes = useStyles();
  return (
    <div className="credit-dialog">
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          container: classes.container
        }}
        aria-labelledby="credit-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="info">
          <div>
            <h4>نام بانک : </h4>
            <p>{info ? info.bank_name : ""}</p>
          </div>
          <div>
            <h4>دارنده حساب : </h4>
            <p>
              {info
                ? info.owners_info[0].first_name +
                  " " +
                  info.owners_info[0].last_name
                : ""}
            </p>
          </div>
          <div className="button-div">
            <button onClick={handleAuthSheba}>تایید</button>
            <Link to="/profile">تغییر شبا</Link>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogCreditInfo;
