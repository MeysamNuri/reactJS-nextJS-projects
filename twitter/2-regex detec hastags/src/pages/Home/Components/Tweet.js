import { Typography, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import useStyle from './../style'
import FavoriteIcon from '@material-ui/icons/Favorite';
const Tweet = ({datas}) => {

    const renderTweet=(text)=>{

    return {__html:text.replace( /#\S+/g , "<a href='/tags/$&' style='color:blue'>$&</a>" )}
    }
    const classes = useStyle()
    return (

        <div className={classes.TweetItem}>
            <Grid container >
                    <img src={datas.sender.img} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />

              
                <Grid item container direction={"column"} style={{flex:1,marginRight:"1rem"}}>
                    <Grid item container >
                        <Typography className={classes.TweetItemName}>
                           {datas.sender.name}
                     </Typography>
                        <Typography  className={classes.TweetItemId}>
                        {datas.sender.id}
                        </Typography>
                    </Grid>

                    <Typography dangerouslySetInnerHTML={renderTweet(datas.text)} style={{marginTop:".75rem",fontSize:"5px"}} component={"p"} />
                   


                     
                </Grid>
            </Grid>
            <Grid container direction={"row-reverse"} style={{ marginTop: "16px" }} alignItems={"center"}>
                <IconButton>
                    <img src={"images/retweet.png"} className={classes.ButtonImg} />
                </IconButton>
                <IconButton className={classes.favImg}>
                    <FavoriteIcon />
                </IconButton>
                <Typography className={classes.Numbertweet}>{datas.likes}</Typography>
            </Grid>
        </div>


    );
}

export default Tweet;