import React, { useState } from "react";
import LoanTitle from "./loanTitle";
function Loan(props) {
  return (
    <>
      <div className="container">
        <div className="Loan-box">
          <div className="loan-items">
            <LoanTitle loanPriceTitel="مبلغ وام (تومان)" loanPrice="۵،۰۰۰،۰۰۰"
            />
            <LoanTitle consideredPoint="   امتیاز مورد نیاز" pointPrice="۴۰۰" />
            <LoanTitle inastalmentTitle={"  تعداد اقساط"} loanNumber={"۲۴"} />
            <LoanTitle subsidTitle={"  کارمزد (%)"} SubsidNumer={"۱۲/۵"} />
          </div>
          <div>
            <div className="box-footer">
              <p className="des-Title">{props.decriptionTitle}</p>
              <p className="description">{props.description}</p>
            </div>
            <div className="last-item">
              <button className={props.buttonStyle}>{props.buttonText}</button>
              <p className={props.waitingStyle}>
                {" "}
                {props.waitingImage} {props.waitinTitle}
              </p>
              <p className={props.cancelStyle}>
                {props.cancelImage} {props.cancelText}{" "}
              </p>
              <p className={props.resoneStyle}>{props.resoneText}</p>
              <p className={props.pointStyle}>
                {props.pointImage} {props.pointText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loan;
