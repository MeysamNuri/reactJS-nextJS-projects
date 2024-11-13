import React, { useContext } from "react";
import { context } from "./../context/context";

import { Helmet } from "react-helmet";

const Register = () => {
    const registerContext=useContext(context)
    const {handleRegister,fullname,setFullname,validator,setEmail,setPassword,email,password,policy,setPolicy} =registerContext
    
    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> عضویت در سایت </h2>
                </header>
                <Helmet>
                    <title>عضویت در سایت</title>
                </Helmet>
              
             
                <div className="form-layer">
                    <form onSubmit={e =>handleRegister(e)}>
                        <div className="input-group">
                            <span className="input-group-addon" id="username">
                                <i className="zmdi zmdi-account"></i>
                            </span>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                placeholder="نام و نام خانوادگی"
                                aria-describedby="username"
                                value={fullname}
                                onChange={e => {
                                    setFullname(e.target.value)
                                    validator.current.showMessageFor("fullname")
                                }}
                            />
                            {validator.current.message("fullname", fullname, "required|min:5")}
                        </div>

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
                                name="email"
                                placeholder="ایمیل"
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
                                type="text"
                                name="password"
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

                        <div className="accept-rules">
                            <label>
                                <input type="checkbox" name="policy" value={policy}
                                    onChange={e => {
                                        setPolicy(e.currentTarget.checked);
                                        validator.current.showMessageFor(
                                            "policy"
                                        );
                                    }}
                                /> قوانین و
                                مقررات سایت را میپذیرم{" "}
                            </label>
                            {validator.current.message(
                                "policy",
                                policy,
                                "required"
                            )}
                        </div>

                        <div className="link">
                            <a href>
                                {" "}
                                <i className="zmdi zmdi-assignment"></i> قوانین
                                و مقررات سایت !
                            </a>
                            <a href>
                                {" "}
                                <i className="zmdi zmdi-account"></i> ورود به
                                سایت{" "}
                            </a>
                        </div>

                        <button type="submit" className="btn btn-success" >
                            {" "}
                            عضویت در سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;
