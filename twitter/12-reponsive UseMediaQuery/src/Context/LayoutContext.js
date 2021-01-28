import React from "react";

var DrawerStateContext = React.createContext();
var DrawerDispatchContext = React.createContext();

function DrawerReducer(state, action) {
  switch (action.type) {
    case "SET_DRAWER_TOGGLE":
      return {...state, toggleDrawer: !state.toggleDrawer};
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function DrawerProvider({children}) {
  var [state, dispatch] = React.useReducer(DrawerReducer, {
    toggleDrawer:false
  });
  return (
    <DrawerStateContext.Provider value={state}>
      <DrawerDispatchContext.Provider value={dispatch}>
        {children}
      </DrawerDispatchContext.Provider>
    </DrawerStateContext.Provider>
  );
}

function useDrawerState() {
  var context = React.useContext(DrawerStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useDrawerDispatch() {
  var context = React.useContext(DrawerDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {DrawerProvider, useDrawerState, useDrawerDispatch,setToggleDrawer};

// #########################################################
function setToggleDrawer(dispatch) {
  dispatch({
    type: "SET_DRAWER_TOGGLE",
  });
}

