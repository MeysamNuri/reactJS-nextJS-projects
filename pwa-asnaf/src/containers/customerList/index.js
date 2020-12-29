import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
// import { setCustomerLoadMore } from "./action";
// import { useDispatch, useSelector } from "react-redux";
import store from "store-js";
// --------------------- components ------------------
import Header from "../../components/Header";
import APIs from "./APIs";
import "./customerList.less";
import CustomerListSlider from "../../components/customerListSlider";
import CustomerListComponent from "../../components/customerListComponent";

function CustomerList() {
  const appInit = store.get("appInit");
  const [firstTransactionDate, setFirstTransactionDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeBtnId, setActiveBtnId] = useState(1);
  const [customerList, setCustomerList] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState("");

  
  // const dispatch = useDispatch();
  // const customerLoadMore = useSelector(
  //     (state) => state.customerListReducer.customerLoadMore
  //   );
  //  // ------------------- load more when scroll -------------------
  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //   });

  //   const handleScroll = (e) => {
  //     if (
  //       e.currentTarget.scrollTop + e.currentTarget.clientHeight ===
  //       e.currentTarget.scrollHeight
  //     ) {
  //       dispatch(setCustomerLoadMore(!customerLoadMore));
  //     }
  //   };
  //   // ------------------------------------------------------------
  //   console.log(customerLoadMore);
  const id = appInit.businesses[0].id;
  async function getCustomerList() {
    setIsLoading(true);
    try {
      const data = await APIs.getCustomerList(id, from, to, sort, page);
      setFirstTransactionDate(data.data.first_transaction_date);
      // setCustomerList(customerList.concat(data.data.customers.data));
      setCustomerList(data.data.customers.data);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCustomerList();
  }, []);

  useEffect(() => {
    if (sort !== "") {
      getCustomerList();
    }
  }, [sort]);

  return (
    <div>
      {isLoading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}
      <Header
        title="لیست مشتریان"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="main"
      />
      {customerList.length !== 0 ? (<div className="customer-list-main">
        <div className="customer-list-progress-div">
          <CustomerListSlider
            firstTransaction={firstTransactionDate}
            setLoading={setLoading}
          />
        </div>
        <div className="sort-type-div">
          <p>مرتب سازی براساس:</p>
          <div>
            <button
              className={`sort-btn ${activeBtnId === 3 && "active"}`}
              onClick={() => {
                setActiveBtnId(3);
                setSort("max_count");
              }}
            >
              تعداد تراکنش
            </button>
            <button
              className={`sort-btn ${activeBtnId === 2 && "active"}`}
              onClick={() => {
                setActiveBtnId(2);
                setSort("max_sum_amount");
              }}
            >
              مجموع مبلغ تراکنش
            </button>
            <button
              className={`sort-btn ${activeBtnId === 1 && "active"}`}
              onClick={() => {
                setActiveBtnId(1);
                setSort("newest");
              }}
            >
              جدیدترین تراکنش
            </button>
          </div>
        </div>
        <CustomerListComponent list={customerList} />
      </div>) : <p className='empty-txt'>خالی</p>}
    </div>
  );
}

export default CustomerList;
