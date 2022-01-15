const express = require('express')
const app = express()
const path = require('path')
const method_override = require('method-override')
require('dotenv').config()
const DB = require('./DB/db')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: false
}))
app.use(method_override('_method'))

const uri = require('./router/uri')
app.use('/', uri)

const port = process.env.PORT || 3000
const start = async() => {
    await DB()
    app.listen(port, () => {

        console.log(`you are listen in port ${port}`)
    })
}
start()