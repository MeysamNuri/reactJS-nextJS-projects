import { ButtonBase, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyle from './style.js'

const tweetList = [
    { name: "Xiaomi", id: "Xiaomi@1234", img: "/images/b.jpg" },
    { name: "asghar", id: "Xiaomi@ere", img: "/images/b.jpg" },
    { name: "khorshid", id: "efefe@1234", img: "/images/b.jpg" },
    { name: "honami", id: "Xiaomi@dffd", img: "/images/b.jpg" },
    { name: "master", id: "Xiaomi@44333", img: "/images/b.jpg" },
]
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
                    tweetList.map((item,index) => {
                        return (
                            <>
                            <Link to={`/users/${item.name}`}>
                                <TwityerCom name={item.name} id={item.id} img={item.img} />
                               {index !==tweetList.length -1 &&
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