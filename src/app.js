const express = require('express')
const cors = require('cors')
const consign = require('consign')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

consign({ cwd: 'src' }).include('routes').then('services').into(app)

module.exports = app
