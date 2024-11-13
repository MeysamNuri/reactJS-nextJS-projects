/**
 *
 * LatestNotification
 *
 */

import React, { memo, useEffect, useState } from "react";
import APIs from "./APIs";
import fetchCatch from "../../utils/fetchCatch";
import { Link } from "react-router-dom";
import store from "store-js";
import "./latest-notification.less";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotifications } from "../../containers/Main/actions";
import { useHistory } from "react-router-dom";
import { getNotiNumber } from "../../containers/AllNotification/action";

function LatestNotification() {
  const showNotification = useSelector(
    (state) => state.MainReducer.showNotification
  );
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  // const [isLoading, setIsLoading] = useState([]);

  async function getNotificationUnread() {
    // setIsLoading(true)
    try {
      const data = await APIs.getNotificationUnread();
      dispatch(getNotiNumber(data.data.notification_num));
      // setIsLoading(false)
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      // setIsLoading(false);
    }
  }

  async function getLatestNotification() {
    try {
      const data = await APIs.getLatestNotification();
      store.set("notifications", data.data.notification);
      setNotifications(data.data.notification);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  useEffect(() => {
    getLatestNotification();
    getNotificationUnread();
  }, []);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      getNotificationUnread();
      getLatestNotification();
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const history = useHistory();
  function handleNotifClicked(item) {
    const states = {
      id: item.id,
    };
    getNotificationUnread();
    history.push({ pathname: "/notif-content", state: states });
  }

  return (
    <div
      className="noti-overlay"
      style={{ display: showNotification }}
      onClick={() => dispatch(setShowNotifications("none"))}
    >
      <div className="noti-text">
        <div className="noti-text-div">
          {notifications !== undefined &&
            notifications.map((item, index) => (
              <div
                className="noti-box"
                key={index}
                onClick={() => handleNotifClicked(item)}
                style={{ opacity: item.seen === 1 ? "0.5" : "" }}
              >
                <h4>
                  {item.title.length > 20
                    ? item.title.substr(0, 30) + "..."
                    : item.title}
                </h4>
                <p
                  style={{
                    textAlign: "justify",
                    overflow: "hidden",
                    width: "90%",
                  }}
                >
                  {item.content.length > 20
                    ? item.content.substr(0, 20) + " ..."
                    : item.content}
                </p>
                <p
                  style={{
                    alignSelf: "flex-end",
                    marginTop: "15px",
                    direction: "ltr",
                  }}
                >
                  {item.date}
                </p>
                {item.seen === 0 ? <span></span> : ""}
              </div>
            ))}
        </div>
        <Link to="/notif-list">همه اعلانات</Link>
      </div>
    </div>
  );
}

export default memo(LatestNotification);
