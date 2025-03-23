import React from "react";
import Sidebar from "react-sidebar";
import SlideContent from "./SlideContent";
import { setShowSlideMenu } from "../../actions/MainActions";
import { useDispatch, useSelector } from "react-redux";

const sidebarStyles = {
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    maxWidth:'584px'
  },
  sidebar: {
    zIndex: 1000,
    position: "absolute",
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "none",
    backgroundColor: "#fff",
    width: "80%"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "auto",
    transition: "left .3s ease-out, right .3s ease-out"
  },
  overlay: {
    zIndex: 100,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
};

function SlideBar() {
  const showSideBar = useSelector(state => state.MainReducer.showSideBar);
  const Dispatch = useDispatch();

  function onSetSidebarOpen(open) {
    Dispatch(setShowSlideMenu(open));
  }
  
  return (
    <Sidebar
      sidebar={<SlideContent open={showSideBar} />}
      open={showSideBar}
      onSetOpen={onSetSidebarOpen}
      styles={sidebarStyles}
      pullRight={true}
    />
  );
}

export default React.memo(SlideBar);
