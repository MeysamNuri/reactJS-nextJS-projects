import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategoryDialog } from "./actions";
import Header from "../../components/header/Header";
import ListItems from "../../components/listItems/listItems";
import AlertDialog from "../../components/dialog/dialog";
import A from "../../components/button/A";
import { getItemsCount } from "../../pages/categories/actions";
import { getSelectedItems, getCloseIconDisplay } from "../../actions/MainActions";
import "./categories.less";

const options = ["نمایش همه", "نمایش تخفیف دارها"];
const styleDialog = {
  height: "10vh",
  left: "90%",
};

function Categories() {
  const [condition, setCondition] = useState(1);
  const [search, setSearch] = useState("");
  const open = useSelector((state) => state.categoriesReducer.categorydialog);
  const tick = useSelector((state) => state.categoriesReducer.tick);
  const count = useSelector((state) => state.categoriesReducer.count);
  const selected_items = useSelector(
    (state) => state.MainReducer.selectedItems
  );
  const [deleteAll, setDeleteAll] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  
  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    if (tick === 1) history.push("/discount");
  }, [tick]);

  useEffect(() => {
    const elem = document.getElementById(`tick${tick}`);
    if (elem) {
      document.getElementById(`tick${tick === 2 ? 1 : 2}`).style.display =
        "none";
      elem.style.display = "block";
    }
  }, [tick]);

  const Dispatch = useDispatch();
  let url = "https://hn.algolia.com/api/v1/search?query";
  let back = "card-list";

  const handleClick = useCallback((e) => {
    Dispatch(getCategoryDialog(!open));
    document.getElementsByClassName("container")[0].style.filter =
      "blur(2.5px)";
  });
  const handleSelect = useCallback((e, id) => {
    if (id === 2) {
      dispatch(getCloseIconDisplay(true))
      history.push({
        pathname: "main",
        state: { id: selected_items },
      });
    } else {
      if (count > 0) {
        dispatch(getItemsCount(0));
        dispatch(getSelectedItems(0));
        setDeleteAll((deleteAll) => !deleteAll);
      } else {
        history.push("main");
      }
    }

    setCondition(id);
  });
  
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  });

  return (
    <div className="category_container">
      <Header
        title="دسته بندی ها"
        leftIcon="assets/images/arrow-w-rotate.svg"
        isSearch={true}
        url={url}
        back={back}
        handleRightClick={(e) => handleClick(e)}
        handleSearch={(e) => handleChange(e)}
      />
      <div className="content_categories">
        <ListItems deleteAll={deleteAll} query={search} />
      </div>
      <AlertDialog title={null} options={options} style={styleDialog} />
      <div className="notice_categories">
        <A
          title={count > 0 ? "حذف همه" : "نمایش همه"}
          style={{
            width: "26%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "500",
            background: count > 0 ? "#d83e3e" : "#009b7f",
          }}
          handleClick={(e) => handleSelect(e, 1)}
        />
        <A
          title={"نمایش انتخاب شده ها"}
          style={{
            width: "70%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "500",
            background: count > 0 ? "#009b7f" : "#C2CDD9",
          }}
          handleClick={(e) => handleSelect(e, 2)}
        />
      </div>
    </div>
  );
}

export default Categories;
