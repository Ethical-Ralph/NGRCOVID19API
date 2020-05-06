const cron = require('node-cron');
const totalsService = require('./totalsService');
const statesService = require('../service/statesService');
const timelineService = require('../service/timelineService');
const { validateStateData, validateTotals } = require('../utils/validator');
const { subtractDayFromDate } = require('../utils/utils');

/**
 * Schedule to fetch and save new total data
 */
const scheduleToGetTotalData = () => {
    let times = 0;

    //Runs job every 1 hour
    cron.schedule('59 * * * *', async () => {
        try {
            const newTotals = await totalsService.fetchNewLatest();
            const isValid = validateTotals(newTotals);
            if (isValid) {
                const isDeleted = await totalsService.deleteOldTotals();
                if (isDeleted) {
                    await totalsService.saveNewData(newTotals);
                    times++;
                    console.log('Totals data updated', times);
                }
            } else {
                throw 'Invalid Data';
            }
            console.log('Totals cron done');
        } catch (error) {
            console.log(error);
        }
    });
};

/**
 * Schedule to fetch and save new state data
 */
const scheduleToGetStateData = () => {
    let times = 0;

    //Runs job every 1 hour
    cron.schedule('59 * * * *', async () => {
        try {
            const newStateTotals = await statesService.fetchNewStateData();
            const isValid = validateStateData(newStateTotals);
            if (isValid) {
                const isDeleted = await statesService.deleteOldTotals();
                if (isDeleted) {
                    await statesService.saveNewData(newStateTotals);
                    times++;
                    console.log('States data updated', times);
                }
            } else {
                throw 'Invalid Data';
            }
            console.log('State cron done');
        } catch (error) {
            console.log(error);
        }
    });
};

const scheduleToCreateTimeline = () => {
    //Runs job every day at 1:00 AM
    cron.schedule('* 1 * * *', async () => {
        try {
            const newTotals = await totalsService.getTotals();
            const lastTimelineDate = subtractDayFromDate(2);
            const previousTimeline = await timelineService.getTimelineByDate(
                lastTimelineDate,
            );
            await timelineService.createTimeline(previousTimeline, newTotals);
            console.log('Timeline cron done');
        } catch (error) {
            console.log(error);
        }
    });
};

const startCronJobs = () => {
    scheduleToGetTotalData();
    scheduleToGetStateData();
    scheduleToCreateTimeline();
};

module.exports = {
    startCronJobs,
};
