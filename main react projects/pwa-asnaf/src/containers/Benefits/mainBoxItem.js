import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

function BoxItem({ push, img, title, color, text }) {
  const history = useHistory();
  return (
    <>
      <div className="mainBox">
        <div
          className="item-box"
          onClick={useCallback(() => history.push(push))}
        >
          <img src={img} alt='' />
          <p className={text}>{title}</p>
          <div className={color}></div>
        </div>
      </div>
    </>
  );
}

export default BoxItem;
