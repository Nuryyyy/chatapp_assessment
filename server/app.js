const express = require("express");
const cors = require("cors");
const {connectDatabase} = require("./pool.js")
const {corsOptions} = require('./config/corsOptions')
const userRoutes = require("./routes/userRoutes")
const bodyParser = require('body-parser')
const upload = require('./middleware/upload.js')
const pool = connectDatabase()

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


//to connect with pool
pool.connect((err) => {
	if (err) {
		console.log(err) 
	}
	else {
		app.listen(port, () => {
			console.log(`Server has started on http://localhost:${port}`)
		})
	}
})


app.get('/',  (req, res)  =>  { 
    res.json(
	    { info:  'Hello welcome to chat' }
    )  
})

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
  