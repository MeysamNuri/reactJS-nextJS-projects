import React from "react";
import "./empty-list.less";
import { Link } from "react-router-dom";

function EmptyList({ title, style, text }) {
  return (
    <div className="empty_content" style={style}>
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="browse_map" style={{fontSize:'14px'}}>
        <span>{text}</span>
      </div>
      <div className="open_map">
        <Link to="main">
          <span>باز کردن نقشه</span>
        </Link>
      </div>
    </div>
  );
}

export default EmptyList;
