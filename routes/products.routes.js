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

router.post(
    '/create', upload.any(),
    async (req, res) => {
        try {
            const {title, description, cost, productID, type} = req.body
            const img = req.files;


            if (productID === 'create') {
                const insertIntoProducts = 'insert into products (title, description, cost, type, popular) values (?, ?,?, ?,?)'

                new Promise(async resolve => {
                    await global.connectionMYSQL.execute(insertIntoProducts, [title, description, cost, type, 0],
                        function (err, results) {
                            if (err) {
                                console.error(err)
                                res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                            }
                            resolve(results.insertId)
                        });
                }).then(productID => {
                        new Promise(async resolve => {
                            for (let i = 0; i < img.length; i++) {
                                const insertIntoProductsImg = 'insert into productsimg (img, productID) VALUES (?,?)'
                                await global.connectionMYSQL.execute(insertIntoProductsImg, [img[i].filename, productID],
                                    function (err, results) {
                                        if (err) {
                                            console.error(err)
                                            res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                        }
                                    });
                            }
                            resolve({code: 200})
                        })
                    }
                ).then(r => res.json(r))
            } else {
                const updateIntoProducts = 'update products SET title = ?, description = ?, cost = ?, type =? where ID = ?'

                new Promise(async resolve => {
                    await global.connectionMYSQL.execute(updateIntoProducts, [title, description, cost, type, productID],
                        function (err, results) {
                            if (err) {
                                console.error(err)
                                res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                            }
                            resolve(productID)
                        });
                }).then(productID => {
                        new Promise(async resolve => {
                            for (let i = 0; i < img.length; i++) {
                                const insertIntoProductsImg = 'insert into productsimg (img, productID) VALUES (?,?)'
                                await global.connectionMYSQL.execute(insertIntoProductsImg, [img[i].filename, productID],
                                    function (err, results) {
                                        if (err) {
                                            console.error(err)
                                            res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                                        }
                                    });
                            }
                            resolve({code: 200})
                        })
                    }
                ).then(r => res.json(r))
            }
        } catch
            (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    }
)


router.get(
    '/all',
    async (req, res) => {
        try {
            const sql = 'select * from products'
            await global.connectionMYSQL.execute(sql, [],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let products = results

                    res.json(products)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })


router.delete(
    '/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const sql = "delete from products where ID = ?"
            await global.connectionMYSQL.execute(sql, [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let product = results[0]
                    if (!product) {
                        return res.status(400).json({error: 'Товар не найден'})
                    }
                    res.json(product)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.post(
    '/list',
    async (req, res) => {
        try {
            const {productsList} = req.body
            const arrProductList = productsList.split(',');
            let reqMysql = '('
            for (let i = 0; i < arrProductList.length - 1; i++) {
                reqMysql += ` SELECT ${arrProductList[i]} id UNION ALL `
            }
            reqMysql += `SELECT ${arrProductList[arrProductList.length - 1]} id) t2`;
            const select = ` select products.* from products, ${reqMysql}  where  products.ID = t2.id `


            await global.connectionMYSQL.execute(select,
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    res.json(results)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.get(
    '/imgs/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const sql = "select img, ID from productsimg where productID = ?"
            await global.connectionMYSQL.execute(sql, [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (!results) {
                        return res.status(400).json({error: 'Товар не найден'})
                    }
                    res.json(results)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.delete(
    '/imgs/delete/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const sql = "delete from productsimg where ID = ?"
            await global.connectionMYSQL.execute(sql, [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (!results) {
                        return res.status(400).json({error: 'Товар не найден'})
                    }
                    res.json(results)
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.get(
    '/reviews/:id',
    async (req, res ) => {
        try {
            const id = req.params.id
            //(select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID)
            const sql = "select reviews.text, reviews.date, reviews.rating, (select email AS author from users where users.ID =reviews.authorID) as author from reviews where productID = ?"
            await global.connectionMYSQL.execute(sql, [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (!results) {
                        return res.status(400).json({error: 'Товар не найден'})
                    }
                    res.json(results)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.get(
    '/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const sql = "select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.img  from products inner JOIN productsImg  where products.ID = ?    && productsImg.productID = products.ID  group by products.ID "
            await global.connectionMYSQL.execute(sql, [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let product = results[0]
                    if (!product) {
                        return res.status(400).json({error: 'Товар не найден'})
                    }
                    res.json(product)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.post(
    '/filter',
    async (req, res) => {
        try {
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
            let sql = "select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.img  from products inner JOIN productsImg  where productsImg.productID = products.ID   && cost >= ? && cost < ? && type IN (" + typesReq + ") group by products.ID"

            await global.connectionMYSQL.execute(sql, [minPrice, maxPrice],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let products = results
                    res.json(products)
                });
        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })

router.get(
    '/count/:count',
    async (req, res) => {
        try {
            const count = req.params.count
            // const sql = 'SELECT  products.*, productsImg.link FROM products inner JOIN productsImg where productsImg.productID = products.ID  group by products.ID  ORDER BY popular DESC LIMIT ?;'
            const sql = 'select products.*, (select AVG(rating) AS AvgRating from reviews where reviews.productID =products.ID) AS AvgRating,   (select COUNT(rating) AS CountRating from reviews where reviews.productID =products.ID) AS CountReviews,  productsImg.img  from products inner JOIN productsImg  where productsImg.productID = products.ID   group by products.ID ORDER BY popular DESC LIMIT ?;'
            await global.connectionMYSQL.execute(sql, [count],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let products = results

                    res.json(products)
                });


        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    })


module.exports = router;