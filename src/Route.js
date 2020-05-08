const express = require('express');
const Controller = require('./Controller');

const app = express.Router();

app.get('/totals', Controller.getNationalTotals);

app.get('/states', Controller.getAllStatesTotal);

app.get('/states/:state', Controller.getStateTotal);

app.get('/timelines', Controller.nationalTimeline);

app.get('/timelines/states', Controller.stateTimelines);

app.get('/timelines/states/:state', Controller.timelineForState);

module.exports = app;
