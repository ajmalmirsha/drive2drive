const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/userRouter");
const ownerRouter = require("./Routes/ownerRouter");
const adminRouter = require("./Routes/adminRouter");
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const socket = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(
  cors({
    origin: [process.env.BASE_URL, "http://localhost:3000", "*"],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use("/public/images", express.static("public/images"));
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to database");
});

app.use(express.json());

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`server connected to ${PORT}`);
});

app.use("/", userRouter);
app.use("/owner", ownerRouter);
app.use("/admin", adminRouter);

const io = socket(server, {
  cors: {
    origin: [process.env.BASE_URL, "http://localhost:3000"],
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.emit("new-user", userId);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });
  socket.on("send-notification", (data) => {
    if (data.data.owner) {
      io.emit("notification-recieve-owner", data);
    }
    if (data.data.user) {
      io.emit("notification-recieve-user", data);
    }
  });
});
