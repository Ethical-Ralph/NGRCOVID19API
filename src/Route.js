const express = require('express')
const Controller = require('./Controller')

const app = express.Router()

app.get('/totals', Controller.getTotals)

app.get('/states', Controller.getAllStatesTotal)

app.get('/states/:state', Controller.getStateTotal)

app.get('/timelines', Controller.timeline)

module.exports = app
