const cron = require('node-cron');
const nationalTotalsService = require('./nationalTotalsService');
const statesTotalService = require('./statesTotalService');
const nationalTimelineService = require('./nationalTimelineService');
const stateTimelineService = require('../service/stateTimelineService');
const { validateStateData, validateTotals } = require('../utils/validator');
const { subtractDayFromDate } = require('../utils/utils');

/**
 * Schedule to fetch and save new total data
 */
const scheduleToGetTotalData = () => {
    let times = 0;

    //Runs job every 1 hour
    cron.schedule('30 * * * *', async () => {
        try {
            const newTotals = await nationalTotalsService.fetchNewLatest();
            const isValid = validateTotals(newTotals);
            if (isValid) {
                const isDeleted = await nationalTotalsService.deleteOldTotals();
                if (isDeleted) {
                    await nationalTotalsService.saveNewData(newTotals);
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
    cron.schedule('30 * * * *', async () => {
        try {
            const newStateTotals = await statesTotalService.fetchNewStateData();
            const isValid = validateStateData(newStateTotals);
            if (isValid) {
                const isDeleted = await statesTotalService.deleteOldTotals();
                if (isDeleted) {
                    await statesTotalService.saveNewData(newStateTotals);
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
    //Runs job every day at 01:00 AM GMT
    cron.schedule('00 2 * * *', async () => {
        try {
            const newTotals = await nationalTotalsService.getTotals();
            const lastTimelineDate = subtractDayFromDate(2);
            const previousTimeline = await nationalTimelineService.getTimelineByDate(
                lastTimelineDate,
            );
            await nationalTimelineService.createTimeline(
                previousTimeline,
                newTotals,
            );
            console.log('Timeline cron done');
        } catch (error) {
            console.log(error);
        }
    });
};

//Runs job every day at 01:00 AM GMT +1
const scheduleToCreateStateTimeline = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const newData = await statesTotalService.getStateTotals();
            newData.forEach(async (val, i) => {
                const state = val.state;
                const lastTimeline = await stateTimelineService.lastTimelineForState(
                    state,
                );
                let data = {};
                data.date = subtractDayFromDate(1);
                data.confirmed =
                    val.confirmedCases - lastTimeline.totalConfirmed;
                // data.totalConfirmed = val.confirmedCases;
                if (data.confirmed === 0) return;
                await stateTimelineService.createTimeline(state, data);
                console.log('done', state, data.confirmed);
            });
        } catch (error) {
            console.log(error);
        }
    });
};

const startCronJobs = () => {
    scheduleToGetTotalData();
    scheduleToGetStateData();
    // scheduleToCreateTimeline();
    scheduleToCreateStateTimeline();
};

module.exports = {
    startCronJobs,
};
