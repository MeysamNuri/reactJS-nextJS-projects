import { Button, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import useStyle from './../style'
import classnames from 'classnames'
import Axios from 'axios';
import { newTweetRequest } from '../../../API/api_tweets';
import { toast } from 'react-toastify';


const NewTweet = ( {updateTweet}) => {
  const classes = useStyle()
  const [Tweet, setTweet] = useState("")
  const inputFile=useRef(null)
  const [imageFile,setImageFile]=useState(null)
  const [imagePath,setImagePath]=useState(null)

  const newTweetHandler=()=>{
    

    const form=new FormData()
    form.append("text",Tweet)
    if(imageFile)
    form.append("image",imageFile)
    newTweetRequest(form,(isok,data)=>{
      if(!isok)
      return toast.error(data)
     toast.success("پیام ارسال شد")
      updateTweet()
      setTweet("")
      setImagePath()
      setImageFile()
    })
  }
  const getImage = () => {
  
    if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined")
        return localStorage.getItem("image")
    return "/images/person.png"
}
const selectImage=()=>{
  inputFile.current.click()
}
const onchangeImage=(e)=>{
  if(e.target.files && e.target.files.length>0)
setImageFile(e.target.files[0])

const reader=new FileReader()
reader.onload=(e)=>{
  setImagePath(e.target.result)

}
reader.readAsDataURL(e.target.files[0])

}
  return (

    <div className={classes.NewTwett}>
      <Grid container>
        <img src={getImage()} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
        <input value={Tweet} onChange={e=>setTweet(e.target.value)} className={classes.input} placeholder={"توییت کن..."} />
     
      </Grid>
     {
       imagePath &&
       <div style={{width:"50%",textAlign:"right",marginTop: "40px"}}>
       <div style={{ backgroundImage:`url(${imagePath})`}} className={classes.Tweetpic}></div>
     </div>
     }
    <input type="file" style={{display:"none"}} ref={inputFile} onChange={onchangeImage}/>
      <Grid container direction={"row-reverse"} style={{ marginTop: "16px" }}>
        <Button onClick={newTweetHandler} variant={"contained"} color={"primary"} className={classes.ButtonStyle}>توییت</Button>
        <IconButton onClick={selectImage}>
          <img src={"images/22.png"} className={classes.ButtonImg} />
        </IconButton>

      </Grid>
    </div>
  );
}

export default NewTweet;