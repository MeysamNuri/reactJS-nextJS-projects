import React, { useState } from "react";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import API from "./API";
import "../style.css";
import setAuthorization from "../../config/authorization";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  async function UploadData(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.login(userName, password);
      localStorage.setItem("token", data.token);
      setAuthorization(data.token)
      history.push("/store-form");
      localStorage.setItem('uname', userName)
    } catch (response) {
      // if (response && response.status === 401)
      //    openSnackbar('نام کاربری یا رمز عبور اشتباه می باشد.');
      // else
      //    fetchCatch(response);
      console.log(response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Loader
        className="spiner"
        type="Triangle"
        color="#365280"
        height={100}
        width={100} //3 secs
        visible={loading}
      />
      <div className="login">
        <div className="login-content">
          <form onSubmit={(e) => UploadData(e)}>
            <Input
              name="receiver_name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="نام کاربری"
            />
            <Input
              name="receiver_name"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
            />
            <button style={{ margin: "10px 0" }} type="submit">
              ورود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
