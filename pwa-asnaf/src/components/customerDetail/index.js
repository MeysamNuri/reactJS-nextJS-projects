import React, { useEffect, useState } from "react";
import store from "store-js";
import APIs from "./API";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
import Header from "../Header";
import './customer-detail.less';

function CustomerDetail({ location }) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [headerName, setHeaderName] = useState('')

  const appInit = store.get("appInit");
  const id = appInit.businesses[0].id;

  async function getCustomerDetail() {
    setIsLoading(true);
    try {
      const data = await APIs.getCustomerDetail(id, location.state.cus_id);
      setTransactionList(data.data.transactions.data)
      setHeaderName(data.data.customer_name);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        <>
          <Header
            title={`مشتری - ${headerName}`}
            leftIcon="assets/images/arrow-w-rotate.svg"
            back="customer-list"
          />
            {transactionList !== undefined &&
               transactionList.map(item=>(
               <div className='customer-detail'>
                  <div className='titles-div'>
                     <p>شناسه</p>
                     <p>مبلغ تراکنش(تومان)</p>
                     <p>تاریخ تراکنش</p>
                  </div>
                  <div className='content-div'>
                     <p>{item.id}</p>
                     <p>{item.amount}</p>
                     <p style={{direction:'ltr'}}>{item.transaction_date}</p>
                  </div>
               </div>
            ))}
        </>
      )}
    </div>
  );
}

export default CustomerDetail;
