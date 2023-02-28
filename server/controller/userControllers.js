const {connectDatabase} = require("../pool.js")
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');


const pool = connectDatabase()



// create account for new user

module.exports.register = async (req, res, next) => {
    try {
        const {
            username,
            email,
            password,
            image
            // confirmPassword
        } = req.body
    
            //Check if the user is already existing
            const user = await pool.query(`SELECT * FROM userinfo WHERE username = $1`, [username])
            const useremail = await pool.query(`SELECT * FROM userinfo WHERE email = $1`, [email])
            if (user.rows.length > 0) {
                return res.status(401).send({msg: "Username is already used"})
            }

            if (useremail.rows.length > 0) {
                return res.status(401).send({msg: "Email is already used"})
            }
    
            //Setup Bcrypt for password hashing
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);
       
    
            //Add the new user into the database
            //generate the uuid using the uuidv4() function
        const newUser = await pool.query(`INSERT INTO userinfo(userid, username, email, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), username, email, bcryptPassword, image])
        
            
        const userid = newUser.rows[0].userid
        // const {password,...others} = user.rows[0]
        res.status(200).json({ userid, username, email, image })
        console.log(newUser.rows[0])
    } catch (error) {
        console.error(error.message);
        // res.status(500).send({
        //     msg: "Unauthenticated"
        // });
        next(error)
    }
        
}

module.exports.login = async (req, res, next) => {
    try {

    //take the username and password from the req.body
    const {
        username,
        password
    } = req.body;

    //Check if the user is not existing
    const user = await pool.query(`SELECT * FROM public.userinfo WHERE username = $1`, [username])

    if (user.rows.length === 0) {
        console.log("failed login")
        return res.status(401).json({msg: "User does not exists"})
        // return res.json({ msg: "Incorrect Username or Password", status: 401 });
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!validPassword) {
        console.log("failed login")
        // return res.json({msg: "Password is incorrect.", status: false})
        return res.status(401).json({msg: "Password is incorrect"})
        // return res.status(401).json({ msg: "Incorrect Username or Password", status: 401 });
        

    }
  

        
    else {
            const userid = user.rows[0].userid
            const image = user.rows[0].image
            return res.status(200).json({ userid, username, image })
        }
       
    



    } catch (error) {
        // console.error(error.message);
        // res.status(500).send({
        //     msg: "Unauthenticated"
        // });
        next(error)
        
    }
}
    
//upload photo using multer
module.exports.uploadImage = async (req, res, next) => {
    try {
        const { image } = req.body//image.filename
        // console.log("backendimage:", image)
        const userID = req.params.userid
        // console.log("userid", userID)
      
        // const username = req.user.username
       
        const imageUpload = await pool.query("UPDATE userinfo SET image = $1 WHERE userid = $2", [image, userID])
        const user =  await pool.query(`SELECT * FROM userinfo WHERE userid = $1`, [userID])
        res.status(200).send(image)
    } catch (error) {
        
    }

}

//get users except the current user
module.exports.getAllUsers = async (req, res) => {
    try {

        const userID = req.params.userid

        //to get all users info except for the current user
        const getAllUsers = await pool.query('SELECT userid, username, email, image FROM userinfo EXCEPT SELECT userid, username, email, image FROM userinfo WHERE userid= $1',[userID])
        
        // return res.json(getAllUsers.rows)
        res.status(200).send(getAllUsers.rows)
        
    } catch (error) {
        console.log(error)
    }
}