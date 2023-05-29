import React from "react";
import { ToastContainer } from "react-toastify";
import CentinsurLogin from "./routes/CentinsurLogin";
import { useLocation, Route, Redirect } from "react-router-dom";
import AdjusterLogin from "./container/Registration/login/Login";
import Natural from "./container/Registration/Natural/Natural";
import Legal from "./container/Registration/Legal/Legal";
import Judical from "./container/Registration/Judical/Judical";
import EvalutorList from "./container/evalutorList";
import Registration from "./container/Registration/login/Registration";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const location = useLocation();
  const isLoggedInOrInquiredResult = useSelector(
    (state: any) => state?.isLoggedInOrInquiredResult?.result
  );


  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      {
      
      location.pathname === "/evl-list"?
      <Route path={`/evl-list`} component={EvalutorList} exact />:
      location.pathname === "/adjuster-registration" ||
      location.pathname === "/legal" ||
      location.pathname === "/natural" ||
      location.pathname === "/judical" ||
    
      location.pathname === "/registration" ? (
        <>

          <Route
            path={`/adjuster-registration`}
            component={AdjusterLogin}
            exact
          />

          {isLoggedInOrInquiredResult ? (
            <>
              <Route path={`/natural`} component={Natural} exact />
              
              <Route path={`/legal`} component={Legal} exact />
              <Route path={`/judical`} component={Judical} exact />
              <Route path={`/registration`} component={Registration} exact />
            </>
          ) : (

            <Redirect to="/adjuster-registration" />
          
          )}
        </>
      ) : (
        // <Routes {...props} />
        <CentinsurLogin />
      )}
    </div>
  );
}

export default App;
