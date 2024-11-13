
import {getAxiosInstance, getAxiosInstanceApi} from './api'


export const getAllTweets=(callback)=>{
  getAxiosInstanceApi().post("/getAllTweet")
    .then(res=>{
      const data=res.data
      callback(true,data)
      
    }).catch((ex)=>{
      console.log(ex);
      callback(false,ex)
    })
}

export const getAllHashtags=(callback)=>{
  getAxiosInstanceApi().get("/getAllHashTags")
    .then(res=>{
      const data=res.data
      callback(true,data)
      
    }).catch((ex)=>{
      console.log(ex);
      callback(false,ex)
    })
}

export const getAllUsers=(callback)=>{
  getAxiosInstanceApi().get("/getAllUser")
    .then(res=>{
      const data=res.data
      callback(true,data)
      
    }).catch((ex)=>{
      console.log(ex);
      callback(false,ex)
    })
}
export const newTweetRequest=(data,callback)=>{
  getAxiosInstanceApi().post("/newTweet",data)
    .then(res=>{
     
      const data=res.data
      callback(true,data)

    }).catch(err=>{
      console.log(err);
      callback(false,err.data.response.message)
    })
}
export const LikeTweetRequest=(id,callback)=>{
  getAxiosInstanceApi().get("/likeTweet/"+id)
    .then(res=>{
     
      const data=res.data
      callback(true,data)

    }).catch(err=>{
      console.log(err);
      callback(false)
    })
}