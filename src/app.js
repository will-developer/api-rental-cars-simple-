const express = require('express')
const cors = require('cors')
const consign = require('consign')
const dotenv = require('dotenv')

const carsRoutes = require('./routes/carsRoutes')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(carsRoutes)

consign({ cwd: 'src' }).include('routes').into(app)

module.exports = app
