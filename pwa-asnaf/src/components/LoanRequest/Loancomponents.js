import React, { useState, useEffect } from "react";
import Loan from "./loan";
import "./Loan.less";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";

function LoanComponents() {
  const [isLoading, setIsLoading] = useState(false);
  const [loanList, setLoanList] = useState([]);

  async function getLoanList() {
    setIsLoading(true);
    try {
      const data = await APIs.getLoanList();
      setLoanList(data.data.data)
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLoanList()
  }, [])

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  return (
    <div className="loan_container">
      {isLoading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}
      {loanList.map((item,index) => (
        <Loan
          key={index}
          description={item.description}
          installments_num={item.installments_num}
          wage_percentage={item.wage_percentage}
          needed_rep_num={parseFloat(item.needed_rep_num)}
          credit={priceDigitSeperator(item.credit)}
          loan_request_status={item.loan_request_status}
          id={item.id}
        />
      ))}
    </div>
  );
}
export default LoanComponents;
