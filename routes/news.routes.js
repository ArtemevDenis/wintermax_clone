const {Router} = require('express')
const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()

router.get(
    '/all',
    adminMiddleware,
    async (req, res) => {
        try {

            const getAllNews = 'select * from news';

            await global.connectionMYSQL.execute(getAllNews, [],
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
    '/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            await global.connectionMYSQL.execute("SELECT * FROM news where ID=?", [id],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let news = results[0]
                    if (!news) {
                        return res.status(400).json({error: 'Новость не найдена'})
                    }

                    res.json({title: news.title, date: news.date, text: news.text})
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
            await global.connectionMYSQL.execute("SELECT * FROM news ORDER BY ID DESC LIMIT ?", [count],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let news = results

                    res.json(news)
                });

        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }

    })

router.post(
    '/create',
    adminMiddleware,
    async (req, res) => {
        try {
            const {title, description} = req.body;
            const date = new Date().toISOString().slice(0, 10).replace('T', ' ');
            const insertNews = ' INSERT INTO news (title, date, text) VALUES (?, ?, ?)'
            await global.connectionMYSQL.execute(insertNews, [title, date, description],
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
    '/delete/:ID',
    adminMiddleware,
    async (req, res) => {
        try {
            const newsID = req.params.ID
            const deleteNews = ' delete from news where ID = ?'
            await global.connectionMYSQL.execute(deleteNews, [newsID],
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
            res.status(500).json({error: 'Упс, что то пошло не так...'})
        }
    }
)


module.exports = router;