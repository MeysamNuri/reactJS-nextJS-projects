import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getDialog,
  getChangeCatDialog,
  setCategoryTitle,
} from "../../../containers/Main/actions";
import "./change-category-dialog.less";
import store from "store-js";
import APIs from "../../../containers/Otp/APIs";
import fetchCatch from "../../../utils/fetchCatch";

const useStyles = makeStyles({
  paper: {
    width: "45%",
    left: "42%",
    top: "22%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  paperWidthSm: {
    height: "156px",
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px",
    alignItems: "center",
  },
});

function DialogMainSignIn({
  getDialog,
  // getChangeCatDialog,
  setCategoryTitle,
  MainReducer,
}) {
  const classes = useStyles();
  const [activeId, setActiveId] = useState("");
  const [loader, setLoader] = useState(false);
  // const showChangeCatMsg = store.get("showChangeCatMsg");
  const businesses = store.get("businesses");
  const appInits = store.get("appInit");
  useEffect(() => {
    setActiveId(appInits.businesses[0].id);
  }, []);

  const handleCloseDialog = () => {
    getDialog(false);
    document.getElementsByClassName("main-div")[0].style.filter = "blur(0)";
  };

  const handleChangeCategory = (e, item) => {
    e.preventDefault();
    setActiveId(item.business_id);
    appInit(item.business_id);
    setCategoryTitle(item.business_name);
    // if (showChangeCatMsg === undefined) {
    //   getChangeCatDialog(true);
    //   document.getElementsByClassName("main-div")[0].style.filter =
    //     "blur(2.5px)";
    // } else {
    //   if (showChangeCatMsg) {
        document.getElementsByClassName("main-div")[0].style.filter = "blur(0)";
    // } else {
    // getChangeCatDialog(true);
    // document.getElementsByClassName("main-div")[0].style.filter = "blur(2.5px)";
    // }
    // }
  };

  async function appInit(id) {
    setLoader(true);
    try {
      const data = await APIs.appInit(id);
      getDialog(false);
      setLoader(false);
      store.set("appInit", data.data[0]);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setLoader(false);
    }
  }

  return (
    <div>
      {loader ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        <Dialog
          open={MainReducer.dialog}
          classes={{
            paper: classes.paper,
            paperWidthSm: classes.paperWidthSm,
            container: classes.container,
          }}
          onClose={handleCloseDialog}
          aria-labelledby="credit-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <p className="dialog-title">انتخاب صنف</p>
          <div className="dialog-content">
            {businesses.map((item) => (
              <div
                onClick={(e, id) => handleChangeCategory(e, item)}
                key={item.business_id}
              >
                <p style={{ color: item.business_id === activeId && "#000" }}>
                  {item.business_name}
                </p>
                <img
                  src={
                    item.business_id === activeId
                      ? "assets/images/green-tik.svg"
                      : "assets/images/gray-tik.svg"
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
        </Dialog>
      )}
    </div>
  );
}
const mapStateToProps = (store) => ({
  MainReducer: store.MainReducer,
});
const mapDispatchToProps = (dispatch) => ({
  getDialog: (dialog) => dispatch(getDialog(dialog)),
  getChangeCatDialog: (catDialog) => dispatch(getChangeCatDialog(catDialog)),
  setCategoryTitle: (catTitle) => dispatch(setCategoryTitle(catTitle)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default React.memo(compose(withConnect)(DialogMainSignIn));
