import { createContext } from "react";

const context=createContext({
    fullname:"",
    email:"",
    password:"",
    policy:"",
    setEmail:()=>{},
    setPassword:()=>{},
    setFullname:()=>{},
    setPolicy:()=>{},
    handleLogin:()=>{},
    handleRegister:()=>{},
    validator:null
})
export default context