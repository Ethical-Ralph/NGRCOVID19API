const cron = require("node-cron")
const totalsService = require("./totalsService")
const statesService = require("../service/statesService");
const timelineService = require("../service/timelineService");
const { validateStateData, validateTotals } = require("../utils/validator");
const { subtractDayFromDate } = require("../utils/utils");




/**
* Schedule to fetch and save new total data
*/
const scheduleToGetTotalData = async () => {
    cron.schedule('* * * * *', async () => {
        const newTotals = await totalsService.fetchNewLatest();
        console.log(newTotals)
        const isValid = validateTotals(newTotals)
        if (isValid) {
            const lastTimelineDate = subtractDayFromDate(2)
            const previousTimeline = await timelineService.getTimelineByDate(lastTimelineDate)
            await totalsService.deleteOldTotals()
            await totalsService.saveNewData(newTotals)
            await timelineService.createTimeline(previousTimeline, newTotals)
            console.log('done1')
        }

    })
}

/**
 * Schedule to fetch and save new state data
 */
const scheduleToGetStateData = async () => {
    cron.schedule('* 1 * * *', async () => {
        const newStateTotals = await statesService.fetchNewStateData()
        const isValid = validateStateData(newStateTotals)
        if (isValid) {
            await statesService.deleteOldTotals()
            await statesService.saveNewData(newStateTotals)
        }
        console.log('done2')
    })

}

const startCronJobs = async () => {
    await scheduleToGetTotalData()
    await scheduleToGetStateData()
}




module.exports = {
    startCronJobs
}