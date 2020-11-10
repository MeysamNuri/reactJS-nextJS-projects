import { Paper } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import SocketIOClient from 'socket.io-client'
import useStyle from './style'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';

import DeleteIcon from '@material-ui/icons/Delete';
const ChatRoom = (props) => {
    const classes = useStyle()
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState([]);
    const socket = React.useRef(SocketIOClient.connect("http://localhost:3010/socket"));

    useEffect(() => {
        console.log(props.location.state);

    }, [])
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container direction={"column"}>
                    <Grid item className={classes.header} container alignItems={"center"} justify={"center"}>
                        <Typography className={classes.headerText}>
                            چت روم
            </Typography>
                    </Grid>
                    <Grid item className={classes.middle} direction={"column"}>
                        {
                            [1, 2, 3].map(() => {
                                return <Grid item container style={{ margin: "15px 0px"}}>
                                    <Grid item>
                                        <img src={"boy.png"} style={{ width: "40px", borderRadius: "50%", margin: "10px" }} />
                                    </Grid>
                                    <Grid item className={classes.messageHolder}>
                                        <p>سلام خوبی ؟ چه خبر؟</p>
                                    </Grid>

                                </Grid>
                            })
                        }
                        <Grid item container style={{direction:"ltr"}}>
                            <Grid item>
                                <img src={"girl.png"} style={{ width: "40px" }} />

                            </Grid>
                            <Grid item className={classes.messageHolder}>
                                        <p>سلام خوبی ؟ چه خبر؟</p>
                                    </Grid>
                        </Grid>
                        <Grid item container style={{ margin: "15px 0px" }}>
                                    <Grid item>
                                        <img src={"boy.png"} style={{ width: "40px", borderRadius: "50%", margin: "10px" }} />
                                    </Grid>
                                    <Grid item className={classes.messageHolder}>
                                        <p>سلام خوبی ؟ چه خبر؟</p>
                                    </Grid>

                                </Grid>
                    </Grid>
                    <Grid item className={classes.footer} container justify={'center'} alignItems={"center"}>
                        <Grid item xs>
                            <InputBase value={newMessage} onChange={e => setNewMessage(e.target.value)}
                                className={classes.input} />
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.btnSend} >
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default ChatRoom;