import React from "react";
import "./wallet-withdraw.less";
import { useDispatch, useSelector } from 'react-redux'
import WalletWithdrawScroll from "../wallet-withdraw-scroll";
import { setWithdrawScroll } from '../../actions/MainActions'

function  WalletWithdraw({ walletAmount }) {
    const dispatch = useDispatch()
    const withdrawScroll = useSelector(state => state.MainReducer.withdrawScroll)

    function handleShowWithdraw(e){
        e.preventDefault()
        dispatch(setWithdrawScroll(!withdrawScroll))
    }

  return (
    <div className="wallet-withdraw">
      <div className='wallet-withdraw-btn' onClick={e=> handleShowWithdraw(e)}>
        <div>
          <p>برداشت وجه</p>
          <img src="assets/images/electronics.svg" alt="" />
          {withdrawScroll && <img className='withdraw-close' src="assets/images/close.svg" alt=""/>}
        </div>
      </div>
      <WalletWithdrawScroll show={withdrawScroll} walletAmount={walletAmount} />
    </div>
  );
}

export default WalletWithdraw;
