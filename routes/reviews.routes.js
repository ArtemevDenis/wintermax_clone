const {Router} = require('express')

const AuthMiddleware = require('../middleware/auth.middleware')
const router = Router()



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

router.post('/', AuthMiddleware, async function (req, res) {
    const {productID, authorID, text, rating} = req.body
    const date = new Date().toISOString().slice(0, 10).replace('T', ' ');
    const insertReviews = 'insert into reviews (productID, authorID, text, date, rating) VALUE (?,?,?,?,?)'
    new Promise((resolve, reject) => {
        global.connectionMYSQL.execute(insertReviews, [productID, authorID, text, date, rating],
            async function (err, results) {
                if (err) {
                    reject(err)
                }
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