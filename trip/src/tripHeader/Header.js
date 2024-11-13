import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="background-color">
        <img src={"assets/images/right-notif.svg"} className="right" />
        <img src={"assets/images/left-notif.svg"} className="left" />
      </div>
      <div className="icons">
        <img src={"assets/images/arrow-r.svg"} />
        <p> سفر</p>

        <p>
          ۸۶۰ &nbsp; <img src={"assets/images/PathSetting.svg"} />
        </p>
      </div>

    </header>
  );
}
