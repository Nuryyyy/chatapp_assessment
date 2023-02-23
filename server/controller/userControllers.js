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
            // confirmPassword
        } = req.body
    
            //Check if the user is already existing
            const user = await pool.query(`SELECT * FROM userinfo WHERE username = $1`, [username])
            const useremail = await pool.query(`SELECT * FROM userinfo WHERE email = $1`, [email])
            if (user.rows.length > 0) {
                res.status(401).send({msg: "Username is already used"})
            }

            if (useremail.rows.length > 0) {
                res.status(401).send({msg: "Email is already used"})
            }
    
            //Setup Bcrypt for password hashing
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);
            // const salt = await bcrypt.genSaltSync(10);
            // const password = await req.body.password;
    
            //Add the new user into the database
            //generate the uuid using the uuidv4() function
            const newUser = await pool.query(`INSERT INTO userinfo(userid, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`, [uuidv4(),username, email, bcryptPassword])
            
            res.status(200).json({username, email})
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
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
        return res.status(401).send({msg: "User does not exists"})
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!validPassword) {
        console.log("failed login")
        // return res.json({msg: "Password is incorrect.", status: false})
        return res.status(401).send({msg: "Password is incorrect."})
        
    }
  


    res.status(200).json({username})
       
    



    } catch (error) {
        // console.error(error.message);
        // res.status(500).send({
        //     msg: "Unauthenticated"
        // });
        next(error)
    }
    }