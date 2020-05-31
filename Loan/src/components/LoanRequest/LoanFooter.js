import React from 'react'

function LoanFooter(props){

    return(
        <>
           <div className="last-item">
              <button className={props.buttonStyle}>{props.buttonText}</button>
              <p className={props.waitingStyle}>
                {" "}
                {props.waitingImage} {props.waitinTitle}
              </p>
              <p className={props.cancelStyle}>
                {props.cancelImage} {props.cancelText}{" "}
              </p>
              <p className={props.resoneStyle}>{props.resoneText}</p>
              <p className={props.pointStyle}>
                {props.pointImage} {props.pointText}
              </p>
            </div>
        </>
    )
}
export default LoanFooter