import React, { useEffect, useState } from 'react';
import { ButtonBase, Divider, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import useStyle from './style.js'
import { getAllUsers } from '../../API/api_tweets.js';

const TwityerCom = ({ name, id, img }) => {

    const classes = useStyle()
    return <ButtonBase style={{width:"100%"}}><Grid container direction={"row"} className={classes.tweeterParent}>
        <img src={img} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />

        <Grid item container direction={"column"} className={classes.TweeterProftext}>
            <Typography className={classes.profName}>{name} </Typography>
            <Typography className={classes.profId}>{id}</Typography>
        </Grid>
        <Divider />
    </Grid>
    </ButtonBase>
}
const LeftSidebar = () => {
    const [users,setUsers]=useState([])

    useEffect(()=>{
        getAllUsers((isok,data)=>{
            if(!isok)
            return alert(data.message)
            else setUsers(data)
        })
    },[])
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Grid container direction={"row-reverse"}>
                <img src={"/images/m.jpg"} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />

                <Grid item container direction={"column"} className={classes.userDetail}>
                    <Typography className={classes.profName}>میثم نوری</Typography>
                    <Typography className={classes.profId}> m.nuri.1992</Typography>
                </Grid>

            </Grid>
            <Grid item container direction={"column"} className={classes.tweeter}>
                <Typography className={classes.tweeterTitle}>
                    بهترین خبرنگاران
                </Typography>
                <Divider />
                {
                    users.map((item,index) => {
                        return (
                            <>
                            <Link to={`/users/${item.name}`}>
                                <TwityerCom name={item.name} id={item.id} img={item.img} />
                               {index !==users.length -1 &&
                                <Divider />
                               }
                               </Link>
                            </>
                        )
                    })
                }



            </Grid>

        </div>

    );
}

export default LeftSidebar;