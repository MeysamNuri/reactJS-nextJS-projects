import React, { useState, useEffect } from "react";
import "./TripPage.less";
import { useDispatch, useSelector } from "react-redux";
import store from 'store-js'
import {
  setShowTripAmountDialog,
  setSelectedAmount,
  setSelectedPoint,
} from "./action";
import Header from "./../../components/Header";
import ChooseTripAmountDialog from "../../components/Dialogs/ChooseTripAmountDialog";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
import TripRequestHistory from "../../components/TripRequestHistory";

function TripPage() {
  const dispatch = useDispatch();
  const selectedAmount = useSelector(
    (state) => state.tripReducer.selectedAmount
  );
  const selectedPoint = useSelector((state) => state.tripReducer.selectedPoint);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedTripType, setSelectedTripType] = useState("internal");
  const [counter, setCounter] = useState(0);
  const [neededPoint, setNeededPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const repuSum = store.get("reputationSum");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleChooseTripType = (e) => {
    dispatch(setSelectedAmount(""));
    dispatch(setSelectedPoint(""));
    setNeededPoint(0);
    setCounter(0);

    const name = e.target.name;
    if (name === "internal") {
      document.getElementById("external").checked = false;
      setSelectedTripType("internal");
    } else if (name === "external") {
      document.getElementById("internal").checked = false;
      setSelectedTripType("external");
    }
  };

  const handleChooseTripAmount = () => {
    dispatch(setShowTripAmountDialog(true));
    document.getElementsByClassName("App")[0].style.filter = "blur(2.5px)";
  };

  const incCounter = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    setNeededPoint(selectedPoint * counter);
  }, [counter]);

  useEffect(() => {
    setCounter(0);
    setNeededPoint(0);
  }, [selectedAmount]);

  const decCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      setNeededPoint(neededPoint - selectedPoint);
    }
  };

  async function requestTourAllowance(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await APIs.requestTourAllowance(
        selectedTripType,
        selectedPoint,
        counter,
        selectedAmount
      );
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <ChooseTripAmountDialog selectedTripType={selectedTripType} />
      <Header
        title="سفر"
        rightIcon='assets/images/PathSetting.svg'
        leftIcon='assets/images/arrow-w-rotate.svg'
        back='benefits'
        style={{ background: "linear-gradient(90deg,#64C7E6, #489BB5)" }}
      />
      <p className="header-point">{repuSum}</p>
      <div className="trip-main">
        <div className="trip-tabs">
          <div
            className={`trip-tab1 ${
              activeTab === "tab1" ? "trip-active" : "trip-text-color"
            }`}
          >
            <p onClick={handleTab1}>ثبت درخواست</p>
          </div>
          <div
            className={`insurance-tab1 ${
              activeTab === "tab2" ? "trip-active" : "trip-text-color"
            }`}
          >
            <p onClick={handleTab2}>تاریخچه درخواست ها</p>
          </div>
        </div>
        <div className="trip-request-div">
          {activeTab === "tab1" ? (
            <div className="trip-request-form">
              <h1>کمک هزینه سفرهای اقساطی (12 قسط)</h1>
              <form>
                <div className="form-checkboxes">
                  <p>نوع سفر : </p>
                  <div>
                    <label htmlFor="internal">داخلی</label>
                    <input
                      type="checkbox"
                      onChange={(e) => handleChooseTripType(e)}
                      name="internal"
                      id="internal"
                      checked={selectedTripType === "internal" ? true : false}
                    />
                  </div>
                  <div>
                    <label htmlFor="external">خارجی</label>
                    <input
                      type="checkbox"
                      onChange={(e) => handleChooseTripType(e)}
                      name="external"
                      id="external"
                    />
                  </div>
                </div>
                <div
                  className="choose-trip-amount"
                  onClick={handleChooseTripAmount}
                >
                  <p>
                    {selectedAmount !== ""
                      ? selectedAmount
                      : "لطفا انتخاب کنید"}
                  </p>
                  <img src='assets/images/arrow-down.png' alt="" />
                </div>
                <p className="gray-text">{`امتیاز مورد نیاز برای هر نفر ${selectedPoint}`}</p>
                <div className="person-counter">
                  <p>تعداد نفرات</p>
                  <div>
                    <div onClick={incCounter}>
                      <span>+</span>
                    </div>
                    <div>
                      <span>{counter}</span>
                    </div>
                    <div onClick={decCounter}>
                      <span>-</span>
                    </div>
                  </div>
                  <p className="gray-text">{`امتیاز مورد نیاز برای این سفر ${
                    neededPoint !== 0 ? neededPoint : ""
                  }`}</p>
                </div>
                <button
                  className="send-btn"
                  onClick={(e) => requestTourAllowance(e)}
                >
                  {isLoading && (
                    <CircularProgress size="15px" color="inherit" />
                  )}
                  <span>ثبت درخواست سفر</span>
                </button>
              </form>
            </div>
          ) : (
            <TripRequestHistory />
          )}
        </div>
      </div>
    </>
  );
}

export default TripPage;
