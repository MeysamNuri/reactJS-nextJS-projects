import React, { useEffect, useRef, useState } from 'react';
import { ButtonBase, Divider, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import useStyle from './style.js'
import { getAllUsers } from '../../API/api_tweets.js';
import { toast } from 'react-toastify';
import {UploadImage} from './../../API/Auth_api'
const TwityerCom = ({ name, id, img }) => {
    const getImage = () => {
  if(img===undefined)
  return "/images/person.png"
   else return img     
    }
    const classes = useStyle()
    return <ButtonBase style={{ width: "100%" }}><Grid container direction={"row"} className={classes.tweeterParent}>
        <img src={getImage()} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />

        <Grid item container direction={"column"} className={classes.TweeterProftext}>
            <Typography className={classes.profName}>{name} </Typography>
            <Typography className={classes.profId}>{id}</Typography>
        </Grid>
        <Divider />
    </Grid>
    </ButtonBase>
}
const LeftSidebar = () => {
    const [users, setUsers] = useState([])
    const [anchor, setAnchor] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const [ImagePath, setImagePath] = useState()
    const handleMenu = (e) => {
        if (anchor)
            setAnchor(false)
        else
            setAnchor(e.currentTarget)
    }
    useEffect(() => {
        getAllUsers((isok, data) => {
            if (!isok)
                return alert(data.message)
            else setUsers(data)

        })
    }, [])
    const handleAvatar = (e) => {
        if (e.target.files[0] && e.target.files > 0)
            setUserImage(e.target.files[0])
        const reader = new FileReader()
        reader.onload = (e) => {
            setImagePath(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
        const form=new FormData()
        form.append("image",e.target.files[0])
        UploadImage(form,(isok,data)=>{
            if(!isok)
            return toast.error("خطا به وجود امد")
             toast.success("عکس با موفقیت اپلود شد")
            localStorage.setItem("image",data.imagePath)
        })
    }
    const getImage = () => {
        if(ImagePath)
        return ImagePath
        if (localStorage.getItem("image") && localStorage.getItem("image") !== "undefined")
            return localStorage.getItem("image")
        return "/images/user-profiles.png"
    }
    const inputRef = useRef(null)
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Grid container direction={"row-reverse"}>
                <img src={getImage()} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />

                <Grid item container direction={"column"} className={classes.userDetail} onClick={handleMenu} style={{ cursor: "pointer" }}>
                    <Typography className={classes.profName}> {localStorage.getItem("name")}</Typography>
                    <Typography className={classes.profId}>{localStorage.getItem("username")}</Typography>
                </Grid>
                <input ref={inputRef} type="file" style={{ display: "none" }} onChange={handleAvatar} />
            </Grid>
            <Grid item container direction={"column"} className={classes.tweeter}>
                <Typography className={classes.tweeterTitle}>
                    بهترین خبرنگاران
                </Typography>
                <Divider />
                {
                    users.map((item, index) => {
                        return (
                            <>
                                <Link to={`/users/${item._id}/${item.name}`}>
                                    <TwityerCom name={item.name} id={item.username} img={item.image} />
                                    {index !== users.length - 1 &&
                                        <Divider />
                                    }
                                </Link>
                            </>
                        )
                    })
                }


                <Menu open={anchor} onClose={e => setAnchor(false)} anchorEl={anchor}>
                    <MenuItem onClick={() => {inputRef.current.click();setAnchor(false)}}>ویرایش عکس پروفایل</MenuItem>
                    <MenuItem onClick={() => { localStorage.clear(); window.location.reload(); }}>خروج</MenuItem>

                </Menu>
            </Grid>

        </div>

    );
}

export default LeftSidebar;