/**
 *
 * Insurance
 *
 */

import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from "react-redux";
import "./insurance.less";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
import store from 'store-js'
// --------------------- components ------------------
import Header from "../../components/Header";


function Insurance() {
  const [firstStep, setFirstStep] = useState(false);
  // const [insuranceAmount, setInsuranceAmount] = useState("261000");
  const [insuranseDate, setInsuranseDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dependantsList, setDependantsList] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const repuSum = store.get("reputationSum");

  /* eslint-disable no-unused-vars */
  // const { insurance } = useSelector(stateSelector);
  // const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  async function getFirstTransactionDate() {
    setIsLoading(true);
    try {
      const data = await APIs.getFirstTransactionDate();
      setInsuranseDate(data.data.first_transaction_date);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        if (response.data.data === null) {
          setFirstStep(true);
        }
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  async function getInsuranceUsersList() {
    setIsLoading(true);
    try {
      const data = await APIs.getInsuranceUsersList();
      setDependantsList(data.data.dependants);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFirstTransactionDate();
    getInsuranceUsersList();
  }, []);

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div>
      <Header
        title="بیمه"
        leftIcon='assets/images/arrow-w-rotate.svg'
        rightIcon='assets/images/PathSetting.svg'
        back='benefits'
        style={{ background: "linear-gradient(90deg, #08C573, #009856)" }}
      />
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        <div className="insuranse">
          <div className="insurance-tabs">
            <div
              className={`insurance-tab1 ${
                activeTab === "tab1"
                  ? "insurance-active"
                  : "insurance-text-color"
              }`}
            >
              <p onClick={handleTab1}>تاریخچه بیمه تکمیلی</p>
            </div>
            <div
              className={`insurance-tab1 ${
                activeTab === "tab2"
                  ? "insurance-active"
                  : "insurance-text-color"
              }`}
            >
              <p onClick={handleTab2}>سابقه بیمه شده ها</p>
            </div>
          </div>
          {activeTab === "tab1" ? (
            <>
              <p className="header-point">{repuSum}</p>
              {firstStep ? (
                <>
                  <div className="insuranse-top-txt">
                    <p>استفاده از بیمه‌ی داپ‌اَپ، از</p>
                    <h1>2 ماه پس از اولین تراکنش داپ اَپی</h1>
                    <p>مقدور خواهد شد.</p>
                  </div>
                  {insuranseDate !== "" && (
                    <p style={{ fontSize: ".8rem", direction: "ltr" }}>
                      {`.اولین تراکنش داپ‌اَ
                      
                      
                      پی شما در تاریخ ${insuranseDate} ثبت شده است`}
                    </p>
                  )}
                </>
              ) : null}
              {dependantsList.length !== 0 && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "25px",
                  }}
                >
                  <p>لیست افراد بیمه شونده‌ی این حساب کاربری</p>
                  <div className="insurance-list">
                    <table className="insurance-list-table">
                      <tr className="insurance-list-top">
                        <th
                          style={{
                            paddingRight: "15px",
                            borderRadius: "0 8px 0 0",
                          }}
                        >
                          ردیف
                        </th>
                        <th>نام</th>
                        <th style={{ borderRadius: "8px 0 0 0" }}>کد ملی</th>
                      </tr>
                      {dependantsList.map((item) => (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.idNational}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  {/*<p className="insurance-main-txt">
              برای ثبت بیمه{" "}
              <span className="amount-txt">{insuranceAmount}</span> امتیاز از
              حساب شما کسر خواهد شد و افراد لیست فوق از تاریخ{" "}
              <span className="amount-txt">{insuranseDate}</span> تحت پوشش بیمه
              ی تامین اجتماعی قرار خواهند گرفت.
                </p>*/}
                  <button className="request-insurance-btn">ثبت درخواست</button>
                </div>
              )}
            </>
          ) : (
            <p style={{marginTop:'15px', color:'#c2cdd9'}}>
              سابقه ای ثبت نشده است
            </p>
          )}
        </div>
      )}
    </div>
  );
}

Insurance.propTypes = {};

export default Insurance;
