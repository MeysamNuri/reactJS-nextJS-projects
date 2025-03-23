import React from 'react';
import useStyle from './style'
import { ButtonBase, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';

const RightSidebar = () => {
    const classes = useStyle()
    const hashtags=[
        "پرچم_دار_جدید",
        "ایران",
        "کرونا ویروس",
        "سامسونگ",
        "تیم ملی",
        "انرژی هسته ای",
        
    ]
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
                <Grid container direction={"column"} alignItems={"center"}>

                    {
                        hashtags.map(item=> <ButtonBase className={classes.hashtagparent}>
                           <Link to={"/hashtags/"+item}>
                           <Grid item container alignItems={"center"}>
                                 <img src={"/images/1.png"} style={{ width: "50px" }} />
                            <Typography className={classes.hashtag}>
                               {item}
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