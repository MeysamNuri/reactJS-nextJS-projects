import React from "react";
import'./wallet-successful.less'

function WalletSuccessful({ success, amount }) {
  return (
    <div className="wallet-successful" style={{display: success ? 'flex' : 'none'}}>
      <img src="assets/images/c-check.svg" alt="" />
      <h2>موفق!</h2>
      <p>
        {amount} مبلغ
        به حساب شما واریز گردید.
      </p>
      <button>تایید</button>
    </div>
  );
}

export default WalletSuccessful;
