const express = require('express');
const routes = require('./Route');
const cronService = require('./service/cronService');
const { errorHandler } = require('./utils/errorhandler');
const { database } = require('./utils/database');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());

const isProd = process.env.NODE_ENV === 'production';

const MONGODB_URL = isProd
    ? process.env.MONGODB_URL
    : process.env.MONGODB_URL_LOCAL;

//Connect To Mongo Database
database(MONGODB_URL);

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', routes);

app.all('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Cron Services
cronService.startCronJobs();

app.use(errorHandler(app));

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, '0.0.0.0', () => {
    console.log('app live at ' + PORT);
});
