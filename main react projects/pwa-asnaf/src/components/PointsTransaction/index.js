import React, { useEffect, useState } from "react";
import "./points-transactions.less";
import { useSelector, useDispatch } from "react-redux";
import APIs from "./APIs";
import fetchCatch from "../../utils/fetchCatch";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setLoadMore } from "../../containers/Points/actions";

function PointsTransaction() {
  const [pageNumber, setPageNumber] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [lastPage, setLastPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const businesses = store.get("businesses");
  const [scrollHeight, setScrollHeight] = useState(0);

  const startDate = useSelector(
    (state) => state.pointReducer.pointSliderStartDate
  );
  const endDate = useSelector((state) => state.pointReducer.pointSliderEndDate);
  const loadMore = useSelector((state) => state.pointReducer.loadMore);
  const [url, setUrl] = useState(
    `reputations/list?from=${startDate}&to=${endDate}&business_id=${businesses[0].business_id}&page=${pageNumber}`
  );
  const dispatch = useDispatch();
  // ------------------- load more when scroll -------------------
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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
    setUrl(
      `reputations/list?from=${startDate}&to=${endDate}&business_id=${businesses[0].business_id}&page=1`
    );
    setTransactions([]);
    setLastPage();
  }, [endDate, startDate]);

  async function pointHistory(url) {
    setIsLoading(true);
    try {
      const data = await APIs.pointHistory(url);
      setTransactions(transactions.concat(data.data.transactions.data));
      setLastPage(data.data.transactions.last_page);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    pointHistory(url);
  }, [url]);

  useEffect(() => {
    if (pageNumber < lastPage) {
      setUrl(
        `reputations/list?from=${startDate}&to=${endDate}&business_id=${
          businesses[0].business_id
        }&page=${pageNumber + 1}`
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
      <div className="point-transaction-list" onScroll={handleScroll}>
        {transactions.map((item, index) => {
          return item.type === "cash" ? (
            <div className="point-transaction-item">
              <div>
                <p>امتیاز کسرشده</p>
                <div className="point-transaction-amount">
                  <h3 style={{ color: "#D0332C", direction: "ltr" }}>
                    {item.reputation}
                  </h3>
                  <span>امتیاز</span>
                </div>
              </div>
              <div>
                <p>مبلغ</p>
                <div className="point-transaction-amount">
                  <h3 style={{ color: "#009B7F", direction: "ltr" }}>
                    {`+${priceDigitSeperator(item.amount)}`}
                  </h3>
                  <span>تومان</span>
                </div>
              </div>
              <div style={{ color: "#c2cdd9" }}>
                <p>تبدیل به پول</p>
                <span style={{ direction: "ltr" }}>{item.date}</span>
              </div>
            </div>
          ) : item.type === "reputation" ? (
            <div className="point-transaction-item">
              <div>
                <p>امتیاز کسر شده</p>
                <div className="point-transaction-amount">
                  <h3 style={{ color: "#D0332C", direction: "ltr" }}>
                    {`-${item.reputation}`}
                  </h3>
                  <span>امتیاز</span>
                </div>
              </div>
              <div>
                <p>مبلغ</p>
                <div className="point-transaction-amount">
                  <h3 style={{ color: "#009B7F", direction: "ltr" }}>
                    {`+${priceDigitSeperator(item.amount)}`}
                  </h3>
                  <span>تومان</span>
                </div>
              </div>
              <div style={{ color: "#c2cdd9" }}>
                <p>تبدیل به پول</p>
                <span style={{ direction: "ltr" }}>{item.date}</span>
              </div>
            </div>
          ) : item.type === "transactions_rep" ? (
            <div className="point-transaction-item">
              <div>
                <p>امتیاز تراکنش داپ اَپی</p>
                <div className="point-transaction-amount">
                  <h3 style={{ color: "#009B7F", direction: "ltr" }}>
                    {`+${item.reputation}`}
                  </h3>
                  <span>امتیاز</span>
                </div>
              </div>
              <div>
                <p> مبلغ تراکنش</p>
                <div className="point-transaction-amount">
                  <h3 style={{ color: "#009B7F", direction: "ltr" }}>
                    {`+${priceDigitSeperator(item.amount)}`}
                  </h3>
                  <span>تومان</span>
                </div>
              </div>
              <div style={{ color: "#c2cdd9", flexDirection: "row-reverse" }}>
                <span style={{ direction: "ltr" }}>{item.date}</span>
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

PointsTransaction.propTypes = {};

export default PointsTransaction;
