import { toast } from "react-toastify";


export const successmessage=message =>{
    toast.success(message, {
        position: "top-right",
        closeOnClick: true
    });
}
export const errormessage=message =>{
    toast.error(message, {
        position: "top-right",
        closeOnClick: true
    });
}