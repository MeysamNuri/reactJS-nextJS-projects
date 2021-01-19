import React, { useState } from "react";
import Expansion from "./expansionDetails";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";

function LoanList({ credit, status, remain_installments_num, loan_id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [loanHistoryDetail, setLoanHistoryDetail] = useState([]);

  async function getLoanHistoryDetails(id) {
    if (showDetail) {
      setShowDetail(false);
    } else if (loanHistoryDetail.length !== 0) {
      setShowDetail(true);
    } else {
      setIsLoading(true);
      try {
        const data = await APIs.getLoanHistoryDetails(id);
        setLoanHistoryDetail(data.data[0]);
        setIsLoading(false);
        setShowDetail(true);
      } catch ({ response }) {
        if (response) {
          fetchCatch(response);
        }
        setIsLoading(false);
      }
    }
  }

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  return (
    <>
      <div className="loan_list">
        <div
          className="List-loan-box"
          onClick={() => getLoanHistoryDetails(loan_id)}
        >
          <div className="list-loan-title">
            <div>
              <span>مبلغ وام (تومان)</span>
              <p>{credit}</p>
            </div>

            <div>
              <span>باقی مانده</span>
              <p>{remain_installments_num}</p>
            </div>

            <div>
              <span>وضعیت</span>
              {status === "pending" && (
                <p className="list-waiting-style">در انتظار تایید</p>
              )}
            </div>
          </div>
          {isLoading ? (
            <CircularProgress size="15px" color="inherit" />
          ) : (
            showDetail && (
              <Expansion
                needed_rep_num={parseFloat(loanHistoryDetail.needed_rep_num)}
                installments_num={loanHistoryDetail.installments_num}
                paid_installments_num={loanHistoryDetail.paid_installments_num}
                wage_percentage={loanHistoryDetail.wage_percentage}
                description={loanHistoryDetail.description}
                installment_credit={priceDigitSeperator(loanHistoryDetail.installment_credit)}
                installment_monthly_day={
                  loanHistoryDetail.installment_monthly_day
                }
                next_installment_in_day={
                  loanHistoryDetail.next_installment_in_day
                }
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
export default LoanList;
