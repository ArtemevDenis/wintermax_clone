const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')

const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()

const multer = require('multer');

// var upload = multer({ dest: './public/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: storage})



router.post('/upload', upload.single('imgSlider'), async function (req, res) {
    const link = req.body.link
    const img = req.file.filename
    const insertSliderImage = 'insert into slider (img, link) VALUE (?,?)'

    new Promise((resolve, reject) => {
        global.connectionMYSQL.execute(insertSliderImage, [img, link],
            async function (err, results) {
                if (err) {
                    reject(err)
                }
                console.log(results)
                if (results.affectedRows > 0)
                    resolve({code: 200})
            }
        )
    }).then(r => {
        res.json({code: 200})
    }).catch(err => {
        console.error(err)
        res.status(500).json({error: err})
    })
});
module.exports = router;