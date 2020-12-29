import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { compose } from "redux";
import { getChangeCatDialog } from "../../../containers/Main/actions";
import store from 'store-js'
import './category-change-msg-dialog.less'
//  --------------------- images ----------------------

const useStyles = makeStyles({
  paper: {
    padding:'15px'
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  paperWidthSm: {
    height: "213px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius:'8px '
  },
});

function CategoryChangeMsgDialog({ getChangeCatDialog, MainReducer }) {
  const classes = useStyles();
  const name = store.get('appInit').f_name
  const handleAcceptDialog = e =>{
    e.preventDefault();
    store.set('showChangeCatMsg', true)
    getChangeCatDialog(false);
    document.getElementsByClassName("main-div")[0].style.filter = "blur(0)";
  }

  return (
    <div>
      <Dialog
        open={MainReducer.catMsgDialog}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          container: classes.container,
        }}
        aria-labelledby="credit-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className='category-msg-dialog'>
          <h1>{`${name} عزیز`}</h1>
          <p>اطلاعاتی که در اپ مشاهده می‌کنید صرفا متعلق به صنف انتخاب شده است</p>
          <button onClick={e=> handleAcceptDialog(e)}>متوجه شدم</button>
        </div>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (store) => ({
  MainReducer: store.MainReducer,
});
const mapDispatchToProps = (dispatch) => ({
  getChangeCatDialog: (catDialog) => dispatch(getChangeCatDialog(catDialog)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(CategoryChangeMsgDialog);
