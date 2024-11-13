import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import store from "store-js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getLoading } from "../loading/action";
import useDataApi from "../../components/fetchData/useDataApi";
import "./otp.less";
import Axios from "axios";
import base_url from "../../../constants/base_url";
import fixNumbers from "../../components/convert-to-english";

const persianJs = require("persianjs");

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
// };

function OTP() {
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState("");
  const [params, setParams] = useState(null);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("otp/check/login");
  const [method, setMethod] = useState("post");
  const Dispatch = useDispatch();
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  const phoneNumber = useSelector((state) => state.signInReducer.phoneNumber);
  const history = useHistory();
  const referral = store.get("referral");
  let timeout = "";
  let newPercent;
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
  const addCard = async (token) => {
    const headers = {
      Authorization: `bearer ${token}`,
    };
    try {
      const data = await Axios.post(
        `${base_url}profile/add/card`,
        { card_number: cardNumber },
        { headers: headers }
      );
      history.push("/main");
    } catch (err) {
      console.log("add card err", err);
    }
  };
  const fcm_token = store.get("fireBaseToken");

  useEffect(() => {
    timeout = setTimeout(() => {
      newPercent = timer - 1;
      if (newPercent === -1) {
        clearTimeout(timeout);
        return;
      }
      setTimer(newPercent);
    }, 1000);
  }, [timer]);

  useEffect(() => {
    if (flag && data !== null && !isLoading && !isError) {
      setError(false);
      store.set("token", data.data.access_token);

      store.set("showMainLogin", false);
      store.set("isSignIn", true);
      Dispatch(getLoading(true));
      if (referral) {
        history.push("referal");
      } else {
        history.push("main");
      }

      if (cardNumber) {
        addCard(data.data.access_token);
      }
    } else if (flag && isError) {
      setFlag((flag) => !flag);
      setError(true);
    }
  }, [data, isLoading, isError]);

  const handleCheckOtp = (e) => {
    e.preventDefault();
    if (code.length > 6 && code.length < 6) {
      setError(true);
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheckOtp(e);
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
    <div className="otp-div">
      <img
        className="big-circle"
        src="assets/images/big-circle-w.svg"
        alt=""
        style={{ zIndex: "1" }}
      />
      <img
        className="small-circle"
        src="assets/images/small-circle-w.svg"
        alt=""
      />

      <form action="" className="otp-form" id="form">
        <p className="number-txt">
          هم‌اکنون کد 6 رقمی برای شماره‌ {phoneNumber} ارسال شد
        </p>
        <p className="enter-txt" style={{ color: "#000" }}>
          کد را در این قسمت وارد کنید
        </p>
        <div className="otp-input">
          {/*<OtpInput
            onChange={(otp) => setCode(otp)}
            numInputs={6}
            containerStyle={otpStyle}
            inputStyle={otpInputStyle}
            value={code}
          />*/}
          <input
            type="number"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="مثال: 123456"
            onKeyPress={e=>handleKeyDown(e)}
          />
        </div>
        <span className="error" style={{ display: error ? "block" : "none" }}>
          شماره وارد شده صحیح نمی باشد
        </span>
        <div className="btn-div">
          <button
            className="big-btn"
            onClick={(e) => handleCheckOtp(e)}
            style={{ zIndex: "1000" }}
          >
            {flag && <CircularProgress size="15px" color="inherit" />}
            {!flag && <span>تایید</span>}
          </button>
        </div>
      </form>
      <div className="code-txt">
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
      <Link to="/sign-in">
        {/*<img className="arrow" src="assets/images/arrow.svg" alt="" />*/}
        <span className="arrow" style={{transform:'unset'}}>تغییر شماره موبایل</span>
      </Link>
    </div>
  );
}

export default OTP;
