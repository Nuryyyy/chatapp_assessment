const express = require("express");
const cors = require("cors");
const {connectDatabase} = require("./pool.js")
const {corsOptions} = require('./config/corsOptions')
const bodyParser = require('body-parser')
const upload = require('./middleware/upload.js')
const userRoutes = require("./routes/userRoutes")
const msgRoutes = require("./routes/msgRoutes")
const pool = connectDatabase()
const socket = require('socket.io')

const app = express()


require("dotenv").config()
const port = process.env.PORT


//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use("/upload", express.static("../client/public/uploads/"))

//router
app.use("/api/auth", userRoutes)
app.use("/api/message", msgRoutes)




const server = app.listen(port, () => {
  console.log(`Server has started on http://localhost:${port}`);
});

pool.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });



app.get('/public', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.send("public")
})

app.get('/api', async (req, res) => {
    try{
    let list = await pool.query(`SELECT * FROM public.userinfo`) 
    
    res.json(list.rows)
    console.log(list.rows)
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
}
)

//route to upload photo
app.post("/upload", (req, res, next) => {
    upload.single('image')(req, res, function (error) {
      if (error) {
        console.log(`upload.single error: ${error}`);
        return res.sendStatus(500);
      }
      const image = req.file
      // console.log("reqfile:", req.file)
      console.log("imagefilename:",image.filename)
    // console.log("reqfile:", req.file)
    res.status(200).json(image.filename)
    })
});

const io = socket(
    server,
  {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  },
})
  
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userid) => {
    onlineUsers.set(userid, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});