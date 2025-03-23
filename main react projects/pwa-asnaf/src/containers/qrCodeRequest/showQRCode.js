import { ImageRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./ShowQrCode.less";
import { QRCode } from "react-qr-svg";
import { useHistory } from "react-router-dom";
const ShowQRcode = (props) => {


  const history = useHistory();
  const qrdata = props.location.state.data;
  const { amount = "", payment_code = "", transaction_id = "" } = qrdata;
 
  const backButton = () => {
    history.push("/QRCode");
  };
  return (
    <div className="gray-bg" style={{ height: "auto", position: "relative" }}>
      <Header
        title="دریافت کد"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="main"
      />
      <div className="text-box">
        <h3 style={{ textAlign: "center" }}>کد با موفقیت ایجاد شد</h3>
        <p>لطفا این صفحه را در معرض دید مشتری به منظور اسکن کردن قرار دهید </p>
      </div>

      <div className="qr-code-holder">
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 200 }}
          value={
            `?payment_code=${payment_code || ""}&amount=${
              amount || ""
            }&transaction_id=${transaction_id || ""}` || ""
          }
        />
      </div>
     <div className="transaction-text">
     <span>
        شناسه پرداخت : {transaction_id}
      </span>
      <span>
        مبلغ (تومان) : {amount}
      </span>
     </div>
      <div className="button_holder">
        <button
          onClick={backButton}
          style={{ marginLeft: "12px", cursor: "pointer" }}
        >
          ثبت درخواست جدید
        </button>
      </div>
    </div>
  );
};
export default ShowQRcode;
