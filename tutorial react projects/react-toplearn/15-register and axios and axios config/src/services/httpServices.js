
import axios from 'axios'
import { toast } from "react-toastify";
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.interceptors.response.use(null, error => {
    const errorExpected =
        error.response &&
        error.response >= 400 &&
        error.response < 500
    if (!errorExpected) {
        toast.error("مشکلی از سمت سرور پیش آمده", {
            position: "top-right",
            closeOnClick: true
        });
    }

})


export default {
    post: axios.post,
    get: axios.get,
    put: axios.put,
    delete: axios.delete
}