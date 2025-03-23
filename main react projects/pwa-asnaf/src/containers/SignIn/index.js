import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./sign-in.less";
import APIs from "./APIs";
import store from 'store-js'
import { openSnackbar, setSnackbarMsg } from "../../mainAction/snackbarAction";
import { setPhoneNumber } from './actions';
import { useHistory } from "react-router-dom";
import fetchCatch from "../../utils/fetchCatch";

function SignIn() {
  const [phone, setPhone] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState("none");

  const history = useHistory();
  const dispatch = useDispatch();

  const HandlePhoneNumberValidation = () => {
    const phoneNumberRegex = new RegExp(/^(\+98|0)?9\d{9}/);
    if (!phoneNumberRegex.test(phone)) {
      setErrorDisplay("block");
    } else {
      setErrorDisplay("none");
      dispatch(setPhoneNumber(phone));
      store.set('phoneNumber', phone)
    }
  };

  async function handleSendPhone(e) {
    e.preventDefault();
    try {
      setLoader(true)
      const data = await APIs.signIn(phone);
      if (data.data.user_exists) {
        history.push("otp");
        setLoader(false)
      } else {
        dispatch(setSnackbarMsg("کاربر یافت نشد"));
        dispatch(openSnackbar());
        setLoader(false)
        history.push('personal-data')
      }
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      HandlePhoneNumberValidation()
      handleSendPhone(e)
    }
  }

  return (
    <div className="enter-div">
      <img
        className="big-circle"
        src='assets/images/big-circle-w.svg'
        alt=""
        style={{ zIndex: "1" }}
      />
      <img className="small-circle" src='assets/images/small-circle-w.svg' alt="" />
      <p className="enter-txt" style={{ color: "#000" }}>
        شماره موبایل خود را وارد کنید
      </p>
      <form action="" className="enter-form" style={{ zIndex: "1000" }}>
        <input
          className="enter-input"
          type="number"
          value={phone}
          id=""
          placeholder={'** ** *** 0912 مثال'}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={HandlePhoneNumberValidation}
          onKeyPress={e=> handleKeyDown(e)}
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
            onClick={(e) => handleSendPhone(e)}
          >
            {loader && <CircularProgress size="15px" color="inherit" />}
            <span style={{marginRight: loader ? '10px' : '0'}}>ادامه</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
