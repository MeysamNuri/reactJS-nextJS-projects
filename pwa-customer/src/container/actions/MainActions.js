export const setOnlineStatus = (status) => {
  return {
    type: "SET_ONLINE_STATUS",
    status,
  };
};
export const setSelectedStore = (SelectedStore) => {
  return {
    type: "SELECTED_STORE",
    SelectedStore,
  };
};
export const setPspLists=(PspLsit)=>{
  return{
    type:"SET_PSPLIST",
    PspLsit:PspLsit
  }
}
export const setCashback=(cashback)=>{
  return {
    type:"GET_CASHBACK",
    cashback
  }
}
export const setShowSlideMenu = (showSideBar) => {
  return {
    type: "SET_SHOW_SLIDE_MENU",
    showSideBar: showSideBar,
  };
};
export const setShowNotifications = (showNotification) => {
  return {
    type: "SET_SHOW_NOTIFICATIONS",
    showNotification: showNotification,
  };
};
export const setName = (name) => {
  return {
    type: "SET_NAME",
    name,
  };
};
export const setFName = (fname) => {
  return {
    type: "SET_FNAME",
    fname,
  };
};
export const setPhoneNumber = (firstCardNumber) => {
  return {
    type: "SET_FIRST_CARD_NUMBER",
    firstCardNumber,
  };
};
export const setAuthSheba = (shebaAuth) => {
  return {
    type: "SET_OK_SHEBA",
    shebaAuth,
  };
};
export const setCardNumber = (firstCardNumber) => {
  return {
    type: "SET_FIRST_CARD_NUMBER",
    firstCardNumber,
  };
};
export const setShowCurrentLocation = (showCurrentLocation) => {
  return {
    type: "SET_SHOW_CURRENT_LOCATION",
    showCurrentLocation,
  };
};
export const getLat = (lat) => {
  return {
    type: "SET_LAT",
    lat,
  };
};
export const getLng = (lng) => {
  return {
    type: "SET_LNG",
    lng,
  };
};
export const getZoom = (zoom) => {
  return {
    type: "SET_ZOOM",
    zoom,
  };
};
export const getSelectedItems = (selectedItems) => {
  return {
    type: "SET_SELECTED_ITEMS",
    selectedItems,
  };
};
export const getDialogFlag = (dialogFlag) => {
  return {
    type: "SET_DIALOG_FLAG",
    dialogFlag,
  };
};
export const getNotiNumber = (notiNumber) => {
  return {
    type: "SET_NOTI_NUMBER",
    notiNumber,
  };
};
export const getFavorite = (fav) => {
  return {
    type: "SET_FAVORITE",
    fav,
  };
};
export const getExit = (exit) => {
  return {
    type: "SET_EXIT",
    exit,
  };
};
export const getCloseIconDisplay = (closeIconDisplay) => {
  return {
    type: "GET_CLOSEICON_DISPLAY",
    closeIconDisplay,
  };
};
export const setHasAddCard = (hasAddCard) => {
  return {
    type: "SET_HASADDCARD",
    hasAddCard,
  };
};
export const setLoadMore = (loadMore) => {
  return {
    type: "SET_LOADS_MORE",
    loadMore,
  };
};
export const setWithdrawScroll = (withdrawScroll) => {
  return {
    type: "SET_WITHDRAW_SCROLL",
    withdrawScroll,
  };
};
export const setMapFlag = (mapFlag) => {
  return {
    type: "SET_MAP_FLAG",
    mapFlag,
  };
};

export const setFavoritDialog = (favoritDialog) => {
  return {
    type: "SET_FAVORIT_DIALOG",
    favoritDialog,
  };
};

export const setShowStoreDes = (storeDescription) => {
  return {
    type: "SET_SHOW_STORE_DES",
    storeDescription,
  };
};
export const getShowStore = (showStore) => {
  return {
    type: "SET_SHOW_STORE",
    showStore,
  };
};
export const setLogoutPopUpDialogShow = (logoutPopup) => {
  return {
    type: "SET_LOGOUT_POPUP",
    logoutPopup,
  };
};

export const setLogoutDialogShow = (logoutDialog) => {
  return {
    type: "SET_LOGOUT_DIALOG",
    logoutDialog,
  };
};
export const setLogoutAccept = (logoutAccept) => {
  return {
    type: "SET_LOGOUT_ACCEPT",
    logoutAccept,
  };
};
export const setSelectedPage = (selectedPage) => {
  return {
    type: "SET_SELECTED_PAGE",
    selectedPage,
  };
};
export const setNavValue = (navValue) => {
  return {
    type: "SET_NAV_VALUE",
    navValue,
  };
};
export const setStack = (newItem) => {
  return {
    type: "SET_STACK",
    newItem,
  };
};
export const removeStack = () => {
  return {
    type: "REMOVE_STACK",
  };
};

export const setShowAnnDialogShow = (annDialog) => {
  return {
    type: "SET_ANN_DIALOG_SHOW",
    annDialog,
  };
};
export const setIntroCat = (introCat) => {
  return {
    type: "SET_INTRO_CAT",
    introCat,
  };
};
export const setLoginDialog = (loginDialog) => {
  return {
    type: "SET_LOGIN_DIALOG",
    loginDialog,
  };
};

export const setMainDialog = (mainDialog) => {
  return {
    type: "SET_MAIN_DIALOG",
    mainDialog,
  };
};
export const setMainTick = (id) => {
  return {
    type: "SET_MAIN_TICK",
    id,
  };
};

export const setStatusDialog = (statusDialog) => {
  return {
    type: "SET_STATUS_DIALOG",
    statusDialog,
  };
};

export const getCreditDialog = (creditDialog) => {
  return {
    type: "SET_CREDIT_DIALOG",
    creditDialog,
  };
};
export const getDiscountDialog = (discountDialog) => {
  return {
    type: "SET_DISCOUNT_DIALOG",
    discountDialog,
  };
};
export const getDiscountTick = (discountTick) => {
  return {
    type: "SET_DISCOUNT_TICK",
    discountTick,
  };
};

export const setIntroLocation = (introLoc) => {
  return {
    type: "SET_INTRO_LOCATION",
    introLoc,
  };
};
