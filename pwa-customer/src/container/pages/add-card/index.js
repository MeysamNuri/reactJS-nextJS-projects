import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OtpInput from "react-otp-input";
import store from "store-js";
import Header from "../../components/header/Header";
import useDataApi from "../../components/fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./add-card.less";
import { img_url } from "../../../constants/base_url";
import { setHasAddCard, setSelectedPage, setNavValue } from "../../actions/MainActions";
import { useDispatch, useSelector } from "react-redux";
import fixNumbers from "../../components/convert-to-english";
import { getAddCardDialog } from "../transactions/actions";
import { setCardList, setMin, setShowTimer } from'../../components/card/action';
import Snackbar from "@material-ui/core/Snackbar";

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
  outline: "none",
  background: "transparent",
};

function AddCard() {
  const [cardNum, setCardNum] = useState("");
  const [params, setParams] = useState(null);
  const [background, setBackground] = useState(null);
  const [logo, setLogo] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [errorTitle, setErrorTitle] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [open, setOpen] = useState(true);
  let cards = useSelector(state=> state.cardReducer.cardList);

  const cardInfo = store.get("banksInfo_data");
  const history = useHistory();
  let url = "profile/add/card";
  let method = "post";
  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.status === 200) {
      dispatch(setHasAddCard(true));
      document.getElementsByClassName("big-btn")[0].disabled = "false";
      setMessageTitle("عملیات با موفقیت انجام شد");
    
      cards.customer_cards.push({
        id: data.data.id,
        card_number: cardNum.toString(),
        bank_logo: logo,
        bank_background_path: background,
        status: "verified",
        bank_name: bankName,
        enableTimer: true,
      });

      dispatch(setMin(5))
      store.set("cards_data", cards);
      dispatch(setCardList(cards))
      dispatch(setShowTimer(true))
      
      setTimeout(() => {
        dispatch(getAddCardDialog(true));
        // const states = {
        //   first: cards.customer_cards.length === 1 ? true : false,
        // };
        dispatch(setSelectedPage("card-list"));
        dispatch(setNavValue(1));
        history.push('main');
      }, 1000);
      
    } else if (isError) {
      document.getElementsByClassName("big-btn")[0].disabled = "false";
      setErrorTitle(errMessage);
      setCardNum("");
      let element = document.getElementsByClassName("card-number-div")[0]
        .firstElementChild.firstElementChild.firstElementChild;
      if (element) element.focus();
      handleChange("");
    }
  }, [data, isError]);
  const handleContinue = (e) => {
    if (cardNum.length < 16)
      setErrorTitle("شماره کارت وارد شده کمتر از 16 رقم است");
    else {
      setErrorTitle("");
      e.currentTarget.disabled = "true";
      setParams({ card_number: cardNum });
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
    if (num.toString().length === 6) {
      if (cardInfo) {
        let banks = cardInfo.banks;
        let temp = num.toString();
        temp = fixNumbers(temp);
        for (let index = 0; index < banks.length; index++) {
          const element = banks[index];
          for (let index = 0; index < element.card_pre_number.length; index++) {
            if (element.card_pre_number[index] === temp) {
              changeCard(
                element.background_path,
                element.logo_path,
                element.name
              );
            }
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
  const handleCloseErrMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="add-card-div">
      <Header
        title="اضافه کردن کارت"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="card-list"
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errorTitle !== "" ? open : false}
        autoHideDuration={5000}
        message={errorTitle}
        onClose={handleCloseErrMessage}
      />

      <div className="add-card-page">
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
              <OtpInput
                onChange={(num) => handleChange(num)}
                numInputs={16}
                containerStyle={otpStyle}
                inputStyle={otpInputStyle}
                value={cardNum}
                shouldAutoFocus={true}
              />
            </div>
          </div>
        </div>
      </div>
      {isError && <span className="error">{errMessage}</span>}
      {data && !isError && <span className="message">{messageTitle}</span>}
      <div
        style={{
          width: "90%",
          margin: "15px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className="big-btn"
          style={{ margin: "15px 0" }}
          onClick={(e) => handleContinue(e)}
        >
          {isLoading && <CircularProgress size="15px" color="inherit" />}
          {!isLoading && <span>ادامه</span>}
        </button>
      </div>
    </div>
  );
}

export default AddCard;
