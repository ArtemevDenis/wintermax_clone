const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()
//authMiddleware,


router.post("/", authMiddleware, async (req, res) => {
    try {
        const {userID} = req.body
        console.log(req.body)
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
                    // console.log("isSubscribe:" + JSON.parse(isSubscribe));
                    console.log(isSubscribe)
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
        console.log(req.body)
        console.log('new isSubscribe: ' + isSubscribe)
        if (userID) {
            const sql = "update usersSubscribe set  isSubscribe = ? where userID = ?";


            await global.connectionMYSQL.execute(sql, [isSubscribe, userID],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({error: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    console.log(results.affectedRows === 0)
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
