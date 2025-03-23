import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openTab } from './../Tabs/action';

import LoanComponents from './../LoanRequest/Loancomponents';
import ListLoanComponents from './../LoanList/ListLoanComponents';

import './Tab.css';

function Tabs() {
  const tabs = useSelector(state => state.TabReducer.tab);
  const dispatch = useDispatch();

  const handleTab1 = () => {
    dispatch(openTab(true));
  };
  const handleTab2 = () => {
    dispatch(openTab(false));
  };

  return (
    <>
      <div className="loan-tabs">
        <div className={`loan-tab1 ${tabs ? 'loan-active' : 'loan-text-color'}`}>
          <p onClick={() => handleTab1()}>درخواست وام</p>
        </div>
        <div className={`loan-tab1 ${tabs ? 'loan-text-color ' : 'loan-active'}`}>
          <p onClick={() => handleTab2()}>لیست وام ها</p>
        </div>
      </div>
      {tabs ? <LoanComponents /> : <ListLoanComponents />}
    </>
  );
}
export default Tabs;
