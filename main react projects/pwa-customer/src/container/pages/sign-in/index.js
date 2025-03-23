import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import useDataApi from "../../components/fetchData/useDataApi";
import "./sign-in.less";
import { setPhoneNumber } from "./action";
import { getLoading } from "../loading/action";
import store from "store-js";
import fixNumbers from "../../components/convert-to-english";
const persianJs = require("persianjs");

function SignIn() {
  const [phone, setPhone] = useState("");
  const [flag, setFlag] = useState(false);
  const url = "otp/sms/send";
  const method = "post";
  const [params, setParams] = useState(null);
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  const [errorDisplay, setErrorDisplay] = useState("none");
  const history = useHistory();
  const Dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    if (flag && data !== null && !isLoading && !isError) {
      if (data.data.show_referral) {
        store.set("referral", true);
      } else {
        store.set("referral", false);
      }
      history.push("otp");
      document.getElementById("send-btn").style.disabled = "true";
    } else if (flag && isError) {
      setFlag((flag) => !flag);
      setErrorDisplay("block");
    }
  }, [data, isLoading, isError]);

  const handleSubmitNumber = (e) => {
    e.preventDefault();
    // let number = persianJs(phone).toEnglishNumber().toString();
    const phoneNumberRegex = new RegExp(/^(\+98|0)?9\d{9}/);
    if (!phoneNumberRegex.test(phone)) {
      setErrorDisplay("block");
    } else {
      setParams({ mobile: phone });
      Dispatch(setPhoneNumber(phone));
      setFlag((flag) => !flag);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitNumber(e);
    }
  };

  const handleIgnoreSignIn = () => {
    Dispatch(getLoading(true));
    localStorage.removeItem("firstAddCard");
    history.push("main");
    store.set("showMainLogin", true);
    store.set("isSignIn", false);
  };

  return (
    <div className="signin-enter-div">
      <img className="big-circle" src="assets/images/big-circle-w.svg" alt="" />
      <img
        className="small-circle"
        src="assets/images/small-circle-w.svg"
        alt=""
      />
      <p className="enter-txt" style={{ color: "#000" }}>
        شماره موبایل خود را وارد کنید
      </p>
      <form action="" className="signin-enter-form" style={{ zIndex: "1000" }}>
        <input
          className="enter-input"
          type="number"
          value={phone}
          placeholder="مثال: 09xxxxxxxxx"
          onChange={(e) => {
            setPhone(e.target.value);
            setErrorDisplay("none");
          }}
          style={{ direction: "ltr" }}
          onKeyPress={(e) => handleKeyDown(e)}
        />
        <span className="error" style={{ display: errorDisplay }}>
          شماره وارد شده صحیح نمی باشد
        </span>
        <div
          style={{
            width: "100%",
            margin: "15px 0",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button
            className="big-btn"
            style={{ margin: "15px 0" }}
            onClick={(e) => handleSubmitNumber(e)}
            id="send-btn"
          >
            {flag && <CircularProgress size="15px" color="inherit" />}
            {!flag && <span>ادامه</span>}
          </button>
          {/*<Link onClick={handleIgnoreSignIn}>
            <span>بعدا</span>
        </Link>*/}
        </div>
      </form>
    </div>
  );
}

export default SignIn;
