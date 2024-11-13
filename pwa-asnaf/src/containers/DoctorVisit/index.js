/**
 *
 * DoctorVisit
 *
 */

import React, { useState } from "react";
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from "react-redux";
import "./doctor-visit.less";
import { useHistory } from "react-router-dom";
import store from "store-js";

// --------------------- components ------------------
import Header from "../../components/Header";
// import Search from "../../components/Search";
// import AllVisits from "../../components/VisitType/AllVisits";
// import RequestedVisits from "../../components/VisitType/RequestedVisit";
// import AcceptedVisits from "../../components/VisitType/AcceptedVisit";


function DoctorVisit() {
  /* eslint-disable no-unused-vars */
  // const { doctorVisit } = useSelector(stateSelector);
  // const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  // const [visitType, setVisitType] = useState("all");
  // const [activeId, setActiveId] = useState(1);
  const [headerTitle, setHeaderTitle] = useState("ویزیت پزشک");
  const [showHistory, setShowHistory] = useState(false);
  const history = useHistory();
  const emptyVisit = false;
  const repuSum = store.get("reputationSum");

  // const handleChooseVisitType = (type, id) => {
  //   setVisitType(type);
  //   setActiveId(id);
  // };

  // const handleShowHistory = () => {
  //   setHeaderTitle("تاریخچه‌ی رزروها");
  //   setShowHistory(true);
  // };

  const handleLeftIconClicked = () => {
    if (showHistory) {
      setShowHistory(false);
      setHeaderTitle("ویزیت پزشک");
    } else {
      history.push("benefits");
    }
  };

  return (
    <div>
      <Header
        title={headerTitle}
        leftIcon='assets/images/arrow-w-rotate.svg'
        handleLeftClick={handleLeftIconClicked}
        rightIcon='assets/images/PathSetting.svg'
        back={null}
        style={{ background: "linear-gradient(90deg, #FCC43C, #E2AD00)" }}
      />
      <p className="header-point">{repuSum}</p>
      <div
        className="visit"
        style={{ justifyContent: emptyVisit ? "center" : "" }}
      >
        <img
          style={{ width: "40%", marginTop: "30px" }}
          src='assets/images/doctor3.svg'
          alt=""
        />
        <p style={{ width: "50%", textAlign: "justify", marginTop: "20px" }}>
          جهت دریافت نوبت ویزیت رایگان پزشکان داپ اَپ، با واحد پشتیبانی تماس
          حاصل فرمایید.
        </p>
        <a href="tel:+982188893217">
          <span className="call-div">تماس</span>
        </a>
        {/*<p className="visit-point">840</p>
        {emptyVisit ? (
          <p className="empty-visit-txt">
            درحال حاضر پزشکی برای ویزیت وجود ندارد
          </p>
        ) : (
          <>
            <Search />
            {showHistory ? (
              <p style={{marginTop:'15px'}}>تاریخچه ویزیت ها</p>
            ) : (
              <>
                <div className="choose-visit-btn">
                  <button
                    className={activeId === 1 ? "active" : ""}
                    onClick={() => handleChooseVisitType("all", 1)}
                  >
                    همه
                  </button>
                  <button
                    className={activeId === 2 ? "active" : ""}
                    onClick={() => handleChooseVisitType("myRequest", 2)}
                  >
                    درخواست‌های من
                  </button>
                  <button
                    className={activeId === 3 ? "active" : ""}
                    onClick={() => handleChooseVisitType("accepted", 3)}
                  >
                    تایید شده‌ها
                  </button>
                </div>
                <div className="visited-content">
                  {visitType === "all" ? (
                    <AllVisits />
                  ) : visitType === "myRequest" ? (
                    <RequestedVisits />
                  ) : (
                    <AcceptedVisits />
                  )}
                  <div className="visited-history-btn">
                    <img src={TimeIcon} alt="" />
                    <button onClick={handleShowHistory}>
                      تاریخچه‌ی رزروها
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
                  )}*/}
      </div>
    </div>
  );
}

DoctorVisit.propTypes = {};

export default DoctorVisit;
