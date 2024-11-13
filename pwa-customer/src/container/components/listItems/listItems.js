import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import store from "store-js";
import { img_url } from "../../../constants/base_url";
import { getItemsCount } from "../../pages/categories/actions";
import { getSelectedItems } from "../../actions/MainActions";
import "./listItems.less";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function ListItems({ deleteAll, query }) {
  const [selectedItems, setSelectedItems] = useState([]);

  let data = store.get("categories_data");
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const temp = store.get("discount_data");
    let discount_data = null;
    if (temp.data !== undefined)
      discount_data = temp.data.discounted_businesses[0].businesses;
    if (discount_data) {
      for (let index = 0; index < discount_data.length; index++) {
        const id = discount_data[index].id;
        const element = document.getElementById(id);
        element.getElementsByClassName("bullet_content")[0].style.display =
          "block";
        element
          .closest(".item")
          .getElementsByClassName("bullet")[0].style.display = "block";
      }
    }
  }, []);

  useEffect(() => {
    setSelectedItems([]);
    const elements = document.getElementsByClassName("ticked_img");
    for (let index = 0; index < elements.length; index++) {
      elements[index].style.display = "none";
    }
  }, [deleteAll]);

  useEffect(() => {
    dispatch(getItemsCount(selectedItems.length));
    dispatch(getSelectedItems(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    if (query.length > 0) {
      const elements = document.getElementsByClassName(
        "MuiExpansionPanel-root"
      );
      if (elements) {
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
        }
      }
    }
  }, [query]);

  const handleAllClicked = (e) => {
    const elements = e.currentTarget.parentElement.getElementsByClassName(
      "ticked_img"
    );
    elements[0].style.display =
      elements[0].style.display === "block" ? "none" : "block";
    let display = elements[0].style.display;
    let items = [];
    for (let i = 1; i < elements.length; i++) {
      elements[i].style.display = display;
      items.push(elements[i].parentElement.id);
    }
    if (elements[0].style.display === "block") {
      let newItems = selectedItems.concat(items);
      let uniq = [...new Set(newItems)];

      setSelectedItems(uniq);
    } else
      setSelectedItems((selectedItems) =>
        selectedItems.filter((item) => !items.includes(item))
      );
  };

  const handleClick = (e) => {
    e.currentTarget.parentElement.getElementsByClassName("ticked_img")[0].style.display = 'none'
    const element = e.currentTarget.getElementsByClassName("ticked_img")[0];
    element.style.display =
      element.style.display === "block" ? "none" : "block";
    if (element.style.display === "block") {
      let arr = selectedItems;
      arr.push(e.currentTarget.id);
      setSelectedItems(arr);
      dispatch(getItemsCount(selectedItems.length));
      dispatch(getSelectedItems(selectedItems));
    } else {
      let arr = selectedItems;
      const index = arr.indexOf(e.currentTarget.id);
      if (index > -1) {
        arr.splice(index, 1);
        setSelectedItems(arr);
        dispatch(getItemsCount(selectedItems.length));
        dispatch(getSelectedItems(selectedItems));
      }
    }
    // ----------------- all selected tick display condition --------------------
    const selected_data = []
    const deselected_data = []

    const elements = e.currentTarget.parentElement.getElementsByClassName("ticked_img")

    for (let index = 0; index < elements.length; index++) {
      if(elements[index].style.display === "block"){
        selected_data.push(elements[index])
      }
      if(elements[index].style.display === "none"){
        deselected_data.push(elements[index])
      }
    }

    if(selected_data.length === elements.length - 1){
      e.currentTarget.parentElement.getElementsByClassName("ticked_img")[0].style.display = 'block'
    }
    if(deselected_data.length === elements.length - 1){
      e.currentTarget.parentElement.getElementsByClassName("ticked_img")[0].style.display = 'none'
    }

  };

  let filtered_data = null;
  if (data && query.length > 0) {
    filtered_data = data.categories.filter((item) => {
      if (item.name.includes(query)) return item;
      const sub_category = item.business_sub_category;
      for (let index = 0; index < sub_category.length; index++) {
        const element = sub_category[index];
        if (element.name.includes(query)) return item;
      }
    });
  }

  if (filtered_data === null) filtered_data = data.categories;

  return (
    <ul style={{ marginBottom: 0 }}>
      {filtered_data.map((item) => (
        <li key={item.id}>
          <div className="item" id={`0${item.id}`}>
            <div className={classes.root}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <img
                    className="img"
                    src={`${img_url}${item.selected_img}`}
                    alt=""
                  />
                  <span className="title">{item.name}</span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="detail_content">
                    <div className="hr" />
                    <div
                      className="select_all"
                      onClick={(e) => handleAllClicked(e)}
                    >
                      <img
                        src="assets/images/check.svg"
                        alt=""
                        className="img"
                      />
                      <img
                        src="assets/images/i-check.svg"
                        alt=""
                        className="ticked_img"
                        style={{ display: deleteAll && "none" }}
                      />
                      <span>انتخاب همه</span>
                    </div>
                    {item.business_sub_category.map((sub_category) => (
                      <>
                        <div
                          className="detail_item"
                          key={sub_category.id}
                          id={sub_category.id}
                          onClick={(e) => handleClick(e)}
                        >
                          <img
                            className="icon"
                            src={`${img_url}${sub_category.selected_img}`}
                            alt=""
                          />
                          <span className="title">{sub_category.name}</span>
                          <img
                            src="assets/images/check.svg"
                            alt=""
                            className="img"
                          />
                          <img
                            src="assets/images/i-check.svg"
                            alt=""
                            className="ticked_img"
                            style={{ display: deleteAll && "none" }}
                          />
                          <div className="bullet_content" />
                        </div>
                      </>
                    ))}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <div className="bullet" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(ListItems);
