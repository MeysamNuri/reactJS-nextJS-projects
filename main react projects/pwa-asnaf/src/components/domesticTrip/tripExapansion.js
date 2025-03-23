import React, { useState } from "react";
import AddIcon from '../../images/e_add1.svg'
import MinusIcon from '../../images/e_minus.svg'

const TripExpansion = ({
  buttonText,
  waitingTitle,
  waitingImg,
  PointText,
  pointImg,
}) => {
  const [count, setCount] = useState(0);
  const incrementHandler = () => {
    setCount(count + 1);
  };
  const decrementHandler = () => {
    setCount(count - 1);
  };
  return (
    <>
      <div className="text-color">تعداد نفرات</div>
      <div className="passenger">
        <span className="passenger-add" onClick={incrementHandler}>
          <img src={AddIcon} />
        </span>
        <span className="passenger-number">{count}</span>
        <span className="passenger-minus" onClick={decrementHandler}>
          <img src={MinusIcon} />
        </span>
        <div className="neede-point">
          <p>امتیاز مورد نظر برای این سفر</p>
        </div>
        <p style={{ fontWeight: "bolder" }}>750</p>
        <div className="travel-description">
          <p className="text-color">توضیحات</p>
          <p style={{ fontSize: "12px" }}>
            یک سال گذشت و در این مدت مترسک فیلسوف شد. هنگامی که از کنار او گذشتم
            دیدم دوکلاغ در کلاهش لانه می سازند
          </p>
        </div>
      </div>
      <div className="last-item">
        <button className={buttonText ? "btn-style" : null}>
          {buttonText}
        </button>

        <div className={waitingTitle ? "waiting-style" : null}>
          {" "}
          <img src={waitingImg} /> &nbsp; &nbsp;{waitingTitle}{" "}
        </div>
        <div className={PointText ? "point-style" : null}>
          <img src={pointImg} /> {PointText}
        </div>
      </div>
    </>
  );
};
export default TripExpansion;
