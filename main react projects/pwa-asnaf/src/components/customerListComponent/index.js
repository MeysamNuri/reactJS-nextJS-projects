import React, { useEffect,useState } from "react";
import { setCustomerLoadMore } from "../../containers/customerList/action";
import { useDispatch, useSelector } from "react-redux";
import './customer-list-component.less';
import APIs from "./APIs";
import { useHistory } from 'react-router-dom';
import fetchCatch from "./../../utils/fetchCatch";
import moment from "moment";
import momentj from "moment-jalaali";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
function CustomerListComponent({ list }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const appInit = store.get("appInit");
  const [transactions, setTransactions] = useState([]);
  const [lastPage, setLastPage] = useState();
  const [scrollHeight, setScrollHeight] = useState(0);
  const startDate = useSelector((state) => state.customerListReducer.customerSliderStartDate);
  const endDate = useSelector((state) => state.customerListReducer.customerSliderEndDate);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loadMore = useSelector((state) => state.customerListReducer.customerLoadMore);
  const customerLoadMore = useSelector(
    (state) => state.customerListReducer.customerLoadMore
  );
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState("");

  const id = appInit.businesses[0].id;
  const [url, setUrl] = useState(
    `customers/list/${id}?from=${startDate}&to=${endDate}&page=${pageNumber}`
  );
  // ------------------- load more when scroll -------------------
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setScrollHeight(0.2 * window.innerHeight);
  }, []);
  const handleScroll = (e) => {
    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight ===
      e.currentTarget.scrollHeight
    ) {
      dispatch(setCustomerLoadMore(!customerLoadMore));
    }
  };

//-------------------------------------------------------

useEffect(() => {
  setPageNumber(1);
  setUrl(`customers/list/${id}?from=${startDate}&to=${endDate}&page=1`);
  setTransactions([]);
  setLastPage();
}, [endDate, startDate]);

async function customerHistory(url) {
  setIsLoading(true);
  try {
    const data = await APIs.customersHistory(url);
    setTransactions(transactions.concat(data.data.customers.data));
    setLastPage(data);
    setIsLoading(false);
  } catch ({ response }) {
    if (response) {
      fetchCatch(response);
    }
    setIsLoading(false);
  }
}


useEffect(() => {
  customerHistory(url);

}, [url]);

useEffect(() => {
  if (pageNumber < lastPage) {
    setUrl(
      `customers/list/${id}?from=${startDate}&to=${endDate}&page=${pageNumber + 1}`
    );
    setPageNumber(pageNumber + 1);
  }
}, [customerLoadMore]);

  // ===================change date===============
 
  function dateInJalaali(date) {
    
    return momentj(date).format("jYYYY/jMM/jDD");
  }
  function convertToDate(time) {
 
      return moment(time).format("hh:mm:ss");
  }
  // ------------------------------------------------------------

  return (
    <div className="list-div" onScroll={handleScroll}>
      {transactions !== undefined &&
        transactions.map((item) => (
          <div className="customer-info-div" onClick={()=> history.push({pathname: 'customer-detail', state:{cus_id : item.id}})}>
            <div>
              <p className='title'>شناسه مشتری</p>
              <p className='title'>نام مشتری</p>
              <p className='title'>تعداد تراکنش</p>
              <p className='title'>مجموع مبلغ(تومان)</p>
            </div>
            <div>
              <p>{item.id}</p>
              <p>{item.f_name + ' ' + item.l_name}</p>
              <p>{item.transactions_count}</p>
              <p>{item.transactions_sum_amount}</p>
            </div>
            <div style={{alignItems:'flex-start', justifyContent:'flex-start', paddingRight:'8px', fontSize:'.9rem'}}>
               <p style={{color:'darkgray',marginLeft: "5px"}}> تاریخ آخرین تراکنش: </p>
        <span style={{ direction: 'ltr'}}>{convertToDate(item.newest_transaction_date) } {dateInJalaali(item.newest_transaction_date) }</span>
            </div>
          </div>
        ))}
          {isLoading && (
        <div className="pagination-loading">
          <CircularProgress size={24} color={"secondary"} />
        </div>
      )}
    </div>
  );
}

export default CustomerListComponent;
