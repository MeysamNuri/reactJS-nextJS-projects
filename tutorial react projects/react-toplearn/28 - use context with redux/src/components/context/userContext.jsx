import React, { useState, useRef }  from 'react';
import { context} from './context'
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator'
import {LoginUser, registerUser } from './../../services/userconfig'
import { adduser } from "../../actions/user"
import {docodeToken} from './../../utiliz/deocode'
import {useDispatch} from 'react-redux'
import { successmessage, errormessage } from '../../utiliz/message';
const UserContext = ({children,history}) => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [policy, setPolicy] = useState();
    const dispatch=useDispatch()
   
    const [, forcUpdate] = useState()
   
    
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی است",
            min: "نباید کمتر از 5 کاراکتر باشد",
            email: "ایمیل وارد شده صحیح نیست"
        },
        element: message => <div style={{ color: "red" }}>{message}</div>
    }))


    const resetStates = () => {
        setFullname("");
        setEmail("");
        setPassword("");
        setPolicy();
    };
    const handleRegister = async event => {
        event.preventDefault()
        const user = {
            fullname,
            password,
            email
        }

        try {
            if (validator.current.allValid()) {
                const { status } = await registerUser(user)
            
                if (status === 201) {
                 successmessage("کاربر با موفقیت ساخته شد")
                 history.push("/login")
                }
            }
            else {
                validator.current.showMessages()
                forcUpdate(1)
            }
        }
        catch (ex) {
        
           errormessage("مشکلی از سمت سرور پیش آمده")
            console.log(ex);
        }
    }
    const handleLogin = async event => {
        event.preventDefault();
        const user = { email, password };

        try {
            if (validator.current.allValid()) {
                const { status, data } = await LoginUser(user);
                if (status === 200) {
                    successmessage("ورود موفقیت آمیز بود.");
                    localStorage.setItem("token", data.token);
                    dispatch(adduser(docodeToken(data.token).payload.user));
                    history.replace("/");
                    resetStates();
                }
            } else {
                validator.current.showMessages();

                forcUpdate(1);
            }
        } catch (ex) {
            console.log(ex);
            errormessage("مشکلی پیش آمده.");
        }
    };
    return ( 

        <context.Provider value={{
            fullname,
            setFullname,
            email,
            setEmail,
            policy,
            setPolicy,
            password,
            setPassword,
            validator,
            handleLogin,
            handleRegister,
        }}>
            {children}
        </context.Provider>
     );
}
 
export default withRouter(UserContext) ;