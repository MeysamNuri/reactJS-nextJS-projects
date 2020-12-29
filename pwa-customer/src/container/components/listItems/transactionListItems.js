import React from "react";
import { useHistory } from "react-router-dom";
import EmptyList from "./emptyList";

const title = "شما با این کارت هنوز خریدی انجام نداده اید!";
const text = "نقشه را مرور کرده و از فروشگاه های عضو داپ اَپ خرید کنید";

const styleEmpty = {
  width: "100%",
  marginTop: "15vh",
};

function TransactionListItems({ style, data, state }) {
  const history = useHistory();

  const handleClick = (e, item) => {
    history.push({
      pathname: "store-history",
      state: { id: item.business_id, date: item.date, back: "transactions", state: state },
    });
  };

  const priceDigitSeperator =(price)=> {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return '';
  }

  return (
    <ul id="transactions_content">
      {data === null || data.length === 0 ? (
        <EmptyList title={title} text={text} style={styleEmpty} />
      ) : (
        data.map((item) => (
          <li key={item.id} style={style}>
            <div
              className="transaction_list"
              onClick={(e) => {
                handleClick(e, item);
              }}
            >
              <div className='transaction-detail'>
                <img
                  src={`https://images.daapapp.com/${item.business_sub_category_icon}`}
                  alt=""
                />
                <div className="title">
                    <span className="company">{item.business_name}</span>
                    <span className="name">
                      {item.business_sub_category_name}
                    </span>
                </div>
              </div>
              <div className="detail">
                <span className="price">{priceDigitSeperator(item.reward)}<span>تومان</span></span>
                <span className="date">{item.date}</span>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default TransactionListItems;
