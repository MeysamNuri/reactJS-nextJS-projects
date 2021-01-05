import React from 'react'
import 'antd/dist/antd.css';
import AddStoreForm from '../components/addStoreForm'
import Login from '../components/login/Login'
import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'rezvani-datepicker/public/datepicker.min.css';
import { Provider } from 'react-redux'
import store from '../boot/redux'
import { Switch, Route } from "react-router-dom";
import MySnackbar from "../components/snackbar";
import setAuthorization from "../config/authorization";

var token = localStorage.getItem("token");

(async function () {
  if (token !== null) {
    await setAuthorization(token);
  }
})();

function App() {
   return (
      <Provider store={store}>
         <div className="App">
            <Switch>
               <Route path='/' exact component={Login}></Route>
               <Route path='/store-form' exact component={AddStoreForm}></Route>
            </Switch>
         </div>
         <MySnackbar msg="" />
      </Provider>
   )
}

export default App
