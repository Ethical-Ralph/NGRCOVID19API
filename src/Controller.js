const totalsService = require('./service/totalsService')
const statesService = require("./service/statesService");
const timeLineService = require('./service/timelineService');


const getTotals = async (req, res, next) => {
    try {
        let latestTotals = await totalsService.getTotals()
        return res.json({
            data: latestTotals
        })
    } catch (error) {
        next(error)
    }
}
const getAllStatesTotal = async (req, res, next) => {
    try {
        const stateTotals = await statesService.getStateTotals()
        return res.json({
            data: stateTotals
        })
    } catch (error) {
        next(error)
    }
}
const getStateTotal = async (req, res, next) => {
    const state = req.params.state
    try {
        const stateTotal = await statesService.getStateTotal(state)
        return res.json({
            data: stateTotal
        })
    } catch (error) {
        next(error)
    }
}
const timeline = async (req, res, next) => {
    const from = req.query.from || '';
    const to = req.query.to || '';
    try {
        const timeline = await timeLineService.getTimelines(from, to)
        return res.json({
            data: timeline
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getTotals,
    getAllStatesTotal,
    getStateTotal,
    timeline
}