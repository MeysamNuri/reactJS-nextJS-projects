import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import COLORS from "../../../constants/colors";
import "./transaction-history.less";
import useDataApi from "../../components/fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import {
  getSliderStartDate,
  getSliderEndDate
} from "../wallet/action";

function TransactionHistory({ location }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [params, setParams] = useState(null);
  let method = "get";
  let lastPage = 1;
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  const Dispatch = useDispatch();
  const type = location.state.type;

  useEffect(() => {
    // window.scrollTo(0, "10vh");
    if (location.state.name !== undefined) {
      setUrl(
        `transaction/business/${location.state.business_id}?page=${pageNumber}&date=${location.state.date}`
      );
    } else {
      setUrl(location.state.url);
    }
    setParams(true);

    Dispatch(getSliderEndDate(''))
    Dispatch(getSliderStartDate(''))
  }, []);

  useEffect(() => {
    if (data !== null) {
      if (pageNumber === 1) {
        setPageLoading(false);
      } else {
        setPageLoading(false);
      }
      lastPage = data.data.transactions.last_page;
    }
  }, [data, isLoading, isError]);

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

  const priceDigitSeperator =(price)=> {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return '';
  }

  return (
    <div
      className="transaction-container-div"
      style={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      {isLoading && !pageLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        <>
          <Header
            title={type}
            leftIcon="assets/images/arrow-w-rotate.svg"
            back={location.state.back}
          />
          <div
            className="transaction"
            style={{
              marginTop: "4vh",
            }}
          ></div>
          <div onScroll={(e) => handleScroll(e)} className="transaction-content-history">
            {data !== null &&
              data.data.transactions.data.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="transaction-card-history"
                    style={{
                      flexDirection:
                        location.state.name === undefined ? "row" : "column",
                      justifyContent:
                        location.state.name === undefined
                          ? "space-evenly"
                          : null,
                    }}
                  >
                    <div
                      className="transaction-history-main-div"
                      style={{
                        width:
                          location.state.name === undefined ? "50%" : "100%",
                        justifyContent:
                          location.state.name === undefined
                            ? "flex-start"
                            : "space-evenly",
                      }}
                    >
                      <div>
                        {location.state.name !== undefined ? (
                          <p style={{ color: COLORS.circleCardGray }}>
                            مبلغ تراکنش:
                          </p>
                        ) : (
                          <p style={{ color: COLORS.circleCardGray }}>مبلغ:</p>
                        )}
                        <div
                          style={{
                            justifyContent:
                              location.state.name === undefined && "flex-start",
                          }}
                        >
                          <span>
                            {location.state.name !== undefined
                              ? priceDigitSeperator(ele.total)
                              : priceDigitSeperator(ele.credit)}
                          </span>
                          <span style={{ fontSize: 12 }}>تومان</span>
                        </div>
                      </div>

                      {location.state.name !== undefined && (
                        <div>
                          <p style={{ color: COLORS.circleCardGray }}>
                            پاداش نقدی:
                          </p>
                          <div>
                            <span>{priceDigitSeperator(ele.credit)}</span>
                            <span style={{ fontSize: 12 }}>تومان</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignSelf:
                          location.state.name === undefined
                            ? "center"
                            : "flex-end",
                        marginTop:
                          location.state.name === undefined ? "0" : "10px",
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

export default TransactionHistory;
