import React from 'react'
import DoneTripComponent from './DoneTripcomponenet'
import clock from './../../images/clock.svg'
import trend from './../../images/trend_down.svg'
import { useSelector, useDispatch } from "react-redux";
import { TripExpand } from "./../domesticTrip/action";
const DoneTrip= ()=>{
    const trip = useSelector((state) => state.TripReducer.expand);
    const dispatch = useDispatch();
    const tripHandle = (id) => {
      dispatch(TripExpand(id));
    };
    return (
        <>
  <DoneTripComponent
     buttonText="ثبت درخواست سفر"
     cityTitle="شیراز"
     duration="‏5 روز"
     point="250"
     id={0}
     openTRip={trip}
     onclickTrip={() => tripHandle(trip === 0 ? null : 0)}
  />
  <DoneTripComponent 
    waitingImg={clock}
    waitingTitle="در انتظار تایید"
    cityTitle="بندر عباس"
    duration="‏7 روز"
    point="550"
    id={1}
    openTRip={trip}
    onclickTrip={() => tripHandle(trip === 1 ? null : 1)}/>
  <DoneTripComponent      
   pointImg={trend}
        PointText="برای این سفر ۴۰ امتیاز کم دارید"
        Color="city-color"
        cityTitle="اهواز"
        duration="‏5 روز"
        point="900"
        id={2}
        openTRip={trip}
        onclickTrip={() => tripHandle(trip === 2 ? null : 2)}/>


        </>
    )
}
export default DoneTrip