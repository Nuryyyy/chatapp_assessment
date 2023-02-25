const { addMsg, getAllMsg } = require('../controller/msgController');

const router =  require('express').Router()

router.post('/addMsg', addMsg)
router.post('/getMsg', getAllMsg)


module.exports = router;