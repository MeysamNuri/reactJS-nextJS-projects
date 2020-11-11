import { Paper } from '@material-ui/core';
import React, { useEffect, useRef,useState } from 'react';
import SocketIOClient from 'socket.io-client'
import useStyle from './style'
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
const ChatRoom = (props) => {
//   console.log(props);
  const {state}=props.location
    const classes = useStyle()
    const [Chatmessages,setChatmessages]=useState([])
    const [newMessage, setNewMessage] =useState("");
    const scrollableGrid = useRef();
    const socket =useRef(SocketIOClient.connect("http://localhost:3010/socket"));
    useEffect(() => {
       
        socket.current.on("newMessage",(message)=>{
            // console.log(message);
            setChatmessages(Chatmessages=>Chatmessages.concat(message))
            scrollableGrid.current.scroll(0, scrollableGrid.current.scrollHeight);

        })
        socket.current.on("deleteMsg", id => {
            setChatmessages((Chatmessages) => {
                // let findIndex=-1
                // Chatmessages.forEach((message,index)=>{
                //     if(message.id ==id){
                //         findIndex=index
                //     }
                // })
                const filterMsg=Chatmessages.filter(item=>item.id !== id)
              console.log(Chatmessages);
              return removeItemWithSlice(filterMsg, id);
            });
        
          })
    }, [])
 
    const removeItemWithSlice = (items, index) => {
        if (index === -1) return items;
        return [...items.slice(0, index), ...items.slice(index + 1)];
      };
    const sendUserMassaege=()=>{
        if(!newMessage)
        return null;
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

    const EnterButton=e=>{
        if(e.key==="Enter")
        sendUserMassaege()
    }
    const ondeleteClick=(id)=>{
        socket.current.emit("deleteMsg",id)
    }
    return (
        <>

            <Paper className={classes.paper}>
                <Grid container direction={"column"}>
                    <Grid item className={classes.header} container alignItems={"center"} justify={"center"}>
                        <div className={classes.headerText}>
                            چت روم
            </div>
                    </Grid>
                    <Grid item className={classes.middle} direction={"column"} ref={scrollableGrid}>
                        {
                            Chatmessages.map((message) => {
                                return <Grid item container style={{ margin: "15px 0px" }} className={`${message.name=== state.name?null: classes.messageDir}`}>
                                    <Grid item>
                                        <img src={message.gender==0?"boy.png":"girl.png"} style={{ width: "40px", borderRadius: "50%", margin: "10px" }} />
                                    </Grid>
                                    
                                    <Grid item className={`${message.name===state.name?classes.messageMe:classes.messageHe}`}>
                                    <div className={classes.messageSender}>{message.name}</div>
                                        <p> {message.msg}</p>
                          <div style={{display:"flex",alignItems: "center"}}>
                          <div>{message.date}</div>
                            <IconButton onClick={()=>ondeleteClick(message.id)}>
                            <div style={{fontSize: "17px"}}>
                                <span className={"fa fa-trash"}></span>
                            </div>
                            </IconButton>
                          </div>
                                    </Grid>

                                </Grid>
                            })
                        }

                    </Grid>
                    <Grid item className={classes.footer} container justify={'center'} alignItems={"center"}>
                        <Grid item xs>
                            <InputBase value={newMessage} onChange={e => setNewMessage(e.target.value)}
                                className={classes.input} onKeyDown={EnterButton} />
                            
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