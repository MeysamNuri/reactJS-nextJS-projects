import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotifications, getNotiNumber } from "../../actions/MainActions";
import "./latest-notification.less";
import { Link, useHistory } from "react-router-dom";
import store from "store-js";
import useDataApi from "../fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import base_url from "../../../constants/base_url";

function LatestNotification() {
  const showNotification = useSelector(
    (state) => state.MainReducer.showNotification
  );
  const dispatch = useDispatch();
  // const params = true;
  // const [url, setUrl] = useState('notification/latest')
  // const method = "get";
  // const [flag, setFlag] = useState(false);
  // const [error, setError] = useState(false);
  const notifications = store.get("latest-notifications");
  const token = store.get("token");
  // const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  const getNotificationUnread = () => {
    const headers = {
      Authorization: `bearer ${token}`,
    };
    axios
      .get(`${base_url}notification/unread/count`, { headers: headers })
      .then((res) => {
        dispatch(getNotiNumber(res.data.data.notification_num));
      })
      .catch((err) => {
        console.log("unread notification err", err);
      });
  };

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  // useEffect(() => {
  //   if (
  //     isSignIn &&
  //     data !== null &&
  //     url === "notification/latest" &&
  //     !isLoading &&
  //     !isError
  //   ) {
  //     store.set('latest-notifications', data.data.notification)
  //   } else if (isError) {
  //     setFlag((flag) => !flag);
  //     setError((error) => !error);
  //   }
  // }, [data, isLoading, isError]);

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
          {notifications !== undefined && notifications.map((item, index) => (
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

export default React.memo(LatestNotification);
