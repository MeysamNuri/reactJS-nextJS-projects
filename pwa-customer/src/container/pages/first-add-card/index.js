import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./first-add-card.less";
import { setCardNumber, setHasAddCard } from "../../actions/MainActions";
import store from "store-js";
import { img_url } from "../../../constants/base_url";
import fixNumbers from "../../components/convert-to-english";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";
import base_url from "../../../constants/base_url";
import CircularProgress from "@material-ui/core/CircularProgress";
const persianJs = require("persianjs");

const otpStyle = {
  height: "100%",
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  flexDirection: "row-reverse",
};
const otpInputStyle = {
  width: "12px",
  borderBottom: "2px solid #C2CDD9",
  margin: "2px",
  color: "black",
  fontSize: "1rem",
  direction: "ltr",
  background: "transparent",
  boxSizing: "border-box",
  appearance: "none",
};

const props = {
  inputStyle: {
    margin: "2px",
    MozAppearance: "textfield",
    width: "15px",
    borderRadius: "8px",
    fontSize: "14px",
    height: "26px",
    backgroundColor: "#fff",
    color: "black",
    border: "1px solid black",
  }
};

function FirstAddCard() {
  const [cardNum, setCardNum] = useState("");
  const [open, setOpen] = useState(true);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validCardNumber, setValidCardNumber] = useState(false);
  const [background, setBackground] = useState(null);
  const [logo, setLogo] = useState(null);
  const [bankName, setBankName] = useState(null);
  const cardInfo = store.get("banksInfo_data");
  const name = useSelector((state) => state.MainReducer.name);
  const fname = useSelector((state) => state.MainReducer.fname);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = store.get("token");

  useEffect(() => {
    if (cardInfo === undefined) {
      setIsLoading(true);
      const headers = {
        Authorization: `bearer ${token}`,
      };
      axios
        .get(`${base_url}bank/all`, { headers: headers })
        .then((res) => {
          setIsLoading(false);
          store.set("banksInfo_data", res.data.data);
        })
        .catch((err) => {
          console.log('bank list error',err);
        });
    }
  }, []);

  const handleContinue = (e) => {
    e.preventDefault();
    if (cardNum.length === 16) {
      dispatch(setCardNumber(cardNum));
      dispatch(setHasAddCard(true));
      store.set("firstAddCard", cardNum);
      store.set("showMainLogin", true);
      store.set("isSignIn", false);
      history.push("sign-in");
    } else {
      setErr(true);
    }
  };

  const changeCard = (back, logoCard, name) => {
    document.getElementsByClassName("card-img-rec")[0].style.display = "none";
    document.getElementsByClassName("card-circle")[0].style.display = "none";
    document.getElementsByClassName("card-circle2")[0].style.display = "none";
    setBackground(back);
    setLogo(logoCard);
    setBankName(name);
  };

  const handleChange = (num) => {
    setCardNum(num);
    if (num.toString().length === 16) setValidCardNumber(true);
    else if (validCardNumber) setValidCardNumber(false);
    if (num.toString().length === 6) {
      if (cardInfo) {
        let banks = cardInfo.banks;
        let temp = persianJs(num).toEnglishNumber().toString();
        temp = fixNumbers(temp);
        for (let index = 0; index < banks.length; index++) {
          const element = banks[index];
          let flag = false;
          for (let index = 0; index < element.card_pre_number.length; index++) {
            if (element.card_pre_number[index] === temp) {
              flag = true;
              changeCard(
                element.background_path,
                element.logo_path,
                element.name
              );
              break;
            }
            if (flag) break;
          }
        }
      }
    } else if (num.toString().length < 6 && background !== null) {
      document.getElementsByClassName("card-img-rec")[0].style.display =
        "block";
      document.getElementsByClassName("card-circle")[0].style.display = "block";
      document.getElementsByClassName("card-circle2")[0].style.display =
        "block";
      setBackground(null);
      setLogo(null);
      setBankName(null);
    }
  };

  const handleIgnoreAddCard = () => {
    // if (token !== undefined) {
    //   store.set("showMainLogin", false);
    //   store.set("isSignIn", true);
    // } else {
    //   store.set("showMainLogin", true);
    //   store.set("isSignIn", false);
    // }
    history.push("/sign-in");
  };

  const handleCloseErrMessage = () => {
    setOpen(false);
  };

  return (
    <div className="first-add-card-enter-div">
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={err ? open : false}
            autoHideDuration={5000}
            onClose={handleCloseErrMessage}
            message={"شماره کارت وارد شده کمتر از 16 رقم است"}
          />
          <img
            className="big-circle"
            src="assets/images/big-circle-w.svg"
            alt=""
            style={{ zIndex: "-1000" }}
          />
          <img
            className="small-circle"
            src="assets/images/small-circle-w.svg"
            alt=""
            style={{ zIndex: "-1000" }}
          />
          <div className="code-txt" style={{ width: "80%" }}>
            <h1 className="welcome-txt">
              <span>{name + " " + fname + " "}</span>
              <span>عزیز، به داپ‌اَپ خوش آمدید!</span>
            </h1>
            <p
              className="enter-txt"
              style={{ color: "#000", fontSize: "1rem", marginBottom: "5px" }}
            >
              کارت بانکی که خریدهای خود را با آن انجام می‌دهید اضافه کنید
            </p>
            <span>بعدا می‌توانید کارت‌های بیشتری اضافه کنید</span>
          </div>
          <div className="card-div">
            <div className="card-body">
              <img
                className="logo"
                src={`${img_url}${logo}`}
                style={{ display: logo ? "block" : "none" }}
              />
              <img
                className="background"
                src={`${img_url}${background}`}
                style={{ display: background ? "block" : "none" }}
              />
              <img
                className="card-img-rec"
                src="assets/images/card-rectangle.svg"
                alt=""
              />
              <img
                className="card-circle"
                src="assets/images/card-circle.svg"
                alt=""
              />
              <img
                className="card-circle2"
                src="assets/images/card-circle2.svg"
                alt=""
              />
              <p className="cardTxt">شماره‌ی 16 رقمی کارت خود را وارد کنید</p>
              <div className="card-number-div">
                <form action="" style={{ position: "relative" }}>
                  <OtpInput
                    onChange={(num) => handleChange(num)}
                    numInputs={16}
                    containerStyle={otpStyle}
                    inputStyle={otpInputStyle}
                    value={cardNum}
                    separator={true}
                  />
                </form>
                {/*<ReactCodeInput type='number' fields={16} {...props} inputMode />*/}
                {/*<input
              type="text"
              style={{
                width: "100%",
                height: "30px",
                fontSize: "16px",
                padding: "5px 8px",
                backgroundColor: "#ffffff61",
                borderRadius: "8px",
                boxShadow: "0 3px 15px #000000cf",
              }}
            />*/}
              </div>
            </div>
          </div>
          <div className="add-card-btn">
            <button
              style={{
                backgroundColor: validCardNumber ? "#009B7F" : "#c2cdd9",
              }}
              className="card-btn"
              onClick={(e) => handleContinue(e)}
            >
              اضافه کردن کارت و ادامه
            </button>
            <Link onClick={handleIgnoreAddCard}>بعدا</Link>
          </div>
          <Link to="/enter">
            <img className="arrow" src="assets/images/arrow.svg" alt="" />
          </Link>
        </>
      )}
    </div>
  );
}

export default FirstAddCard;
