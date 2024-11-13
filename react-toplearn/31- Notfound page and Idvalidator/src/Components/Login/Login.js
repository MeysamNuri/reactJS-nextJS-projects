import React, { useContext } from 'react';
import contexts from '../../Context/Context';

const Login = () => {

    const Logincontext = useContext(contexts)
    const {
        email,
        setEmail,
        password,
        setPassword,
        validator,
        handleLogin,
    } = Logincontext
    return (
        <>
            <main className="client-page">
                <div className="container-content">

                    <header><h2> ورود به سایت </h2></header>

                    <div className="form-layer">

                        <form onSubmit={e => handleLogin(e)}>

                            <div className="input-group">
                                <span className="input-group-addon" id="email-address"><i className="zmdi zmdi-email"></i></span>
                                <input type="email"
                                    name="email"
                                    onChange={e => {
                                        setEmail(e.target.value)
                                        validator.current.showMessageFor("email")
                                    }} value={email} className="form-control"
                                    placeholder="ایمیل"
                                    aria-describedby="email-address" />
                                {validator.current.message("email", email, "required|email")}

                            </div>

                            <div className="input-group">
                                <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value)
                                        validator.current.showMessageFor("password")
                                    }
                                    } className="form-control" placeholder="رمز عبور " aria-describedby="password" />
                                {validator.current.message("password", password, "required|password")}

                            </div>

                            <div className="remember-me">
                                <label><input type="checkbox" name="" />  مرا بخاطر بسپار </label>
                            </div>

                            <div className="link">
                                <a href=""> <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده ام !</a>
                                <a href=""> <i className="zmdi zmdi-account"></i> عضویت در سایت </a>
                            </div>

                            <button type="submit" className="btn btn-success"> ورود به سایت </button>

                        </form>
                    </div>

                </div>
            </main>
        </>
    )


}

export default Login;