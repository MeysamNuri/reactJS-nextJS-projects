import React from "react";
import "./bottom-navbar.less";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  setSelectedPage,
  setStack,
  setNavValue,
} from "../../actions/MainActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getLat,
  getLng,
  getZoom as index_zoom,
  setMapFlag,
} from "../../actions/MainActions";
import { useHistory } from 'react-router-dom';
import store from 'store-js'

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "8vh",
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: "1500",
    flexDirection: "row-reverse",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
  },
});

function BottomNavBar() {
  const profile_data = store.get('profile_data')
  const classes = useStyles();
  const dispatch = useDispatch();
  const navValue = useSelector((state) => state.MainReducer.navValue);
  const selectedPage = useSelector((state) => state.MainReducer.selectedPage);
  //   const [value, setValue] = React.useState(0);
  const history = useHistory()
  const [currentPosition, setCurrentPosition] = React.useState({});
  const successCallback = (position) => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    setCurrentPosition(currentPosition);
    dispatch(getLng(currentPosition.lng));
    dispatch(getLat(currentPosition.lat));
    dispatch(index_zoom(18));
  };

  const errorCallback = (error) => {
    console.log("finde location error", error);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
      });
      dispatch(setMapFlag(true));
    }
  }

  return (
    <>
      {selectedPage === "map" && (
        <div onClick={getLocation} className="current-location" style={{marginBottom:"5%"}} >
          <img src="assets/images/target.svg" alt="" />
        </div>
      )}
      <BottomNavigation
        value={navValue}
        onChange={(event, newValue) => {
          dispatch(setNavValue(newValue));
          dispatch(setStack(navValue));
        }}
        showLabels
        classes={{
          root: classes.root,
        }}
      >
        <BottomNavigationAction
          label="نقشه"
          icon={
            <img
              src={`assets/images/${
                selectedPage === "map" ? "map-blue" : "map"
              }.svg`}
            />
          }
          onClick={() => dispatch(setSelectedPage("map"))}
        />
        <BottomNavigationAction
          label="کارت ها"
          icon={
            <img
              src={`assets/images/${
                selectedPage === "card-list"
                  ? "credit-card-blue"
                  : "credit-card"
              }.svg`}
            />
          }
          onClick={() => {
            dispatch(setSelectedPage("card-list"));
            history.push({
              pathname: '/main',
              search: "?" + new URLSearchParams({v: '1.37'}).toString()
          })
          }}
        />
        <BottomNavigationAction
          label="کیف پول"
          icon={
            <img
              src={`assets/images/${
                selectedPage === "wallet" ? "wallet-blue" : "wallet"
              }.svg`}
            />
          }
          onClick={() => dispatch(setSelectedPage("wallet"))}
        />
        <BottomNavigationAction
          label="حساب کاربری"
          icon={
            <img
              src={`assets/images/${
                selectedPage === "profile" ? "user-blue" : "user"
              }.svg`}
            />
          }
          onClick={() => dispatch(setSelectedPage("profile"))}
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNavBar;
