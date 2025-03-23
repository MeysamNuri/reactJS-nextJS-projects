import { getAxiosInstanceApi } from "./api";

export const LoginApi=(user,callback)=>{
    getAxiosInstanceApi().post("/login",user)
    .then(res=>{
        const data=res.data
       callback(true,data)
       console.log(data);

    }).catch(err=>{
console.log(err);
        callback(false,err.response.data.message)
    })
}


export const RegisterApi=(user,callback)=>{
    getAxiosInstanceApi().post("/register",user)
    .then(res=>{
        const data=res.data
       callback(true,data)
       console.log(data);

    }).catch(err=>{
console.log(err);
        callback(false,err.response.data.message)
    })
}
export const UploadImage=(file,callback)=>{
    getAxiosInstanceApi().post("/uploadUserPhoto",file)
    .then(res=>{
        const data=res.data
        callback(true,data)
        console.log(data);
    }).catch(err=>{
        console.log(err);
        callback(false,err.response.data.message)
    })
}