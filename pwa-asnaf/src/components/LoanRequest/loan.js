import React, { useState } from "react";
import LoanTitle from "./loanTitle";
import store from "store-js";
import "./Loan.less";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";

function Loan({
  description,
  installments_num,
  wage_percentage,
  needed_rep_num,
  credit,
  loan_request_status,
  id,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const repuSum = store.get("reputationSum");

  async function registerLoan(id) {
    setIsLoading(true);
    try {
      await APIs.registerLoan(id);
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
      <div className="loan">
        <div className="Loan-box">
          <div className="loan-items">
            <LoanTitle loanPriceTitel="مبلغ وام (تومان)" loanPrice={credit} />
            <LoanTitle
              consideredPoint="امتیاز مورد نیاز"
              pointPrice={needed_rep_num}
            />
            <LoanTitle
              inastalmentTitle={"تعداد اقساط"}
              loanNumber={installments_num}
            />
            <LoanTitle
              subsidTitle={"کارمزد (%)"}
              SubsidNumer={wage_percentage}
            />
          </div>
          <div>
            <div className="box-footer">
              <div>
                <p className="description">{description}</p>
              </div>
            </div>
            <div className="last-item">
              {loan_request_status === "pending" ? (
                <div>
                  <p>در انتظار تایید</p>
                  <img src='assets/images/clock.svg' alt="" />
                </div>
              ) : loan_request_status === "low_credit" ? (
                <div style={{ color: "#000" }}>
                  <p>{`برای این وام ${
                    needed_rep_num - repuSum
                  } امتیاز کم دارید`}</p>
                  <img src='assets/images/trend-down.svg' alt='trend-down.svg'></img>
                </div>
              ) : loan_request_status === "rejected" ? (
                <>
                  <div style={{ color: "#D0332C" }}>
                    <p>درخواست شما لغو شده</p>
                    <img src='assets/images/e-remove.svg' alt="" />
                  </div>
                  <p style={{ color: "#6498E6", fontSize: "0.9rem" }}>
                    دلیل لغو درخواست
                  </p>
                </>
              ) : (
                loan_request_status === "access" && (
                  <div>
                    <button
                      className="request-loan-btn"
                      onClick={() => registerLoan(id)}
                    >
                      {isLoading ? (
                        <CircularProgress size="15px" color="inherit" />
                      ) : (
                        <span>درخواست وام</span>
                      )}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loan;
