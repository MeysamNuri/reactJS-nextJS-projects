import React from 'react'

function LoanTitle({SubsidNumer,loanNumber,pointPrice,subsidTitle,inastalmentTitle,consideredPoint,loanPriceTitel,loanPrice,}){
    return (
            <>
             <div className="loan-title">
              <div>
                <span> 
                {loanPriceTitel}
                {consideredPoint}
                {inastalmentTitle}
                {subsidTitle}
                </span>
                <p>
                {loanPrice}
                {pointPrice}
                {loanNumber}
                {SubsidNumer}
                 </p>
              </div>
            </div>

            </>
    )
}
export default LoanTitle