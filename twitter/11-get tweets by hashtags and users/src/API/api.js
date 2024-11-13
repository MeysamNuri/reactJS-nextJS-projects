import axios from 'axios'


export const getAxiosInstance=()=>{
   return axios.create({
        baseURL:"http://localhost:3000",
        headers:{
           
                API_KEY:"KJHJGHGJJLJKJKLJKLJJK"
            
        }
    })
}
export const getAxiosInstanceApi=()=>{
    return axios.create({
         baseURL:"https://twitterapi.liara.run/api",
         headers:{
             'x-auth-token':localStorage.getItem("token")
         }
       
     })
 }