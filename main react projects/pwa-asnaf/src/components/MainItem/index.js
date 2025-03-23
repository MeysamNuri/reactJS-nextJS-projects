/**
 *
 * MainItem
 *
 */

import React from "react";
import "./main-item.less";
import { useHistory } from 'react-router-dom'

function MainItem({ img, txt, link }) {
  const history = useHistory()
  return (
    <div className="main-item" onClick={()=> history.push(link)}>
      <img src={img} alt="" width="20px" />
      <p>{txt}</p>
    </div>
  );
}

export default MainItem;
