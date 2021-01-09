import React from 'react';
import useStyle from './style'
import { ButtonBase, Grid, Typography } from '@material-ui/core'

const RightSidebar = () => {
    const classes = useStyle()
    const hashtags=[
        "پرچم_دار_جدید",
        "ایران",
        "پرچم_دار_جدید",
        "ایران",
        "پرچم_دار_جدید",
        "ایران",
        "پرچم_دار_جدید",
        "ایران",
    ]
    return (

        <>

            <div className={classes.root}>

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
                <Typography className={classes.hashtagTitle}>
                    داغ ترین هشتگ ها
                </Typography>
                <Grid container direction={"column"} alignItems={"center"}>

                    {
                        hashtags.map(item=> <ButtonBase className={classes.hashtagparent}>
                            <Grid item container alignItems={"center"}>
                                 <img src={"/images/1.png"} style={{ width: "50px" }} />
                            <Typography className={classes.hashtag}>
                               {item}
                            </Typography>
                             </Grid>
                            </ButtonBase>
                            )
                    }
                  

                </Grid>

               

              


            </div>
        </>
    );
}

export default RightSidebar;