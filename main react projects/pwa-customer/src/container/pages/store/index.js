import React, { useState, useEffect, useRef } from "react";
import store from "store-js";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import "./store.less";
import Header from "../../components/header/Header";
import A from "../../components/button/A";
import useDataApi from "../../components/fetchData/useDataApi";
import { img_url, psp_url } from "../../../constants/base_url";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import FavoritDialog from "../../components/dialog/dialogFavorit";
import { setFavoritDialog } from "../../actions/MainActions";

const stylePath = {
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "500",
  background: "#6498E6",
};
const styleQR = {
  width: "160px",
  height: "30px",
  fontSize: "12px",
  fontWeight: "500",
};

const swiper = {
  // direction: "horizontal",
  // grabCursor: true,
  slidesPerView: 6.5,
  slidesPerGroup: 5,
  // spaceBetween: 0,
  // preloadImages: false,
  // Enable lazy loading
  // lazy: true,
  speed: 1000,
  // autoHeight:true,
  // effect:'coverflow',
  // width:1850,
  // setWrapperSize:true,
  observer: true,
  // slidesOffsetBefore: 25,
  // slidesOffsetAfter: 100,
  // watchOverflow:true,
  centerInsufficientSlides: true,
  paginationClickable: true,
  breakpoints: {
    320: {
      slidesPerView: 2.33,
      spaceBetween: 0,
      slidesPerGroup: 2.33,
      speed: 200,
    },

    540: {
      slidesPerView: 2.5,
      spaceBetween: 0,
      slidesPerGroup: 2,
      speed: 300,
    },
    767: {
      slidesPerView: 3.5,
      spaceBetween: 0,
      slidesPerGroup: 3,
      speed: 500,
    },
    1000: {
      slidesPerView: 4.5,
      spaceBetween: 0,
      slidesPerGroup: 4,
      speed: 600,
    },
    1400: {
      slidesPerView: 5.5,
      spaceBetween: 0,
      slidesPerGroup: 5,
      speed: 800,
    },
    1600: {
      slidesPerView: 6.5,
      spaceBetween: 0,
      slidesPerGroup: 6,
    },
  },
};
const Marker = ({ children }) => children;

function Store({ location }) {
  const Dispatch = useDispatch();
  const token = store.get("token");
  const fav = store.get("favorites_data");
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(11);
  const [showFavoriteTxt, setShowFavoritTxt] = useState();
  const stores = location.state.store.properties;
  const geometry = location.state.store.geometry;
  const favoritDialog = useSelector((state) => state.MainReducer.favoritDialog);
  const [favorite, setFavorite] = useState(() => {
    if (fav && fav.data && fav.data.length > 0) {
      for (let index = 0; index < fav.data.length; index++) {
        if (fav.data[index].id === stores.storeId) return true;
      }
      return false;
    }
  });
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("favorite/business/add");
  const [params, setParams] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({});

  const method = "post";
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  const back = "main";
  const history = useHistory();

  const handleCloseErrMessage = () => {
    setOpen(false);
  };

  const successCallback = (position) => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    setCurrentPosition(currentPosition);
  };

  const errorCallback = (error) => {
    console.log("finde location error", error);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
      });
    }
  }

  useEffect(() => {
    getLocation();
  });

  useEffect(() => {
    if (data && data.status === 200 && url === "favorite/business/add") {
      setFavorite(true);
      setShowFavoritTxt("صنف مورد نظر با موفقیت به مکان های منتخب اضافه شد.");
      Dispatch(setFavoritDialog(true));
      document.getElementsByClassName("store_container")[0].style.filter =
        "blur(2.5px)";
      if (favoritDialog) {
        setTimeout(() => {
          Dispatch(setFavoritDialog(false));
          document.getElementsByClassName("store_container")[0].style.filter =
            "blur(0)";
        }, 3000);
      }

      let data = fav;
      let new_item = {
        id: stores.storeId,
        address: stores.address,
        image: stores.img,
        lat: geometry.coordinates[1],
        long: geometry.coordinates[0],
        name: stores.name,
        sub_category_name: stores.sub_category_name,
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
      document.getElementsByClassName("store_container")[0].style.filter =
        "blur(2.5px)";
      if (favoritDialog) {
        setTimeout(() => {
          Dispatch(setFavoritDialog(false));
          document.getElementsByClassName("store_container")[0].style.filter =
            "blur(0)";
        }, 5000);
      }

      for (let i = 0; i < fav.data.length; i++) {
        const element = fav.data[i];
        if (element.id === stores.storeId) {
          fav.data.splice(i, 1);
          store.set("favorites_data", fav);
          break;
        }
      }
    }
  }, [data]);

  const handleRightClick = (e) => {
    e.preventDefault();
    if (favorite) {
      setUrl("favorite/business/remove");
      setParams({ business_id: stores.storeId });
    } else {
      setUrl("favorite/business/add");
      setParams({ business_id: stores.storeId });
    }
  };

  const handleDiscountsList = () => {
    history.push("/discount");
  };

  const handleHistory = () => {
    const states = {
      id: stores.storeId,
      name: stores.name,
      back: "store",
    };
    if (token !== undefined) {
      history.push({ pathname: "/store-history", state: states });
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="store_container">
      <FavoritDialog favorite={showFavoriteTxt} text={"store_container"} />
      <Header
        title={stores.name}
        leftIcon="assets/images/arrow-w-rotate.svg"
        rightIcon={`assets/images/${favorite ? "gold-" : ""}shape-star.svg`}
        isSearch={false}
        back={back}
        handleRightClick={(e) => handleRightClick(e)}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseErrMessage}
        message={"لطفا وارد حساب کاربری خود شوید"}
      />
      <div className="store-detail">
        <div className="theater">
          <div className="background">
            <img src={`${location.state.image}`} />
          </div>
        </div>
        <div className="content">
          <div className="hr" />
          <p className="store-address">{stores.address}</p>
          <div className="hr" />
          <a href={`tel:${stores.phone}`} className="card_number">
            {stores.phone}
          </a>
          <div className="purchase_history" onClick={() => handleHistory()}>
            سابقه خرید
          </div>
          <div className="store-poz-detail">
            <p>
              دستگاه های پوز فعال جهت دریافت پاداش نقدی خرید، در این واحد صنفی
            </p>
            {location.state.psp.map((item) => (
              <div key={item.id}>
                <img src={psp_url + item.psp.icon} alt="" />
                <span>{item.psp.name}</span>
              </div>
            ))}
          </div>
          {/* <div className="off_logo">
        <span />
      </div>
      <div className="off_title">
        <span>تخفیف ها</span>
      </div>
      <div className="off_description">
<span>{location.st}</span>
      </div>
      <A
        title={"درخواست QR"}
        style={styleQR}
        handleClick={() => setSearch(true)}
      >
        {isLoading && <CircularProgress size="15px" color="inherit" />}
      </A>
      {data === null && (
        <DASwiper
          config={swiper}
          content={items}
          handleClick={handleDiscountsList}
        />
      )} */}
        </div>
        <div
          style={{
            height: "25vh",
            width: "calc(100% - 40px)",
            height: "25vh",
            marginTop: "14vh",
            marginBottom: "2vh",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDTpnAdFWoofJdryMwtV-0DFW1GYg8E0Ks",
            }}
            defaultCenter={{
              lat: geometry.coordinates[1],
              lng: geometry.coordinates[0],
            }}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
              ]);
            }}
          >
            <Marker lat={geometry.coordinates[1]} lng={geometry.coordinates[0]}>
              <button className="store-marker">
                <img src={`${img_url}${stores.img}`} alt="store doesn't pay" />
              </button>
            </Marker>
          </GoogleMapReact>
        </div>
        <A
          title={"مسیریابی صنف"}
          style={stylePath}
          handleClick={() =>
            window.open(
              "https://www.google.com/maps/dir/?api=1&origin=" +
                currentPosition.lat +
                "," +
                currentPosition.lng +
                "&destination=" +
                geometry.coordinates[1] +
                "," +
                geometry.coordinates[0]
            )
          }
        />
      </div>
    </div>
  );
}

export default Store;
