import React, { useState, useEffect } from "react";
import LoanList from "./loanList";
// import { expand } from "./../LoanList/action";
// import { useSelector, useDispatch } from "react-redux";
import "./LoanList.css";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";

function ListLoanComponents() {
  const [isLoading, setIsLoading] = useState(false);
  const [loanHistory, setLoanHistory] = useState([]);
  // const expandComponent = useSelector((state) => state.ExpandReducer.open);
  // const dispatch = useDispatch();

  // const panelHandleOpen = (id) => {
  //   dispatch(expand(id));
  // };

  async function getLoanHistory() {
    setIsLoading(true);
    try {
      const data = await APIs.getLoanHistory();
      setLoanHistory(data.data.data);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLoanHistory();
  }, []);

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  return (
    <div className="ListLoanComponents">
      {isLoading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}
      {loanHistory.length === 0 ? (
        <p style={{color:'#C2CDD9'}}>هیچ وام ثبت شده ای وجود ندارد</p>
      ) : (
        loanHistory.map((item, index) => (
          <LoanList
            credit={priceDigitSeperator(item.credit)}
            status={item.status}
            remain_installments_num={item.remain_installments_num}
            loan_id={item.loan_id}
            key={index}
          />
        ))
      )}
    </div>
  );
}
export default ListLoanComponents;
