import React, { useState, useEffect } from "react";
import "./profile.less";
import { useDispatch } from "react-redux";
import { getSignoutDialog } from "./actions";
import store from "store-js";
import APIs from "./APIs";
import OtpAPIs from "../Otp/APIs";
import { img_url } from "../../constants/base_url";
import { openSnackbar, setSnackbarMsg } from "../../mainAction/snackbarAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
import { useHistory } from "react-router-dom";
import { QRCode } from "react-qr-svg";
// --------------------- components ------------------
import Header from "../../components/Header";
import ProfilePic from "../../components/ProfilePic";
import SignOutDialog from "../../components/Dialogs/SignOutDialog";
import WrappedMap from "../../components/Map";
import Modal from "../../components/Modal/Modal";

export function Profile() {
  const dispatch = useDispatch();
  const appInits = store.get("appInit");
  const businesses = store.get("businesses");
  var formData = new FormData();
  const [sheba, setSheba] = useState("");
  const [displayShebaError, setDisplayShebaError] = useState("none");
  const [img, setImg] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showQr, setshowQr] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const paymentCode = appInits.business_user_view[0].payment_code || " ";
  const history = useHistory();
  useEffect(() => {
    console.log("paymentcode",appInits.business_user_view[0].payment_code);
    setSheba(
      appInits.sheba_default !== undefined
        ? appInits.sheba_default.sheba_number
        : ""
    );
    console.log(appInits);
  }, []);

  const handleRightClick = () => {
    dispatch(getSignoutDialog(true));
    document.getElementsByClassName("profile-div")[0].style.filter =
      "blur(2.5px)";
  };

  const handleCheckSheba = () => {
    if (sheba.length < 24) {
      setDisplayShebaError("block");
    }
  };

  const handlUploadTerminalImg = (e) => {
    setImg(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImgBase64(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  async function uploadAvatar() {
    setLoader(true);
    formData.append("avatar", img);
    try {
      await APIs.uploadAvatar(formData);
      OtpAPIs.appInit(businesses[0].business_id);
      dispatch(setSnackbarMsg("با موفقیت ثبت شد"));
      dispatch(openSnackbar());
      setLoader(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  async function uploadSheba() {
    setLoader(true);
    try {
      await APIs.uploadSheba(sheba);
      OtpAPIs.appInit(businesses[0].business_id);
      dispatch(setSnackbarMsg("با موفقیت ثبت شد"));
      dispatch(openSnackbar());
      setLoader(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setLoader(false);
    }
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();

    if (img !== null) {
      uploadAvatar();
    }
    if (sheba !== appInits.sheba_default.sheba_number) {
      uploadSheba();
    }
  };

  const handleCancle = (e) => {
    e.preventDefault();
    history.push("main");
  };

  return (
    <div className="profile-div">
      <Header
        title="حساب کاربری"
        rightIcon={"خروج"}
        leftIcon="assets/images/arrow-w-rotate.svg"
        handleRightClick={handleRightClick}
        back={"main"}
        style={{ height: "18vh" }}
        iconStyle={{ position: "absolute", top: "20px" }}
      />
      <ProfilePic
        avatar={
          imgBase64 !== null
            ? imgBase64
            : appInits.avatar !== null
            ? `${img_url}${appInits.avatar}`
            : null
        }
      />
      <SignOutDialog />
      <div className="profile-content">
        <label
          htmlFor="image"
          style={{
            padding: "50px 0 20px 0",
            backgroundColor: "#F6F9FC",
            width: "100%",
            zIndex: "1",
          }}
        >
          <input
            id="image"
            accept="image/*"
            onChange={(e) => handlUploadTerminalImg(e)}
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
          />
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "#6498e6",
            }}
          >
            تغییر تصویر پروفایل
          </p>
        </label>

        <form action="" className="profile-form">
          <div className="form-input">
            <p>شناسه پرداخت</p>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="شناسه پرداخت"
              style={{ textAlign: "left" }}
              value={paymentCode}
              disabled="on"
            />
            <div style={{ position: "relative", width: "100%" }}>
              <span
                className="show_qr_text"
                onClick={(e) => setOpenModal(!openModal)}
              >
                نمایش QR code
              </span>
            </div>
          </div>
          <div className="form-input">
            <p>نام و نام خانوادگی</p>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="نام و نام خانوادگی"
              style={{ textAlign: "right" }}
              value={appInits.f_name + " " + appInits.l_name}
              disabled="on"
            />
            <span style={{ direction: "ltr", alignSelf: "flex-end" }}>
              ID: {appInits.cellphone}
            </span>
          </div>
          <div className="form-input" style={{ marginTop: "0" }}>
            <p>کد ملی</p>
            <input
              type="text"
              name="id-national"
              id="id-national"
              placeholder="999 99 99 999"
              value={appInits.national_id}
              disabled="on"
            />
          </div>
          <div className="form-input">
            <p>ایمیل (اختیاری)</p>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="e.g. yourname@domain.com"
              value={appInits.email}
              disabled="on"
            />
          </div>
          <div
            className="form-input"
            style={{
              position: "relative",
            }}
          >
            <p>شماره شبا</p>
            <p className="sheba-ir">IR</p>
            <input
              type="text"
              name="sheba"
              id="sheba"
              maxLength={24}
              value={sheba}
              autoComplete="off"
              placeholder="9999-9999-9999-9999-9999-9999"
              onChange={(e) => {
                setSheba(e.target.value);
                setDisplayShebaError("none");
              }}
              onBlur={handleCheckSheba}
              style={{
                paddingLeft: "45px",
                direction: "ltr",
                backgroundColor: "#fff",
                width: "73%",
                display: "flex",
                alignSelf: "flex-end",
                fontSize: "1rem",
              }}
            />
            <span
              style={{ position: "absolute", top: "53%", fontSize: "0.7rem",right: "12%"}}
            >{`${sheba.length}/24`}</span>
            {appInits.sheba_default !== undefined &&
            appInits.sheba_default.full_name !== null ? (
              <span
                style={{ fontSize: ".8rem" }}
              >{`مبالغ کیف پول به حساب ${appInits.sheba_default.full_name} واریز خواهد شد`}</span>
            ) : (
              <span style={{ fontSize: ".8rem" }}>
                مبالغ کیف پول شما به این حساب واریز خواهد شد
              </span>
            )}
            <p className="error-txt" style={{ display: displayShebaError }}>
              لطفا شماره شبا را به درستی وارد نمایید
            </p>
          </div>
          <div className="form-input">
            <p>نام فروشگاه</p>
            <input
              type="text"
              name="store-name"
              id="store-name"
              placeholder="نام فروشگاه"
              style={{ textAlign: "right" }}
              value={appInits.businesses[0].shop_name}
              disabled="on"
            />
          </div>
          <div className="form-input">
            <p>دسته‌بندی کسب و کار</p>
            <input
              type="text"
              name="store-name"
              id="store-name"
              placeholder="نام فروشگاه"
              style={{ textAlign: "right" }}
              value={appInits.businesses[0].sub_category.name}
              disabled="on"
            />
          </div>
          <div className="form-input">
            <p>تلفن فروشگاه</p>
            <input
              type="text"
              name="cellphone"
              id="cellphone"
              placeholder="021 1234 4567"
              style={{ direction: "ltr" }}
              value={appInits.businesses[0].tel}
              disabled="on"
            />
          </div>
          <div className="form-input" style={{ marginTop: "0" }}>
            <p>آدرس</p>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="سعادت‌آباد، خیابان 38، پلاک 100"
              style={{ textAlign: "right" }}
              value={appInits.businesses[0].address}
              disabled="on"
            />
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
            <p>درباره‌ی فروشگاه</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="store-textarea"
              disabled="on"
            ></textarea>
          </div>
          <div className="btn-div">
            <button className="cancle-btn" onClick={(e) => handleCancle(e)}>
              <span>انصراف</span>
            </button>
            <button
              className="big-btn"
              style={{ width: "47%", fontSize: "1rem" }}
              onClick={(e) => handleSaveChanges(e)}
            >
              {loader && <CircularProgress size="15px" color="inherit" />}
              <span>ذخیره تغییرات</span>
            </button>
          </div>
        </form>
        <Modal open={openModal} onclose={(e) => setOpenModal(false)}>
      
       <div style={{backgroundColor:"white",padding:"50px",textAlign:"center",margin:"0 auto",position:"relative"}} >
       <button onClick={e =>setOpenModal(false)} style={{position:"absolute",right:"18px",top:"70px",width:"35px",backgroundColor:"white"}}>&#x2715;</button>
       <p style={{padding:"30px"}}>لطفا این صفحه را در معرض دید مشتری به منظور اسکن کردن قرار دهید </p>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 156 }}
            value={`?payment_code=${paymentCode || ""}`}
          />
  
       </div>
     
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
