const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTION") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]  // Bearer asdkjakl
        if (!token) {
            res.status(401).json({ message: "Пользователь неавторизован" })
        }
        const  decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (e) {
        res.send(e)
        res.status(401).json({ message: "Пользователь неавторизован" })
    }
}