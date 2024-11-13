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
      <h6> وام</h6>

        <h6>
          ۸۶۰ <img src={"assets/images/Path-5128.svg"} />
        </h6>
      </div>
    </header>
  );
}
