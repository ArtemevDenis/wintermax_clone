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
                        console.log(productID)
                        const insert = 'insert into carts (ownerID, productsList) value(?,?)'
                        global.connectionMYSQL.execute(insert, [userID, productID[0]],
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
            let sql = 'select * from carts where ownerID = ? && isDelete = 0'
            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
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
    authMiddleware,
    async (req, res) => {
        try {
            const {userID} = req.body;
            let sql = 'select productsList, promoCode, ID from carts where ownerID = ? && isDelete = 0'
            await global.connectionMYSQL.execute(sql, [userID],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (!results) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (results.length[0]) {
                        res.status(200).json({message: 'Корзина пустая', list: []})
                    } else {
                        let promo = results[0].promoCode;
                        const cartID = results[0].ID;
                        const arrProductList = results[0].productsList.split(',')
                        let reqMysql = '('
                        for (let i = 0; i < arrProductList.length - 1; i++) {
                            reqMysql += ` SELECT ${arrProductList[i]} id UNION ALL `
                        }
                        reqMysql += `SELECT ${arrProductList[arrProductList.length - 1]} id) t2`;
                        const select = ` select products.* from products, ${reqMysql}  where  products.ID = t2.id `
                        await global.connectionMYSQL.execute(select,
                            async function (err, results2) {
                                if (err) {
                                    console.error(err)
                                    res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                }
                                let price = 0
                                results2.forEach((product) => price += product.cost)
                                const getPromo = 'select sale from promoCodes where secret = ? && isDelete = 0'
                                await global.connectionMYSQL.execute(getPromo, [promo],
                                    async function (err, sale) {
                                        if (err) {
                                            console.error(err)
                                            res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                        }
                                        let promoSale = 0
                                        if (sale[0]) {
                                            promoSale += sale[0].sale
                                        }
                                        const getIsSubscribe = "select isSubscribe from usersSubscribe where userID = ?";
                                        await global.connectionMYSQL.execute(getIsSubscribe, [userID],
                                            function (err, isSubscribe) {
                                                if (err) {
                                                    console.error(err)
                                                    res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                                }
                                                if (!isSubscribe[0]) {
                                                    res.status(500).json({error: 'Упс, что то пошло не так...'})
                                                }
                                                if (isSubscribe[0].isSubscribe) {
                                                    promoSale += 5;
                                                }

                                                price = price - (price / 100 * promoSale);


                                                res.status(200).json({
                                                    message: 'В корзине есть товары',
                                                    list: results2,
                                                    totalPrice: price,
                                                    sale: promoSale,
                                                    cartID: cartID,
                                                    promoCode: promo,
                                                })
                                            })
                                    })
                            })
                    }
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })

router.post(
    '/promo',
    authMiddleware,
    async (req, res) => {
        try {
            const {cartID, promoCode} = req.body;

            const update = 'update carts set promoCode = ? where ID = ?'
            await global.connectionMYSQL.execute(update, [promoCode, cartID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    res.status(200).json({message: 'Промокод применен'})
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })


router.delete(
    '/removeitem',
    authMiddleware,
    async (req, res) => {
        try {
            const {cartID, productID} = req.body;

            console.log("cartID: " + cartID);
            console.log("productID: " + productID);

            const select = 'select * from carts where ID = ?'
            await global.connectionMYSQL.execute(select, [cartID],
                async function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    console.log(results[0])
                    const cart = results[0];
                    const oldList = cart.productsList.split(',');
                    console.log('oldList: ');
                    console.log(oldList);
                    const index = oldList.indexOf('' + productID);
                    console.log("index: " + index);
                    console.log("productID: " + productID);
                    if (index > -1) {
                        oldList.splice(index, 1);
                    }
                    const update = 'update carts set productsList = ? where ID = ?'
                    await global.connectionMYSQL.execute(update, [oldList.join(','), cartID],
                        async function (err, results) {
                            if (err) {
                                console.error(err)
                                res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                            }

                            res.status(200).json({message: 'Товар удален'})
                        })

                    // console.log(results[0])
                    // if (results.length[0]) {
                    //     res.status(200).json({message: 'Корзина пустая', size: 0})
                    // } else {
                    //     res.status(200).json(results[0])
                    // }
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })


module.exports = router;