const {register, login, uploadImage, getAllUsers} = require("../controller/userControllers")
const router =  require('express').Router()

router.get('/allusers/:userid', getAllUsers)

//post
router.post('/register', register)
router.post('/login', login)

router.put('/:userid', uploadImage)


module.exports = router;
