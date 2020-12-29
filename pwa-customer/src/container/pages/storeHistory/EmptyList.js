import React from "react";
import Header from "../../components/header/Header";
import "./store-history.less";
import { Link } from "react-router-dom";

function EmptyList({ storeName }) {
  return (
    <div style={{ width: "100%" }}>
      <Header
        title={storeName}
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={"wallet"}
      />
      <div
        style={{
          height: "91vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="title_empty_list">
          <img src="assets/images/emptybasket.svg" alt="" />
          <p style={{ textAlign: "center", margin: "25px 0", width: "85%" }}>
            شما تاکنون از صنف {storeName} هیچ خریدی نداشته‌اید
          </p>
        </div>
        <div className="browse_map" style={{ fontSize: "14px" }}>
          <span>نقشه را مرور کرده و اصناف داپ‌اَپی را پیدا کنید.</span>
        </div>
        <div className="open_map">
          <Link to="main">
            <span>باز کردن نقشه</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyList;
