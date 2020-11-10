var cors = require('cors')
const express = require("express");
const io = require("socket.io");

const app = express();
app.use(cors())
app.get("/", (req, res) => {
//   res.header("Access-Control-Allow-Headers","*");
// res.header('Access-Control-Allow-Credentials', true);
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.send("salam . I am alive");
});
app.get("/salam", (req, res) => {
  res.send("hellow world");
 
});
// nodemon server.js
const server = app.listen(3010, (err) => {
  console.log("App Listen to port 3010");
});

const socket = io(server);
const mySocket = socket.of("/socket");

mySocket.on("connection", (socket) => {
  console.log("new User Connected");

  socket.on("newMessage",(message)=>{
    console.log(message.msg);
  })
  socket.on("newMessage", (message) => {
    console.log(message.msg);
    mySocket.emit("newMessage", {...message, date: new Date(), id: Math.floor(Math.random() * Math.pow(10, 7))});
  });
  // socket.on("deleteMsg", (id) => {
  //   console.log(id);
  //   mySocket.emit("deleteMsg",id);
  // });

  // socket.on("disconnect", () => {
  //   console.log("User disconnected")
  // })
});

