import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { registerUser } from './../../services/userconfig'
import SimpleReactValidator from 'simple-react-validator'
import { Sugar } from "react-preloaders";
const Register = ({history}) => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [policy, setPolicy] = useState();
    const [loading, setLoading] = useState(false);
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی است",
            min: "نباید کمتر از 5 کاراکتر باشد",
            email: "ایمیل وارد شده صحیح نیست"
        },
        element: message => <div style={{ color: "red" }}>{message}</div>
    }))

    const [, forcUpdate] = useState()
    const resetfield = e => {
        setFullName("")
        setPassword("")
        setEmail("")

    }
    const formHandler = async event => {
        event.preventDefault()
        const user = {
            fullName,
            password,
            email
        }
        //  console.log(   JSON.stringify(user));

        try {
            if (validator.current.allValid()) {
                const { status } = await registerUser(user)
                setLoading(true)
                if (status === 201) {
                    toast.success("کاربر با موفقیت ساخته شد.", {
                        position: "top-right",
                        closeOnClick: true
                    });

                    resetfield()
                    setLoading(false)
                    history.push("/")
                }
            }
            else {
                validator.current.showMessages()
                forcUpdate(1)
            }
        }
        catch (ex) {
            setLoading(false)
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true
            });
            console.log(ex);
        }
    }
    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> عضویت در سایت </h2>
                </header>
                {loading ? (
                    <Sugar time={0} color="#fc03d7" customLoading={loading} />
                ) : null}
                <div className="form-layer">
                    <form onSubmit={formHandler}>
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
                                value={fullName}
                                onChange={e => {
                                    setFullName(e.target.value)
                                    validator.current.showMessageFor("fullname")
                                }}
                            />
                            {validator.current.message("fullname", fullName, "required|min:5")}
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
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-assignment"></i> قوانین
                                و مقررات سایت !
                            </a>
                            <a href="">
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
