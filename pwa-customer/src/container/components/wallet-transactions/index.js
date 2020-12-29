import React, { useEffect, useState } from "react";
import "./wallet-transactions.less";
import useDataApi from "../fetchData/useDataApi";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setPageNumber, setWalletTransaction } from "../../pages/wallet/action";

function WalletTransactions() {
  const history = useHistory();
  const params = true;
  const method = "get";
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);
  const loadMore = useSelector((state) => state.MainReducer.loadMore);
  const [lastPage, setLastPage] = useState();

  const pageNumber = useSelector((state) => state.walletReducer.pageNumber);
  const startDate = useSelector((state) => state.walletReducer.sliderStartDate);
  const endDate = useSelector((state) => state.walletReducer.sliderEndDate);
  const walletTransaction = useSelector((state) => state.walletReducer.walletTransaction);

  const [url, setUrl] = useState(
    `transaction/list?from=${startDate}&to=${endDate}&page=${pageNumber}`
  );

  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  useEffect(() => {
    // props.setState([]);
    dispatch(setWalletTransaction([]))
    dispatch(setPageNumber(1));
    if (startDate !== "" && endDate !== "") {
      setUrl(
        `transaction/list?from=${startDate}&to=${endDate}&page=${pageNumber}`
      );
    }
    
  }, [endDate, startDate]);

  useEffect(() => {
    setUrl(
      `transaction/list?from=${startDate}&to=${endDate}&page=${pageNumber}`
    );
  }, []);

  useEffect(() => {
    return () => {
      setUrl(`transaction/list?from=&to=&page=${pageNumber}`);
    };
  }, []);

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      setLastPage(data.data.data.last_page);
      // props.setState(props.state.concat(data.data.data.data));
    dispatch(setWalletTransaction(walletTransaction.concat(data.data.data.data)))
    } else if (isError) {
      if (!navigator.onLine) {
      }
      setFlag((flag) => !flag);
      setError(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (data !== null && pageNumber < lastPage) {
      setUrl(
        `transaction/list?from=${startDate}&to=${endDate}&page=${
          pageNumber + 1
        }`
      );
      dispatch(setPageNumber(pageNumber + 1));
    }
  }, [loadMore]);

  const handleShowHistory = (e, item) => {
    e.preventDefault();
    const state = {
      id: item.id,
      name: item.shop_name,
      business_id: item.business_id,
      type: "",
      url: "",
      back: "wallet",
      date: item.date,
    };

    switch (item.type) {
      case "daily_cashback":
        state.type = `پاداش نقدی(${item.shop_name})`;
        state.id = item.business_id;

        break;
      case "charge":
        state.url = `transaction/type/charge?date=${item.date}`;
        state.type = "صحت سنجی کارت";

        break;
      case "withdraw":
        state.url = `transaction/type/withdraw?date=${item.date}`;
        state.type = "برداشت وجه";

        break;
      case "reward":
        state.url = `transaction/type/reward?date=${item.date}`;
        state.type = "هدیه نصب";

        break;
      case "referral":
        state.url = `transaction/type/referral?date=${item.date}`;
        state.type = "هدیه معرفی";
        
      case "festival_fifty_percent":
        state.url = `transaction/type/festival_fifty_percent?date=${item.date}`;
        state.type = "جشنواره 50 درصدی";
       
      case "correction":
        state.url = `transaction/type/correction?date=${item.date}`;
        state.type = "تراکنش اصلاحی";

        break;
      default:
        break;
    }
    history.push({ pathname: "/transaction-history", state: state });
  };

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
      {walletTransaction.length !== 0 ? (
        walletTransaction.map((item, index) => (
          <div
            className="transaction-items"
            key={index}
            onClick={(e) => handleShowHistory(e, item)}
          >
            <div
              className="right-sec"
              style={{
                backgroundColor:
                  item.type === "daily_cashback"
                    ? "#fff"
                    : "#009B7F",
                color:
                  item.type === "daily_cashback"
                    ? "#000"
                    : "#fff",
                width:
                  item.type === "daily_cashback"
                    ? "68%"
                    : "58%",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize:
                      item.type === "wednesday_reward" ? ".8rem" : "1rem",
                  }}
                >
                  {item.type === "daily_cashback"
                    ? `پاداش نقدی(${item.shop_name})`
                    : item.type_name}
                </p>
                <span>{item.type === "daily_cashback" ? item.sub_category : ""}</span>
              </div>
              <img
                src={
                  item.type === "daily_cashback"
                    ? `https://images.daapapp.com/${item.selected_img}`
                    : data !== null && data.data.icons_base_url + item.icon_link
                }
                style={
                  item.type === "reward" || item.type === "referral"
                    ? { width: "35px", height: "35px" }
                    : {}
                }
                alt=""
              />
            </div>
            <div className="left-sec">
              <p style={{ color: "#C2CDD9" }}>{item.date}</p>
              <div>
                <p
                  style={{
                    color: item.type !== "withdraw" ? "#009B7F" : "red",
                  }}
                >
                  {item.type === "withdraw"
                    ? priceDigitSeperator(item.credit) + "-"
                    : priceDigitSeperator(item.credit) + "+"}
                </p>
                <span style={{ color: "#C2CDD9", marginRight: "4px" }}>
                  تومان
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span style={{ marginRight: "30px" }}>تراکنشی ثبت نشده است</span>
      )}
      {isLoading && data != null && (
        <div className="pagination-loading">
          <CircularProgress size={24} color={"secondary"} />
        </div>
      )}
    </>
  );
}

export default WalletTransactions;
