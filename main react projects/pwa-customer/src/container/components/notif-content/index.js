import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import useDataApi from "../fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";

const boxStyles = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  position: "relative",
  padding: "10px 15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "80%",
  position: "relative",
  fontSize: "0.9rem",
  margin: "10px auto",
  height: "84vh",
  textAlign: "justify",
};

function NotifContent({ location }) {
  const params = true;
  const method = "get";
  const [url, setUrl] = useState();
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    setUrl(`notification/show/${location.state.id}`);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Header title="اعلان ها" leftIcon="assets/images/arrow-w-rotate.svg" back='notif-list' />
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : data !== null ? (
        <div style={boxStyles}>
          <h4 style={{ marginBottom: "15px" }}>{data.data.title}</h4>
          {data.data.video !== null && data.data.video !== "" && (
            <video
              autoPlay
              width="100%"
              height="320"
              controls
              src={data.data.video}
            >
              Your browser does not support the video tag.
            </video>
          )}
          {data.data.image !== null && data.data.image !== "" && (
            <img
              style={{ width: "100%"}}
              src={data.data.image}
              alt=""
            />
          )}
          <p style={{ marginTop: data.data.video !== null && "15px" }}>
            {data.data.content}
          </p>
          {data.data.links !== null &&
            (data.data.image !== "" && data.data.image !== null ? (
                <li style={{ marginTop: "15px", color: "#67A1F4" }}>
                  <a
                    style={{ color: "#67A1F4" }}
                    href={data.data.links[0].link}
                  >
                    اطلاعات بیشتر
                  </a>
                </li>
            ) : (
              <ui style={{ marginTop: "15px", color: "#67A1F4" }}>
                <li>
                  <a
                    style={{ color: "#67A1F4" }}
                    href={data.data.links[0].link}
                  >
                    لینک ویدئو
                  </a>
                </li>
              </ui>
            ))}
          <span
            style={{
              textAlign: "left",
              fontSize: "1rem",
              marginTop: "10px",
              color: "#717171",
              direction: "ltr",
            }}
          >
            {data.data.date}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NotifContent;
