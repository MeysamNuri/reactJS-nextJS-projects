import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const naturalDraftIdStorage = localStorage.getItem("naturalDraftId")
  ? JSON.parse(localStorage.getItem("naturalDraftId"))
  : [];

const judicalDraftIdStorage = localStorage.getItem("judicalDraftId")
  ? JSON.parse(localStorage.getItem("judicalDraftId"))
  : [];

const legalDraftIdStorage = localStorage.getItem("legalDraftId")
  ? JSON.parse(localStorage.getItem("legalDraftId"))
  : [];

const naturalEditIdStorage = localStorage.getItem("naturalEditId")
  ? JSON.parse(localStorage.getItem("naturalEditId"))
  : [];

const judicalEditIdStorage = localStorage.getItem("judicialEditId")
  ? JSON.parse(localStorage.getItem("judicialEditId"))
  : [];

const legalEditIdStorage = localStorage.getItem("legalEditId")
  ? JSON.parse(localStorage.getItem("legalEditId"))
  : [];

let EditIdBasedOnRoute = 0;
switch (window.location.pathname) {
  case "/legal":
    EditIdBasedOnRoute = legalEditIdStorage;
    break;
  case "/natural":
    EditIdBasedOnRoute = naturalEditIdStorage;
    break;
  case "/judical":
    EditIdBasedOnRoute = judicalEditIdStorage;
    break;
  default:
    break;
}

const initialState = {
  NewDraftId: {
    newId: naturalDraftIdStorage,
  },
  newJudicalDraftId: {
    newJudicalId: judicalDraftIdStorage,
  },
  newDraftLegalId: {
    newLegalId: legalDraftIdStorage,
  },
  sendNatAndRegCodes: {
    editId: EditIdBasedOnRoute,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
