/**
 *
 * WalletTransactions
 *
 */

import React, { useState, useEffect } from "react";
import "./wallet-transactions.less";
import { useSelector, useDispatch } from "react-redux";
import APIs from "./APIs";
import fetchCatch from "../../utils/fetchCatch";
import { setLoadMore } from "../../containers/Wallet/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

function WalletTransactions() {
  const [transactions, setTransactions] = useState([]);
  const startDate = useSelector((state) => state.walletReducer.sliderStartDate);
  const endDate = useSelector((state) => state.walletReducer.sliderEndDate);
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [lastPage, setLastPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const loadMore = useSelector((state) => state.walletReducer.loadMore);
  const dispatch = useDispatch();

  const [url, setUrl] = useState(
    `wallet/history?from=${startDate}&to=${endDate}&page=${pageNumber}`
  );

  // ------------------- load more when scroll -------------------
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  useEffect(() => {
    setScrollHeight(0.2 * window.innerHeight);
  }, []);

  const handleScroll = (e) => {
    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight ===
      e.currentTarget.scrollHeight
    ) {
      dispatch(setLoadMore(!loadMore));
    }
  };
  // ---------------------------------------------------------------------
  useEffect(() => {
    setPageNumber(1);
    setUrl(`wallet/history?from=${startDate}&to=${endDate}&page=1`);
    setTransactions([]);
    setLastPage();
  }, [endDate, startDate]);

  async function walletHistory(url) {
    setIsLoading(true);
    try {
      const data = await APIs.walletHistory(url);
      setTransactions(transactions.concat(data.data.wallet_transactions.data));
      setLastPage(data.data.wallet_transactions.last_page);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    walletHistory(url);
  }, [url]);

  useEffect(() => {
    if (pageNumber < lastPage) {
      setUrl(
        `wallet/history?from=${startDate}&to=${endDate}&page=${pageNumber + 1}`
      );
      setPageNumber(pageNumber + 1);
    }
  }, [loadMore]);

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  return (
    <>
      <div className="transaction-list" onScroll={handleScroll}>
        {transactions.map((item, index) => {
          return item.type === "rep_converted" ||
            item.type === "correction" ||
            item.type === "withdraw" ? (
            <div className="transaction-item-div" key={index}>
              <div className="transaction-amount">
                <p style={{ color: "#c2cdd9" }}>{item.date}</p>
              </div>
              <div className="withdraw-transaction">
                <div>
                  <p style={{ marginLeft: "5px" }}>
                    {priceDigitSeperator(item.credit)}
                  </p>
                  <span>تومان</span>
                </div>
                <span>تبدیل امتیاز</span>
              </div>
            </div>
          ) : item.type === "charge" ? (
            <div className="transaction-item-div" key={index}>
              <div className="transaction-amount">
                <p style={{ color: "#c2cdd9" }}>{item.date}</p>
              </div>
              <div className="withdraw-transaction">
                <span style={{ backgroundColor: "#009B7F" }}>شارژ کیف پول</span>
                <div>
                  <p style={{ marginLeft: "5px", color: "#009B7F" }}>
                    {priceDigitSeperator(item.credit)}
                  </p>
                  <span>تومان</span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      {isLoading && (
        <div className="pagination-loading">
          <CircularProgress size={24} color={"secondary"} />
        </div>
      )}
    </>
  );
}

WalletTransactions.propTypes = {};

export default WalletTransactions;
