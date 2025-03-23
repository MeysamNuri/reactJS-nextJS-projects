import { Button, Input, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { LoginApi, RegisterApi } from '../../API/Auth_api';
import useStyle from './style'
const LOG_IN_TAB=1
const REG_TAB=2
const Login = () => {
    const classes=useStyle()
    const [tab,setTabs]=useState(LOG_IN_TAB)
    const handleChangeTabs=(e,newValue)=>{
        setTabs(newValue)
    }
// login state
    const [userNameLogin,setUserNameLogin]=useState("")
    const [password,setPassword]=useState("")


    // reg state 
    const [userNameRegister,setUserNameRegister]=useState("")
    const [fullNameRegister,setfullNameRegister]=useState("")
    const [configPasswordRegister,setconfigPasswordRegister]=useState("")
    const [passwordRegister,setPasswordRegister]=useState("")

    
const validate=(user)=>{
    if(!user.username)
    return "شما باید یک نام کاربری وارد کنید";
    if(!user.password)
    return "شما باید یک رمز عبور وارد کنید";
}

const validateRegister=(user)=>{
    if(!user.name)
    return "شما باید نام خود را وارد کنید"
    if(!user.username)
    return "شما باید یک نام کاربری وارد کنید";
    if(!user.password)
    return "شما باید یک رمز عبور وارد کنید";
    if(user.password !== user.configPasswordRegister)
    return " رمز عبور  شما باید مشابه باشد ";
}

const handleRegister=()=>{
    const userRegister={
        name:fullNameRegister,
        username:userNameRegister,
        password:passwordRegister,
        configPasswordRegister:configPasswordRegister
    }
const error=validateRegister(userRegister)
if(error)
return toast.warn(error)
userRegister.configPasswordRegister=undefined
RegisterApi(userRegister,(isok,data)=>{
    if(!isok)
    return toast.error(data)
    toast.success("کاربر با موفقیت ایجاد شد")
    localStorage.setItem("name",data.name)
    localStorage.setItem("username",data.username)
    localStorage.setItem("img",data.image)
    localStorage.setItem("token",data["x-auth-token"])
    window.location.reload()
})

}
    const handleLoginUser=()=>{
    
        const user={
            username:userNameLogin,
            password:password
        }
        const error=validate(user)
        if(error)
        return toast.warn(error)
        LoginApi(user,(isok,data)=>{
          
            if(!isok)
            return toast.error(data)
            toast.success("کابر با موفقیت وارد شد")
            localStorage.setItem("name",data.name)
            localStorage.setItem("username",data.username)
            localStorage.setItem("img",data.image)
            localStorage.setItem("token",data["x-auth-token"])
            window.location.reload()
        })
    }
    return ( 

        <>
<Paper className={classes.container}>
    <Typography className={classes.headerText}>
        خوش آمدید به صفحه توییتر ما
    </Typography>
<Tabs
    value={tab}
    indicatorColor="primary"
    textColor="primary"
    onChange={handleChangeTabs}
    aria-label="disabled tabs example"
  >
    <Tab label="ورود" value={LOG_IN_TAB} className={classes.tab} />
    <Tab label="ثبت نام"  value={REG_TAB} className={classes.tab}/>
 
  </Tabs>

  {tab===LOG_IN_TAB ?
  <div className={classes.loginInput}>
      <Typography>نام کاربری</Typography>
      <Input className={classes.inputStyle} value={userNameLogin} onChange={e=>setUserNameLogin(e.target.value)}></Input>
      <Typography>رمز عبور</Typography>
      <Input className={classes.inputStyle} value={password} onChange={e=>setPassword(e.target.value)}></Input>
      <Button className={classes.subButton} variant={"contained"} color={"primary"} onClick={handleLoginUser}><p style={{color:"white",fontFamily:"shabnam",width:" 100%"}} >ورود</p></Button>

  </div> :

<div className={classes.loginInput}>
<Typography>نام کامل</Typography>
<Input className={classes.inputStyle} value={fullNameRegister} onChange={e=>setfullNameRegister(e.target.value)}></Input>
<Typography>نام کاربری</Typography>
<Input className={classes.inputStyle} value={userNameRegister} onChange={e=>setUserNameRegister(e.target.value)}></Input>
<Typography>رمز عبور</Typography>
<Input className={classes.inputStyle} value={passwordRegister} onChange={e=>setPasswordRegister(e.target.value)}></Input>
<Typography>تکرار رمز عبور </Typography>
<Input className={classes.inputStyle} value={configPasswordRegister} onChange={e=>setconfigPasswordRegister(e.target.value)}></Input>
<Button className={classes.subButton} onClick={handleRegister} variant={"contained"} color={"primary"}><p style={{color:"white",fontFamily:"shabnam",width:" 100%"}}>ثبت نام</p></Button>

</div>
  }
</Paper>

        </>
     );
}
 
export default Login;