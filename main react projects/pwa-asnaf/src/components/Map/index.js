/**
 *
 * Map
 *
 */

import React, { useRef, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import store from "store-js";

const mapOptions = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
};
const getLocationStyle = {
  position: "absolute",
  bottom: "5px",
  right: "5px",
  backgroundColor: "#FFFFFF",
  width: "46px",
  height: "36px",
  borderRadius: "8px",
  boxShadow: "0 3px 15px #0000000D",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Map() {
  const appInit = store.get("appInit");
  const [zoom, setZoom] = useState(13);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);

  const [center, setCenter] = useState({
    lat: parseFloat(appInit.businesses[0].latitude),
    lng: parseFloat(appInit.businesses[0].longitude),
  });
  const refMap = useRef(null);

  const successCallback = (position) => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };
    setShowCurrentLocation(true);
    setCenter(currentPosition);
    setZoom(18);
  };

  const errorCallback = (error) => {
    console.log("find location error", error);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
      });
    }
  }

  return (
    <GoogleMap ref={refMap} zoom={zoom} center={center} options={mapOptions}>
      <Marker
        position={{
          lat: parseFloat(appInit.businesses[0].latitude),
          lng: parseFloat(appInit.businesses[0].longitude),
        }}
        icon='assets/images/pin.svg'
      />

      {showCurrentLocation && (
        <Marker position={center} icon='assets/images/g-circle.svg' />
      )}
      <div style={getLocationStyle} onClick={getLocation}>
        <img src='assets/images/showLocation.svg' alt="" />
      </div>
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
