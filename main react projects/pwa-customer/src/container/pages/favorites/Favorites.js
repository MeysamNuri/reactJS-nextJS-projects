import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/header/Header";
import EmptyList from "../../components/listItems/emptyList";
import {
  getLat,
  getZoom,
  getLng,
  getExit,
  getCloseIconDisplay,
  setMapFlag,
} from "../../actions/MainActions";
import COLORS from "../../../constants/colors";
import useDataApi from "../../components/fetchData/useDataApi";
import { img_url } from "../../../constants/base_url";
import "./favorite.less";
import { useHistory } from "react-router-dom";

function Favorites() {
  const [params, setParams] = useState(null);
  const method = "post";
  const dispatch = useDispatch();
  let url = "favorite/business/remove";
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  useEffect(() => {
    if (params && data.status === 200) {
      let favorites = store.get("favorites_data");
      for (let index = 0; index < favorites.data.length; index++) {
        if (favorites.data[index].id === params.business_id) {
          favorites.data.splice(index, 1);
          break;
        }
      }
      store.set("favorites_data", favorites);
    }
  }, [data]);

  const handleRemove = (e, id) => {
    setParams({ business_id: id });
  };

  const history = useHistory();
  const handleShowStores = (lat, lng) => {
    dispatch(getLat(parseFloat(lat)));
    dispatch(getLng(parseFloat(lng)));
    // history.push("/main")
     history.goBack()
    dispatch(getZoom(20));
    dispatch(getExit(false));
    dispatch(getCloseIconDisplay(true));
    dispatch(setMapFlag(false));
   
  };

  const favorites = store.get("favorites_data");
  const title = " شما هنوز هیچ صنفی را به مکان های منتخب خود اضافه نکرده‌اید.";
  const text =
    "نقشه را مرور کرده و اصنافی که بیشتر به آن‌ها علاقه‌مندید را ستاره دار کنید";

  const handleClick = (store) => {
    const states = {
      id: store.id,
      name: store.name,
      back: "store",
    };
    history.push({ pathname: "/store-history", state: states });
  };

  return (
    <div className="container-div">
      <Header
        title="مکان های منتخب"
        back={"main"}
        leftIcon="assets/images/arrow-w-rotate.svg"
      />
      <div className="favorite_content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justyfyContent: "center",
          }}
        >
          {isLoading && (
            <div className="loading">
              <CircularProgress className="circular_loading" />
            </div>
          )}
          {favorites === undefined ||
          favorites.data === undefined ||
          favorites.data.length === 0 ? (
            <div className="empty_content">
              <div className="star">
                <span></span>
              </div>
              <EmptyList title={title} text={text} style={{ width: "100%" }} />
            </div>
          ) : (
            favorites.data.map((ele, ind) => {
              return (
                <div className="card_div" id={ele.id}>
                  <div className="card-favorites">
                    <div
                    className='deactive-div'
                      style={{
                        display: ele.businesses_status !== "active" ? "flex" : 'none',
                      }}
                    >
                    <img src="assets/images/forbidden2.svg" alt=""/>
                    <p>صنف غیرفعال</p>
                    </div>
                    <div className="box-row" style={{ flex: 1, width: "98%" }}>
                      <div
                        className="box-row"
                        style={{
                          flex: 2,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`${img_url}${ele.image}`}
                          alt=""
                          className="image_icon"
                          style={{zIndex: ele.businesses_status !== "active" && '10'}}
                        />
                      </div>
                      <div
                        className="display-flex"
                        style={{ flex: 6, flexDirection: "column" }}
                      >
                        <span>{ele.name}</span>
                        <span
                          style={{ color: COLORS.circleCardGray, fontSize: 10, zIndex: ele.businesses_status !== "active" && '10' }}
                        >
                          {ele.sub_category_name}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flex: 2,
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: ele.businesses_status !== "active" && '10'
                        }}
                      >
                        <img
                          src="assets/images/gold-shape-star.svg"
                          alt=""
                          onClick={(e) => handleRemove(e, ele.id)}
                        />
                      </div>
                    </div>
                    <div
                      className="box-row"
                      style={{
                        flex: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="box-row"
                        style={{
                          flex: 2,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></div>
                      <div
                        className="display-flex"
                        style={{ flex: 8, flexDirection: "column" }}
                      >
                        <span
                          style={{
                            marginLeft: 10,
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        >
                          {ele.address}
                        </span>
                      </div>
                    </div>
                    <div className="box-row" style={{ flex: 1, width: "98%" }}>
                      <div style={{ flex: 1 }}></div>
                      <div
                        className="display-flex"
                        style={{
                          flex: 2,
                          justifyContent: ele.businesses_status !== "active" ? 'center' : "space-around",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            margin: "15px 0",
                            backgroundColor: "transparent",
                            color: "#C2CDD9",
                          }}
                          onClick={() => handleClick(ele)}
                        >
                          خریدها
                        </button>
                        <button
                          style={{
                            margin: "15px 0",
                            backgroundColor: "transparent",
                          }}
                        >
                          <span
                            style={{
                              color: COLORS.blue,
                              fontWeight: 500,
                              fontSize: 12,
                              display: ele.businesses_status !== "active" && 'none'
                            }}
                            onClick={(e) =>{
                              handleShowStores(ele.lat,ele.long)}}
                          >
                            مشاهده روی نقشه
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
