import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openTab } from "./../components/action";
import LoanComponents from "./LoanRequest/Loancomponents";
import ListLoanComponents from './LoanList/ListLoanComponents'
import "./Tab.css";
function Tabs() {
  const tabs = useSelector((state) => state.TabReducer.tab);
  const dispatch = useDispatch();
  const handleTab1 = () => {
    dispatch(openTab(true));
  };
  const handleTab2 = () => {
    dispatch(openTab(false));
  };
  return (
    <>
      <div className="tabs">
        <div className={`tab1 ${tabs ? "active" : "text-color"}`}>
          <p onClick={() => handleTab1()}>درخواست وام</p>
        </div>
        <div className={`tab1 ${tabs ? "text-color " : "active"}`}>
          <p onClick={() => handleTab2()}>لیست وام ها</p>
        </div>
      </div>
      {tabs ? (
        <>
          <LoanComponents />
        </>
      ) : (
        <>
        <ListLoanComponents/>
       
        </>
      )}
    </>
  );
}
export default Tabs;
