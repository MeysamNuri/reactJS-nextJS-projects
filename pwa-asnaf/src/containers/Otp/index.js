import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import store from "store-js";
import setAuthorization from "../../utils/authorization";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./otp.less";
import fetchCatch from "../../utils/fetchCatch";
import APIs from "./APIs";

function OTP() {
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fcm_token, setFcm_token] = useState('');

  const phoneNumber = useSelector((state) => state.signInReducer.phoneNumber);
  const mobile = store.get("phoneNumber");

  const history = useHistory();

  let os = navigator.userAgent.slice(13).split(';')
  const user_agent=os
  useEffect(() => {
    // if(os[0] === 'iPhone'){
    //   setFcm_token('=======****os is ios and not support****=======')
    // }else{
    //   setFcm_token(store.get("fireBaseToken"))
    // }
    setFcm_token(store.get("fireBaseToken"))
    console.log(fcm_token);
  }, [])

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

  useEffect(() => {
    let timeout = setTimeout(() => {
      let newPercent = timer - 1;
      if (newPercent === -1) {
        clearTimeout(timeout);
        return;
      }
      setTimer(newPercent);
    }, 1000);
  }, [timer]);

  async function appInit(id) {
    try {
      await APIs.appInit(id);
      setLoader(false);
      history.push("main");
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  async function getBusinesses() {
    try {
      const data = await APIs.getBusinesses();
      store.set("businesses", data.data.businesses);
      if (data.data.businesses.length > 1) {
        const state = {
          name: data.data.name
        }
        history.push({pathname: "choose-account", state: state});
      } else {
        appInit(data.data.businesses[0].business_id);
      }
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  async function handleCheckOtp(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const data = await APIs.checkOtp(
        phoneNumber,
        code,
        clientId,
        user_agent,
        // fcm_token,
        "web"
      );
      setAuthorization(data.data.access_token);
      store.set("token", data.data.access_token);
      getBusinesses();
      setLoader(false);
      console.log(data);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setLoader(false);
    }
  }

  const handleKeyDown = e =>{
    if(e.key === 'Enter'){
      handleCheckOtp(e)
    }
  }
  const handleFailedSMS = () => {
    if (timer < 1) {
      handleCheckOtp();
      setTimer(60);
    }
  };

  return (
    <div className="otp-div">
      <Link to="/sign-in">
        <img className="back-arrow" src='assets/images/arrow.svg' alt="" />
      </Link>
      <img
        className="big-circle"
        src='assets/images/big-circle-w.svg'
        alt=""
        style={{ zIndex: "1" }}
      />
      <img className="small-circle" src='assets/images/small-circle-w.svg' alt="" />
      <p className="number-txt">{`هم‌اکنون کد 6 رقمی برای شماره‌ ${mobile} ارسال شد`}</p>
      <p className="enter-txt" style={{ color: "#000" }}>
       کد را در این قسمت وارد کنید
      </p>
      <form action="" className="otp-form">
        <div className="otp-input">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="مثال: 123456"
            onKeyPress={e=> handleKeyDown(e)}
          />
        </div>
        <span className="error" style={{ display: error ? "block" : "none" }}>
          شماره وارد شده صحیح نمی باشد
        </span>
        <div className="btn-div">
          <button
            className="big-btn"
            style={{ zIndex: "1000" }}
            onClick={(e) => handleCheckOtp(e)}
          >
            {loader && <CircularProgress size="15px" color="inherit" />}
            <span>تایید</span>
          </button>
        </div>
      </form>
      <div className="code-txt">
        <p>کد را دریافت نکرده اید؟</p>
        <span
          style={{ color: timer < 1 ? "#6498E6" : "#19212E" }}
          onClick={handleFailedSMS}
        >
          دوباره تلاش کنید
        </span>
        <span style={{ direction: "ltr" }}>
          {timer < 10 ? `0${timer}` : timer}
        </span>
      </div>
    </div>
  );
}

export default OTP;
