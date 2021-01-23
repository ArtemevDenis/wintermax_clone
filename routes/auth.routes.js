const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()


router.post(
    '/login',
    async (req, res) => {
        try {
            const {email, password} = req.body;
            await global.connectionMYSQL.execute("SELECT * FROM users where email=?", [email],
                function (err, results) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({message: 'Упс, что то пошло не так... соединение не установлено '})
                    }
                    let user = results[0]
                    if (!user) {
                        return res.status(400).json({message: 'Пользователь не найден'})
                    }
                    const isMatch = user.password.indexOf(password) === 0
                    if (!isMatch) {
                        return res.status(400).json({message: 'Не верный пароль'})
                    }
                    const token = jwt.sign(
                        {userID: user.id, userRole: user.role},
                        config.get('jwtSecret'),
                        {expiresIn: '1h'}
                    )
                    res.json({token, userID: user.ID, role: user.role, email: user.email})
                });


        } catch (e) {
            res.status(500).json({message: 'Упс, что то пошло не так... kek'})
        }
    })

module.exports = router;