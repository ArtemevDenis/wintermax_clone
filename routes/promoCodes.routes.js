const {Router} = require('express')
const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()


router.post(
    '/create',
    adminMiddleware,
    async (req, res) => {
        try {
            const {secret, sale} = req.body;
            const insertPromo = ' INSERT INTO promocodes (secret, sale) VALUES (?, ?)'

            await global.connectionMYSQL.execute(insertPromo, [secret, sale],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (results.affectedRows === 1)
                        res.json({code: 200})
                }
            )
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    }
)

router.get(
    '/all',
    adminMiddleware,
    async (req, res) => {
        try {

            const getAllPromo = ' select * from promocodes'

            await global.connectionMYSQL.execute(getAllPromo, [],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    res.json(results)

                }
            )
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    }
)


router.get(
    '/delete/:ID',
    adminMiddleware,
    async (req, res) => {
        try {

            const promoID = req.params.ID
            const deletePromo = ' delete from promocodes where ID = ? '

            await global.connectionMYSQL.execute(deletePromo, [promoID],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (results.affectedRows > 0)
                        res.json({code: 200})

                }
            )
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... '})
        }
    }
)

module.exports = router;

