import React from "react";
import { img_url } from "../../../constants/base_url";

function SmallCard({ cardImg, cardName, cardNumber }) {
  return (
    <div className="small_card">
      <div className="padding">
        <div className="name">
          <img src={`${img_url}${cardImg}`} alt="" />
          <span>{cardName}</span>
        </div>
        <div className="number">
          { cardNumber ? cardNumber.match(/.{1,4}/g).map((number, index) => (
            <span key={index}>{number}</span>
          )) : ''}
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
