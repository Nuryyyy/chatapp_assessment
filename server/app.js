const express = require("express");
const cors = require("cors");
const {connectDatabase} = require("./pool.js")
const {corsOptions} = require('./config/corsOptions')

const userRoutes = require("./routes/userRoutes")

const pool = connectDatabase()
const app = express()


require("dotenv").config()
const port = process.env.PORT


// app.use(cors())
app.use(express.json())
app.use(cors(corsOptions))

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

//

// app.post('/register', async (req, res) => {
//     try {
//         const {
//             username,
//             email,
//             password,
//             // confirmPassword
//         } = req.body

//         console.log(`${username}`)
//         console.log(`${email}`)
    
//             //Check if the user is already existing
//             const user = await pool.query(`SELECT * FROM userinfo WHERE username = $1`, [username])
//             console.log("2")
//             if (user.rows.length > 0) {
//                 res.status(401).send("Username is already taken")
//             }
//             console.log(2.5)
    
//             //Setup Bcrypt for password hashing
//             // const salt = await bcrypt.genSalt(10);
//             // const bcryptPassword = await bcrypt.hash(password, salt);
//             // const salt = await bcrypt.genSaltSync(10);
//             // const password = await req.body.password;
    
//             //Add the new user into the database
//             //generate the uuid using the uuidv4() function
//             console.log("3")
//             const newUser = await pool.query(`INSERT INTO userinfo(userid, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`, [uuidv4(),username, email, password])
// 			res.json(newUser.rows[0])
//             console.log("4")
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({
//             msg: "Unauthenticated"
//         });
//     }

//     }
// )