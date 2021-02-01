const {Router} = require('express')

const router = Router()

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: storage})

router.get('/', async function (req, res) {
    new Promise(async (resolve, reject) => {
        const selectSlide = 'select * from slider'
        await global.connectionMYSQL.execute(selectSlide, [],
            async function (err, results) {
                if (err) {
                    reject(err)
                }
                if (results.length > 0)
                    resolve({code: results})
            }
        )
    }).then(r => {
        res.json(r)
    })
})


router.delete('/:id', async function (req, res) {
    const id = req.params.id
    new Promise(async (resolve, reject) => {
        const deleteSlider = 'delete from slider where ID = ?'
        await global.connectionMYSQL.execute(deleteSlider, [id],
            async function (err, results) {
                if (err) {
                    reject(err )
                }

                resolve({code: results})
            }
        )
    }).then(r => {
        res.json(r)
    })
})


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
                if (results.affectedRows > 0)
                    resolve({code: 200 })
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