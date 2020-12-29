import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./not-signed.less";
import { TimelineMax } from "gsap/all";
// import OtpInput from "react-otp-input";
import useDataApi from "../../components/fetchData/useDataApi";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getLoading } from "../loading/action";
import { setSelectedPage, setNavValue } from '../../actions/MainActions'

// import fixNumbers from "../../components/convert-to-english";
// const persianJs = require("persianjs");

// const otpStyle = {
//   height: "100%",
//   display: "flex",
//   alignItem: "center",
//   justifyContent: "center",
//   flexDirection: "row-reverse",
// };
// const otpInputStyle = {
//   width: "28px",
//   borderBottom: "2px solid #C2CDD9",
//   margin: "5px",
//   color: "black",
//   fontSize: "1rem",
//   outline: "none",
// };

function ProfileNotSigned() {
  const [timer, setTimer] = React.useState(60);
  const [code, setCode] = React.useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [params, setParams] = useState(null);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("otp/sms/send");
  const method = "post";
  const [stopLoader, setStopLoader] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState("none");
  const [error2Display, setError2Display] = useState("none");

  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  const history = useHistory();
  const Dispatch = useDispatch();
  const fcm_token = store.get("fireBaseToken");

  const tl = new TimelineMax();

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
    if (showOtpInput) {
      tl.to(".loader_animated", 60, { width: "100%", ease: "none" });
      tl.to(".loader", 0.01, { display: "none" });
    }
  }, [stopLoader, showOtpInput]);

  useEffect(() => {
    if (
      flag &&
      data !== null &&
      !isError &&
      !isLoading &&
      url === "otp/sms/send"
    ) {
      setShowOtpInput(true);
      setErrorDisplay("none");
    } else if (flag && isError) {
      setFlag((flag) => !flag);
      setError((error) => !error);
      setErrorDisplay("block");
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (data !== null && !isError && !isLoading && url === "otp/check/login") {
      store.set("token", data.data.access_token);
      setError2Display("none");
      store.set("isSignIn", true);
      store.set("showMainLogin", false);
      Dispatch(getLoading(true));
      Dispatch(setNavValue(0))
      Dispatch(setSelectedPage('map'))
      // history.push("main");
    } else if (!flag && isError) {
      setFlag((flag) => !flag);
      setError((error) => !error);
      setError2Display("block");
    }
  }, [data, isLoading, isError]);

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
      setFlag((flag) => !flag);
    }
  };
  const handleKeyDown = (e, name) => {
    if (e.key === "Enter") {
      if(name === 'code'){
        handleCheckOtp(e);
      }else{
        handleSendOtp(e)
      }
    }
  };
  const handleFailedSMS = () => {
    if (timer < 1) {
      setUrl("otp/sms/send");
      setParams({
        mobile: phoneNumber,
        code: code,
        client_id: clientId,
        fcm_token: fcm_token,
        user_agent: "web",
      });
      setTimer(60);
    }
  };

  return (
    <div className="gray-bg">
      <Header
        title="حساب کاربری"
        back={null}
      />
      <div className="profile-not-div">
        <span className="avatar-cover">
          <img src="assets/images/single.svg" alt="" />
        </span>
        {!showOtpInput ? (
          <>
            <div>
              <p style={{ fontSize: "1.1rem" }}>شماره تلفن خود را وارد کنید</p>
            </div>
            <form action="">
              <input
                type="text"
                placeholder="مثال: 09xxxxxxxxx"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrorDisplay("none");
                }}
                style={{ direction: "ltr" }}
                onKeyPress={e=>handleKeyDown(e,'number')}
              />
              <span
                className="error"
                style={{
                  display: errorDisplay,
                  textAlign: "center",
                }}
              >
                شماره وارد شده صحیح نمی باشد
              </span>
              <button className="big-btn" onClick={handleSendOtp}>
                ارسال کد
              </button>
            </form>
          </>
        ) : (
          <>
            <div>
              <p> کد 6 رقمی به شماره {phoneNumber} ارسال شد</p>
            </div>
            <div>
              <p style={{ fontSize: "1.1rem" }}>کد را وارد کنید</p>
            </div>
            <form action="">
              <div className="otp-input">
                {/*<OtpInput
                  onChange={(otp) => setCode(otp)}
                  numInputs={6}
                  containerStyle={otpStyle}
                  inputStyle={otpInputStyle}
                  value={code}
                  shouldAutoFocus={true}
                />*/}
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setError2Display("none");
                    setCode(e.target.value);
                  }}
                  placeholder="مثال: 123456"
                  onKeyPress={e=>handleKeyDown(e,'code')}
                />
              </div>
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
              <button className="big-btn" onClick={(e) => handleCheckOtp(e)}>
                {flag && <CircularProgress size="15px" color="inherit" />}
                {!flag && <span>تایید</span>}
              </button>
              <div className="retry-btn">
                <span onClick={handleFailedSMS}>
                  ارسال مجدد کد
                  <span style={{ marginRight: "8px" }}>
                    {timer < 10 ? `0${timer}` : timer}
                  </span>
                </span>
                <div className="btn-loader">
                  <div className="loader_animated"></div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileNotSigned;
