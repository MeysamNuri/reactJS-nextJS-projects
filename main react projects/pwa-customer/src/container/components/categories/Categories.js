import React from "react";
import "./categories.less";
import { useHistory } from "react-router-dom";

function Categories() {
  const history = useHistory();
  return (
    <div className="category" onClick={() => history.push("categories")}>
      <p>دسته بندی ها</p>
    </div>
  );
}

export default Categories;
