import React, { useState, useRef } from "react";
import { LoginUser } from './../../services/userconfig'
import { toast } from "react-toastify";
import SimpleReactValidator from 'simple-react-validator'
import { Sugar } from "react-preloaders";
import { Helmet } from "react-helmet";
const Login = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [, forcUpdate] = useState()
    const [myLoading, setMyLoading] = useState(false)
    const resetfield = e => {
        setPassword("")
        setEmail("")

    }
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی است",
            min: "نباید کمتر از 5 کاراکتر باشد",
            email: "ایمیل وارد شده صحیح نیست"
        },
        element: message => <div style={{ color: "red" }}>{message}</div>
    }))
    const handleLogin = async event => {
        event.preventDefault()
        const user = {
            email,
            password
        }

        try {
            if (validator.current.allValid()) {
                setMyLoading(true)
                const { status, data } = await LoginUser(user);
                if (status === 200) {
                    toast.success("ورود موفقیت آمیز بود", {
                        position: "top-right",
                        closeOnClick: true
                    });
                    console.log(data);
                    localStorage.setItem("token", data.token)
                    setMyLoading(false)
                    history.replace("/")
                    resetfield()
                }
                else {
                    validator.current.showMessages()
                    forcUpdate(1)
                }
            }
        }
        catch (ex) {
            console.log(ex);
            setMyLoading(false)
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true
            });
        }
    }
    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> ورود به سایت </h2>
                </header>
        
                <Helmet>
                    <title> ورود به سایت</title>
                </Helmet>
             
                    <Sugar time={0} color="#fc03d7" customLoading={myLoading} />
                

                <div className="form-layer">
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <span
                                className="input-group-addon"
                                id="email-address"
                            >
                                <i className="zmdi zmdi-email"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ایمیل"
                                name="email"
                                aria-describedby="email-address"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                    validator.current.showMessageFor("email")
                                }}
                            />
                            {validator.current.message("email", email, "required|email")}
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password">
                                <i className="zmdi zmdi-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    validator.current.showMessageFor("password")
                                }}
                            />
                            {validator.current.message("password", password, "required|min:5")}

                        </div>

                        <div className="remember-me">
                            <label>
                                <input type="checkbox" name="" /> مرا بخاطر
                                بسپار{" "}
                            </label>
                        </div>

                        <div className="link">
                            <a href>
                                {" "}
                                <i className="zmdi zmdi-lock"></i> رمز عبور خود
                                را فراموش کرده ام !
                            </a>
                            <a href>
                                {" "}
                                <i className="zmdi zmdi-account"></i> عضویت در
                                سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                            ورود به سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
