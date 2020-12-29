import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openTab } from "./action";
import DomesticTrip from "../domesticTrip/domesticTrip";
import ForeignTrip from "../foreignTrip/foreignTrip";
import DoneTrip from "../doneTrips/DoneTrip";
import "./TabTrip.css";

function Tabs() {
  const tabs = useSelector((state) => state.TabTripReducer.tab);
  const dispatch = useDispatch();

  const handleTab = (id) => {
    dispatch(openTab(id));
  };

  return (
    <>
      <div className="tabs">
        <div id={0} className={`tab1 ${tabs===0 ? "active" : "text-color"}`}>
          <p onClick={() => handleTab(tabs === 0 ? null : 0)}>سفرهای داخلی</p>
        </div>
        <div id={1} className={`tab1 ${tabs === 1 ? "active" : "text-color"}`}>
          <p onClick={() => handleTab(tabs === 1 ? null : 1)}> سفرهای خارجی</p>
        </div>
        <div id={2} className={`tab1 ${tabs === 2 ? "active " : "text-color"}`}>
          <p onClick={() => handleTab(tabs === 2 ? null : 2)}>
            {" "}
            سفرهای انجام شده
          </p>
        </div>
      </div>
      {tabs === 0 ? (
        <>
          <DomesticTrip />
        </>
      ) : tabs === 1 ? (
        <>
          <ForeignTrip />
        </>
      ) :(
       <>
        <DoneTrip />
       </>

      )}
    </>
  );
}
export default Tabs;
