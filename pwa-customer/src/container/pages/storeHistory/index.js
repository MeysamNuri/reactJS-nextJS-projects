import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import COLORS from "../../../constants/colors";
import "./store-history.less";
import useDataApi from "../../components/fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import store from "store-js";
import EmptyList from "./EmptyList";
import { useHistory } from "react-router-dom";

function StoreHistory({ location }) {
  // const [sortType, setSortType] = useState("date");
  // const [sortBased, setSortBased] = useState("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const date =
    location.state.date !== undefined ? "?date=" + location.state.date : "";
  let url = `business/transactions/${location.state.id}${date}`;
  let method = "get";
  let lastPage = 1;
  let params = true;
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  const history = useHistory();
  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    if (data !== null) {
      if (pageNumber === 1) {
        store.set("store_transactions", data);
      } else {
        let new_data = store.get("store_transactions");
        data.data.business_transactions.data = data.data.business_transactions.data.concat(
          new_data.data.business_transactions.data
        );
        store.set("store_transactions", data);
        setPageLoading(false);
      }
      lastPage = data.data.business_transactions.last_page;
    }
  }, [data]);

  // const handleSort = (e, id) => {
  //   setSortBased(sortBased === "asc" ? "desc" : "asc");
  //   setSortType(id === 1 ? "amount" : "date");
  // };

  const getData = () => {
    if (pageNumber <= lastPage) {
      setPageNumber((pageNumber) => pageNumber + 1);
      setPageLoading(true);
    }
  };
  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollTop + el.clientHeight === el.scrollHeight) getData();
  };

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };
  console.log(location.state.back);
  return (
    <div
      className="container-div"
      style={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      {data === null || (isLoading && !pageLoading) ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : data && data.data.business_transactions.data.length === 0 ? (
        <EmptyList storeName={location.state.name} />
      ) : (
        <>
          <Header
            title={`پاداش نقدی(${data.data.business_name})`}
            leftIcon="assets/images/arrow-w-rotate.svg"
            back={null}
            handleLeftClick={() => {
              history.push({
                pathname: location.state.back,
                state: { verified: location.state.state },
              });
            }}
          />
          <div
            className="transaction"
            style={{
              display:
                data && data.data.business_transactions.data.length !== 0
                  ? "flex"
                  : "none",
              marginTop: "4vh",
            }}
          ></div>
          <div onScroll={(e) => handleScroll(e)} className="content-history">
            {data.data.business_transactions.data.map((ele, ind) => {
              return (
                <div className="card-history" key={ind}>
                  <div className="history-main-div">
                    <div>
                      <p style={{ color: COLORS.circleCardGray }}>
                        مبلغ تراکنش:{" "}
                      </p>
                      <div>
                        <span>
                          {priceDigitSeperator(ele.transaction_amount)}
                        </span>
                        <span style={{ fontSize: 12 }}>تومان</span>
                      </div>
                    </div>

                    {/*<div>
                      <p style={{ color: COLORS.circleCardGray }}>
                        پاداش نقدی:{" "}
                      </p>
                      <div>
                        <span>{priceDigitSeperator(ele.credit)}</span>
                        <span style={{ fontSize: 12 }}>تومان</span>
                      </div>
                    </div>*/}
                  </div>
                  <div
                    style={{
                      fontSize: ".8rem",
                      color: COLORS.circleCardGray,
                      direction: "ltr",
                    }}
                  >
                    <span>{ele.date}</span>
                  </div>
                </div>
              );
            })}
            <div
              className="page_loading"
              style={{ display: pageLoading ? "flex" : "none" }}
            >
              <CircularProgress className="page_circular_loading" size="24px" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StoreHistory;
