import React from 'react'
import './deposit-history.less'

function DepositHistory({ logs }) {
    const priceDigitSeperator =(price)=> {
        if (price && parseFloat(price) > 0) {
          return Math.round(parseFloat(price))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return '';
      }
    return (
        <div className='deposit-history'>
            {
                logs.map((item, index)=>(
                    <div className='amount-box' key={index}>
                        <div style={{direction:'ltr'}}>
                            {
                                item.date
                            }
                        </div>
                        <div className='amount'>
                            {
                                priceDigitSeperator(item.credit)
                            }
                            <span>تومان</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DepositHistory
