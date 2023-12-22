// import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker2";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { getListHoliday } from "../../../redux/actions";
import calendar from "../../../assets/images/calendar.svg";
import "./DatePicker.css";

const DatePicker2 = (props) => {
  // const disableDays = useSelector(
  //   (state) => state.daysHolidays.daysHoliday?.Result
  // );

  // let disabledRanges = disableDays?.map((item) => {
  //   let Range = {
  //     disabled: item.IsHoliday,
  //     start: moment(item.Day),
  //     end: moment(item.Day),
  //   };
  //   return Range;
  // });

  // const getWeekend = () => {
  //   const m = moment(),
  //     weekends = [],
  //     disableDays = [],
  //     result = [];
  //   let diff = 0;
  //   let weekday = m.weekday();
  //   weekday = weekday + 2;
  //   if (weekday > 6) {
  //     weekday = weekday - 6;
  //   }

  //   if (weekday === 5) {
  //     weekends.push(m);
  //     weekends.push(moment().add(1, "day"));
  //   } else if (weekday === 6) {
  //     weekends.push(moment().add(-1, "day"));
  //     weekends.push(m);
  //   } else {
  //     diff = 7 - weekday;
  //     weekends.push(moment().add(diff, "day"));
  //     weekends.push(moment().add(diff + 1, "day"));
  //   }

  //   for (let index = 1; index < 8; index++) {
  //     weekends.push(moment().add(diff + index * 7, "day"));
  //     weekends.push(moment().add(diff + 1 + index * 7, "day"));
  //   }

  //   for (let i = 0; i < weekends.length; i = i + 2) {
  //     result.push({
  //       disabled: true,
  //       start: weekends[i],
  //       end: weekends[i + 1],
  //     });
  //   }

  //   result.push({
  //     disabled: true,
  //     start: moment("1399/03/14"),
  //     end: moment("1399/03/14"),
  //   });

  //   // console.log(result, "result");

  //   return result;
  // };

  return (
    <div className="calendar">
      <DatePicker
      closeOnScroll={(e) => e.target === document}
        placeholder={props.placeholder}
        className="custom_calender"
        persianDigits={false}
        value={props.value}
        onChange={props.onChange}
        isGregorian={false}
        timePicker={false}
        // ranges={disabledRanges}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        removable={true}
        ranges={props.ranges}
        min= {props.min}
        max= {props.max}
      />
      <img src={calendar} alt="calendar"   />
    </div>
  );
};

export default DatePicker2;
