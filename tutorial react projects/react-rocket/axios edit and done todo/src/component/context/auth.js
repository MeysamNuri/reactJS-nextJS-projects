import React,{createContext} from 'react';
const authContext=createContext({
    authenticated:false,
    login:()=>{},
    logout:()=>{},
})
export default authContext