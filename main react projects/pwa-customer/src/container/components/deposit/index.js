import React from "react";
import "./deposit.less";

function Deposit({ name, amount }) {
  return (
    <div className="deposit">
      <h2>تبریک {name} عزیز!</h2>
      <div className="deposit-amount">
        <h3>دریافتی امروز شما:</h3>
        <div>
          <h1 style={{color:'#fff'}}>{amount}</h1>
          <span>تومان</span>
        </div>
      </div>
      <h4 style={{marginTop:'20px'}}> به خرید از اصناف داپ‌اَپ ادامه داده و وبرگشت پول خود را برنده شوید!</h4>
    </div>
  );
}

export default Deposit;
