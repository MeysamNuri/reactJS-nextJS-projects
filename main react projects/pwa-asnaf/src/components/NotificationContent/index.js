import React, { Fragment, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import APIs from './APIs'
import Header from "./../../components/Header";
import fetchCatch from '../../utils/fetchCatch'

const boxStyles = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  position: "relative",
  padding: "10px 15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "80%",
  fontSize: "0.9rem",
  margin: "10px auto",
  height: "84vh",
  textAlign:'justify'
};

function NotificationContent({ location }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  async function getShowNotificationContent(id) {
    setIsLoading(true)
    try {
      const data = await APIs.getShowNotificationContent(id);
      setData(data.data);
      setIsLoading(false)
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getShowNotificationContent(location.state.id);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Header
        title="اعلان ها"
        leftIcon='assets/images/arrow-w-rotate.svg'
        back='notif-list'
      />
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : data !== null ? (
        <div style={boxStyles}>
          <h4 style={{ marginBottom: "15px"}}>{data.title}</h4>
          <p style={{whiteSpace:"break-spaces"}}>{data.content}</p>
          <span
            style={{ textAlign: "left", fontSize: "1rem", marginTop: "10px", color: '#717171', direction:'ltr' }}
          >
            {data.date}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NotificationContent;
