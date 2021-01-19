import React from "react";
import TripComponent from "./TripComponent";
import { useSelector, useDispatch } from "react-redux";
import clock from './../../images/clock.svg'
import trend from './../../images/trend_down.svg'
import { TripExpand } from "./action";
function Trip(props) {
  const trip = useSelector((state) => state.TripReducer.expand);
  const dispatch = useDispatch();
  const tripHandle = (id) => {
    dispatch(TripExpand(id));
  };
  return (
    <>
      <TripComponent
        buttonText="ثبت درخواست سفر"
        cityTitle="شیراز"
        duration="‏5 روز"
        point="250"
        id={0}
        openTRip={trip}
        onclickTrip={() => tripHandle(trip === 0 ? null : 0)}
      />
      <TripComponent
        waitingImg={clock}
        waitingTitle="در انتظار تایید"
        cityTitle="بندر عباس"
        duration="‏7 روز"
        point="550"
        id={1}
        openTRip={trip}
        onclickTrip={() => tripHandle(trip === 1 ? null : 1)}
      />
      <TripComponent
        pointImg={trend}
        PointText="برای این سفر ۴۰ امتیاز کم دارید"
        Color="city-color"
        cityTitle="اهواز"
        duration="‏5 روز"
        point="900"
        id={2}
        openTRip={trip}
        onclickTrip={() => tripHandle(trip === 2 ? null : 2)}
      />
    </>
  );
}
export default Trip;
