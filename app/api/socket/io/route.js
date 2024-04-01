
const { createServer } = require("http")
const { Server } = require("socket.io")


const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connection", async (socket) => {
  console.log(socket.id)
  socket.on("newMessage", async (msg) => {
    console.log(msg)
    
    socket.broadcast.emit("broadcastNewMessage", msg)
  })
})

httpServer.listen(5000, () => {
  console.log("listen port 5000")
})
