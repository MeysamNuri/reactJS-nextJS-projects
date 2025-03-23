import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowSlideMenu } from "../../actions/MainActions";
import "./menu-item.less";

function MenuItem({ src, title, txt, to, onClick }) {
  const showSideBar = useSelector((state) => state.MainReducer.showSideBar);
  const Dispatch = useDispatch();

  const history = useHistory();
  function handleRouter(link) {
    history.push(link);
    Dispatch(setShowSlideMenu(!showSideBar));
  }

  return (
    <button
      className="menu-item"
      onClick={() => (to !== null ? handleRouter(to) : onClick)}
    >
      <img
        src={src}
        alt=""
        style={{ width: "25px", height: "25px", opacity: src ? 1 : 0 }}
      />
      <div className="menu-item-txt">
        <h2 className="item-title">{title}</h2>
        <p className="item-txt">{txt}</p>
      </div>
    </button>
  );
}

export default MenuItem;
