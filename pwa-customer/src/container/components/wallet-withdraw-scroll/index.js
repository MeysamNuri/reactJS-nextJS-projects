import React, { useState, useEffect } from "react";
import "./wallet-withdraw-scroll.less";
import CircularProgresses from "../circular-progress";
import WalletSuccessful from "../wallet-successful";
import useDataApi from "../fetchData/useDataApi";
import store from "store-js";
import DialogCredit from "../dialog/DialogCreditInfo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import base_url from "../../../constants/base_url";
import Lottie from "react-lottie";
import animationData from "./success.json";
import { setWithdrawScroll } from "../../actions/MainActions";
import {
  setWalletAmount,
  setWalletTransaction,
} from "../../pages/wallet/action";

const persianJs = require("persianjs");

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function WalletWithdrawScroll({ show, walletAmount }) {
  const [showCircular, setShowCircular] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showTxt, setShowTxt] = useState(true);
  const [amount, setAmount] = useState("");
  const [creditInfo, setCreditInfo] = useState(null);
  const [params, setParams] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("post");
  const [showShebaInput, setShowShebaInput] = useState(false);
  const [sheba, setSheba] = useState("");
  const [haveSheba, setHaveSheba] = useState(false);
  const [showEditSheba, setShowEditSheba] = useState(false);
  const [btnTxt, setBtnTxt] = useState("برداشت وجه");
  const [shebaOwner, setShebaOwner] = useState(null);
  const [shebaTxt, setShebaTxt] = useState("شماره شبای بانکی خود را وارد کنید");
  const [showLottie, setShowLottie] = useState(false);
  const [inputColor, setInputColor] = useState("#000");
  const [errorTitle, setErrorTitle] = useState(
    "موجودی کیف پول شما باید حداقل ۱۰۰۰۰ تومان باشد"
  );
  const [{ data, isLoading, isError, errMessage, errData }] = useDataApi(
    url,
    params,
    method
  );
  const pageNumber = useSelector((state) => state.walletReducer.pageNumber);
  const startDate = useSelector((state) => state.walletReducer.sliderStartDate);
  const endDate = useSelector((state) => state.walletReducer.sliderEndDate);
  const walletTransaction = useSelector(
    (state) => state.walletReducer.walletTransaction
  );

  const profileData = store.get("profile_data");
  const shebaAuth = useSelector((state) => state.MainReducer.shebaAuth);
  const withdrawScroll = useSelector(
    (state) => state.MainReducer.withdrawScroll
  );
  const Dispatch = useDispatch();
  const token = store.get("token");
  const headers = {
    Authorization: `bearer ${token}`,
  };

  const getWalletTransaction = () => {
    axios
      .get(
        `${base_url}transaction/list?from=${startDate}&to=${endDate}&page=${pageNumber}`,
        { headers: headers }
      )
      .then((res) => {
        Dispatch(
          setWalletTransaction(
            walletTransaction.concat(res.data.data.data.data)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCredit = () => {
    axios
      .get(`${base_url}wallet/credit`, { headers: headers })
      .then((res) => {
        Dispatch(setWalletAmount(res.data.data.credit));
        store.set("credit_data", res.data.data);
        getWalletTransaction();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (profileData !== undefined) {
      if (profileData.sheba_id !== null) {
        setSheba(profileData.sheba_id);
        setHaveSheba(true);
        setShebaOwner(profileData.sheba_full_name);
      } else {
        setBtnTxt("ویرایش شماره شبای بانکی");
        setShowEditSheba(true);
      }
    }
  }, []);

  useEffect(() => {
    if (shebaAuth) {
      // let number = persianJs(amount).toEnglishNumber().toString();
      withdraw();
      // setMethod("post");
      // setUrl("wallet/withdraw");
      // setParams({ amount: number });
    }
  }, [shebaAuth]);

  useEffect(() => {
    if (data !== null && url === "wallet/withdrawinit") {
      // setAmount("");
      if (data.status === 200) {
        setShowShebaInput(true);
        setShowCircular(false);
        setShowTxt(true);
        setError(false);
        setShebaTxt(
          "درصورت تایید شماره شبای بانکی، درخواست واریز وجه خود را تایید کنید."
        );
      }
    } else if (isError) {
      setErrorTitle(errMessage);
      if (errData.status === 401) {
        setError(true);
        setErrorTitle("شماره شبای بانکی ثبت نکرده اید");
        setShowShebaInput(true);
      }
      setInputColor("#000");
      setError(true);
      setShowCircular(false);
      setShowTxt(true);
    }
  }, [data, url, isError]);

  const withdraw = () => {
    axios
      .post(
        `${base_url}wallet/withdraw`,
        { amount: amount },
        { headers: headers }
      )
      .then((res) => {
        setSuccess(true);
        setShowLottie(true);
        setShowCircular(false);
        setShowTxt(true);
        getCredit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleShowCircular(e) {
    let amountP = persianJs(amount).toEnglishNumber().toString();
    e.preventDefault();
    if (parseInt(amountP) > parseInt(walletAmount)) {
      setErrorTitle("مبلغ بیش از مقدار کیف پول است");
      setError(true);
    } else if (parseInt(amountP) < 10000) {
      setErrorTitle("مبلغ نباید از 10000 تومان کمتر باشد");
      setError(true);
    } else {
      setParams({ amount: amountP });
      setUrl("wallet/withdrawinit");
      setShowCircular(true);
      setShowTxt(false);
      setInputColor("#000");
    }
  }
  const handleEditSheba = (e) => {
    setSheba(e.target.value);
    setShowEditSheba(true);
    setBtnTxt("ثبت شماره شبای بانکی");
  };

  const handleUpdateSheba = (e) => {
    e.preventDefault();
    setShowCircular(true);
    setShowTxt(false);
    axios
      .post(
        `${base_url}profile/sheba/update`,
        { iban: sheba },
        { headers: headers }
      )
      .then((res) => {
        setShowCircular(false);
        setShebaOwner(res.data.data.full_name);
        setShowEditSheba(false);
        setShowTxt(true);
        setError(false);
        setBtnTxt("برداشت وجه");
      })
      .catch((err) => {
        setShowCircular(false);
        setShowTxt(true);
        setError(true);
        setErrorTitle("شماره شبای بانکی وارد شده اشتباه است");
      });
  };
  const handleWithdraw = (e) => {
    e.preventDefault();
    // setUrl("wallet/withdraw");
    // setParams({ amount: amount });
    withdraw();
    setShowCircular(true);
    setShowTxt(false);
  };

  const handleSuccessBtn = (e) => {
    e.preventDefault();
    Dispatch(setWithdrawScroll(!withdrawScroll));
    setShowLottie(false);
  };

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  const handleChangeAmount = (e) => {
    setInputColor("#fff");
    if (e.target.value.length === 0) {
      setError(false);
    }
    setAmount(e.target.value);
  };
  // console.log(showTxt);

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     if (!show) {
  //       setSuccess(false);
  //       setShowLottie(false);
  //       setShowTxt(false);
  //     }
  //     return () => {
  //       clearTimeout(timeOut);
  //     };
  //   }, 2000);
  // }, [show]);
  // console.log(show);
  return (
    <div style={{ display: show ? "flex" : "none", width: "100%" }}>
      {showLottie ? (
        <div
          className="withdraw-scroll"
          style={{ paddingTop: "25px", height: "230px" }}
        >
          <Lottie options={defaultOptions} height={190} width={"50%"} />
          <p>برداشت با موفقیت انجام شد</p>
          <button className="success-btn" onClick={(e) => handleSuccessBtn(e)}>
            تایید
          </button>
        </div>
      ) : showShebaInput ? (
        <div className="withdraw-scroll" style={{ paddingTop: "25px" }}>
          <p>{shebaTxt}</p>
          <img
            src="assets/images/arrow-w-rotate.svg"
            className="back-arrow"
            alt=""
            onClick={() => setShowShebaInput(false)}
          />
          {error && (
            <span style={{ width: "80%", textAlign: "center" }}>
              {errorTitle}
            </span>
          )}
          <form>
            <input
              type="text"
              value={sheba}
              maxLength="24"
              style={{
                direction: "ltr",
                textAlign: "left",
                paddingLeft: "5px",
              }}
              onChange={(e) => handleEditSheba(e)}
            />
            <span style={{ top: "27px", fontSize: "1.2rem" }}> - IR</span>
            <p
              style={{ color: "#fff", marginBottom: "10px" }}
            >{`نام صاحب حساب: ${shebaOwner !== null ? shebaOwner : ""}`}</p>
            <div
              onClick={(e) =>
                showEditSheba ? handleUpdateSheba(e) : handleWithdraw(e)
              }
            >
              <span style={{ display: showTxt ? "block" : "none" }}>
                {btnTxt}
              </span>
              <CircularProgresses showCircular={showCircular} />
            </div>
          </form>
        </div>
      ) : (
        <div className="withdraw-scroll">
          {success ? (
            <WalletSuccessful success={success} amount={amount} />
          ) : (
            <>
              <DialogCredit info={creditInfo} />
              <p>چقدر میخواهید برداشت کنید؟</p>
              {error && (
                <span style={{ width: "80%", textAlign: "center" }}>
                  {errorTitle}
                </span>
              )}
              <form>
                <input
                  type="text"
                  value={amount}
                  style={{ direction: "ltr", color: inputColor }}
                  onChange={(e) => handleChangeAmount(e)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "23px",
                    fontSize: "1.3rem",
                  }}
                >
                  {priceDigitSeperator(amount)}
                </p>
                <span>تومان</span>
                <div onClick={(e) => handleShowCircular(e)}>
                  <span style={{ display: showTxt ? "block" : "none" }}>
                    برداشت وجه
                  </span>
                  <CircularProgresses showCircular={showCircular} />
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletWithdrawScroll;
