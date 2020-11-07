import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { adduser } from '../redux/actions/user';
import { LoginUser, registerUsers } from '../services/userServices';
import { decodeToken } from '../utilz/decodedToken';
import context from './Context';
import { withRouter } from 'react-router-dom'
import { ErrorMessage, SuccessMessage } from '../utilz/messages';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
const UserContext = ({ children, history }) => {
    const [email, setEmail] = useState("")
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [policy, setPolicy] = useState()
    const [, forceUpdate] = useState()
    const resetstates = () => {
        setFullname("");
        setEmail("");
        setPassword("");
        setPolicy()
    };
    const dispatch = useDispatch()
    const validator = useRef(new SimpleReactValidator({
        messages: {
            "required": "پر کردن این فیلد الزامی است",
            "min": "حداقل 5 کاراکتر باشد",
            "email": "ایمیل وارد شده درست نمی باشد",
        },
        element: mess => <div style={{ color: "red" }}>{mess}</div>
    }))
   

    const handleRegister = async event => {
        event.preventDefault()
        const user = {
            fullname,
            email,
            password
        };

        console.log(user);

        try {
            if (validator.current.allValid()) {
                dispatch(showLoading())
                const { status, data } = await registerUsers(user)
                if (status === 201) {
                    SuccessMessage("کاربر با موفقیت ساخته شد")
                    history.push('/login')
                    dispatch(hideLoading())
                    console.log(data)
                    resetstates();
                }
            }
            else {
                validator.current.showMessages()
                forceUpdate(1)
            }
        }
        catch (err) {
            ErrorMessage("مشکلی پیش آمده")
            dispatch(hideLoading())
            console.log(err);
        }
    }


    const handleLogin = async event => {
        event.preventDefault()
        const user = {
            email,
            password
        }
        try {
            if (validator.current.allValid()) {
                    dispatch(showLoading())
                const { status, data } = await LoginUser(user)
                if (status === 200) {
                    SuccessMessage("ورود موفقیت آمیز بود")
                    localStorage.setItem("token", data.token)
                    dispatch(adduser(decodeToken(data.token).payload.user))
                    history.replace("/")
                    dispatch(hideLoading())
                    console.log(data);

                    resetstates()
                }
            }
            else {
                validator.current.showMessages()
                forceUpdate(1)
            }
        }
        catch (ex) {
            dispatch(hideLoading())
            console.log(ex);
            ErrorMessage("مشکلی پیش آمده")
            resetstates()

        }
    }
    return (
        <>

            <context.Provider value={{
                handleRegister,
                handleLogin,
                setPolicy,
                fullname,
                email,
                password,
                policy,
                setEmail,
                setPassword,
                setFullname,
                validator,

            }}>
                {children}
            </context.Provider>
        </>

    );
}

export default withRouter(UserContext);