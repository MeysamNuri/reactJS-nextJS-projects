
import axios from 'axios'
import { toast } from "react-toastify";
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.interceptors.response.use(null, error => {
    const errorExpected =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    if (!errorExpected) {
        console.log(error);
        toast.error("مشکلی از سمت سرور پیش آمده", {
            position: "top-right",
            closeOnClick: true
        });
    }
    return Promise.reject(error)
})


export default {
    post: axios.post,
    get: axios.get,
    put: axios.put,
    delete: axios.delete
}