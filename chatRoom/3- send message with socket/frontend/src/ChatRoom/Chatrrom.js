import { Paper } from '@material-ui/core';
import React, { useEffect, useRef,useState } from 'react';
import SocketIOClient from 'socket.io-client'
import useStyle from './style'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';

const ChatRoom = (props) => {
  console.log(props);
  const {state}=props.location
    const classes = useStyle()
    const [Chatmessages,setChatmessages]=useState([])
    const [newMessage, setNewMessage] =useState("");
    const socket =useRef(SocketIOClient.connect("http://localhost:3010/socket"));
 console.log(socket);
    useEffect(() => {
       
        socket.current.on("newMessage",(message)=>{
            console.log(message);
            setChatmessages(Chatmessages=>Chatmessages.concat(message))
        })

    }, [])
   
    const sendUserMassaege=()=>{
        if(!newMessage)
        return;
        socket.current.emit("newMessage",  {
            id: "",
            msg: newMessage,
            gender: state.gender,
            name: state.name,
          
        })
        setNewMessage("")
     
    }
    // const Chatmessages = [
    //     {
    //         id: "",
    //         name: "میثم",
    //         gender: 0,
    //         msg: "سلام خوبی ؟ چیکار میکنی؟"
    //     },
    //     {
    //         id: "",
    //         name: "سارا",
    //         gender: 1,
    //         msg: "ممنون . تو خوبی؟"
    //     },
    //     {
    //         id: "",
    //         name: "میثم",
    //         gender: 0,
    //         msg: "آره . فردا میای شرکت؟"
    //     },
    //     {
    //         id: "",
    //         name: "سارا",
    //         gender: 1,
    //         msg: " نمیدونم شاید"
    //     },
    // ]

    
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
                            Chatmessages.map((message) => {
                                return <Grid item container style={{ margin: "15px 0px" }} className={`${message.name=== state.name?null: classes.messageDir}`}>
                                    <Grid item>
                                        <img src={message.gender==0?"boy.png":"girl.png"} style={{ width: "40px", borderRadius: "50%", margin: "10px" }} />
                                    </Grid>
                                    <Grid item className={classes.messageHolder}>
                                        <p> {message.msg}</p>
                                    </Grid>

                                </Grid>
                            })
                        }

                    </Grid>
                    <Grid item className={classes.footer} container justify={'center'} alignItems={"center"}>
                        <Grid item xs>
                            <InputBase value={newMessage} onChange={e => setNewMessage(e.target.value)}
                                className={classes.input} />
                            
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.btnSend}  onClick={sendUserMassaege}>
                                <SendIcon  />
                            </IconButton>
                          
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
       
        </>
    );
}

export default ChatRoom;