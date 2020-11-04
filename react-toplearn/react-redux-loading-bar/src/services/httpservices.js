import axios from 'axios'
import {toast} from 'react-toastify'
const instance=axios.create({
    baseURL:"https://toplearnapi.ghorbany.dev",
    timeout:"5000"
})
instance.defaults.headers.post["Content-Type"]="application/json"
const token=localStorage.getItem("token")
if(token){
    instance.defaults.headers.common['Authorization']=`Bearer ${token}`
}
instance.interceptors.response.use(function(response){
    console.log(response);
    return response
},function(err){
    const expectedErrors=
    err.response && 
    err.response.status>=400 && 
    err.response.status<500;
    if(!expectedErrors){
        toast.error("مشکلی از سمت سرور پیش آمده", {
            position: "top-right",
            closeOnClick: true
        });
    }
    console.log(err);
    return Promise.reject(err)
})
export default instance
