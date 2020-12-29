import React, { useState, useEffect } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import store from "store-js";
import { setIntroCat } from "../../actions/MainActions";
import axios from "axios";
import base_url from "../../../constants/base_url";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
    color: "#C2CDD9",
    fontSize: "1.1rem",
    width: "100%",
  },
  input: {
    width: "88%",
    backgroundColor: "#F6F9FC",
    borderRadius: "8px",
    height: "36px",
    margin: "auto",
    display: "none",
    outline: "0",
    fontFamily: "VazirMedium",
    paddingRight: "8px",
  },
  listbox: {
    width: "92%",
    padding: "10px 15px 10px 10px",
    zIndex: 1,
    position: "absolute",
    top: "34%",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 142,
    outline: "0",
    "& li": {
      margin: "10px 0",
    },
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white",
    },
  },
  comboDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    margin: "auto",
    height: "48px",
  },
}));

const comboStyle = {
  backgroundColor: "#fff",
  boxShadow: "0 3px 15px #0000000D",
  borderRadius: "8px",
  width: "100%",
  marginTop: "10px",
  transition: ".5s all",
  position: "relative",
};

const comboAfterClick = {
  alignItems: "flex-start",
  height: "250px",
};

export default function UseAutocomplete() {
  const [open, setOpen] = useState(false);
  const [labelColor, setLabelColor] = useState("#C2CDD9");
  const [datas, setDatas] = useState([]);
  const categories = store.get("categories_data");
  const data = []
  const getCategories = () => {
    axios
      .get(`${base_url}categories/tree`)
      .then((res) => {
        store.set("categories_data", res.data.data);
        res.data.data.categories.map((item) => {
          for (var i = 0; i < item.business_sub_category.length; i++) {
            data.push(item.business_sub_category[i]);
          }
          setDatas(data)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (categories === undefined) {
      getCategories();
    } else {
      categories.categories.map((item) => {
        for (var i = 0; i < item.business_sub_category.length; i++) {
          data.push(item.business_sub_category[i]);
        }
        setDatas(data)
      });
    }
  },[]);

  console.log(data);
  const [optionText, setOptionText] = useState("لطفا انتخاب کنید");
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: datas,
    getOptionLabel: (option) => option.name,
    open: open,
    onOpen: setOpen,
  });

  const handleOptionClicked = (option) => {
    setLabelColor("#000");
    setOptionText(option.name);
    dispatch(setIntroCat(option.id));
    store.set("categoryName", option.name);
    setOpen(!open);
  };

  const handleComboClicked = () => {
    setOpen(!open);
  };

  return (
    <div style={comboStyle}>
      <div {...getRootProps()} style={open ? comboAfterClick : {}}>
        <div className={classes.comboDiv}>
          <label
            className={classes.label}
            {...getInputLabelProps()}
            onClick={handleComboClicked}
            style={{ color: labelColor }}
          >
            {optionText}
          </label>
          <img
            style={{
              width: "12px",
              height: "12px",
              transform: open ? "rotate(180deg)" : "",
            }}
            src="assets/images/arrow-down.png"
            alt="arrow-down.png"
          />
        </div>
        <input
          className={classes.input}
          {...getInputProps()}
          style={{ display: open ? "block" : "none" }}
          placeholder="جستجو در دسته بندی ها..."
        />
      </div>
      {groupedOptions.length > 0 ? (
        <div style={{ display: open ? "block" : "none" }}>
          <ul className={classes.listbox} {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li
                key={option.id}
                {...getOptionProps({ option, index })}
                onClick={() => handleOptionClicked(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
