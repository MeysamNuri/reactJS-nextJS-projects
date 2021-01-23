import React, { useEffect, useState } from 'react';
import useStyle from './style'
import { ButtonBase, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { getAllHashtags } from '../../API/api_tweets';

const RightSidebar = () => {
    const classes = useStyle()
    const [hashtags,sethashtags]=useState([])

    useEffect(()=>{
        getAllHashtags((isok,data)=>{
            if(!isok)
            return("مشکلی پیش آمده")
            else sethashtags(data)
        })
    },[])
    return (

        <>

            <div className={classes.root}>

           <Link to={"/"}>
           
           <Grid container direction={"row"} alignItems={"center"}>
                    <Grid item>
                        <img src={"/images/Twitter.png"} style={{ width: "50px" }} />
                    </Grid>
                    <Grid item>
                        <Typography component="h3" className={classes.logoText}>

                            تویتر فارسی
                        </Typography>
                    </Grid>

                </Grid>
           </Link>
                <Typography className={classes.hashtagTitle}>
                    داغ ترین هشتگ ها
                </Typography>
                <Grid container direction={"column"} alignItems={"center"}  style={{height: "80%",
    overflowY: "scroll",
    display: "inline-block"}}>

                    {
                        hashtags.map(item=> <ButtonBase className={classes.hashtagparent}>
                           <Link to={"/hashtags/"+item.text}>
                           <Grid item container alignItems={"center"}>
                                 <img src={"/images/1.png"} style={{ width: "50px" }} />
                            <Typography className={classes.hashtag}>
                               {item.text}
                            </Typography>
                             </Grid>
                           </Link>
                            </ButtonBase>
                            )
                    }
                  

                </Grid>

               

              


            </div>
        </>
    );
}

export default RightSidebar;