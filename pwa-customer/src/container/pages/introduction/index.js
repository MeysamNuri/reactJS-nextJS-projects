import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";
import AutoComplete from "../../components/AutoComplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import WrappedMap from "../../components/Map/SelectiveMap";
import "./introduction.less";

import store from "store-js";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useDataApi from "../../components/fetchData/useDataApi";

const initialState = {
  storeName: "",
  name: "",
  cellphone: "",
  tel: "",
  address: "",
  quality: "",
  displayStoreNameErr: "none",
  displayNameErr: "none",
  displayCellphoneErr: "none",
  displayTelErr: "none",
  displayAddressErr: "none",
  displayQualityErr: "none",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "80%",
    backgroundColor: "#fff",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Introduction() {
  const latlang = useSelector((state) => state.MainReducer.introLoc);
  const introCat = useSelector((state) => state.MainReducer.introCat);
  // const token = store.get("token");
  // const headers = {
  //   Authorization: `bearer ${token}`,
  // };
  const [
    {
      storeName,
      name,
      cellphone,
      tel,
      address,
      quality,
      displayStoreNameErr,
      displayNameErr,
      displayCellphoneErr,
      displayTelErr,
      displayAddressErr,
      displayQualityErr,
    },
    setState,
  ] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const isSignIn = store.get("isSignIn");
  const [params, setParams] = useState(true);
  const [url, setUrl] = useState("");
  const method = "post";
  const [error, setError] = useState(false);
  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (data !== null && !isError && !isLoading) {
      setLoader(false);
      setSnackMsg("با موفقیت ثبت شد");
      setOpen(true);
      store.set("storeLatLng", "");
      setTimeout(() => {
        handleCloseErrMessage();
      }, 2000);

    } else if (isError) {
      setLoader(false);
      setSnackMsg(errMessage);
      setOpen(true);
    }
  }, [data, isLoading, isError]);

  const handleLeftClick = () => {
    history.push("main");
  };

  const handleCloseErrMessage = () => {
    setOpen(false);
  };
  const handleInputChanged = (e) => {
    e.persist();
    const name = e.target.name;
    switch (name) {
      case "storeName":
        setState((prevState) => ({ ...prevState, storeName: e.target.value }));
        setState((prevState) => ({
          ...prevState,
          displayStoreNameErr: "none",
        }));
        break;
      case "name":
        setState((prevState) => ({ ...prevState, name: e.target.value }));
        setState((prevState) => ({ ...prevState, displayNameErr: "none" }));
        break;
      case "cellphone":
        setState((prevState) => ({ ...prevState, cellphone: e.target.value }));
        setState((prevState) => ({
          ...prevState,
          displayCellphoneErr: "none",
        }));
        break;
      case "tel":
        setState((prevState) => ({ ...prevState, tel: e.target.value }));
        setState((prevState) => ({ ...prevState, displayTelErr: "none" }));
        break;
      case "address":
        setState((prevState) => ({ ...prevState, address: e.target.value }));
        setState((prevState) => ({ ...prevState, displayAddressErr: "none" }));
        break;
      case "quality":
        setState((prevState) => ({ ...prevState, quality: e.target.value }));
        setState((prevState) => ({ ...prevState, displayQualityErr: "none" }));
        break;
    }
  };

  const handleValidateInput = (e) => {
    const names = e.target.name;
    // const regString = new RegExp("^[آ-یs]+");
    const numberRegex = new RegExp("^[0-9]*$");
    if (names === "tel") {
      if (tel.length === 11) {
        if (numberRegex.test(tel)) {
          setState((prevState) => ({
            ...prevState,
            displayTelErr: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayTelErr: "block",
          }));
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          displayTelErr: "block",
        }));
      }
    }
    if (names === "cellphone") {
      if (cellphone.length === 11) {
        if (numberRegex.test(cellphone)) {
          setState((prevState) => ({
            ...prevState,
            displayCellphoneErr: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayCellphoneErr: "block",
          }));
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          displayCellphoneErr: "block",
        }));
      }
    }
  };

  const handleSendInfo = (e) => {
    e.preventDefault();
    setLoader(true);
    if (latlang !== undefined && latlang !== '') {
      setParams({
        shop_name: storeName,
        owner_name: name,
        cellphone: cellphone,
        telephone: tel,
        business_type: introCat,
        address: address,
        longitude: latlang.lat,
        latitude: latlang.lng,
        quality: quality,
      });
      if (isSignIn !== undefined && isSignIn) {
        setUrl("business/introduction");
      } else {
        setUrl("business/introduction/wo");
      }
    } else {
      setLoader(false);
      setSnackMsg("لطفا موقعیت صنف را روی نقشه مشخص کنید");
      setOpen(true);
    }
  };
  
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Header
        title="معرفی کسب وکار"
        leftIcon={isSignIn !== undefined && isSignIn ? "assets/images/arrow-w-rotate.svg" : ''}
        back={null}
        handleLeftClick={handleLeftClick}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackMsg !== '' && snackMsg !== undefined ? open : false}
        autoHideDuration={3000}
        onClose={handleCloseErrMessage}
        message={snackMsg}
      />
      <div className="itrodoction-div">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "justify", width: "90%" }}>
            با تکمیل فرم زیر و ثبت کسب و کار مورد نظر خود علاوه بر داپ اَپی
            شدنش، پس از انعقاد قرارداد فی ما بین داپ اَپ و این کسب و کار مبلغ 50
            هزار تومان به حساب کیف پول شما در اپلیکیشن واریز خواهد شد.
          </p>
          <form action="" className="profile-form">
            <div className="form-input">
              <p>نام صنف مورد نظر</p>
              <input
                type="text"
                name="storeName"
                id="storeName"
                placeholder="مثال: خانه چرم درسا"
                style={{ textAlign: "right" }}
                value={storeName}
                onChange={(e) => handleInputChanged(e)}
              />
              {
                <p
                  className="error-txt"
                  style={{ display: displayStoreNameErr }}
                >
                  لطفا نام فروشگاه را به درستی وارد نمایید
                </p>
              }
            </div>
            <div className="form-input">
              <p>نام صاحب کسب وکار</p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="مثال: سجاد شفیع زاده"
                style={{ textAlign: "right" }}
                value={name}
                onChange={(e) => handleInputChanged(e)}
              />
              {
                <p className="error-txt" style={{ display: displayNameErr }}>
                  لطفا نام صاحب کسب و کار را به درستی وارد نمایید
                </p>
              }
            </div>
            <div className="form-input">
              <p>شماره تلفن همراه</p>
              <input
                type="text"
                name="cellphone"
                id="cellphone"
                placeholder="09"
                value={cellphone}
                style={{ direction: "ltr" }}
                onChange={(e) => handleInputChanged(e)}
                onBlur={(e) => handleValidateInput(e)}
              />
              {
                <p
                  className="error-txt"
                  style={{ display: displayCellphoneErr }}
                >
                  لطفا شماره تلفن همراه را به درستی وارد نمایید
                </p>
              }
            </div>
            <div className="form-input">
              <p>شماره تلفن ثابت</p>
              <input
                type="text"
                name="tel"
                id="tel"
                placeholder="021 ** ** ** **"
                style={{ direction: "ltr" }}
                value={tel}
                onChange={(e) => handleInputChanged(e)}
                onBlur={(e) => handleValidateInput(e)}
              />

              <p className="error-txt" style={{ display: displayTelErr }}>
                لطفا شماره تلفن را به درستی وارد نمایید
              </p>
            </div>
            <div className="form-input" style={{ marginTop: "18px" }}>
              <p>دسته‌بندی کسب و کار</p>
              <AutoComplete />
            </div>
            <div
              className="form-input"
              style={{
                position: "relative",
              }}
            >
              <p>آدرس</p>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                placeholder="مثال: سعادت‌آباد، خیابان 38، پلاک 100"
                onChange={(e) => handleInputChanged(e)}
                style={{
                  textAlign: "right",
                }}
              />
              <p className="error-txt" style={{ display: displayAddressErr }}>
                لطفا آدرس را وارد نمایید
              </p>
            </div>
            <div className="form-input" style={{ marginTop: "18px" }}>
              <p>موقعیت روی نقشه</p>
              <div className="map-div">
                <WrappedMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDTpnAdFWoofJdryMwtV-0DFW1GYg8E0Ks`}
                  loadingElement={
                    <div style={{ height: `100%`, position: "relative" }} />
                  }
                  containerElement={
                    <div style={{ height: `100%`, position: "relative" }} />
                  }
                  mapElement={
                    <div style={{ height: `100%`, position: "relative" }} />
                  }
                />
              </div>
            </div>
            <div className="form-input" style={{ marginTop: "18px" }}>
              <p>امتیاز</p>
              <div
                style={{
                  width: "100%",
                  background: "#fff",
                  height: "48px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quality}
                    name="quality"
                    onChange={(e) => handleInputChanged(e)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <p className="error-txt" style={{ display: displayQualityErr }}>
                لطفا امتیاز را وارد نمایید
              </p>
            </div>
            <button
              className="big-btn"
              style={{ zIndex: "1000", marginTop: "25px" }}
              onClick={(e) => handleSendInfo(e)}
            >
              {loader ? (
                <CircularProgress size="15px" color="inherit" />
              ) : (
                <span>ثبت درخواست</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
