/**
 *
 * PersonalData
 *
 */

import React, { useState } from "react";
import "./personal-data.less";
import {
  setFName,
  setLName,
  setNationalId,
  setEmail,
  setSheba,
  setUserMobile,
} from "./action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import store from "store-js";

const initialState = {
  displayFNameErr: "none",
  displayNationalIdErr: "none",
  displayEmailErr: "none",
  displayLNameErr: "none",
  displayMobileErr: "none",
};

export function PersonalData() {
  const dispatch = useDispatch();
  const history = useHistory();
  const fname = useSelector((state) => state.personDataReducer.fname);
  const lname = useSelector((state) => state.personDataReducer.lname);
  const nationalId = useSelector((state) => state.personDataReducer.nationalId);
  const email = useSelector((state) => state.personDataReducer.email);
  const userMobile = useSelector((state) => state.personDataReducer.userMobile);
  // const mobile = store.get('phoneNumber');

  const [
    { displayFNameErr, displayLNameErr, displayNationalIdErr, displayEmailErr,displayMobileErr },
    setState,
  ] = useState(initialState);
  const [showErrTxt, setShowErrTxt] = useState("none");

  const handleInputChanged = (e) => {
    e.persist();
    const names = e.target.name;

    switch (names) {
      case "fname":
        dispatch(setFName(e.target.value));
        setState((prevState) => ({ ...prevState, displayFNameErr: "none" }));
        break;
      case "lname":
        dispatch(setLName(e.target.value));
        setState((prevState) => ({ ...prevState,displayLNameErr: "none" }));
        break;
      case "mobileNumber":
        dispatch(setUserMobile(e.target.value));
        setState((prevState) => ({ ...prevState, displayMobileErr: "none" }));
        break;

      case "id-national":
        dispatch(setNationalId(e.target.value));
        setState((prevState) => ({
          ...prevState,
          displayNationalIdErr: "none",
        }));
        break;
      case "email":
        dispatch(setEmail(e.target.value));
        setState((prevState) => ({ ...prevState, displayEmailErr: "none" }));
        break;
      default:
        break;
    }
  };

  const handleValidateInput = (e) => {
    const names = e.target.name;
    const regString = new RegExp("^[آ-ی]+");
    const emailRegex = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
    const numberRegex = new RegExp("^[0-9]*$");
    const phoneNumberRegex = new RegExp(/^(\+98|0)?9\d{9}/);

    switch (names) {
      case "lname":
        if (lname.length > 2) {
          if (regString.test(lname)) {
            setState((prevState) => ({
              ...prevState,
              displayLNameErr: "none",
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              displayLNameErr: "block",
            }));
          }
        }
        break;
      case "fname":
        if (fname.length > 2) {
          if (regString.test(fname)) {
            setState((prevState) => ({
              ...prevState,
              displayFNameErr: "none",
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              displayFNameErr: "block",
            }));
          }
        }
        break;
      case "id-national":
        if (nationalId.length === 10) {
          if (numberRegex.test(nationalId)) {
            setState((prevState) => ({
              ...prevState,
              displayNationalIdErr: "none",
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              displayNationalIdErr: "block",
            }));
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            displayNationalIdErr: "block",
          }));
        }
        break;
      case "email":
        if (email.length > 1) {
          if (!emailRegex.test(email)) {
            setState((prevState) => ({
              ...prevState,
              displayEmailErr: "block",
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              displayEmailErr: "none",
            }));
          }
        }
        case "mobileNumber":
          if(userMobile.length >0){
            if(!phoneNumberRegex.test(userMobile)){
              setState((prevState) => ({
                ...prevState,
                displayMobileErr: "block",
              }));
            }else{
              setState((prevState) => ({
                ...prevState,
                displayMobileErr: "none",
              }));
            }
          }
        break;
      default:
        break;
    }
  };

  const handleGotoNext = (e) => {
    e.preventDefault();
    if (lname.length !== 0 && fname.length !== 0 && nationalId.length !== 0 && userMobile.length !== 0) {
      store.set("personData", {
        lname: lname,
        fname: fname,
        nationalId: nationalId,
        email: email,
        mobile:userMobile
      });
      history.push("store-data");
    } else {
      setShowErrTxt("block");
    }
  };

  return (
    <div className="gray-bg">
      <div className="personal-data">
        <div className="top-txt">
          <p>به داپ‌اَپ اصناف خوش آمدید</p>
          <span>
            جهت پیوستن به خانواده اصناف داپ اَپی و بهره مندی از مزایای منحصر به
            فرد آن، فرم زیر را تکمیل نمایید
          </span>
        </div>
        <h2>اطلاعات فردی</h2>
        <form action="" className="profile-form">
          <div className="form-input">
            <p>نام</p>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="نام"
              style={{ textAlign: "right" }}
              value={fname}
              onChange={(e) => handleInputChanged(e)}
              onBlur={(e) => handleValidateInput(e)}
              style={{ textAlign: "right", direction: "rtl" }}
            />

            <p className="error-txt" style={{ display: displayFNameErr }}>
              لطفا نام را به درستی وارد نمایید
            </p>
          </div>
          <div className="form-input">
            <p>  نام خانوادگی</p>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="نام خانوادگی"
              style={{ textAlign: "right" }}
              value={lname}
              onChange={(e) => handleInputChanged(e)}
              onBlur={(e) => handleValidateInput(e)}
              style={{ textAlign: "right", direction: "rtl" }}
            />

            <span style={{ direction: "ltr" }}>ID: {userMobile}</span>
            <p className="error-txt" style={{ display: displayLNameErr }}>
              لطفا نام خانوادگی را به درستی وارد نمایید
            </p>
            <p>موبایل</p>
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="موبایل"
              style={{ textAlign: "right",marginBottom:"20px" }}
              value={userMobile}
              onChange={(e) => handleInputChanged(e)}
              onBlur={(e) => handleValidateInput(e)}
              style={{ textAlign: "right", direction: "rtl" }}
            />
          </div>
          <p className="error-txt" style={{ display: displayMobileErr }}>
              لطفا شماره موبایل خود را به درستی وارد نمایید
            </p>
          <div className="form-input">
     
            <p>کد ملی</p>
            <input
              type="text"
              name="id-national"
              id="id-national"
              placeholder="999 99 99 999"
              value={nationalId}
              maxLength="10"
              onChange={(e) => handleInputChanged(e)}
              onBlur={(e) => handleValidateInput(e)}
            />
            <p className="error-txt" style={{ display: displayNationalIdErr }}>
              لطفا کدملی را به درستی وارد نمایید
            </p>
          </div>
          <div className="form-input" style={{ marginTop: "18px" }}>
            <p>ایمیل (اختیاری)</p>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="e.g. yourname@domain.com"
              value={email}
              onChange={(e) => handleInputChanged(e)}
              onBlur={(e) => handleValidateInput(e)}
            />
            <p className="error-txt" style={{ display: displayEmailErr }}>
              لطفا ایمیل را به درستی وارد نمایید
            </p>
          </div>
          <p className="error-txt" style={{ display: showErrTxt }}>
            لطفا فیلدها را به درستی پر کنید
          </p>
          <button
            className="big-btn"
            style={{ zIndex: "1000", marginTop: "25px" }}
            onClick={(e) => handleGotoNext(e)}
          >
            {/*<CircularProgress size="15px" color="inherit" />*/}
            بعدی
          </button>
        </form>
      </div>
    </div>
  );
}

export default PersonalData;
