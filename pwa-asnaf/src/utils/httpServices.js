
// import axios from "axios";
// export const removeQuotationFromStartAndEnd=(str)=>{
//     //This regexp will only remove the quotes if they are the first and last characters of the str
//     if(typeof str==="string"){
//     if(str.indexOf('"')>-1 || str.indexOf("'")>-1){
//     return str.toString().replace(/^"(.*)"$/, '$1');
//     }
//     return str
//     }
//     return str
//     }

// axios.defaults.headers.post["Content-Type"] = "application/json"; 
// //  const instance=axios.create({
// //     baseURL:"https://api.daapapp.com/api/v1/business",
// // })


// const token = localStorage.getItem("token");

// if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${removeQuotationFromStartAndEnd(token)}`;


// axios.interceptors.request.use(function(config){
//     console.log(config)
//     return config
    
//     },function(err){
//     return Promise.reject(err)
//     })
    

//     axios.interceptors.response.use(function(res){
//     console.log(res);
//     return res
   
// }, error => {
//     const expectedErrors =
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status < 500;
//     if (!expectedErrors) {
//         console.log(error);
//       console.log("مشکلی از سمت سرور رخ داده است.")
//     }

//     return Promise.reject(error);
// });

// export default {
//     get: axios.get,
//     post: axios.post,
//     put: axios.put,
//     delete: axios.delete
// };


