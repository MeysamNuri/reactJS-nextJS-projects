import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getDialogFlag,
  setLoginDialog,
  setMainDialog,
} from "../../actions/MainActions";
import { useHistory } from "react-router-dom";
import "./main-signin-dialog.less";
import { makeStyles } from "@material-ui/core/styles";
import useDataApi from "../../components/fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import store from "store-js";
import { getLoading } from "../../pages/loading/action";
import fixNumbers from "../../components/convert-to-english";
const persianJs = require("persianjs");

const useStyles = makeStyles({
  paper: {
    width: "80%",
    left: "50%",
    top: "50%",

    transform: "translate(-50%,-50%)",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
});
const otpStyle = {
  height: "100%",
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  flexDirection: "row-reverse",
};
const otpInputStyle = {
  width: "28px",
  borderBottom: "2px solid #C2CDD9",
  margin: "30px 5px 10px 5px",
  color: "black",
  fontSize: "1rem",
  outline: "none",
};

function DialogMainSignIn() {
  const [code, setCode] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [params, setParams] = useState(null);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("otp/sms/send");
  const [method, setMethod] = useState("post");
  const [top, setTop] = useState("");
  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );
  const [timer, setTimer] = useState(60);
  const [errorDisplay, setErrorDisplay] = useState("none");
  const [error2Display, setError2Display] = useState("none");
  const fcm_token = store.get("fireBaseToken");
  const history = useHistory();
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.MainReducer.mainDialog);
  const cardNumber = store.get("firstAddCard");

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const clientId = uuidv4();

  let timeout = "";
  let newPercent;
  useEffect(() => {
    if (showOtpInput) {
      timeout = setTimeout(() => {
        newPercent = timer - 1;
        if (newPercent === -1) {
          clearTimeout(timeout);
          return;
        }
        setTimer(newPercent);
      }, 1000);
    }
  }, [timer, showOtpInput]);

  useEffect(() => {
    if (data !== null && !isError && !isLoading && url === "otp/sms/send") {
      setShowOtpInput(true);
      setErrorDisplay(false);
    } else if (flag && isError) {
      setErrorDisplay(true);
      setFlag((flag) => !flag);
      setError((error) => !error);
    }
  }, [data]);

  useEffect(() => {
    if (showOtpInput) {
      if (
        data !== null &&
        url === "otp/check/login" &&
        !isError &&
        !isLoading
      ) {
        store.set("token", data.data.access_token);
        setError2Display("none");

        Dispatch(getLoading(true));
        Dispatch(setMainDialog(false));
        Dispatch(getDialogFlag(false));

        store.set("isSignIn", true);
        store.set("showMainLogin", false);
        document.getElementsByClassName("main-page")[0].style.filter =
          "blur(0px)";
        setShowOtpInput(false);
        setPhoneNumber('');
      } else if (
        url === "otp/check/login" &&
        isError &&
        errMessage !== "" &&
        !isLoading
      ) {
        setError((error) => !error);
        setError2Display("block");
      }
    }
  }, [data, isError, isLoading]);

  const handleSendOtp = (e) => {
    e.preventDefault();

    const phoneNumberRegex = new RegExp(/^(\+98|0)?9\d{9}/);
    if (!phoneNumberRegex.test(phoneNumber)) {
      setErrorDisplay("block");
    } else {
      setErrorDisplay("none");
      setParams({ mobile: phoneNumber });
      setUrl("otp/sms/send");
      setShowOtpInput(true);
    }
  };
  
  const handleCheckOtp = (e) => {
    e.preventDefault();
    if (code.length > 6 && code.length < 6) {
      setError2Display("block");
    } else {
      setParams({
        mobile: phoneNumber,
        code: code,
        client_id: clientId,
        fcm_token: fcm_token,
        user_agent: "web",
      });
      setUrl("otp/check/login");
      setFlag(false);
    }
  };

  const handleKeyDown = (e, name) => {
    if (e.key === "Enter") {
      if (name === "code") {
        handleCheckOtp(e);
      } else {
        handleSendOtp(e);
      }
    }
  };

  const handleClose = () => {
    if (!showOtpInput) {
      Dispatch(setMainDialog(false));
      document.getElementsByClassName("main-page")[0].style.filter =
        "blur(0px)";
    }
  };

  const handleFailedSMS = () => {
    let phone_number = persianJs(phoneNumber).toEnglishNumber().toString();
    if (timer < 1) {
      setUrl("otp/sms/send");
      setParams({ mobile: fixNumbers(phone_number) });
      setTimer(60);
    }
  };

  const handleBacktoEnterNumber = () => {
    setShowOtpInput(false);
    setPhoneNumber("");
    setCode("");
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          container: classes.container,
        }}
        onClose={handleClose}
        id="top-component"
        aria-labelledby="credit-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!showOtpInput ? (
          <div className="login-form">
            <p>ورود</p>
            <span style={{ fontSize: "20px" }}>
              شماره تلفن خود را وارد کنید
            </span>
            <form action="">
              <input
                type="number"
                placeholder="مثال: 09xxxxxxxxx"
                value={phoneNumber}
                onChange={(e) => {
                  setErrorDisplay("none");
                  setPhoneNumber(e.target.value);
                }}
                onKeyPress={(e) => handleKeyDown(e, "number")}
              />
              <span
                className="error"
                style={{
                  display: errorDisplay,
                  marginTop: "0",
                  textAlign: "center",
                }}
              >
                شماره وارد شده صحیح نمی باشد
              </span>
              <button
                className="big-btn"
                onClick={(e) => handleSendOtp(e)}
                style={{ marginBottom: "15px" }}
              >
                ارسال کد
              </button>
            </form>
          </div>
        ) : (
          <div className="login-form">
            <p> کد 6 رقمی به شماره {phoneNumber} ارسال شد</p>
            <p>کد را وارد کنید</p>
            <img
              src="assets/images/arrow.svg"
              alt=""
              onClick={handleBacktoEnterNumber}
              className="back-arrow"
            />
            <form action="" style={{ width: "100%" }}>
              <div
                className="otp-input"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  paddingRight: "0",
                }}
              >
                {/*<OtpInput
                  onChange={(otp) => setCode(otp)}
                  numInputs={6}
                  containerStyle={otpStyle}
                  inputStyle={otpInputStyle}
                  value={code}
                  shouldAutoFocus={true}
                />*/}
                <input
                  type="number"
                  value={code}
                  onChange={(e) => {
                    setError2Display("none");
                    setCode(e.target.value);
                  }}
                  placeholder="مثال: 123456"
                  onKeyPress={(e) => handleKeyDown(e, "code")}
                />
              </div>
              <button className="big-btn" onClick={(e) => handleCheckOtp(e)}>
                {isLoading && url === "otp/check/login" && (
                  <CircularProgress size="15px" color="inherit" />
                )}
                {!isLoading && <span>تایید</span>}
              </button>
              <span
                className="error"
                style={{
                  display: error2Display,
                  marginTop: "12px",
                  textAlign: "center",
                }}
              >
                کد وارد شده صحیح نمی باشد
              </span>
              <div className="code_txt">
                <p>کد را دریافت نکرده اید؟</p>
                <span
                  onClick={handleFailedSMS}
                  style={{ color: timer < 1 ? "#6498E6" : "#19212E" }}
                >
                  دوباره تلاش کنید
                </span>
                <span style={{ direction: "ltr" }}>
                  {timer < 10 ? `0${timer}` : timer}
                </span>
              </div>
            </form>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default React.memo(DialogMainSignIn);
