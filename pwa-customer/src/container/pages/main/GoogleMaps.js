import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "store-js";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import StoreDescription from "./store-description";
import { useHistory } from "react-router-dom";
import { img_url } from "../../../constants/base_url";
import {
  getLat,
  setSelectedStore,
  getLng,
  getZoom as index_zoom,
  setMapFlag,
  setPspLists,
  setCashback
} from "../../actions/MainActions";
import "./main.less";
import { _round } from "gsap/gsap-core";
import { fitBounds } from "google-map-react/utils";
import useDataApi from "../../components/fetchData/useDataApi";
const uniqBy = require('lodash.uniqby');

const Marker = ({ children }) => children;

const  latt=  35.693633,lngg= 51.410469

export default function SimpleMap({ id }) {
  const lat = useSelector((state) => state.MainReducer.lat);
  const lng = useSelector((state) => state.MainReducer.lng);
  const flag = useSelector((state) => state.MainReducer.mapFlag);

  const default_zoom = useSelector((state) => state.MainReducer.zoom);
  const selectedStore=useSelector((state)=>state.MainReducer.SelectedStore)
  const getPspList=useSelector((state)=>state.MainReducer.PspLsit)
  const exit = useSelector((state) => state.MainReducer.exit);
  const getCashback=useSelector((state)=>state.MainReducer.cashback)
  const mapRef = useRef();
  const Dispatch = useDispatch();
  const history = useHistory();
  const [bounds, setBounds] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState([lat, lng]);
  const [zoom, setZoom] = useState(default_zoom);
  const appStartData = store.get("appStartResult");
  // const [selectedStore, setSelectedStore] = useState(null);
  const [pspList, setPspList] = useState([]);
  // const [StoresCashback,setStoresCashBack]=useState(4);
  const [params, setParams] = useState(true);
  const [url, setUrl] = useState("");
  const method = "get";
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  useEffect(() => {
    if (data !== null && !isError && !isLoading) {
      // setPspList(data.data.business_details.poses);
      // setStoresCashBack(data.data.business_details.cashback_percentage)
      Dispatch(setCashback(data.data.business_details.cashback_percentage))
      Dispatch(setPspLists(data.data.business_details.poses))
    }
  }, [data, isLoading, isError]);
  
  // function CenterControl1(controlDiv, map) {
  //   var controlUI = document.createElement("div");
  //   controlUI.style.cursor = "pointer";
  //   controlUI.style.display = "flex";
  //   controlUI.style.alignItems = "center";
  //   controlUI.style.justifyContent = "center";
  //   controlDiv.appendChild(controlUI);

  //   var controlText = document.createElement("img");
  //   controlText.src = "assets/images/target.svg";
  //   controlText.style.padding = "5px";
  //   controlUI.appendChild(controlText);

  //   controlUI.addEventListener("click", function () {
  //     getLocation();
  //   });
  // }

  // function CenterControl2(controlDiv, map) {
  //   var controlUI = document.createElement("div");
  //   controlUI.style.cursor = "pointer";
  //   controlUI.style.display = "flex";
  //   controlUI.style.alignItems = "center";
  //   controlUI.style.justifyContent = "center";
  //   controlDiv.appendChild(controlUI);

  //   var controlText = document.createElement("p");
  //   controlText.innerText = "دسته بندی ها";
  //   controlText.style.padding = "5px";
  //   controlUI.appendChild(controlText);

  //   controlUI.addEventListener("click", function () {
  //     history.push("categories");
  //   });
  // }
  const [currentPosition, setCurrentPosition] = useState({});

  const successCallback = (position) => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    setCurrentPosition(currentPosition);
    Dispatch(getLng(currentPosition.lng));
    Dispatch(getLat(currentPosition.lat));
    Dispatch(setMapFlag(true));
    setZoom(18);
  };

  const errorCallback = (error) => {
    console.log("finde location error", error);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
        enableHighAccuracy: true,
      });
    }
  }
  useEffect(() => {
  

if(parseFloat(lat) === latt && parseFloat(lng ) === lngg ){
  getLocation();
}
  },[lat,lng]);



  useEffect(() => {
    document.getElementsByClassName("main_map")[0].style.width = "100%";
    document.getElementsByClassName("main_map")[0].style.height = "100%";
  });

  useEffect(() => {
    return () => {
      Dispatch(getLat(35.693633));
      Dispatch(getLng(51.410469));
      Dispatch(index_zoom(15));
    };
  }, []);

  useEffect(() => {
    if(selectedStore){
      setDefaultCenter([selectedStore.geometry.coordinates[1] + 0.00026,selectedStore.geometry.coordinates[0] - 0.0011])
      setZoom(zoom === 17 ? 17 + Math.random() / 100 : 17);
    }else{
      setDefaultCenter([lat, lng]);
      setZoom(default_zoom);
    }
    
  }, [lat,lng,default_zoom,selectedStore]);


  let stores = appStartData ? uniqBy(appStartData.data.data.businesses,'id') : [];

  if (id && id.length > 0) {
    stores = stores.filter(
      (store) => id.indexOf(store.sub_category_id.toString()) > -1
    );
  }

  const points = stores.map((store) => ({
    type: "Feature",
    properties: {
      cluster: false,
      storeId: store.id,
      name: store.name,
      sub_category_id: store.sub_category_id,
      sub_category_name: store.sub_category_name,
      img: store.marker_image,
      category: store.category_id,
      address: store.address,
      phone: store.phone,
      discount_status: store.discount_status,
      upsate: store.updated_at,
      status: store.status,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(store.long), parseFloat(store.lat)],
    },
  }));

  const closeCallOut = () => {
    Dispatch(setSelectedStore(null))
   
  };

  const handleDetail = (e, store) => {
    
    setUrl(`business/${store.properties.storeId}`);
    setDefaultCenter([
      store.geometry.coordinates[1] + 0.00026,
      store.geometry.coordinates[0] - 0.0011,

    ]);
    setTimeout(() => {
      setDefaultCenter([
        store.geometry.coordinates[1] + 0.00034,
        store.geometry.coordinates[0] - 0.001,
      ]);
    }, 1000);

    setZoom(zoom === 17 ? 17 + Math.random() / 100 : 17);
    Dispatch(setSelectedStore(store)) 
  };

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 95, maxZoom: 14 },
  });
  const createMapOptions = (maps) => {
    return {
      gestureHandling: "greedy",
      minZoom: 15,
    };
  };
  // const handleLoadCurrentLocation = (map, maps) => {
  //   let centerControlDiv = document.createElement("div");
  //   centerControlDiv.className = "current-location";
  //   var centerControl = new CenterControl1(centerControlDiv, map);
  //   map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
  // };

  // const handleLoadCategory = (map, maps) => {
  //   let centerControlDiv = document.createElement("div");
  //   centerControlDiv.className = "category";
  //   var centerControl = new CenterControl2(centerControlDiv, map);
  //   map.controls[maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);
  // };
  return (
    <div className="main_map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDTpnAdFWoofJdryMwtV-0DFW1GYg8E0Ks" }}
        center={defaultCenter}
        zoom={zoom}
        options={createMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          // handleLoadCurrentLocation(map, maps);
          // handleLoadCategory(map, maps);
        }}
        // onGoogleApiLoaded={()=>{debugger}}
        // hoverDistance={1000}
        // margin={["1000px", "20px"]}
        // layerTypes={['TrafficLayer', 'TransitLayer']}
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
        {flag && (
          <Marker lat={lat} lng={lng}>
            <img src="assets/images/current-location.svg" alt="" />
          </Marker>
        )}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
                style={{
                  transform: "translateZ(0) translate(-50%, -50%)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="cluster-marker"
                  // style={{
                  //   width: `${20 + ((20 * pointCount) / points.length) * 10}px`,
                  //   height: `${
                  //     20 + ((20 * pointCount) / points.length) * 10
                  //   }px`,
                  //   maxHeight: "60px",
                  //   maxWidth: "60px",
                  //   backgroundSize: "contain",
                  //   // background: generateColor(
                  //   //   "#4CAF50",
                  //   //   "#D32F2F",
                  //   //   scale(pointCount)
                  //   // ),
                  //   backgroundImage: `url(assets/images/cluster/cluster${
                  //     _round(pointCount) <= 100
                  //       ? pointCount < 10
                  //         ? 5
                  //         : Math.ceil(pointCount / 10) * 10
                  //       : _round(pointCount > 100 && pointCount <= 200)
                  //       ? "100"
                  //       : _round(pointCount > 200 && pointCount < 700)
                  //       ? "1000"
                  //       : "2000"
                  //   }.png)`,
                  // }}
                  // onClick={() => {
                  //   const expansionZoom = Math.min(
                  //     supercluster.getClusterExpansionZoom(cluster.id),
                  //     20
                  //   );
                  //   mapRef.current.setZoom(expansionZoom);
                  //   mapRef.current.panTo({ lat: latitude, lng: longitude });
                  // }}
                ></div>
              </Marker>
            );
          }

          return (
            cluster.properties.storeId !== null && (
              <Marker
                key={`store-${cluster.properties.storeId}`}
                lat={latitude}
                lng={longitude}
                id={cluster.properties.storeId}
              >
                <button
                  className="store-marker"
                  id={cluster.properties.storeId}
                  onClick={(e) => handleDetail(e, cluster)}
                >
                  <img
                    src={`${img_url}${cluster.properties.img}`}
                    alt="store doesn't pay"
                    style={{
                      filter:
                        cluster.properties.status === "retry" && "grayscale(1)",
                    }}
                  />
                </button>
                {selectedStore !== null &&
                selectedStore.properties.storeId ===
                  cluster.properties.storeId ? (
                  <div
                    style={{
                      // width: "100%",
                      // height: "82.5%",
                      // position: "absolute",
                      // top: "10%",
                      // bottom: "0px",
                      alignSelf: "center",
                    }}
                    // onClick={closeCallOut}
                  >
                    <div
                      // style={{
                      //   position: "absolute",
                      //   top: window.innerHeight * 0.5,
                      //   left: window.innerWidth * 0.15,
                      //   overflow: "hidden",
                      //   overflowY: "hidden",
                      // }}
                      className="store-description"
                      // onClick={() => {}}
                    >
                      <StoreDescription
                        stores={selectedStore}
                        onClose={closeCallOut}
                        pspList={getPspList}
                        cashback={getCashback}
                        
                      
                      />
                    </div>
                  </div>
                ) : null}
              </Marker>
            )
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
