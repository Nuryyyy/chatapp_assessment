const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/public/uploads/')
    },
    filename: (req, file, cb)  => {
      console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage,  
                        limits: {fileSize: 1024 * 1024 * 3} 
                      })


module.exports = upload