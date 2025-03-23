/**
 *
 * StoreData
 *
 */

import React, { useState } from "react";
import "./store-data.less";
import {
  setDescription,
  setAddress,
  setTel,
  setStoreName,
} from "../../containers/PersonalData/action";
import { openSnackbar, setSnackbarMsg } from "../../mainAction/snackbarAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import store from "store-js";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
// --------------------- components ------------------
import AutoComplete from "../../components/AutoComplete";
import WrappedMap from "../../components/Map/SelectiveMap";
import CustomInputAutocomplete from "../../components/GetRegions/getCities";

const initialState = {
  displayStoreNameErr: "none",
  displayTelErr: "none",
};

export function StoreData() {
  const dispatch = useDispatch();
  const history = useHistory();

  const storeLatLng = useSelector((state) => state.MainReducer.latlng);
  const storeName = useSelector((state) => state.personDataReducer.storeName);
  const tel = useSelector((state) => state.personDataReducer.tel);
  const address = useSelector((state) => state.personDataReducer.address);
  const description = useSelector(
    (state) => state.personDataReducer.description
  );
  const category = useSelector((state) => state.personDataReducer.category);
  const fname = useSelector((state) => state.personDataReducer.fname);
  const lname = useSelector((state) => state.personDataReducer.lname);
  const nationalId = useSelector((state) => state.personDataReducer.nationalId);
  const email = useSelector((state) => state.personDataReducer.email);
  const sheba = useSelector((state) => state.personDataReducer.sheba);
  const getRegionId=useSelector((state)=>state.personDataReducer.RegionId)
  const userMobile = useSelector((state) => state.personDataReducer.userMobile);
  // const mobile = store.get("phoneNumber");
  const [{ displayStoreNameErr, displayTelErr }, setState] = useState(
    initialState
  );
  const [loader, setLoader] = useState(false);
  const handleInputChanged = (e) => {
    e.persist();
    const names = e.target.name;
 
    switch (names) {
      case "storeName":
        dispatch(setStoreName(e.target.value));
        setState((prevState) => ({
          ...prevState,
          displayStoreNameErr: "none",
        }));
        break;
      case "tel":
        dispatch(setTel(e.target.value));
        setState((prevState) => ({
          ...prevState,
          displayTelErr: "none",
        }));
        break;
      case "address":
        dispatch(setAddress(e.target.value));
        break;
      case "description":
        dispatch(setDescription(e.target.value));
        break;
      default:
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
    // switch (names) {
    // case "storeName":
    //   if (storeName.length > 2) {
    //     if (regString.test(storeName)) {
    //       setState((prevState) => ({ ...prevState, displayStoreNameErr: "none" }));
    //     } else {
    //       setState((prevState) => ({
    //         ...prevState,
    //         displayStoreNameErr: "block",
    //       }));
    //     }
    //   }
    //   break;
    //   case "tel":
    //     if (nationalId.length === 11) {
    //       if (numberRegex.test(tel)) {
    //         setState((prevState) => ({
    //           ...prevState,
    //           displayTelErr: "none",
    //         }));
    //       } else {
    //         setState((prevState) => ({
    //           ...prevState,
    //           displayTelErr: "block",
    //         }));
    //       }
    //     } else {
    //       setState((prevState) => ({
    //         ...prevState,
    //         displayTelErr: "block",
    //       }));
    //     }
    //     break;
    //   default:
    //     break;
    // }
  };
 console.log(userMobile);
  async function registerData(e) {
    e.preventDefault();
    setLoader(true);
    if (category !== "" && storeLatLng !== undefined) {
      try {
        await APIs.registerData(
          userMobile,
          fname,
          lname,
          nationalId,
          sheba,
          email,
          storeName,
          category,
          tel,
          address,
          storeLatLng,
          getRegionId
        );
        history.push("done");
        setLoader(false);
      } catch ({ response }) {
        if (response) {
          fetchCatch(response);
        }
        setLoader(false);
      }
    } else {
      setLoader(false);
      if (category === "") {
        dispatch(setSnackbarMsg("لطفا نوع صنف را انتخاب کنید"));
      }
      if (storeLatLng === undefined) {
        dispatch(setSnackbarMsg("لطفا موقعیت صنف را روی نقشه مشخص کنید"));
      }
      dispatch(openSnackbar());
    }
  }

  return (
    <div style={{backgroundColor: "#f6f9fc",height:"auto"}}>
      <div className="store-data">
        <img
          className="back-btn"
          src="assets/images/arrow.svg"
          alt=""
          onClick={() => history.push("personal-data")}
        />
        <p>به داپ‌اَپ اصناف خوش آمدید</p>
        <h2>اطلاعات کسب و کار</h2>
        <form action="" className="profile-form">
          <div className="form-input">
            <p>نام فروشگاه</p>
            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder="نام صنف"
              style={{ textAlign: "right" }}
              value={storeName}
              onChange={(e) => handleInputChanged(e)}
              // onBlur={(e) => handleValidateInput(e)}
            />
            {
              <p className="error-txt" style={{ display: displayStoreNameErr }}>
                لطفا نام فروشگاه را به درستی وارد نمایید
              </p>
            }
          </div>
          <div className="form-input" style={{ marginTop: "18px" }}>
            <p>دسته‌بندی کسب و کار</p>
            <AutoComplete />
          </div>
          <div className="form-input" style={{ marginTop: "18px" }}>
            <p>تلفن فروشگاه</p>
            <input
              type="text"
              name="tel"
              id="tel"
              placeholder="021 99999999"
              style={{ direction: "ltr" }}
              value={tel}
              onChange={(e) => handleInputChanged(e)}
              onBlur={(e) => handleValidateInput(e)}
            />
            <p className="error-txt" style={{ display: displayTelErr }}>
              لطفا شماره تلفن را به درستی وارد نمایید
            </p>
          </div>
          <div
            className="form-input"
            style={{
              position: "relative",
            }}
          >
             <div className="form-input" style={{ marginTop: "18px" }}>
          
            <CustomInputAutocomplete />
          </div>
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
          </div>
          <div className="form-input" style={{ marginTop: "18px" }}>
            <p>موقعیت روی نقشه</p>
            <div className="map-div">
              
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCtVaIE2pz7usVBlj896SGkcgKAHZ7XhdU`}
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
            <p>درباره‌ی فروشگاه</p>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className="store-textarea"
              onChange={(e) => handleInputChanged(e)}
              value={description}
            ></textarea>
          </div>

         
      
       
          <button
            className="big-btn"
            style={{ zIndex: "1000", marginTop: "25px" }}
            onClick={(e) => registerData(e)}
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
  );
}

export default StoreData;
