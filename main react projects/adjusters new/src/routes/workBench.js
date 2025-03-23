//libraries
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  BrowserRouter as router,
} from "react-router-dom";
import { Login } from "sanhab.mct.uicomponents.login";
import { RefreshToken } from "sanhab-components-library";
import DeskTop from "../container/DeskTop/adjustersDesktop/DeskTop";
import HttpBaseConstant from "../controler/services/HttpBaseConstant";
import "sanhab.mct.uicomponents.masterpage/dist/index.css";
import "sanhab.mct.uicomponents.login/dist/index.css";

const WorkBench = (props) => {
  return (
    <>
      <RefreshToken
        authorization={<DeskTop {...props} />}
        login={
          <Switch>
            <Route exact path={`/login`}>
              <Login
                pushPath="/"
                timer={1140}
                submitUrl={`${HttpBaseConstant.login}/security/captchalogin`}
                captchaUrl={`${HttpBaseConstant.login}/Captcha/GetBase64`}
                {...props}
              />
            </Route>
            <Redirect from="" to="/login" />
          </Switch>
        }
        loginUrl={HttpBaseConstant.login}
      />
    </>
  );
};

export default withRouter(WorkBench);
