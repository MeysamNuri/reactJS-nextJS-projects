import React from "react";
import Expansion from './expansionDetails'
function LoanList(props) {

  return (
    <>
      <div className="container">
        <div
        
          className="List-loan-box"
          onClick={()=>props.clickOnComponent(props.id)}
          >
          <div className={props.circleStyle}></div>
          <div className="list-loan-title">
          <div>
              <span>مبلغ وام (تومان)</span>
              <p>۵،۰۰۰،۰۰۰</p>
            </div>
         
            <div>
              <span>باقی مانده</span>
              <p>۲۴</p>
            </div>
          
            <div>
              <span>وضعیت</span>
              <p className={props.waitingStyle}>{props.waitinTitle}</p>
            </div>
          </div>
          {props.openId ==props.id && (
           <Expansion 
           instalmentNumber='24'
           payedNumber='10'
           neededPoint='400'
           subsidNumber='12/5'
           instalmentPrice='357،756'
           description={`      یک سال گذشت و در این مدت مترسک فیلسوف شد. هنگامی که از کنار
           او گذاشتم دیدم دو کلاغ در کلاهش لانه می سازند`}
           installmentDue={' 3 روز '}
           />
          )}
        </div>
      </div>
    </>
  );
}
export default LoanList;
