/**
 *
 * Done
 *
 */

import React from "react";
import store from 'store-js'

const doneStyle = {
  backgroundColor: "#f6f9fc",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  zIndex: 2,
};

export function Done() {
  const categoryName = store.get('categoryName')
  const personData = store.get('personData')
  
  return (
    <div style={doneStyle}>
      <img
        className="big-circle"
        src='assets/images/big-circle-w.svg'
        alt=""
        style={{ zIndex: "1" }}
      />
      <img className="small-circle" src='assets/images/small-circle-w.svg' alt="" />
      <div style={{ width: "70%", zIndex: "1000", textAlign: "center", lineHeight:'30px' }}>
        <p>{` ${personData.fname} عزیز،  درخواست شما جهت ثبت`}</p>
        <h1>{categoryName}</h1>
        <span>و پیوستن به تیم بزرگ داپ اَپ ثبت شد.</span>
        <p style={{marginTop:'15px'}}>همکاران ما تا 24 ساعت آینده با شما تماس خواهند گرفت</p>
      </div>
    </div>
  );
}

export default Done;
