import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "../../components/profile-pic/ProfilePic";
import MenuItem from "../menu-item/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSlideMenu,
  getNotiNumber,
  setHasAddCard,
  setLogoutDialogShow,
} from "../../actions/MainActions";
import "./slide-content.less";
// import useDataApi from "../fetchData/useDataApi";
import store from "store-js";
import { useHistory } from "react-router-dom";
import LogoutDialog from "../dialog/logoutDialog";

function SlideContent({ open }) {
  let favorites = store.get("favorites_data")
    ? store.get("favorites_data").data
    : [];
  // let cards = store.get("cards_data")
  //   ? store.get("cards_data").customer_cards
  //   : [];
  let cards=[]
    const userCards=()=>{
      if(cards === []){
       cards= store.get("cards_data").customer_cards
      }
      else cards=[]
       
    }
  const profileData = store.get("profile_data");
  const isSignIn = store.get("isSignIn");
  const credit = store.get("credit_data") ? store.get("credit_data").credit : 0;
  const userName = useSelector((state) => state.MainReducer.name);
  const selectedPage = useSelector((state) => state.MainReducer.selectedPage);
  const [subCategories, setSubCategories] = useState([]);
  const [banksName, setBanksName] = useState([]);
  const [isLogOut, setIsLogOut] = useState(false);
  // const [url, setUrl] = useState("");
  // const method = "post";
  // const params = true;
  const history = useHistory();
  let reduceSubCategories = []
  let reduceBanksName = [];
  const dispatch = useDispatch();
  const contentRef = useRef(null);

  useEffect(() => {
    userCards()
  console.log(cards);
    if (favorites) {
      favorites.map((item) => {
        setSubCategories((subCategories) => [
          ...subCategories,
          item.sub_category_name,
        ]);
      });
    }
    if (cards.length !== 0) {
      cards.map((item) => {
        setBanksName((bankName) => [...bankName, item.bank_name]);
      });
    }
  }, []);

  useEffect(() => {
    if (!open) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [open]);

  reduceSubCategories = subCategories.filter(
    (item, index) => subCategories.indexOf(item) === index
  );
  reduceBanksName = banksName.filter(
    (item, index) => banksName.indexOf(item) === index
  );

  // const [{ data, isLoading, isError, errMessage }] = useDataApi(
  //   url,
  //   params,
  //   method
  // );

  // useEffect(() => {
  //   setUrl("logout");
  //   setIsLogOut(true);
  // }, [logoutAccept]);

  // useEffect(() => {
  //   if (isLogOut) {
  //     localStorage.removeItem("profile_data");
  //     localStorage.removeItem("cards_data");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("favorites_data");
  //     localStorage.removeItem("credit_data");
  //     localStorage.removeItem("transactions_data");
  //     localStorage.removeItem("card_transactions");
  //     dispatch(setShowSlideMenu(false));
  //     store.set("showMainLogin", true);
  //     store.set("isSignIn", false);
  //     dispatch(setHasAddCard(true));
  //     dispatch(getNotiNumber(0));
  //     history.push("/main");
  //   }
  // }, [isLogOut]);

  const handleLogOut = () => {
    dispatch(setLogoutDialogShow(true));
    document.getElementsByClassName("App")[0].style.filter = "blur(2.5px)";
  };

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  const creditTxt = `موجودی: ${
    credit === "0.00" ? "0" : priceDigitSeperator(credit)
  } تومان`;

  const favoritesTxt = favorites
    ? `${favorites ? favorites.length : "0"} مکان در ${
        reduceSubCategories ? reduceSubCategories.length : "0"
      } دسته بندی مختلف`
    : "";

  const handlePushUserManual = () => {
    dispatch(setShowSlideMenu(false));
    history.push("user-manual");
  };

  return (
    <div className="slide-content">
      <LogoutDialog />
      <div className="slide-top">
        <div className="menu-top-txt" onClick={()=> history.push("profile")}>
          {isSignIn ? (
            userName !== "" ? (
              userName
            ) : profileData ? (
              profileData.f_name !== "" &&
              profileData.f_name !== null &&
              profileData.l_name !== "" &&
              profileData.l_name !== null ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{profileData.f_name + " " + profileData.l_name}</span>
                  <span>{profileData.cellphone}</span>
                </div>
              ) : (
                profileData.cellphone
              )
            ) : (
              ""
            )
          ) : (
            "به حساب‌کاربری خود وارد شوید"
          )}
        </div>
        <img
          src="assets/images/shape-right2.svg"
          className="right-shape"
          alt=""
        />
        <img
          src="assets/images/left-shape2.svg"
          className="left-shape"
          alt=""
        />
        <img
          src="assets/images/close.svg"
          className="close-slide"
          alt=""
          onClick={() => {
            contentRef.current.scrollTo(0, 0);
            dispatch(setShowSlideMenu(false));
          }}
        />
      </div>
      <div
        className="slide-menu"
        ref={contentRef}
        id="slide-menu"
        style={{ paddingTop: !isSignIn && "40px",marginTop:"45px" }}
      >
        <p className="credit-amount">{isSignIn ? creditTxt : null}</p>
        <MenuItem
          to="/profile"
          src={`assets/images/${
            selectedPage === "profile" ? "user-blue" : "user"
          }.svg`}
          title="حساب کاربری"
          txt=""
        />
        <MenuItem
          to="/categories"
          src="assets/images/category.svg"
          title="دسته بندی ها"
          txt=""
        />
        <MenuItem
          to="/favorites"
          src="assets/images/fav-list.svg"
          title="مکان های منتخب"
          txt={isSignIn ? favoritesTxt : null}
        />
        <MenuItem
          to="/deposit-push-page"
          src="assets/images/erne.svg"
          title="پاداش های نقدی شما"
          txt={''}
        />
        <MenuItem
          to="/about"
          src="assets/images/warning.svg"
          title="درباره داپ‌اَپ"
          txt=""
        />
        <MenuItem
          to="/questions"
          src="assets/images/question.svg"
          title="پرسشهای پر تکرار"
          txt=""
        />
        <MenuItem
          to="/policy"
          title="قوانین و مقررات"
          src="assets/images/text.svg"
          txt=""
        />
        <MenuItem
          to="/form"
          src="assets/images/headset.svg"
          title="پشتیبانی"
          txt=""
        />
        <MenuItem
          to="/introduction"
          src="assets/images/shop.svg"
          title="معرفی اصناف"
          txt=""
        />
        <div
          className="menu-item"
          style={{ display: isSignIn ? "flex" : "none" }}
          onClick={() => handleLogOut()}
        >
          <img src="assets/images/log-out.svg" alt="" />
          <div className="menu-item-txt">
            <h2 className="item-title">خروج از حساب کاربری</h2>
          </div>
        </div>
      </div>
      <div className="slide-bottom">
        <div>
          <p>داپ‌اپ چطور کار می‌کند؟</p>
          <span onClick={handlePushUserManual}>راهنمای استفاده</span>
        </div>
        <div>
          <p>نسخه</p>
          <span>1.37</span>
        </div>
      </div>
      <ProfilePic />
    </div>
  );
}

export default SlideContent;
