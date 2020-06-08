const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Route');
const cronService = require('./service/cronService');
const errorHandler = require('./utils/errorhandler');
const cors = require('cors');
require('dotenv').config();
const { NationalTimeline, StateTimeline } = require('./database');
const data = require('../newseed');

const app = express();

app.use(cors());

const isProd = process.env.NODE_ENV === 'production';

const MONGODB_URL = isProd
    ? process.env.MONGODB_URL
    : process.env.MONGODB_URL_LOCAL;

mongoose.connect(MONGODB_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    res.send('COVID-19 API FOR NIGERIA');
});

app.use('/api', routes);

app.all('*', (req, res, next) => {
    res.status(404).send(next());
});

mongoose.connection.once('open', async () => {
    // //    const aa = await NationalTimeline.insertMany(aaa)
    // console.log(data)
    // const aa = await StateTimeline.insertMany(data.seed)
    //    console.log(aa)
    console.log('mongodb connected');
});

cronService.startCronJobs();

app.use((req, res, next) => {
    const err = new Error();
    err.message = 'Not found';
    err.name = 'notfound';
    err.statusCode = 404;
    next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
    console.log('app live at ' + PORT);
});
