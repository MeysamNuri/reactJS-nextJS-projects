import React from "react";
import "./wallet-empty.less";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

function WalletEmpty() {
  const [open, setOpen] = React.useState(false);
  const handleCloseErrMessage = () => {
    setOpen(false);
  };
  const handleClickGrayWithdraw = () => {
    setOpen(true);
  };
  return (
    <div className="gray-bg empty-wallet">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={"موجودی باید حداقل 10 هزار تومان باشد"}
      />
      <div>
        <p>شما هنوز از اصناف عضو داپ‌اَپ خرید نکرده اید. </p>
        <p>
          با خرید از اصناف عضو داپ‌اَپ روزانه پاداش نقدی خرید در کیف پول خود
          دریافت نمایید و به راحتی به حساب شخصی خود واریز کنید.
        </p>
      </div>
      <div className="go-to-map">
        <p>نقشه را مرور کرده و اصناف داپ‌اَپی را پیدا کنید.</p>
        <Link to="/main">باز کردن نقشه</Link>
      </div>
      <div className="gray-withdraw-btn" onClick={handleClickGrayWithdraw}>
        <p>برداشت وجه</p>
        <img src="assets/images/credit-card-in2.svg" alt="" />
      </div>
    </div>
  );
}

export default WalletEmpty;
