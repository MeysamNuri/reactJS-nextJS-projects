import React from "react";
import "./notification-icon.less";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotifications } from "../../containers/Main/actions";

function NotificationsIcon() {
  const dispatch = useDispatch();
  const notiNumber = useSelector((state) => state.notificationReducer.notiNumber);
  const showNotification = useSelector(
    (state) => state.MainReducer.showNotification
  );
  return (
    <div
      className="search-notif-div"
      onClick={() => {
        dispatch(
          setShowNotifications(showNotification === "none" ? "flex" : "none")
        );
      }}
    >
      <div className="search-notif-btn">
        <img src='assets/images/bell.svg' alt=""></img>
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
