import React, { useState, useEffect } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { makeStyles } from "@material-ui/core/styles";
import APIs from "./APIs";
import { setCategory } from "../../containers/PersonalData/action";
import { useDispatch } from "react-redux";
import store from 'store-js'
import fetchCatch from '../../utils/fetchCatch'

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
    fontSize: "1.1rem",
    width:'90%'
  },
  input: {
    width: "90%",
    backgroundColor: "#F6F9FC",
    borderRadius: "8px",
    height: "36px",
    margin: "auto",
    display: "none",
    outline: "0",
    fontFamily: "VazirMedium",
    direction:'rtl',
    textAlign:'right',
    fontSize:'1rem'
  },
  listbox: {
    width: "90%",
    padding: "10px 15px 10px 10px",
    zIndex: 1,
    position: "absolute",
    top: "34%",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 146,
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
  const [categories, setCategories] = useState([]);
  const [labelColor, setLabelColor] = useState('#C2CDD9');
  const [optionText, setOptionText] = useState("مثال: چرم درسا");
  const classes = useStyles();

  const dispatch = useDispatch();

  async function getCategories() {
    // setLoader(true);
    try {
      const data = await APIs.getCategories();
      setCategories(data.data.sub_categories);
      // setLoader(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      // setLoader(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: categories,
    getOptionLabel: (option) => option.name,
    open: open,
    onOpen: setOpen
  });

  const handleOptionClicked = (option) => {
    setLabelColor('#000')
    setOptionText(option.name);
    dispatch(setCategory(option.id))
    store.set('categoryName', option.name)
    setOpen(!open)
  };

  const handleComboClicked = () => {
    setOpen(!open)
  };

  return (
    <div style={comboStyle}>
      <div {...getRootProps()} style={open ? comboAfterClick : {}}>
        <div className={classes.comboDiv}>
          <label
            className={classes.label}
            {...getInputLabelProps()}
            onClick={handleComboClicked}
            style={{color: labelColor}}
          >
            {optionText}
          </label>
          <img
            style={{
              width: "12px",
              height: "12px",
              transform: open ? "rotate(180deg)" : "",
              zIndex:'1000'
            }}
            onClick={handleComboClicked}
            src='assets/images/arrow-down.png'
            alt='arrow-down.png'
          />
        </div>
        <input
          className={classes.input}
          {...getInputProps()}
          style={{ display: open ? "block" : "none" }}
          placeholder='جستجو در دسته بندی ها...'
        />
      </div>
      {groupedOptions.length > 0 ? (
        <ul
          className={classes.listbox}
          {...getListboxProps()}
          style={{ display: open ? "block" : "none" }}
        >
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
      ) : null}
    </div>
  );
}
