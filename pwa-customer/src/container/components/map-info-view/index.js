import React from "react";
import "./map-info-view.less";

function InfoView({ image, name, title, description, tel, address }) {
  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        alignItems: "center",
        margin: "auto",
        position:'relative'
      }}
    >
      <div className="info-box">
        <div className="section1">
          <div>
            <img src={image} alt="" />
            <div>
              <h2>{name}</h2>
              <span>{title}</span>
            </div>
          </div>
          <img src="assets/images/shape-star.svg" alt="" />
        </div>
        <div className="section2">
          <p>{description}</p>
        </div>
        <div className="section3">
          <p>{address}</p>
        </div>
        <div className="section4">
          <p>{tel}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoView;
