const express = require('express');
const Controller = require('./Controller');

const app = express.Router();

app.get('/', (req, res) => {
    return res.redirect(
        'https://github.com/Ethical-Ralph/NGRCOVID19API#readme',
    );
});

app.get('/totals', Controller.getNationalTotals);

app.get('/states', Controller.getAllStatesTotal);

app.get('/states/:state', Controller.getStateTotal);

app.get('/timelines', Controller.nationalTimeline);

app.get('/timelines/states', Controller.stateTimelines);

app.get('/timelines/states/:state', Controller.timelineForState);

app.get('/subscription', Controller.getAllSubscriptions);

app.post('/subscription', Controller.saveSubscription);

app.patch('/subscription/:id', Controller.updateSubscription);

module.exports = app;
