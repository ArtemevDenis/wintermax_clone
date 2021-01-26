const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/adminAuth.middleware')

const router = Router()


router.post(
    '/',
    authMiddleware,
    async (req, res) => {
        try {
            const {userID, addressDelivery, dateDelivery, cartID} = req.body;

            if (!userID || !addressDelivery || !dateDelivery || !cartID)
                res.status(500).json({error: 'Упс, что то пошло не так...'})

            const getCart = 'select * from carts where ID = ?'

            await global.connectionMYSQL.execute(getCart, [cartID],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }

                    if (results.length === 0)
                        res.status(500).json({error: 'Упс, что то пошло не так... корзина не найдена'})

                    const productsList = results[0].productsList
                    const totalPrice = results[0].totalPrice
                    const date = new Date().toISOString().slice(0, 10).replace('T', ' ');

                    const insertOrder = 'insert into orders (ownerID, productsList, addressDelivery, dateDelivery, date, totalPrice) value(?,?,?,?,?,?)'

                    await global.connectionMYSQL.execute(insertOrder, [userID, productsList, addressDelivery, dateDelivery, date, totalPrice],
                        async function (err2, results2) {
                            if (err2) {
                                console.error(err2)
                                res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                            }
                            if (results2.affectedRows === 1) {
                                const sqlDeleteCart = 'update carts set isDelete  = ? where ID =?'
                                await global.connectionMYSQL.execute(sqlDeleteCart, [1, cartID],
                                    async function (err3, results3) {
                                        if (results3.affectedRows === 1) {
                                            res.status(200).json({message: 'OK', code: 200})
                                        } else res.status(500).json({error: 'Упс, что то пошло не так...'})
                                    }
                                )
                            }
                        }
                    )
                }
            )
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    }
)


router.post(
    '/update',
    adminMiddleware,
    async (req, res) => {
        try {
            const {ID, status} = req.body;

            const updateStatus = 'update orders set status = ? where ID = ?'

            await global.connectionMYSQL.execute(updateStatus, [status, ID],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }

                }
            )
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    }
)


//TODO adminMiddleware
router.get(
    '/all',
    adminMiddleware,
    async (req, res) => {
        try {
            const {email, password} = req.body;


            await global.connectionMYSQL.execute("SELECT * FROM orders order by date",
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    res.json({results})
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    }
)


router.get(
    '/:userID',
    authMiddleware,
    async (req, res) => {
        try {
            const userID = req.params.userID

            await global.connectionMYSQL.execute("SELECT * FROM orders where ownerID  = ? order by date DESC",
                [userID],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    res.json({results})
                }
            );


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    }
)


module.exports = router;