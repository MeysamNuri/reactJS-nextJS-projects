import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSimilarDialog } from "../transactions/actions";
import Header from "../../components/header/Header";
import TransactionListItems from "../../components/listItems/transactionListItems";
import useDataApi from "../../components/fetchData/useDataApi";
import DialogTransactions from "../../components/dialog/dialogTransactions";
import "./similarTransactions.less";

const styleTransactions = {
  height: "9vh",
  marginTop: 0,
  background: "#FFFFFF",
  marginBottom: "16px",
  borderRadius: "8px",
};
const styleDialog = {
  height: "16vh",
};

function Index({ title }) {
  const [query, setQuery] = useState("");
  const open = useSelector((state) => state.transactionsReducer.similarDialog);
  const [
    { data, isLoading, isError },
    doFetch,
  ] = useDataApi(`https://hn.algolia.com/api/v1/search?query=${query}`, {
    hits: [],
  });
  const options = ["زمان", "مقدار"];
  const History = useHistory();
  const Dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, '10vh');
  // }, []);

  const handleClick = (e) => {
    e.preventDefault();
    History.push("/transactions");
  };

  const handleDialog = (e) => {
    Dispatch(getSimilarDialog(!open));
    document.getElementsByClassName("container")[0].style.filter =
      "blur(2.5px)";
  };
  
  return (
    <div className="container">
      <Header
        title={title}
        leftIcon="assets/images/arrow-w-rotate-rotate.svg"
        handleLeftClick={(e) => handleClick(e)}
        serachbar={false}
        style={{ position: "fixed" }}
      />
      <div
        className="transaction"
        style={{
          display: data ? "flex" : "none",
          paddingTop: "11vh",
          marginBottom: "3vh",
        }}
      >
        <div className="icons">
          <span onClick={(e) => handleDialog(e)}></span>
          <span onClick={(e) => handleDialog(e)}></span>
        </div>
        <div>
          <span>تراکنش ها</span>
        </div>
      </div>

      <div className="transactions_content">
        <TransactionListItems data={data} style={styleTransactions} />
      </div>
      <DialogTransactions
        title={"مرتب سازی براساس :"}
        options={options}
        style={styleDialog}
      />
    </div>
  );
}

export default Index;
