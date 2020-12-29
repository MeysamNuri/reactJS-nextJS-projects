/**
 *
 * Loans
 *
 */

import React from "react";
import "./style.less";
import store from 'store-js'
// --------------------- components --------------------
import Tabs from "./../../components/Tabs/Tabs";
import Header from "./../../components/Header";


function Loans() {
  /* eslint-disable no-unused-vars */
  // const { loans } = useSelector(stateSelector);
  // const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  const repuSum = store.get("reputationSum");
  return (
    <>
      <Header
        title="وام"
        rightIcon='assets/images/loan-star.svg'
        leftIcon='assets/images/arrow-w-rotate.svg'
        back='benefits'
        style={{ background: "linear-gradient(90deg, #E954B2, #C71B77)" }}
      />
      <p className="header-point">{repuSum}</p>
      <div className="Loan-container">
        <Tabs />
      </div>
    </>
  );
}

Loans.propTypes = {};

export default Loans;
