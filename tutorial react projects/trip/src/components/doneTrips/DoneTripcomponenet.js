import React from "react";
import TripExpansion from "./tripExapansion";

function DoneTripComponent({
  cityTitle,
  duration,
  point,
  Color,
  openTRip,
  id,
  buttonText,
  waitingTitle,
  waitingImg,
  PointText,
  pointImg,
  onclickTrip,
}) {
  return (
    <>
      <div className="container">
        <div className="Trip-box">
          <div className="Trip-items" onClick={(id) => onclickTrip(id)}>
            <h3>{cityTitle}</h3>
            <p style={{fontWeight:"bolder"}}>{duration} </p>
            {openTRip == id ? (
              <div>
                <strong>
                  <span className="text-color"> از </span>1399/2/1{" "}
                  <span className="text-color">تا</span> 1399/2/6{" "}
                </strong>
              </div>
            ) : null}
            <div className="trip-Point">
              <p>امتیاز مورد نیاز برای هرنفر</p>
              <p>{point}</p>
            </div>
          </div>
          <div>
            <div className="box-footer"></div>
            <div className="last-item">
              {openTRip == id ? (
                <TripExpansion
                  pointImg={pointImg}
                  PointText={PointText}
                  waitingImg={waitingImg}
                  waitingTitle={waitingTitle}
                  buttonText={buttonText}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoneTripComponent;
