
import { FormatListNumberedRtlRounded } from '@material-ui/icons'
import {getAxiosInstance} from './api'


export const getAllTweets=(callback)=>{
    getAxiosInstance().get("/tweets")
    .then(res=>{
      const data=res.data
      callback(true,data)
      
    }).catch((ex)=>{
      console.log(ex);
      callback(false,ex)
    })
}

export const getAllHashtags=(callback)=>{
    getAxiosInstance().get("/hashtags")
    .then(res=>{
      const data=res.data
      callback(true,data)
      
    }).catch((ex)=>{
      console.log(ex);
      callback(false,ex)
    })
}

export const getAllUsers=(callback)=>{
    getAxiosInstance().get("/users")
    .then(res=>{
      const data=res.data
      callback(true,data)
      
    }).catch((ex)=>{
      console.log(ex);
      callback(false,ex)
    })
}
export const newTweetRequest=(data,callback)=>{
    getAxiosInstance().post("/tweets",data)
    .then(res=>{
     
      callback(true)

    }).catch(err=>{
     
      callback(false)
    })
}