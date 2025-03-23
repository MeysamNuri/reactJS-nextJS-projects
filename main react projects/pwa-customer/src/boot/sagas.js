import { put, takeLatest, all } from "redux-saga/effects";
import { getSliderStartDate } from "../container/pages/wallet/action";
import { useSelector } from "react-redux";
// import { watchSignIn } from "../container/pages/sign-in/saga";

function* helloSaga() {
  console.log("Hello Sagas!");
}

export default function* rootSaga() {
  yield all([helloSaga()]);
}
