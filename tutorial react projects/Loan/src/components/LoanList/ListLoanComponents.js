import React, { useState } from "react";
import LoanList from "./loanList";
import { expand } from "./../LoanList/action";
import { useSelector, useDispatch } from "react-redux";
import './LoanList.css'




function ListLoanComponents(props) {
  const expandComponent = useSelector((state) => state.ExpandReducer.open);
  const dispatch=useDispatch()
  const panelHandleOpen = (id) => {
    dispatch(expand(id));
  }
  return (
    <>
      <LoanList
        waitingStyle="list-waiting-style"
        waitinTitle='در انتظار تایید'
       clickOnComponent={()=>panelHandleOpen(expandComponent==0?null:0)}
       openId={expandComponent}
       id={0}
      />

      <LoanList
        circleStyle="circle-style"
        waitingStyle="list-waiting-style-active"
        waitinTitle='فعال'
        clickOnComponent={()=>panelHandleOpen(expandComponent==1?null:1)}
        openId={expandComponent}
       id={1}
      />
  
    
    </>
  );
}
export default ListLoanComponents;
