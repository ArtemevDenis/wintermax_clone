const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post(
    '/add',
    authMiddleware,
    async (req, res) => {
        try {
            const {userID, productID} = req.body;
            // //let sql = "select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.img  from products inner JOIN productsImg  where productsImg.productID = products.ID   && cost >= ? && cost < ? && type IN (" + typesReq + ") group by products.ID"
            let sql = 'select * from carts where ownerID = ? && isDelete = 0'
            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (results.length === 0) {
                        const insert = 'insert into carts (ownerID, productsList) value(?,?)'
                        global.connectionMYSQL.execute(insert, [userID, productID,],
                            function (err, results) {
                                if (err) {
                                    console.error(err)
                                    res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                }
                                res.status(200).json({message: 'Ok create and add', size: 1})
                            })
                    } else {
                        const cartID = results[0].ID
                        const newProductList = results[0].productsList + ',' + productID;
                        const insert = 'update carts set productsList  = ? where ID = ?'

                        const cartSize = newProductList.split(",").length
                        global.connectionMYSQL.execute(insert, [newProductList, cartID],
                            function (err, results) {
                                if (err) {
                                    console.error(err)
                                    res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                }
                                console.log('ok ' + cartSize)
                                res.status(200).json({message: 'Ok add', size: cartSize})
                            })
                    }
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })


router.post(
    '/size',
    authMiddleware,
    async (req, res) => {
        try {
            const {userID} = req.body;

            console.log("size userID: " + userID);
            let sql = 'select * from carts where ownerID = ? && isDelete = 0'
            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    console.log('cartsize: ' + results)
                    if (results.length === 0) {
                        res.status(200).json({message: 'Ok', size: 0})
                    } else {
                        const newProductList = results[0].productsList;
                        const cartSize = newProductList.split(",").length
                        res.status(200).json({message: 'Ok add', size: cartSize})
                    }
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })

router.post(
    '/',
    async (req, res) => {
        try {
            const {userID} = req.body;

            console.log("get cart userID: " + userID);
            let sql = 'select productsList from carts where ownerID = ? && isDelete = 0'
            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    console.log(results[0])
                    if (results.length[0]) {
                        res.status(200).json({message: 'Корзина пустая', size: 0})
                    } else {
                        res.status(200).json(results[0])
                    }
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })

router.post(
    '/promo',
    async (req, res) => {
        try {
            const {userID, promo} = req.body;

            console.log("userID: " + userID);

            //TODO найти промкод и вставить его id  в соответсвующте поле
            let sql = 'select productsList from carts where ownerID = ? && isDelete = 0'
            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    console.log(results[0])
                    if (results.length[0]) {
                        res.status(200).json({message: 'Корзина пустая', size: 0})
                    } else {
                        res.status(200).json(results[0])
                    }
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })


module.exports = router;