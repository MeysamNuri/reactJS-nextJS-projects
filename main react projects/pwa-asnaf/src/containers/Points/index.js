/**
 *
 * Points
 *
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./point.less";
import { getWalletAndPointsAmountDialog } from "../Wallet/actions";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
import { getPointFirstTransactionDate } from "./actions";
import { useHistory } from "react-router-dom";

// --------------------- components ------------------
import Header from "../../components/Header";
import PointsSlider from "../../components/PointsSlider";
import PointsTransaction from "../../components/PointsTransaction";
import WalletAndPointsAmountDialog from "../../components/Dialogs/WalletAndPointsAmountDialog";
import APIs from "./APIs";

function Points() {
  const repuSum = store.get("reputationSum");
  // const businesses = store.get("businesses");
  const dispatch = useDispatch();
  const firstTransaction = useSelector(
    (state) => state.pointReducer.pointFirstTransactionDate
  );
  // const startDate = useSelector(
  //   (state) => state.pointReducer.pointSliderStartDate
  // );
  // const endDate = useSelector((state) => state.pointReducer.pointSliderEndDate);
  const [sum, setSum] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleMoveToWallet = () => {
    dispatch(getWalletAndPointsAmountDialog(true));
    document.getElementsByClassName("point-div")[0].style.filter =
      "blur(2.5px)";
  };

  // async function getPdf(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const data = await APIs.getPdf(
  //       startDate,
  //       endDate,
  //       businesses[0].business_id,
  //       1
  //     );
  //     setIsLoading(false);
  //   } catch ({ response }) {
  //     if (response) {
  //       fetchCatch(response);
  //     }
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    async function getReputationList() {
      setIsLoading(true);
      try {
        const data = await APIs.getReputationList();
        store.set(
          "daapappTransactionSum",
          parseFloat(data.data.daapapp_transactions_sum)
        );
        dispatch(
          getPointFirstTransactionDate(data.data.first_transaction_date)
        );
        setSum(data.data.daapapp_transactions_sum);
        setIsLoading(false);
      } catch ({ response }) {
        if (response) {
          fetchCatch(response);
        }
        setIsLoading(false);
      }
    }
    getReputationList();
  }, []);

  return (
    <div className="point-div">
      {isLoading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}
      <WalletAndPointsAmountDialog
        type="point-amount"
        repuSum={repuSum}
        sum={sum}
        title="انتقال به کیف پول"
        text="امتیاز دلخواه خود را وارد کنید (هر امتیاز معادل 3.5 تومان)"
      />
      <Header
        title="امتیازها"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="main"
      />

      <div className="points">
        <div className="page-content">
          <div className="point-amount">
            <div>
              <p>جمع امتیازات</p>
              <h3>{repuSum}</h3>
            </div>
            <div>
              <p>تراکنش‌های داپ‌اَپی</p>
              <h3>{sum}</h3>
            </div>
            <div>
              <button
                className="move-to-wallet-btn"
                onClick={handleMoveToWallet}
              >
                انتقال به کیف پول
              </button>
              <button
                className="loan-btn"
                onClick={() => history.push("benefits")}
              >
                تسهیلات
              </button>
            </div>
          </div>
        </div>
        {repuSum !== 0 ? (
          <div className="point-progress">
            <span style={{ fontSize: "1.1rem", margin: "0 25px 15px 0" }}>
              جزئیات
            </span>
            <p>برای مشاهده‌ی امتیازها بازه‌ی تاریخ را تغییر دهید</p>
            <div className="point-progress-div">
              <PointsSlider
                firstTransaction={firstTransaction}
                setLoading={setLoading}
              />
            </div>
          </div>
        ) : (
          <p style={{ marginTop: "20px" }}>
            در این بازه تاریخی هیچ امتیازی یافت نشد
          </p>
        )}
        {loading && <PointsTransaction />}
        {/*sum !== 0 && <p
          style={{
            color: "#6498E6",
            alignSelf: "flex-end",
            direction: "ltr",
            padding: "10px",
            fontSize: ".9rem",
          }}
          onClick={(e) => getPdf(e)}
        >
          (PDF) ذخیره‌ی جزئیات
        </p>*/}
      </div>
    </div>
  );
}

// Points.propTypes = {};

export default Points;
