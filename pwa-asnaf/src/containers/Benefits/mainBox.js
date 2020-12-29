import React from "react";
import BoxItem from "./mainBoxItem";
import "./style.less";

function MainBox() {
  return (
    <div className="box-container">
      <BoxItem
        img='assets/images/flight.svg'
        title="سفر"
        push="trips"
        color="icon-color"
        text="text-style"
      />

      <BoxItem
        img='assets/images/loan.svg'
        title="وام"
        color="icon-color1"
        text="text-style"
        push="loans"
      />

      <BoxItem
        img='assets/images/doctor.svg'
        title="پزشک"
        color="icon-color2"
        text="text-style-1"
        push="visit"
      />
      <BoxItem
        img='assets/images/security.svg'
        title="بیمه"
        color="icon-color3"
        text="text-style-1"
        push="insurance"
      />
    </div>
  );
}

export default MainBox;
