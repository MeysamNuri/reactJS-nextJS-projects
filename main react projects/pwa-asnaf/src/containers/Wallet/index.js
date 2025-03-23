/**
 *
 * Wallet
 *
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./wallet.less";
import {
  getWalletAndPointsAmountDialog,
  getFirstTransactionDate,
} from "./actions";
import store from "store-js";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
// --------------------- components ------------------
import Header from "../../components/Header";
import WalletSlider from "../../components/WalletSlider";
import WalletTransaction from "../../components/WalletTransactions";
import WalletAndPointsAmountDialog from "../../components/Dialogs/WalletAndPointsAmountDialog";

function Wallet() {
  const firstTransaction = useSelector(
    (state) => state.walletReducer.firstTransactionDate
  );
  // const startDate = useSelector((state) => state.walletReducer.sliderStartDate);
  // const endDate = useSelector((state) => state.walletReducer.sliderEndDate);
  const dispatch = useDispatch();
  const [incBtnClicked, setincBtnClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const appInit = store.get("appInit");
  const [loading, setLoading] = useState(false);

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  const handleIncAmount = () => {
    setincBtnClicked(true);
    dispatch(getWalletAndPointsAmountDialog(true));
    document.getElementsByClassName("wallet-div")[0].style.filter =
      "blur(2.5px)";
  };

  const handleWithdrawAmount = () => {
    setincBtnClicked(false);
    dispatch(getWalletAndPointsAmountDialog(true));
    document.getElementsByClassName("wallet-div")[0].style.filter =
      "blur(2.5px)";
  };

  // async function getPdf() {
  //   setIsLoading(true);
  //   try {
  //     const data = await APIs.getPdf(startDate, endDate,1);
  //     setIsLoading(false);
  //   } catch ({ response }) {
  //     if (response) {
  //       fetchCatch(response);
  //     }
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    async function walletHistory() {
      setIsLoading(true);
      try {
        const data = await APIs.walletHistory();
        dispatch(
          getFirstTransactionDate(data.data.first_wallet_transaction_date)
        );
        setIsLoading(false);
      } catch ({ response }) {
        if (response) {
          fetchCatch(response);
        }
        setIsLoading(false);
      }
    }
    walletHistory();
  }, []);

  return (
    <div className="wallet-div">
      {isLoading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}
      {incBtnClicked ? (
        <WalletAndPointsAmountDialog
          type="inc-amount"
          title="افزایش اعتبار"
          text="مبلغ دلخواه خود را وارد کنید"
        />
      ) : (
        <WalletAndPointsAmountDialog
          type="withdraw-amount"
          title="برداشت وجه"
          text="مبلغ دلخواه خود را وارد کنید (حداقل 150,000 تومان)"
        />
      )}

      <Header
        title="کیف پول"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="main"
      />
      <div className="wallet">
        <div className="page-content">
          <div className="wallet-amount">
            {/*isLoading && (
              <div className="loading">
                <CircularProgress className="circular_loading" />
              </div>
            )*/}
            <p style={{ fontSize: "1.2rem" }}>موجودی</p>
            <div className="amount">
              <h1>
                {appInit.wallet_credit === "0.00"
                  ? 0
                  : priceDigitSeperator(appInit.wallet_credit)}
              </h1>
              <p style={{ marginRight: "8px", fontSize: "1.1rem" }}>تومان</p>
            </div>
            <div className="amount-btn">
              <button className="inc-btn" onClick={handleIncAmount}>
                افزایش اعتبار
              </button>
              <button className="withdraw-btn" onClick={handleWithdrawAmount}>
                برداشت وجه
              </button>
            </div>
          </div>
        </div>
        {firstTransaction !== null && (
          <div className="wallet-progress">
            <span style={{ fontSize: "1.1rem", margin: "0 25px 15px 0" }}>
              جزئیات
            </span>
            <p>برای مشاهده‌ی تراکنش‌ها می‌توانید بازه‌ی تاریخ را تغییر دهید</p>
            <div className="wallet-progress-div">
              <WalletSlider
                firstTransaction={firstTransaction}
                setLoading={setLoading}
              />
            </div>
          </div>
        )}

        {loading && <WalletTransaction />}
        {/*<p
          style={{
            color: "#6498E6",
            alignSelf: "flex-end",
            direction: "ltr",
            padding: "10px",
            fontSize: ".9rem",
            marginBottom: '15px'
          }}
          onClick={()=> getPdf()}
        >
          (PDF) ذخیره‌ی جزئیات
        </p>*/}
      </div>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;
