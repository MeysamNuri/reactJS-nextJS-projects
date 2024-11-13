import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/header/Header";
import {
  setLoadMore,
  setWithdrawScroll,
  removeStack,
} from "../../actions/MainActions";
import "./wallet.less";
import WalletSlider from "../../components/wallet-slider";
import WalletTransactions from "../../components/wallet-transactions";
import WalletWithdraw from "../../components/wallet-withdraw";
import WalletEmpty from "../wallet-empty";
import useDataApi from "../../components/fetchData/useDataApi";
import store from "store-js";
import Snackbar from "@material-ui/core/Snackbar";
import { setWalletAmount } from "./action";

function Wallet() {
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const url = "wallet/credit";
  const method = "get";
  const params = true;
  const [open, setOpen] = useState(false);
  // const [walletAmount, setWalletAmount] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [smallCard, setSmallCard] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  let startDate;
  const loadMore = useSelector((state) => state.MainReducer.loadMore);
  const walletAmount = useSelector((state) => state.walletReducer.walletAmount);

  const withdrawScroll = useSelector(
    (state) => state.MainReducer.withdrawScroll
  );
  const handleCloseErrMessage = () => {
    setOpen(false);
  };

  if (store.get("transactions_data") !== undefined) {
    startDate = store.get("transactions_data").first_transaction_date;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWithdrawScroll(false));
  }, []);

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      dispatch(setWalletAmount(data.data.credit));
      store.set("credit_data", data.data);
    } else if (isError) {
      setFlag((flag) => !flag);
      setError((error) => !error);
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setScrollHeight(0.2 * window.innerHeight);
  }, []);

  const handleScroll = (e) => {
    if (
      (e.currentTarget.scrollTop > scrollHeight && smallCard === false) ||
      (e.currentTarget.scrollTop < scrollHeight && smallCard === true)
    ) {
      setSmallCard((smallCard) => !smallCard);
    }
    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight ===
      e.currentTarget.scrollHeight
    ) {
      dispatch(setLoadMore(!loadMore));
    }
  };

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  const handleClickGrayWithdraw = () => {
    setOpen(true);
  };
  const handleLeftClick = () => {
    dispatch(removeStack());
  };

  return (
    <div className="wallet-div">
      <Header
        title="کیف پول"
        back={null}
        handleLeftClick={handleLeftClick}
        leftIcon="assets/images/arrow-w-rotate.svg"
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={"موجودی باید حداقل 10 هزار تومان باشد"}
      />
      <div className="wallet" onScroll={(e) => handleScroll(e)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="page-content">
            <div className="wallet-amount">
              {isLoading && (
                <div className="loading">
                  <CircularProgress className="circular_loading" />
                </div>
              )}
              <h3>موجودی</h3>
              <div>
                <h1>
                  {parseFloat(walletAmount) === 0
                    ? parseFloat(walletAmount)
                    : priceDigitSeperator(walletAmount)}
                </h1>
                <p style={{ marginRight: "8px", fontSize: "1.1rem" }}>تومان</p>
              </div>
            </div>
            {data !== null && (
              <div className="total-info">
                <div>
                  <div>
                    <p>مبلغ کل تراکنش های امروز شما:</p>
                    <span>
                      <p>
                        {data.data.todayPostransactionSum === 0
                          ? 0
                          : priceDigitSeperator(
                              data.data.todayPostransactionSum
                            )}
                      </p>
                      تومان
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <p>حداقل پاداش دریافتی شما:</p>
                    <span>
                      <p>
                        {data.data.todayPostransactionSumMin === 0
                          ? 0
                          : priceDigitSeperator(
                              data.data.todayPostransactionSumMin
                            )}
                      </p>
                      تومان
                    </span>
                  </div>
                  <div>
                    <p>حداکثر پاداش دریافتی شما:</p>
                    <span>
                      <p>
                        {data.data.todayPostransactionSumMax === 0
                          ? 0
                          : priceDigitSeperator(
                              data.data.todayPostransactionSumMax
                            )}
                      </p>
                      تومان
                    </span>
                  </div>
                </div>
                <p>
                  مبلغ دقیق پاداش دریافتی، فردا ساعت 9 صبح محاسبه شده و به کیف
                  پول شما واریز می گردد.
                </p>
              </div>
            )}
          </div>
          {parseFloat(walletAmount) !== 0 ? (
            <>
              {/*<div
          style={{ display: smallCard ? "flex" : "none" }}
          className="small-wallet-amount"
        >
          <h1>
            {parseFloat(walletAmount) === 0
              ? parseFloat(walletAmount)
              : priceDigitSeperator(walletAmount)}
          </h1>
          <p style={{ marginRight: "8px" }}>تومان</p>
            </div>*/}
              <div className="wallet-progress">
                <span style={{ fontSize: "1.1rem", margin: "0 25px 15px 0" }}>
                  جزئیات
                </span>
                <p>
                  برای مشاهده‌ی تراکنش‌ها می‌توانید بازه‌ی تاریخ را تغییر دهید
                </p>
                <div className="wallet-progress-div">
                  <WalletSlider startDate={startDate} setLoading={setLoading} />
                </div>
              </div>
              <div className="wallets-transactions">
                {loading && (
                  <WalletTransactions
                    // state={transactions}
                    // setState={setTransactions}
                    loadMore={loadMore}
                  />
                )}
              </div>

              {walletAmount < 10000 ? (
                <div
                  className="gray-withdraw-btn"
                  onClick={handleClickGrayWithdraw}
                >
                  <p>برداشت وجه</p>
                  <img src="assets/images/credit-card-in2.svg" alt="" />
                </div>
              ) : (
                <WalletWithdraw walletAmount={walletAmount} />
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <WalletEmpty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
