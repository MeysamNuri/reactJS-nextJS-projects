import React from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStylesFacebook = makeStyles({
  root: {
    position: "relative"
  },
  top: {
    color: "#fff",
    marginTop: '8px'
  },
  bottom: {
    color: "#6797e591",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
    marginTop: '8px'
  }
});

function FacebookProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
       <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={30}
        thickness={5}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={30}
        thickness={5}
        {...props}
      />
    </div>
  );
}

function CircularProgresses({ showCircular }) {
  return (
      <div style={{display: showCircular ? 'block' : 'none'}}><FacebookProgress /></div>
      
  );
}

export default CircularProgresses;
