import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import store from "store-js";
import { useHistory } from "react-router-dom";
import "./QrStyles.less";
import { GEtQrCode } from "./QrServices";
import Snackbar from "@material-ui/core/Snackbar";

const QrRequest = () => {
  const appInit = store.get("appInit");
  const [getAmount, setGetAmount] = useState("");
  const [getPaymentCode, setGEtPaymentCode] = useState("");
  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const sendAmount = async (e) => {
    
    e.preventDefault();
    try {
      const { status, data } = await GEtQrCode(getAmount, getPaymentCode);
      if (status === 200) {
        history.push({ pathname: "/show-QRCode", state: data });
        setOpenSnack(true);
        setSnackMsg("  نظر شما با موفقیت ثبت شد ");
      }
    } catch (ex) {
      console.log(ex);
      setOpenSnack(true);
      setSnackMsg("  لطفا مبلغ مورد نظر خود را وارد کنید ");
    }
  };
  useEffect(() => {
    // console.log(appInit.business_user_view.payment_code);
    setGEtPaymentCode(appInit.business_user_view[0].payment_code || "");
    
  }, []);
  const handleCloseErrMessage = () => {
    setOpenSnack(false);
  };
  return (
    <>
      <div className="gray-bg" style={{ height: "auto", position: "relative" }}>
        <Header
          title="درخواست کد"
          leftIcon="assets/images/arrow-w-rotate.svg"
          back="main"
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseErrMessage}
          message={snackMsg}
          style={{ width: "300px", left: "10%", bottom: "2%", right: "14%" }}
        />
        <div className="QR_code_pic_styles">
          <img src="assets/images/Qr_code.svg" width="45%" />
        </div>
        <label style={{ marginRight: "11%", fontSize: "14px" }}>
          مبلغ مورد نظر را وارد کنید
        </label>
       <form onSubmit={sendAmount}>
       <div className="qr_number_holder">
          <span
            style={{
              position: "absolute",
              left: "12%",
              top: "35%",
              fontSize: "10px",
              color: "#AAB6C4",
            }}
          >
            {" "}
            تومان
          </span>
          <input
            type="text"
            autoComplete="off"
            style={{
              paddingLeft: "45px",
              direction: "ltr",
              backgroundColor: "#fff",
              width: "73%",
              display: "flex",
              alignSelf: "flex-end",
              fontSize: "1rem",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "12px",
            }}
            onChange={(e) => setGetAmount(e.target.value)}
          />
        </div>
        <div className="button_holder">
          <button
            type="submit"
            onClick={sendAmount}
            style={{ marginLeft: "12px", cursor: "pointer" }}
          >
            درخواست کد
          </button>
        </div>
       </form>
      </div>
    </>
  );
};
export default QrRequest;
