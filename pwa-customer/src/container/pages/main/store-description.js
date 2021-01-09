import React, { useState, useEffect, useMemo } from "react";
import store from "store-js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { psp_url, img_url } from "../../../constants/base_url";
import useDataApi from "../../components/fetchData/useDataApi";
import "./store.less";
import FavoritDialog from "../../components/dialog/dialogFavorit";
import { setFavoritDialog, setShowStoreDes } from "../../actions/MainActions";
import "./main.less";
const uniqBy = require('lodash.uniqby');
const cashback_images={
  green:"assets/images/background-percent.svg",
  red:"assets/images/background-percent-red.svg",
  yellow:"assets/images/background-percent-yellow.svg"
}

export default function StoreDescription({ stores, onClose, pspList,cashback }) {
  const reducePspList = pspList.reduce((psp, current) => {
    const psps = psp.find((item) => item.name === current.name);
    if (!psps) {
      return psp.concat([current]);
    } else {
      return psp;
    }
  }, []);

  const categories = store.get("categories_data").categories;
  const Dispatch = useDispatch();
  const fav = store.get("favorites_data");
  const [showFavoriteTxt, setShowFavoritTxt] = useState();
  const favoritDialog = useSelector((state) => state.MainReducer.favoritDialog);
  const [favorite, setFavorite] = useState(() => {
    if (fav && fav.data && fav.data.length > 0) {
      for (let index = 0; index < fav.data.length; index++) {
        if (fav.data[index].id === stores.properties.storeId) return true;
      }
      return false;
    }
  });

  
const cashback_percent_image = useMemo(() => {
  
  if (cashback <= 6) {
    return cashback_images.green;
  } else if (cashback > 6 && cashback<=9) {
    return cashback_images.yellow
  } else {
    return cashback_images.red;
  }
},[cashback])
  const [item, setItem] = useState(null);
  const [url, setUrl] = useState("favorite/business/add");
  const [params, setParams] = useState(null);
  const method = "post";
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  
  const history = useHistory();
  var img = "";

  for (let index = 0; index < categories.length; index++) {
    let flag = false;
    if (categories[index].id === stores.properties.category) {
      let sub_category = categories[index].business_sub_category;
      for (let j = 0; j < sub_category.length; j++) {
        if (sub_category[j].id == stores.properties.sub_category_id) {
          img = sub_category[j].selected_img;
          flag = true;
          break;
        }
      }
      if (flag) break;
    }
  }

  useEffect(() => {
    if (data && data.status === 200 && url === "favorite/business/add") {
      setFavorite(true);
      setShowFavoritTxt("صنف مورد نظر با موفقیت به مکان های منتخب اضافه شد.");
      Dispatch(setFavoritDialog(true));
      document.getElementsByClassName("main_container")[0].style.filter =
        "blur(2.5px)";

      document.getElementsByClassName("notif-top-close-searchbar")[0].disabled =
        "false";

      if (favoritDialog) {
        setTimeout(() => {
          Dispatch(setFavoritDialog(false));
          document.getElementsByClassName("main_container")[0].style.filter =
            "blur(0)";
        }, 3000);
      }
      console.log(stores);
      let data = fav;
      let new_item = {
        id: stores.properties.storeId,
        address: stores.properties.address,
        image: img,
        lat: stores.geometry.coordinates[1],
        long: stores.geometry.coordinates[0],
        name: stores.properties.name,
        sub_category_name: stores.properties.sub_category_name,
        businesses_status: stores.properties.status,
      };

      data.data.push(new_item);
      store.set("favorites_data", data);
    } else if (
      data &&
      data.status === 200 &&
      url === "favorite/business/remove"
    ) {
      setFavorite(false);
      setShowFavoritTxt("");
      Dispatch(setFavoritDialog(true));
      document.getElementsByClassName("main_container")[0].style.filter =
        "blur(2.5px)";

      if (favoritDialog) {
        setTimeout(() => {
          Dispatch(setFavoritDialog(false));
          document.getElementsByClassName("main_container")[0].style.filter =
            "blur(0)";
        }, 3000);
      }

      document.getElementsByClassName("notif-top-close-searchbar")[0].disabled =
        "false";
      for (let i = 0; i < fav.data.length; i++) {
        const element = fav.data[i];
        if (element.id === item.properties.storeId) {
          setFavorite(false);
          fav.data.splice(i, 1);
          store.set("favorites_data", fav);
          break;
        }
      }
    }
  }, [data]);

  // const handleClose = (e) => {
  //   Dispatch(setShowStoreDes(false));

  //   e.currentTarget.parentElement.parentElement.style.display = "none";
  //   e.currentTarget.parentElement.parentElement.style.zIndex = "1";
  // };

  const handleClick = () => {
    const states = {
      store: stores,
      image: `${img_url}${img}`,
      psp: reducePspList,
    };
    history.push({ pathname: "/store", state: states });
    console.log(states);
  };

  const handleFavoriet = (e, item) => {
    setItem(item);
    if (favorite) {
      setUrl("favorite/business/remove");
      setParams({ business_id: item.properties.storeId });
    } else {
      setUrl("favorite/business/add");
      setParams({ business_id: item.properties.storeId });
    }
  };

   const filterposes=uniqBy(pspList,'psp_id')
 
  return (
    <div>
      <FavoritDialog favorite={showFavoriteTxt} text={"main_container"} />
      <div className="name">
        <div className="content">
          <div className="image">
            <img
              src={`${img_url}${img}`}
              onClick={() => handleClick()}
              alt=""
            />
          </div>
          <div className="content_name">
            <div>
              <span onClick={() => handleClick()}>
                {stores.properties.name}
               
              </span>
              <div className="sub_category" onClick={() => handleClick()}>
                <p>{stores.properties.sub_category_name}</p>
              </div>
            </div>
            {/* <img
              className="notif-top-close-searchbar"
              src={`assets/images/${favorite ? "gold-" : ""}shape-star${
                favorite ? "" : "2"
              }.svg`}
           
              onClick={(e) => handleFavoriet(e, stores)}
              alt=""
            /> */}
          <div className="cash_percent">
         <p className="cashback-text"> {  cashback+"%" } </p>
         <img src={cashback_percent_image} className="cashback_pic_style"/>
          </div>
          </div>
        </div>
      </div>
      <div className="hr" />
      {stores.properties.status === "retry" ? (
        <div className="retry-div">
          <img src="assets/images/comming_soon.png" alt="" />
          <span
            className="exit_button"
            style={{ position: "absolute", bottom: "6px", right: "5px" }}
            onClick={(e) => onClose()}
          />
        </div>
      ) : (
        <>
          <div className="poz-detail" onClick={() => handleClick()}>
            <p>دستگاه پوز عضو داپ اَپ در این واحد صنفی:</p>
            {filterposes !==null &&
              filterposes.map((item) => (
                <div key={item.id}>
                      <img src={psp_url + item.psp.icon} alt="" />
                      <p>{item.psp.name}</p>
                   
                </div>
              ))}
          </div>
          <div className="hr" />
          <div className="address" onClick={() => handleClick()}>
            <span>{stores.properties.address}</span>
            <div className="hr" />
          </div>
          <div className="phone">
            <span>
              <a href={`tel:${stores.properties.phone}`}>
                {stores.properties.phone}
              </a>
            </span>
            <span className="exit_button" onClick={(e) => onClose()} />
          </div>
        </>
      )}
    </div>
  );
}
