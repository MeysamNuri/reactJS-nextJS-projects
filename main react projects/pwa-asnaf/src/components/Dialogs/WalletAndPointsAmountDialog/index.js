import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import "./wallet-and-points-amount-dialog.less";
import { useDispatch, useSelector } from "react-redux";
import { getWalletAndPointsAmountDialog } from "../../../containers/Wallet/actions";
import store from "store-js";
import APIs from "./APIs";
import {
  openSnackbar,
  setSnackbarMsg,
} from "../../../mainAction/snackbarAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../../utils/fetchCatch";

//  --------------------- components ----------------------

//  --------------------- images ----------------------

const useStyles = makeStyles({
  paper: {
    padding: "15px",
  },
  paperWidthSm: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "8px ",
  },
});

function WalletAndPointsAmountDialog({ type, title, text, repuSum, sum }) {
  const classes = useStyles();
  const appInit = store.get("appInit");
  const dispatch = useDispatch();
  const walletAndPointsAmountDialog = useSelector(
    (state) => state.walletReducer.walletAndPointsAmountDialog
  );

  const walletAmount = appInit !== undefined ? appInit.wallet_credit : "";

  const [amount, setAmount] = useState("");
  const [repuAmount, setRepuAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const [inputColor, setInputColor] = useState("#000");


  const handleCloseDialog = (e) => {
    dispatch(getWalletAndPointsAmountDialog(false));
    document.getElementsByClassName("wallet-div")[0].style.filter = "blur(0)";
    setAmount("");
  };

  const handleClosePoint = () => {
    dispatch(getWalletAndPointsAmountDialog(false));
    document.getElementsByClassName("point-div")[0].style.filter = "blur(0)";
    setRepuAmount("");
  };

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };
  // --------------------- charge credit -----------------------------
  async function chargeWallet(e) {
    setLoader(true);
    e.preventDefault();
    try {
      const data = await APIs.chargeWallet(amount);
      window.open(data.data.redirect_url);
      handleCloseDialog();
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
    setLoader(false);
  }
  // ------------------------------------------------------------------
  async function withdraw() {
    setLoader(true);
    try {
      const data = await APIs.withdraw(amount);
      if (data.status === 200) {
        dispatch(setSnackbarMsg(data.message));
        dispatch(openSnackbar());
      }
      handleCloseDialog();
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
    setLoader(false);
  }

  async function withdrawInit() {
    setLoader(true);
    try {
      const data = await APIs.withdrawInit(amount);
      if (data.status === 200) {
        withdraw();
      }
      handleCloseDialog();
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      handleCloseDialog();
    }
    setLoader(false);
  }

  const handleWithdrawProcess = (e) => {
    if (amount < 150000) {
      dispatch(setSnackbarMsg("مبلغ وارد شده کمتر از 150000 تومان است"));
      dispatch(openSnackbar());
    } else if (amount > walletAmount) {
      dispatch(setSnackbarMsg("مبلغ وارد شده بیشتر از کیف پول است"));
      dispatch(openSnackbar());
    } else {
      withdrawInit();
    }
  };
  // --------------------------- repu to credit api -------------------------
  async function convertRepoToCredit(e) {
    e.preventDefault();
    setLoader(true);
    try {
      await APIs.convertRepoToCredit(repuAmount);
      dispatch(setSnackbarMsg("عملیات با موفقیت انجام شد"));
      dispatch(openSnackbar());
      handleClosePoint();
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
    setLoader(false);
  }

  const handleChangeAmount = (e) => {
    setInputColor("#fff");
    setAmount(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={walletAndPointsAmountDialog}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
        }}
        onClose={type === "point-amount" ? handleClosePoint : handleCloseDialog}
        aria-labelledby="credit-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="inc-dialog-div">
          <div className="inc-dialog-amount-div">
            {type === "point-amount" ? (
              <>
                <div className="points-dialog-div">
                  <p>جمع امتیازات</p>
                  <h3>{repuSum}</h3>
                </div>
                <div className="points-dialog-div">
                  <p>تراکنش‌های داپ‌اَ پی</p>
                  <h3>{sum}</h3>
                </div>
              </>
            ) : (
              <>
                <p>موجودی</p>
                <div>
                  <h2>
                    {walletAmount === "0.00"
                      ? 0
                      : priceDigitSeperator(walletAmount)}
                  </h2>
                  <span>تومان</span>
                </div>
              </>
            )}
          </div>

          <h3>{title}</h3>
          <p>{text}</p>

          {type === "point-amount" ? (
            <>
              <form className="inc-dialog-form">
                <input
                  value={repuAmount}
                  onChange={(e) => setRepuAmount(e.target.value)}
                  className="inc-dialog-input"
                  type="text"
                />
                <span>امتیاز</span>
              </form>
              <p
                style={{
                  textAlign: "center",
                  backgroundColor: "#f6f9fc",
                  padding: "5px",
                  marginTop: "15px",
                }}
              >{`معادل ${repuAmount !== 0 ? repuAmount * 3.5 : 0} تومان`}</p>
            </>
          ) : (
            <form className="inc-dialog-form">
              <input
                className="inc-dialog-input"
                type="text"
                value={amount}
                style={{ direction: "ltr", color: inputColor }}
                onChange={(e) => handleChangeAmount(e)}
              />
              <p
                style={{
                  position: "absolute",
                  top: "0",
                  left:'45%',
                  transform:'translateX(-45%)',
                  fontSize: "1.3rem",
                  textAlign:'center'
                }}
              >
                {priceDigitSeperator(amount)}
              </p>
              <span>تومان</span>
            </form>
          )}

          {type === "inc-amount" ? (
            <button className="inc-dialog-btn" onClick={(e) => chargeWallet(e)}>
              {loader ? (
                <CircularProgress size="15px" color="inherit" />
              ) : (
                <span>برو به صفحه‌ی پرداخت</span>
              )}
            </button>
          ) : type === "point-amount" ? (
            <button
              className="inc-dialog-btn"
              onClick={(e) => convertRepoToCredit(e)}
            >
              {loader ? (
                <CircularProgress size="15px" color="inherit" />
              ) : (
                <span>ثبت درخواست انتقال</span>
              )}
            </button>
          ) : (
            <button
              className="inc-dialog-btn"
              onClick={(e) => handleWithdrawProcess(e)}
            >
              {loader ? (
                <CircularProgress size="15px" color="inherit" />
              ) : (
                <span>برداشت</span>
              )}
            </button>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default WalletAndPointsAmountDialog;
