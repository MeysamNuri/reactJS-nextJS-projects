import React from "react";

const Expansion = (props) => {
  return (
    <>
      <div className="list-loan-title">
        <div>
          <span>تعداد کل اقساط</span>
          <p>{props.instalmentNumber}</p>
        </div>
        <div>
          <span> پرداخت شده</span>
          <p className="payed-color">{props.payedNumber}</p>
        </div>
        <div>
          <span>امتیاز مورد نیاز</span>
          <p>{props.neededPoint} </p>
        </div>
      </div>
      <div className="list-loan-title">
        <div>
          <span> کارمزد (%)</span>
          <p>{props.subsidNumber}</p>
        </div>
        <div>
          <span> مبلغ هر قسط (تومان)</span>
          <p>{props.instalmentPrice}</p>
        </div>
        <div></div>
      </div>
      <div className="List-Loan-footer">
        <p className="des-Title">توضیحات</p>
        <p className="description">
          {props.description}
          <hr style={{ borderColor: "#C2CDD9" }} />
        </p>
        <p className="counter-titr">شمارگاه پرداخت قسط</p>
        <p className="installment">
          {" "}
          موعد پرداخت قسط بعد: <span> {props.installmentDue}</span>{" "}
        </p>
      </div>
    </>
  );
};
export default Expansion;
