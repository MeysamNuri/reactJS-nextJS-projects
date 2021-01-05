const initialState = {
  status: true,
  showSideBar: false,
  showNotification: "none",
  name: "",
  fname: "",
  firstCardNumber: "",
  shebaAuth: false,
  showCurrentLocation: false,
  lat: 35.693633,
  lng: 51.410469,
  zoom: 13,
  mapFlag: false,
  selectedItems: 0,
  dialogFlag: null,
  notiNumber: 0,
  fav: false,
  exit: false,
  closeIconDisplay: false,
  hasAddCard: true,
  loadMore: false,
  errAnimation: false,
  withdrawScroll: false,
  favoritDialog: false,
  storeDescription: false,
  showStore: false,
  logoutPopup: false,
  logoutDialog: false,
  logoutAccept: false,
  selectedPage: "map",
  navValue: 0,
  stack: [],
  annDialog: false,
  introCat: "",
  loginDialog: false,
  mainDialog: false,
  maintick: 0,
  creditDialog: false,
  discountDialog: false,
  discountTick: false,
  introLoc: '',
  SelectedStore:null,
  PspLsit:[],
  cashback:4
};

const MainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "GET_CASHBACK":
      return{
        ...state,
        cashback:action.cashback
      }
    case "SET_PSPLIST":
      return{
        ...state,
        PspLsit:action.PspLsit
      }
    case "SELECTED_STORE":
      return{
        ...state,
        SelectedStore:action.SelectedStore
      }

    case "SET_INTRO_CAT":
      return {
        ...state,
        introCat: action.introCat,
      };
    case "SET_LOGIN_DIALOG":
      return {
        ...state,
        loginDialog: action.loginDialog,
      };
    case "SET_MAIN_DIALOG":
      return {
        ...state,
        mainDialog: action.mainDialog,
      };
    case "SET_MAIN_TICK":
      return {
        ...state,
        mainTick: action.id,
      };
    case "SET_STATUS_DIALOG":
      return {
        ...state,
        statusDialog: action.statusDialog,
      };
    case "SET_CREDIT_DIALOG":
      return {
        ...state,
        creditDialog: action.creditDialog,
      };
    case "SET_DISCOUNT_DIALOG":
      return {
        ...state,
        discountDialog: action.discountDialog,
      };
    case "SET_DISCOUNT_TICK":
      return {
        ...state,
        discountTick: action.id,
      };
    case "SET_ANN_DIALOG_SHOW":
      return {
        ...state,
        annDialog: action.annDialog,
      };
    case "SET_NAV_VALUE":
      return {
        ...state,
        navValue: action.navValue,
      };
    case "SET_STACK":
      return {
        ...state,
        stack: [...state.stack, action.newItem],
      };
    case "REMOVE_STACK":
      const value = state.stack.pop();
      let page = "";
      if (value === 0) {
        page = "map";
      } else if (value === 2) {
        page = "wallet";
      } else if (value === 3) {
        page = "profile";
      } else {
        page = "card-list";
      }
      return {
        ...state,
        // stack: state.stack.slice(0, -1),
        navValue: value,
        selectedPage: page,
      };
    case "SET_ONLINE_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SET_SELECTED_PAGE":
      return {
        ...state,
        selectedPage: action.selectedPage,
      };
    case "SET_WITHDRAW_SCROLL":
      return {
        ...state,
        withdrawScroll: action.withdrawScroll,
      };
    case "SET_SHOW_SLIDE_MENU":
      return {
        ...state,
        showSideBar: action.showSideBar,
      };
    case "SET_HASADDCARD":
      return {
        ...state,
        hasAddCard: action.hasAddCard,
      };
    case "SET_SHOW_NOTIFICATIONS":
      return {
        ...state,
        showNotification: action.showNotification,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_FNAME":
      return {
        ...state,
        fname: action.fname,
      };
    case "SET_FIRST_CARD_NUMBER":
      return {
        ...state,
        firstCardNumber: action.firstCardNumber,
      };
    case "SET_OK_SHEBA":
      return {
        ...state,
        shebaAuth: action.shebaAuth,
      };
    case "SET_SHOW_CURRENT_LOCATION":
      return {
        ...state,
        showCurrentLocation: action.showCurrentLocation,
      };
    case "SET_LAT":
      return {
        ...state,
        lat: action.lat,
      };

    case "SET_LNG":
      return {
        ...state,
        lng: action.lng,
      };
    case "SET_ZOOM":
      return {
        ...state,
        zoom: action.zoom,
      };
    case "SET_MAP_FLAG":
      return {
        ...state,
        mapFlag: action.mapFlag,
      };
    case "SET_SELECTED_ITEMS":
      return {
        ...state,
        selectedItems: action.selectedItems,
      };
    case "SET_DIALOG_FLAG":
      return {
        ...state,
        dialogFlag: action.dialogFlag,
      };
    case "SET_NOTI_NUMBER":
      return {
        ...state,
        notiNumber: action.notiNumber,
      };
    case "SET_FAVORITE":
      return {
        ...state,
        fav: action.fav,
      };
    case "SET_EXIT":
      return {
        ...state,
        exit: action.exit,
      };
    case "GET_CLOSEICON_DISPLAY":
      return {
        ...state,
        closeIconDisplay: action.closeIconDisplay,
      };
    case "SET_LOADS_MORE":
      return {
        ...state,
        loadMore: action.loadMore,
      };
    case "SET_ERR_ANIMATION":
      return {
        ...state,
        errAnimation: action.errAnimation,
      };
    case "SET_FAVORIT_DIALOG":
      return {
        ...state,
        favoritDialog: action.favoritDialog,
      };
    case "SET_SHOW_STORE_DES":
      return {
        ...state,
        storeDescription: action.storeDescription,
      };
    case "SET_SHOW_STORE":
      return {
        ...state,
        showStore: action.showStore,
      };
    case "SET_LOGOUT_POPUP":
      return {
        ...state,
        logoutPopup: action.logoutPopup,
      };
    case "SET_LOGOUT_DIALOG":
      return {
        ...state,
        logoutDialog: action.logoutDialog,
      };
    case "SET_LOGOUT_ACCEPT":
      return {
        ...state,
        logoutAccept: action.logoutAccept,
      };
    case "SET_INTRO_LOCATION":
      return {
        ...state,
        introLoc: action.introLoc,
      };
    default:
      return state;
  }
};

export default MainReducer;
