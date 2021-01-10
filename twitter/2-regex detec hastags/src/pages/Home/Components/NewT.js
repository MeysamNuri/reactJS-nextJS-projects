import { Button, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import useStyle from './../style'



const NewTweet = () => {
  const classes = useStyle()
  return (

    <div className={classes.NewTwett}>
      <Grid container>
        <img src={"images/m.jpg"} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
        <textarea className={classes.input} placeholder={"توییت کن..."} />
      </Grid>
      <Grid container direction={"row-reverse"} style={{ marginTop: "16px" }}>
        <Button variant={"contained"} color={"primary"} className={classes.ButtonStyle}>توییت</Button>
        <IconButton>
          <img src={"images/22.png"} className={classes.ButtonImg} />
        </IconButton>

      </Grid>
    </div>
  );
}

export default NewTweet;