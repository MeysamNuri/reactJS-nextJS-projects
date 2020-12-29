import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/header/Header";
import Card from "../../components/card";
import SmallCard from "../../components/card/smallCard";
import TransactionListItems from "../../components/listItems/transactionListItems";
import useDataApi from "../../components/fetchData/useDataApi";
import "./transaction.less";
import CustomeIcon from "./CustomeIcon";
import CustomeIcon2 from "./CustomeIcon2";
import { useHistory } from "react-router-dom";

const styleTransactions = {
  height: "9vh",
  margin: 0,
  background: "#FFFFFF",
  marginBottom: "16px",
  borderRadius: "8px",
};

const Transactions = ({ location }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [dataArray, setDataArray] = useState([]);
  const [searchMethod, setSearchMethod] = useState("date");
  const [dateOrder, setDateOrder] = useState("desc");
  const [amountOrder, setAmountOrder] = useState("desc");
  const [scrollHeight, setScrollHeight] = useState(0);
  const [smallCard, setSmallCard] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const params = true;
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const id = store.get("selectedCardId");
  let method = "get";
  const [lastPage, setLastPage] = useState();

  const [url, setUrl] = useState(
    `card/transactions/${id}?sortBy=${searchMethod}&sortType=${
      searchMethod === "date" ? dateOrder : amountOrder
    }&page=${pageNumber}`
  );
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  const history = useHistory();
  // useEffect(() => {
  // window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setScrollHeight(0.2 * window.innerHeight);
  }, []);

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      setLastPage(data.data.card_transactions.last_page);
      setDataArray(dataArray.concat(data.data.card_transactions.data));
      store.set("card_transactions", dataArray);
    } else if (isError) {
      setFlag((flag) => !flag);
      setError(true);
    }
  }, [isLoading]);

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
      setLoadMore(!loadMore);
    }
  };

  useEffect(() => {
    if (data !== null && pageNumber < lastPage) {
      setUrl(
        `card/transactions/${id}?sortBy=${searchMethod}&sortType=${
          searchMethod === "date" ? dateOrder : amountOrder
        }&page=${pageNumber + 1}`
      );
      setPageNumber(pageNumber + 1);
    }
  }, [loadMore]);

  useEffect(() => {
    setDataArray([]);
    setUrl(
      `card/transactions/${id}?sortBy=${searchMethod}&sortType=${
        searchMethod === "date" ? dateOrder : amountOrder
      }&page=${pageNumber}`
    );
  }, [searchMethod, amountOrder, dateOrder]);

  return (
    <div className="transaction_container">
      <Header
        title="تراکنش ها"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={null}
        serachbar={false}
        handleLeftClick={() => history.goBack()}
      />
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        data !== null &&
        data !== "" && (
          <div className="transaction-div" onScroll={(e) => handleScroll(e)}>
            <div
              className="card"
              style={{
                display: data && data.data.length !== 0 ? "flex" : "none",
              }}
            >
              <Card
                cardImg={data.data.bank_icon}
                backImg={data.data.bank_background_path}
                cardName={data.data.bank_name}
                cardNumber={data.data.card_number}
                userName=""
                verified={location.state.verified}
                flag={false}
              />
            </div>
            <div style={{ display: smallCard ? "block" : "none" }}>
              <SmallCard
                cardImg={data.data.bank_icon}
                cardName={data.data.bank_name}
                cardNumber={data.data.card_number}
                userName=""
                verified={location.state.verified}
              />
            </div>
            <div
              className="transaction"
              style={{
                display:
                  data !== undefined &&
                  data.data.card_transactions.data.length !== 0
                    ? "flex"
                    : "none",
              }}
            >
              <div className="icons">
                <div
                  onClick={() => {
                    setAmountOrder(amountOrder === "asc" ? "desc" : "asc");
                    setSearchMethod("amount");
                    setPageNumber(1);
                  }}
                >
                  <CustomeIcon
                    src={amountOrder === "asc" ? "sort-money" : "price-sort-up"}
                    blue={searchMethod === "amount" ? true : false}
                  />
                </div>
                <div
                  onClick={() => {
                    setDateOrder(dateOrder === "asc" ? "desc" : "asc");
                    setSearchMethod("date");
                    setPageNumber(1);
                  }}
                  style={{ marginLeft: "12px" }}
                >
                  <CustomeIcon2
                    src={dateOrder === "asc" ? "timesort" : "time-sort-up"}
                    blue={searchMethod === "date" ? true : false}
                  />
                </div>
              </div>
              <div>
                <span>تراکنش ها</span>
              </div>
            </div>
            <div
              className="transactions_content"
              // onScroll={(e) => handleScroll2(e)}
            >
              <TransactionListItems
                data={dataArray}
                style={styleTransactions}
                state={location.state.verified}
              />
            </div>
            {/* <DialogTransactions
            title={"مرتب سازی براساس :"}
            options={options}
            style={styleDialog}
          /> */}
          </div>
        )
      )}
    </div>
  );
};

export default Transactions;
