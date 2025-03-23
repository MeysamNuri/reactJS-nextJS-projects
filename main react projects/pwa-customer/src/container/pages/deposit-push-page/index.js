import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/header/Header";
import "./deposit-push-page.less";
import { Link, useHistory } from "react-router-dom";
import DepositHistory from "../../components/deposit-history";
import useDataApi from "../../components/fetchData/useDataApi";
import store from "store-js";

function DepositPushPage() {
  const [totalDeposit, setTotalDeposit] = useState("");
  const [logs, setLogs] = useState([]);
  const [dailyDeposit, setDailyDeposit] = useState("");
  const params = true;
  const method = "get";
  const history = useHistory();
  const url = "wallet/cashback/history";
  const [error, setError] = useState(false);
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  const name = store.get("profile_data").f_name;

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      setTotalDeposit(data.data.totalDeposi);
      setLogs(data.data.logs);
      setDailyDeposit(data.data.dailyDeposi);
    } else if (isError) {
      setError((error) => !error);
    }
  }, [data, isLoading, isError]);

  const handleLeftClick = () => {
    history.push("main");
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
    <div
      className="gray-bg"
      style={{
        height: "100vh",
      }}
    >
      <Header
        title="پاداش های نقدی شما"
        leftIcon={"assets/images/arrow-w-rotate.svg"}
        handleLeftClick={handleLeftClick}
        back={null}
      />
      <div className="deposit-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: logs.length === 0 && dailyDeposit === 0 && "space-evenly" ,
            height: logs.length === 0 && dailyDeposit === 0 && '100%'
          }}
        >
          {dailyDeposit === 0 ? (
            <div>
              <p>
                روز گذشته خریدی انجام نداده اید. خرید را از صنف های داپ اَپ
                شروع کرده و کیف پول خود را پر کنید.
              </p>
              <span>نقشه را مرور کرده و از اصناف داپ‌اَپ خرید کنید</span>
              <Link to="/main">نقشه را باز کنید</Link>
            </div>
          ) : (
            <div>
              <h3>{`تبریک، ${name} عزیز`}</h3>
              <div className="daily-div">
                <p>پاداش نقدی خریدهای روز گذشته شما: </p>
                <p>{`${
                  dailyDeposit === 0
                    ? dailyDeposit
                    : priceDigitSeperator(dailyDeposit)
                } تومان`}</p>
              </div>
              <p style={{ marginTop: "20px", width: "70%" }}>
                همچنان به خرید های خود از اصناف داپ اَپی ادامه دهید و روزانه
                پاداش نقدی از داپ اَپ دریافت نمایید.
              </p>
            </div>
          )}
          <div className="deposit-amount">
            <p>پاداش های نقدی دریافتی شما از داپ اَپ تا حالا: </p>
            <div style={{ color: dailyDeposit !== null ? "#009b7f" : "#000" }}>
              {isLoading && (
                <div className="loading">
                  <CircularProgress className="circular_loading" />
                </div>
              )}
              <h1>
                {totalDeposit === null ? 0 : priceDigitSeperator(totalDeposit)}
              </h1>
              <p>تومان</p>
            </div>
          </div>

          {logs.length === 0 ? (
            <></>
          ) : (
            <div>
              <h3>تاریخچه</h3>
              <p>مقدار پولی که از روز اول برنده شده اید</p>
              <DepositHistory logs={logs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepositPushPage;
