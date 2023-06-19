const dotenv = require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const model = require('./models/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const authenticateToken = require('./middlewares/authenticateToken')
const authMiddleware = require('./middlewares/authMiddleware')

const router = require('./routers/index')
const path = require('path')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.use(authenticateToken)
app.use(authMiddleware)

app.use(errorHandler)
//Обработка ошибок - последний Middleware



const port = process.env.port || 5000


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync(
            // { force: true}
        )
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))

    } catch (e) {
        console.log(e);
    }
}

start()


