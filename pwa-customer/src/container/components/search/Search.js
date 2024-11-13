import React, { useState, useEffect } from "react";
import store from "store-js";
import { TimelineMax } from "gsap/all";
import { gsap, CSSPlugin } from "gsap/all";
import { useDispatch, useSelector } from "react-redux";
import useDataApi from "../../components/fetchData/useDataApi";
import {
  getLat,
  getLng,
  getZoom,
  getExit,
  getSelectedItems,
  setMapFlag,
  getCloseIconDisplay,
} from "../../actions/MainActions";
import "./search.less";
import { img_url } from "../../../constants/base_url";
const uniqBy = require('lodash.uniqby');

gsap.registerPlugin(CSSPlugin);
let my_data = store.get("appStartResult");

const tlSearch = new TimelineMax();
let tl = null;

function Search() {
  let fav = store.get("favorites_data");
  const [favorite, setFavorite] = useState(false);
  const exit = useSelector((state) => state.MainReducer.exit);
  const closeIconDisplay = useSelector(
    (state) => state.MainReducer.closeIconDisplay
  );

  let favorites = [];
  if (fav && fav.data) {
    for (let index = 0; index < fav.data.length; index++) {
      favorites.push(fav.data[index].id);
    }
  }
  const favId = favorites;
  const [item, setItem] = useState(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [flag, setFlag] = useState(false);
  const [temp, setTemp] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [url, setUrl] = useState("favorite/business/add");
  const [params, setParams] = useState(null);
  const [catData, setCatData] = useState([]);
  const [regionName, setRegionName] = useState([]);
  const categories =
    store.get("categories_data") !== undefined
      ? store.get("categories_data").categories
      : [];
  const regions = store.get("regions");
  const dispatch = useDispatch();
  const method = "post";
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);
  let typingTimeout = 0;

  if (my_data && temp === null) setTemp(my_data.data.data.businesses);

  const handleChange = async (e) => {
    await setQuery(e.target.value);
  };

  const searchFavorites = (item) => {
    for (let index = 0; index < favId.length; index++) {
      if (item.id === favId[index]) return true;
    }
    return false;
  };

  // const searchImage = (item) => {
  //   if (item) {
  //     for (let index = 0; index < categories.length; index++) {
  //       if (categories[index].id === item.category_id) {
  //         let sub_category = categories[index].business_sub_category;
  //         for (let j = 0; j < sub_category.length; j++) {
  //           if (sub_category[j].id == item.id)
  //             return sub_category[j].selected_img;
  //         }
  //       }
  //     }
  //     return false;
  //   }
  // };

  useEffect(() => {
    window.addEventListener("backbutton", handleBack, false);
    dispatch(getCloseIconDisplay(false));
    dispatch(getExit(false));
    return () => {
      window.removeEventListener("backbutton", handleBack);
    };
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleFilter();
    }, 700);
    return () => {
      clearTimeout(timeOut);
    };
  }, [query]);

  useEffect(() => {
    if (data && data.status === 200 && url === "favorite/business/add") {
      let my_data = fav;
      // var img = searchImage(item);
      let new_item = {
        id: item.id,
        address: item.address,
        image: item.img,
        lat: item.lat,
        long: item.long,
        name: item.name,
        sub_category_name: item.sub_category_name,
        businesses_status: item.status,
      };
      if (my_data && my_data.data.length > 0) {
        my_data.data.push(new_item);
      } else {
        my_data["data"] = [];
        my_data.data.push(new_item);
      }

      store.set("favorites_data", my_data);
    } else if (
      data &&
      data.status === 200 &&
      url === "favorite/business/remove"
    ) {
      for (let i = 0; i < fav.data.length; i++) {
        const element = fav.data[i];
        if (element.id === item.id) {
          setFavorite(false);
          fav.data.splice(i, 1);
          store.set("favorites_data", fav);
          break;
        }
      }
    }
    if (data) {
      document.getElementById(item.id).src = `assets/images/${
        !flag ? "gold-" : ""
      }shape-star${!flag ? "" : "2"}.svg`;
    }
  }, [data]);

  useEffect(() => {
    tl = new TimelineMax({ paused: true });
    tl.to(".search-notif-btn", 0.6, { width: "100%" })
      .to(".input", 0.6, { paddingRight: "16px" }, "-=0.6")
      .to(".search-notif-div", 0.2, { opacity: 0 }, "-=0.6")
      .to(".sidebar-btn", 0.6, { opacity: 0 }, "-=0.6");
  }, []);

  const handleFilter = () => {
    if (query.length > 0) {
      let response = temp;
      let count = 0;
      setCatData(uniqBy(response,'id'));
      const filtercat =catData ? catData.filter(
        (a) => a.name.includes(query) || a.sub_category_name.includes(query)
      ):[];
      setResponseData(filtercat);
    } else {
      setResponseData(null);
    }
  };
  let catDatas = [];
  let regionData = [];
  useEffect(() => {
    if (responseData) {
      responseData.map((item, index) => {
        regions.map((reg) => {
          if (reg.business_id === item.id) {
            regionData.push({ name: reg.region_name });
          }
        });
        categories.map((subItem) => {
          if (item.category_id === subItem.id) {
            subItem.business_sub_category.map((subb) => {
              if (subb.id === item.sub_category_id) {
                catDatas.push({
                  ...item,
                  img: subb.selected_img,
                  regionName: regionData[index]?.name,
                });
                setCatData(uniqBy(catDatas,'id'));
              }
            });
          }
        });
      });
    }
  }, [responseData]);

  const handleFavorite = (item) => {
    setItem(item);
    setParams({ business_id: item.id });
    let flag = searchFavorites(item);
    setFlag(flag);
    if (flag) setUrl("favorite/business/remove");
    else setUrl("favorite/business/add");
    setFavorite(!flag);
  };

  const handleClick = () => {
    dispatch(getExit(true));
    dispatch(getCloseIconDisplay(true));
    if (!search) {
      tl.play();
      document.getElementsByClassName("search-input")[0].focus();
      setSearch(true);
    } else {
      handleBack();
    }
  };

  const handleCloseSearch = () => {
    setSearch(false);
    setResponseData(null);
    setCatData([]);
    setQuery("");
    dispatch(getLng(parseFloat(51.410469)));
    dispatch(getLat(parseFloat(35.693633)));
    dispatch(getZoom(11));
    dispatch(getExit(false));
    dispatch(getCloseIconDisplay(false));
    dispatch(getSelectedItems(0));
    tl.reverse();
  };

  const handleBack = () => {
    setQuery("");
    setSearch(false);
    tlSearch.to(".responseData", 1, { opacity: 0 });
    tl.reverse();
    dispatch(getCloseIconDisplay(false));
  };

  const handlePush = (e, item) => {
    dispatch(getExit(false));
    dispatch(setMapFlag(false));
    setSearch(false);
    setResponseData(null);
    setCatData([]);
    setQuery("");
    tl.reverse();
    dispatch(getLng(parseFloat(item.long)));
    dispatch(getLat(parseFloat(item.lat)));
    dispatch(getZoom(20));
    document.getElementById("closepic").style.display="none"
  };

  const handleInputBlur = () => {
    document.getElementsByClassName(
      "MuiBottomNavigation-root"
    )[0].style.display = "flex";
  };
  const handleFocus = () => {
    document.getElementsByClassName(
      "MuiBottomNavigation-root"
    )[0].style.display = "none";
  };
  const closeSearchBar = () => {
    setSearch(false);
    setResponseData(null);
    setCatData([]);
    setQuery("");
    dispatch(getLng(parseFloat(51.410469)));
    dispatch(getLat(parseFloat(35.693633)));
    dispatch(getZoom(11));
    dispatch(getExit(false));
    dispatch(getCloseIconDisplay(false));
    dispatch(getSelectedItems(0));
    tl.reverse();
  };
  return (
    <>
      <div className="search_main">
        <div
          className="search-notif-btn"
          style={{ zIndex: exit ? "1000" : "1" }}
        >
          <div className="img">
            <img
              src="assets/images/zoom-in.svg"
              style={{
                display: closeIconDisplay ? "none" : "block",
                cursor: "pointer",
              }}
              onClick={() => handleClick()}
              alt=""
            />
            <div
              onClick={() => {
                setQuery("");
                document.getElementsByClassName("search-input")[0].focus();
              }}
              style={{
                display: exit ? "grid" : "none",
                placeContent: "center",
              }}
            ></div>
            {closeIconDisplay && (
              <img
                src="assets/images/exit.svg"
                style={{ cursor: "pointer" }}
                onClick={closeSearchBar}
                alt=""
                id="closepic"
              />
            )}
            {closeIconDisplay && (
              <img
                className="search-arrow"
                onClick={handleCloseSearch}
                src="assets/images/arrow.svg"
                alt=""
              />
            )}
          </div>

          <input
            className="search-input"
            type="text"
            value={query}
            onBlur={handleInputBlur}
            onFocus={handleFocus}
            placeholder=" مثال: سوپرمارکت عظیمی"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      {responseData && responseData.length > 0 && (
        <div
          className="responseData"
          style={{ display: responseData.length > 0 ? "flex" : "none" }}
        >
          <div
            style={{
              width: "90%",
              height: "2px",
              background: "#ccc",
              marginTop: "1vh",
            }}
          />
          {catData.map((item, index) => {
            return (
              <div className="responseItem" key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="store-detail-div">
                    <div>
                      <img src={`${img_url}${item.img}`} alt="" />
                    </div>
                    <div className="sec-div">
                      <span onClick={(e) => handlePush(e, item)}>
                        {item.sub_category_name} {item.name}
                      </span>
                      <p>{item.regionName}</p>
                    </div>
                  </div>
                  <div className="star-fav">
                    <img
                      id={item.id}
                      src={
                        favId.indexOf(item.id) > -1
                          ? "assets/images/gold-shape-star.svg"
                          : "assets/images/shape-star-gold.svg"
                      }
                      onClick={() => handleFavorite(item)}
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default React.memo(Search);
