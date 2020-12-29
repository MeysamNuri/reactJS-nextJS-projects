import React, { useState } from 'react';
import A from '../../components/button/A';
import './listItems.less';
const styleQR = {
    width: "100%",
    height: "100%",
    fontSize: "12px",
    fontWeight: "500",
    margin: 0,
    borderRadius: "24px"
};
let data = [
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
    { url: '/assets/images/theater.svg', title: 'رب گوجه یک و یک', percent_off: 25, real_price: 36000, Discounted_price: 27000 },
]
function DiscountListItems({ style }) {
    const [search, setSearch] = useState(false);
    return (
        <ul>
            {data.map(item =>
                (
                    <li key={item.objectID} style={style}>
                        <div className="discount_item">
                            <div className="img">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="info">
                                <div>
                                    <span className="title">{item.title}</span>
                                    <span className="percent_off">%{item.percent_off}</span>
                                </div>
                                <div>
                                    <span>قیمت اصلی:</span>
                                    <span className="title">{item.real_price}</span>
                                </div>
                                <div>
                                    <span>قیمت با تخفیف:</span>
                                    <span className="title">{item.Discounted_price}</span>
                                </div>


                            </div>
                            <div className="button">
                                <A title={'درخواست QR'}
                                    style={styleQR}
                                    handleClick={() => setSearch(true)} >
                                </A>
                            </div>

                        </div>
                    </li>
                )
            )}
        </ul>
    )
}

export default DiscountListItems
