const {Router} = require('express')

const router = Router()


router.get(
    '/:id',
    async (req, res) => {
        try {
            console.log(req.params.id)
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
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }
    })

router.get(
    '/count/:count',
    async (req, res) => {

        try {
            const start = new Date().getTime();
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
            const end = new Date().getTime();
            console.log(`SecondWay: ${end - start}ms`);

        } catch (e) {
            res.status(500).json({error: 'Упс, что то пошло не так... kek'})
        }

    })

module.exports = router;