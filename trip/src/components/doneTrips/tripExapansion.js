import React, { useState } from "react";

const TripExpansion = ({
  buttonText,
  waitingTitle,
  waitingImg,
  PointText,
  pointImg,
}) => {
  const [count, setCount] = useState(1 );

  return (
    <>
      <div className="text-color">تعداد نفرات</div>
      <div className="passenger">
     
        <span className="passenger-number">{count}</span>
      
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
