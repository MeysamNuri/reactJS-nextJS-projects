import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimelineMax } from "gsap/all";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { removeStack, setSelectedPage } from "../../actions/MainActions";
import base_url from "../../../constants/base_url";
import "./profile.less";
import Header from "../../components/header/Header";
import Snackbar from "@material-ui/core/Snackbar";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { getProfileDialog } from "./action";
import DialogProfileChange from "../../components/dialog/dialogProfileChange";
import SignIn from "../sign-in";

const initialState = {
  id: null,
  f_name: "",
  l_name: "",
  email: "",
  sheba: "",
  cellphone: "",
  referralCode: "",
  profileImg: null,
  shebaFullName: "",
  shebaFullNameDisplay: "none",
  displayShebaErrTxt: "none",
  displayNameTxt: "none",
  displayLNameTxt: "none",
  displayEmailTxt: "none",
  displayShebaTxt: "none",
};

let tl = null;
let p1 = ":کد معرفی داپ‌اَپ برای شما";
let p2 = "";
let p3 =
  "لینک دعوت به اپلیکیشن داپ‌اَپ : با این لینک در داپ‌اَپ ثبت نام کنید و 50 هزار ریال هدیه نقدی دریافت نمایید. از حالا به بعد با خرید از اصناف طرف قرارداد داپ‌اَپ ، هر روز تا 14 درصد از کل مبلغ خریدتان را به عنوان پاداش خرید، به صورت نقدی دریافت کنید";
let p4 = "https://daapapp.com";
let p = p1 + p2 + p3 + p4;

function Profile() {
  const profileData = store.get("profile_data");
  const phoneNumber = useSelector((state) => state.signInReducer.phoneNumber);
  const token = store.get("token");
  const history = useHistory();
  const location = useLocation();
  const [
    {
      id,
      f_name,
      l_name,
      email,
      sheba,
      profileImg,
      referralCode,
      displayNameTxt,
      displayLNameTxt,
      displayEmailTxt,
      shebaFullNameDisplay,
      shebaFullName,
      displayShebaTxt,
      displayShebaErrTxt,
    },
    setState,
  ] = useState(initialState);
  const [imgBase64, setImgBase64] = useState(null);
  const [imgCoverDisplay, setImgCoverDisplay] = useState("none");
  const [loading, setLoading] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [open, setOpen] = useState(true);
  const [media, setMedia] = useState(false);
  const [changeState, setChangeState] = useState(false);

  const nameInput = useRef();
  const [img, setImg] = useState(null);
  const [count, setCount] = useState(24 ? 24 : 0);
  var formData;
  formData = new FormData();
  const Dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    if (profileData) {
      setState({
        f_name: profileData.f_name !== null ? profileData.f_name : "",
        l_name: profileData.l_name !== null ? profileData.l_name : "",
        cellphone: profileData.cellphone,
        email: profileData.email,
        sheba: profileData.sheba_id,
        profileImg: profileData.avatar,
        shebaFullName: profileData.sheba_full_name,
        referralCode: profileData.referral_code,
        displayNameTxt: "none",
        displayLNameTxt: "none",
        displayEmailTxt: "none",
        displayShebaTxt: "none",
      });
    }
  }, []);

  useEffect(() => {
    tl = new TimelineMax({ paused: true });
    tl.to(".social_media", 0.6, { height: "20vh", display: "flex" });
  }, []);

  const handleShare = () => {
    setMedia((media) => !media);
    if (!media) {
      tl.play();
    } else {
      tl.reverse();
    }
  };
  const handleInputChangedSheba = (e) => {
    e.persist();
    setCount(e.target.value.length);
    const name = e.target.name;
    switch (name) {
      case "sheba":
        setState((prevState) => ({ ...prevState, sheba: e.target.value }));
        setState((prevState) => ({ ...prevState, displayShebaTxt: "none" }));
        setChangeState(true);
        break;
    }
  };
  const handleInputChanged = (e) => {
    e.persist();
    const name = e.target.name;

    switch (name) {
      case "f_name":
        setState((prevState) => ({ ...prevState, f_name: e.target.value }));
        setState((prevState) => ({ ...prevState, displayNameTxt: "none" }));
        setChangeState(true);
        break;
      case "l_name":
        setState((prevState) => ({ ...prevState, l_name: e.target.value }));
        setState((prevState) => ({ ...prevState, displayLNameTxt: "none" }));
        setChangeState(true);
        break;
      case "email":
        setState((prevState) => ({ ...prevState, email: e.target.value }));
        setState((prevState) => ({ ...prevState, displayEmailTxt: "none" }));
        setChangeState(true);
        break;
    
    }
  };

  const getProfileData = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    axios
      .get(`${base_url}profile`, { headers: headers })
      .then((res) => {
        setLoading(false);
        store.set("profile_data", res.data.data);
      })
      .catch((err) => {
        console.log("get profile err", err);
      });
  };

  const updateSheba = () => {
    // setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(
        `${base_url}profile/sheba/update`,
        { iban: sheba },
        { headers: headers }
      )
      .then((res) => {
        // setLoading(false);
        getProfileData();
        setState((prevState) => ({
          ...prevState,
          sheba: res.data.data.sheba_number,
        }));
        setState((prevState) => ({
          ...prevState,
          shebaFullName: res.data.data.full_name,
        }));
      })
      .catch((err) => {
        if (err.response) {
          setSnackMsg(err.response.data.message);
        }
      });
  };
  const handleValidateInput = (e) => {
    const names = e.target.name;
    // const regString = new RegExp("^[آ-ی]+");
    const emailRegex = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
    // const numberRegex = new RegExp("^[0-9]*$");
    if (names === "email") {
      if (email !== null) {
        if (!emailRegex.test(email)) {
          setState((prevState) => ({
            ...prevState,
            displayEmailTxt: "block",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayEmailTxt: "none",
          }));
        }
      }
    }
    // switch (names) {
    //   case "f_name":
    //     if (f_name.length > 2) {
    //       // if (regString.test(f_name)) {
    //       setState((prevState) => ({ ...prevState, displayNameTxt: "none" }));
    //     } else {
    //       setState((prevState) => ({
    //         ...prevState,
    //         displayNameTxt: "block",
    //       }));
    //     }
    //     break;
    //   case "l_name":
    //     if (l_name.length > 2) {
    //       // if (regString.test(l_name)) {
    //       setState((prevState) => ({ ...prevState, displayNameTxt: "none" }));
    //     } else {
    //       setState((prevState) => ({
    //         ...prevState,
    //         displayNameTxt: "block",
    //       }));
    //     }
    //     break;
    //   case "email":
    //     if (email !== null) {
    //       if (!emailRegex.test(email)) {
    //         setState((prevState) => ({
    //           ...prevState,
    //           displayEmailTxt: "block",
    //         }));
    //       } else {
    //         setState((prevState) => ({
    //           ...prevState,
    //           displayEmailTxt: "none",
    //         }));
    //       }
    //     }

    //     break;
    //   default:
    //     break;
    // }
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

  const fileChangedHandler = (e) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "multipart/form-data",
    };
    const payload = {};

    if (f_name) {
      payload["name"] = f_name;
    }
    if (l_name) {
      payload["family"] = l_name;
    }
    if (email) {
      payload["email"] = email;
    }
    if (img) {
      payload["avatar"] = img;
    }

    Object.entries(payload).forEach(function ([key, value], i) {
      formData.append(key, value);
    });

    setLoading(true);
    axios
      .post(`${base_url}profile/edit`, formData, { headers: headers })
      .then((res) => {
        setImgCoverDisplay("none");
        setChangeState(false);
        getProfileData();
        updateSheba();
        setSnackMsg("تغییرات با موفقیت ذخیره شد.");
        Dispatch(removeStack());
      })
      .catch((err) => {
        if (err.response) {
          // setSnackMsg(err.response.data.message);
          setSnackMsg("مشکلی در ثبت اطلاعات پیش آمده");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseErrMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleLeftClick = () => {
    if (location.pathname === "/profile") {
      history.push("main");
      setSelectedPage("map");
    } else if (changeState) {
      Dispatch(getProfileDialog(true));
      document.getElementsByClassName("profile-div")[0].style.filter =
        "blur(2.5px)";
      setChangeState(false);
    } else {
      // history.goBack();
      Dispatch(removeStack());
    }
  };

  const handleCancle = () => {
    setState({
      f_name: profileData.f_name !== null ? profileData.f_name : "",
      l_name: profileData.l_name !== null ? profileData.l_name : "",
      cellphone: profileData.cellphone,
      email: profileData.email,
      profileImg: profileData.avatar,
      referralCode: profileData.referral_code,
      displayNameTxt: "none",
      displayEmailTxt: "none",
      displayLNameTxt: "none",
    });
  };

  return (
    <div className="gray-bg" className="profile-div">
      <Header
        title="حساب کاربری"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={null}
        handleLeftClick={handleLeftClick}
      />
      {profileData === undefined ? (
        <SignIn />
      ) : (
        <>
          <div className="profile-page-content">
            {loading && (
              <div className="loading" style={{ backgroundColor: "unset" }}>
                <CircularProgress className="circular_loading" />
              </div>
            )}
            <DialogProfileChange
              fileChangedHandler={fileChangedHandler}
              handleCancle={handleCancle}
            />
            <div className="social_media">
              <div className="exit_share" onClick={() => handleShare()}>
                <span />
              </div>

              <WhatsappShareButton url={p1 + referralCode + p3 + p4}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <TelegramShareButton url={p1 + referralCode + p3 + p4}>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
              <TwitterShareButton url={p1 + referralCode + p3 + p4}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <FacebookShareButton url={p1 + referralCode + p3 + p4}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              style={{ bottom: "38px" }}
              open={snackMsg ? open : false}
              autoHideDuration={5000}
              onClose={handleCloseErrMessage}
              message={snackMsg}
            />
            <div className="profile-content">
              <form action="" className="profile-form">
                <div className="profile-img">
                  <div>
                    {imgBase64 === null ? (
                      <img
                        src={
                          profileImg !== null
                            ? `https://images.daapapp.com/images/${profileImg}`
                            : "assets/images/single-prof.svg"
                        }
                        alt=""
                      />
                    ) : (
                      <img src={imgBase64} alt="" />
                    )}
                  </div>

                  <label htmlFor="image" className="inputFile">
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
                      onClick={() => setImgCoverDisplay("block")}
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#6498e6",
                      }}
                    >
                      تغییر تصویر پروفایل
                    </p>
                  </label>
                </div>

                <div className="form_container">
                  <div className="form-input">
                    <p>نام</p>
                    <input
                      type="text"
                      name="f_name"
                      id="f_name"
                      value={f_name}
                      onChange={(e) => handleInputChanged(e)}
                      autoComplete="off"
                      onBlur={(e) => handleValidateInput(e)}
                      ref={nameInput}
                    />
                    <p
                      className="error-txt"
                      style={{ display: displayNameTxt }}
                    >
                      لطفا نام و نام خانوادگی را وارد نمایید
                    </p>
                  </div>
                  <div className="form-input">
                    <p> نام خانوادگی</p>
                    <input
                      type="text"
                      name="l_name"
                      id="l_name"
                      value={l_name}
                      onChange={(e) => handleInputChanged(e)}
                      autoComplete="off"
                      onBlur={(e) => handleValidateInput(e)}
                      ref={nameInput}
                    />
                    <span>
                      شماره تلفن:{" "}
                      {phoneNumber !== ""
                        ? phoneNumber
                        : profileData !== void 0 && profileData !== null
                        ? profileData.cellphone
                        : ""}
                    </span>
                    <p
                      className="error-txt"
                      style={{ display: displayLNameTxt }}
                    >
                      لطفا نام و نام خانوادگی را وارد نمایید
                    </p>
                  </div>
                  <div className="form-input">
                    <p>ایمیل</p>
                    <input
                      style={{ textAlign: "left", direction: "ltr" }}
                      type="text"
                      name="email"
                      id="email"
                      value={email === null ? "" : email}
                      autoComplete="off"
                      onChange={(e) => handleInputChanged(e)}
                      onBlur={(e) => handleValidateInput(e)}
                    />
                    <p
                      className="error-txt"
                      style={{ display: displayEmailTxt }}
                    >
                      لطفا ایمیل را به درستی وارد نمایید
                    </p>
                  </div>
                  <div
                    className="form-input"
                    style={{
                      position: "relative",
                    }}
                  >
                    <p>شماره شبای بانکی</p>

                    <span htmlFor="sheba" className="sheba-ir">
                      IR
                    </span>

                    <input
                      type="tel"
                      name="sheba"
                      id="sheba"
                      value={sheba}
                      maxLength="24"
                      onChange={(e) => handleInputChangedSheba(e)}
                      style={{
                        textAlign: "left",
                        paddingLeft: "50px",
                        width: "83%",
                        direction: "ltr",
                      }}
                    />
                    <span className="counter-style">{count}/24</span>
                    <span
                      style={{
                        fontSize: ".8rem",
                        display: shebaFullNameDisplay,
                        direction: "rtl",
                        textAlign: "center",
                      }}
                    >
                      {shebaFullName !== null &&
                      shebaFullName !== "" &&
                      shebaFullName !== undefined
                        ? `مبالغ کیف پول شما به حساب ${shebaFullName} واریز خواهد شد`
                        : "مبالغ کیف پول شما به شماره شبا واریز خواهد شد"}
                    </span>
                    <p
                      className="error-txt"
                      style={{ display: displayShebaTxt }}
                    >
                      لطفا شماره شبا را به درستی وارد نمایید شماره شبا وارد شده
                      اشتباه است
                    </p>
                  </div>
                  <div className="form-input">
                    <p>کد معرف</p>
                    <div className="referral-div">
                      <img
                        src="assets/images/share.svg"
                        alt=""
                        onClick={() => {
                          handleShare();
                        }}
                      />
                      <div>{referralCode}</div>
                    </div>
                  </div>
                </div>
                <div className="invite_title">
                  <span>
                    کد معرف خود را برای دوستانتان ارسال کنید تا پس از نصب و
                    اولین خرید از اصناف عضو داپ‌اَپ ، مبلغ 50 هزار ریال هدیه
                    نقدی از داپ اَپ دریافت نمایند و شما نیز مبلغ 20 هزار ریال
                    هدیه نقدی کسب کنید.
                  </span>
                </div>
                <div
                  className="profile-btn"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="primary-btn"
                    style={{
                      backgroundColor: "#009B7F",
                      lineHeight: "48px",
                      marginBottom: "15px",
                    }}
                    onClick={(e) => fileChangedHandler(e)}
                  >
                    ثبت
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
