import { createContext } from "react";

export const context=createContext({
    fullname:"",
    setFullname: ()=> {},
    email:"",
    setEmail: ()=> {},
    policy:"",
    setPolicy: ()=> {},
    password:"",
    setPassword:()=> {},
    validator:null,
    handleLogin:()=> {},
    handleRegister:()=> {},
})