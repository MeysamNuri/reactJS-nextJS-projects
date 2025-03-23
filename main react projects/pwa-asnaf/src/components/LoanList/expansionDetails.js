import React from "react";
import { useDispatch } from "react-redux";
import { getDialog } from "./action";

const Expansion = ({
  needed_rep_num,
  installments_num,
  paid_installments_num,
  wage_percentage,
  description,
  installment_credit,
  installment_monthly_day,
  next_installment_in_day,
}) => {
  // const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  return (
    <>
      <div className="list-loan-title">
        <div onClick={() => dispatch(getDialog((dialog) => !dialog))}>
          <span>تعداد کل اقساط</span>
          <p>{installments_num}</p>
        </div>
        <div>
          <span> پرداخت شده</span>
          <p className="payed-color">{paid_installments_num}</p>
        </div>
        <div>
          <span>امتیاز مورد نیاز</span>
          <p>{needed_rep_num} </p>
        </div>
      </div>
      <div className="list-loan-title">
        <div>
          <span> کارمزد (%)</span>
          <p>{wage_percentage}</p>
        </div>
        <div>
          <span> مبلغ هر قسط (تومان)</span>
          <p>{installment_credit}</p>
        </div>
      </div>
      <div className="List-Loan-footer">
        <p className="des-Title">توضیحات</p>
        <p className="description">{description}</p>
      </div>
    </>
  );
};
export default Expansion;
