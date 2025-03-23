import React, { useState } from "react";
import { setShowNotifications } from "../../actions/MainActions";
import "./notification-icon.less";
import { useDispatch, useSelector } from "react-redux";

function NotificationsIcon() {
  const [zIndex, setZIndex] = useState(1);
  const notiNumber = useSelector((state) => state.MainReducer.notiNumber);
  const showSideBar = useSelector((state) => state.MainReducer.showSideBar);
  const showNotification = useSelector(
    (state) => state.MainReducer.showNotification
  );
  const dispatch = useDispatch();

  return (
      <div
        className="search-notif-div"
        style={{ zIndex: showSideBar === false ? zIndex : "" }}
        onClick={() => {
          dispatch(
            setShowNotifications(showNotification === "none" ? "flex" : "none")
          );
          setZIndex(50);
        }}
      >
        <div className="search-notif-btn">
          <img src="assets/images/bell.svg" alt=""></img>
        </div>
        <div
          className="noti-number"
          style={{
            display:
              notiNumber === 0 || notiNumber === undefined ? "none" : "flex",
          }}
        >
          {notiNumber}
        </div>
      </div>
  );
}

export default NotificationsIcon;
