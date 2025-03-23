import React from 'react';
import '../app/App.css';
import store from 'store-js';

function Titles() {
  const repuSum = store.get("reputationSum");
  return (
    <>
      <div className="title-header">
        <div className="text-align">
          <h5>جمع امتیازها</h5>
        </div>
        <div>
          <span className="number">{repuSum}</span>
        </div>
        <img src='assets/images/Path.svg' alt='Path.svg' />
      </div>
      <div
        style={{ fontSize: '12px', padding: '0px 5vw', marginBottom: '5vw' }}
      >
        <p>
          شما می توانید از امتیازهای کسب شده برای دریافت تسهیلات زیر استفاده
          کنید
        </p>
      </div>
    </>
  );
}
export default Titles;
