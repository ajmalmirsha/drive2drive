const express = require('express')
const cors = require('cors')
const userRouter = require('./Routes/userRouter')
const ownerRouter = require('./Routes/ownerRouter')
const adminRouter = require('./Routes/adminRouter')
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const socket = require("socket.io");
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
app.use(cors({
    origin:[process.env.BASE_URL],
    method: ['GET','POST','DELETE','PUT','PATCH'],
    credentials:true
}))
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/public/images',express.static('public/images'))
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to database');
})

app.use(express.json())

const PORT = process.env.PORT || 4000
const server =  app.listen(PORT,()=>{
    console.log(`server connected to ${PORT}` );
})

app.use('/',userRouter)
app.use('/owner',ownerRouter)
app.use('/admin',adminRouter)


const io = socket(server, {
    cors: {
      origin: [process.env.BASE_URL],
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
 
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      console.log('on add user',userId);
      onlineUsers.set(userId, socket.id)
      socket.emit('new-user',userId)
    });
  
    socket.on("send-msg", (data) => {
      console.log('on msg send', data);      
      const sendUserSocket = onlineUsers.get(data.to);
      console.log(sendUserSocket,90,onlineUsers);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data);
      }
    });
    socket.on("send-notification", (data) => {
      console.log(onlineUsers,'on notification send', data);      
     if ( data.data.owner ) {
       io.emit("notification-recieve-owner", data);
     }
     if ( data.data.user ) {
       io.emit("notification-recieve-user", data);
     }
    });
  });
  