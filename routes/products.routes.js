const {Router} = require('express')

const router = Router()


router.get(
    '/:id',
    async (req, res) => {
        try {
            console.log(req.params.id)
            const id = req.params.id
            const sql = "select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.link  from products inner JOIN productsImg  where products.ID = ?    && productsImg.productID = products.ID  group by products.ID "
            await global.connectionMYSQL.execute(sql, [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({message: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let product = results[0]
                    if (!product) {
                        return res.status(400).json({message: 'Товар не найден'})
                    }

                    res.json(product)
                });


        } catch (e) {
            res.status(500).json({message: 'Упс, что то пошло не так... kek'})
        }
    })

router.post(
    '/filter',
    async (req, res) => {
        try {
            console.log(req)
            const minPrice = req.body.filter.minPrice ? req.body.filter.minPrice : 0;
            const maxPrice = req.body.filter.maxPrice ? req.body.filter.maxPrice : Number.MAX_VALUE;
            const types = req.body.filter.types;
            let typesReq = '';


            if (types) {
                const typesArr = types;
                if (typesArr && typesArr.length >= 1) {
                    typesArr.map((type) => {
                        typesReq += ", " + "'" + type + "'"
                    })
                    typesReq = typesReq.substr(2, typesReq.length)
                } else {
                    typesReq = "'snowboard', 'skiing', 'sleigh', 'skates'"
                }
            } else {
                typesReq = "'snowboard', 'skiing', 'sleigh', 'skates'"
            }

            // let sql = "SELECT * FROM products where cost >= ? && cost < ? && type IN (" + typesReq + ")"
            // let sql = "select  products.*, productsImg.link from products inner JOIN productsImg where productsImg.productID = products.ID && cost >= ? && cost < ? && type IN (" + typesReq + ") group by products.ID"
            let sql = "select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.link  from products inner JOIN productsImg  where productsImg.productID = products.ID   && cost >= ? && cost < ? && type IN (" + typesReq + ") group by products.ID"

            await global.connectionMYSQL.execute(sql, [minPrice, maxPrice],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({message: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let products = results
                    res.json(products)
                });
        } catch (e) {
            res.status(500).json({message: 'Упс, что то пошло не так... kek'})
        }
    })

router.get(
    '/count/:count',
    async (req, res) => {
        try {
            const count = req.params.count
            // const sql = 'SELECT  products.*, productsImg.link FROM products inner JOIN productsImg where productsImg.productID = products.ID  group by products.ID  ORDER BY popular DESC LIMIT ?;'
            const sql = 'select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.link  from products inner JOIN productsImg  where productsImg.productID = products.ID   group by products.ID ORDER BY popular DESC LIMIT ?;'
            await global.connectionMYSQL.execute(sql, [count],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({message: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let products = results

                    res.json(products)
                });


        } catch (e) {
            res.status(500).json({message: 'Упс, что то пошло не так... kek'})
        }
    })

module.exports = router;