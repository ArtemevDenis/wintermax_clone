const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/adminAuth.middleware')

const router = Router()


router.get("/:id", adminMiddleware, async (req, res) => {
    try {
        const userID = req.params.id
        if (userID) {
            const sql = "select * from users where ID = ?";


            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (results.length > 0) {
                        res.json(results[0])
                    }

                });
        } else
            res.status(500).json({error: 'Упс, что то пошло не так...'})
    } catch (e) {
        res.status(500).json({error: 'Упс, что то пошло не так...'})
    }
})

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {userID} = req.body;
        if (userID) {
            const sql = "select isSubscribe from usersSubscribe where userID = ?";


            await global.connectionMYSQL.execute(sql, [userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let isSubscribe = results[0]
                    if (!isSubscribe) {
                        return res.status(400).json({error: 'Пользователь не найден'})
                    }

                    res.json(isSubscribe)
                });
        } else
            res.status(500).json({error: 'Упс, что то пошло не так...'})
    } catch (e) {
        res.status(500).json({error: 'Упс, что то пошло не так...'})
    }
})


router.patch("/setSubscribe", async (req, res) => {
    try {
        const {userID, isSubscribe} = req.body
        if (userID) {
            const sql = "update usersSubscribe set  isSubscribe = ? where userID = ?";
            await global.connectionMYSQL.execute(sql, [isSubscribe, userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    if (results.affectedRows === 0) {
                        return res.status(400).json({error: 'Пользователь не найден'})
                    }

                    res.status(201).json({message: 'Ok'})
                });
        } else
            res.status(500).json({error: 'Упс, что то пошло не так...'})
    } catch (e) {
        res.status(500).json({error: 'Упс, что то пошло не так...'})
    }
})

module.exports = router;
