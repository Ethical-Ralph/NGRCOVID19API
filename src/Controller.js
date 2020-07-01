const nationalTotalsService = require('./service/nationalTotalsService');
const statesTotalService = require('./service/statesTotalService');
const nationalTimelineService = require('./service/nationalTimelineService');
const stateTimelineService = require('./service/stateTimelineService');
const notificationService = require('./service/notificationService');

const getNationalTotals = async (req, res, next) => {
    try {
        let data = await nationalTotalsService.getTotals();
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};
const getAllStatesTotal = async (req, res, next) => {
    try {
        const data = await statesTotalService.getStateTotals();
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};
const getStateTotal = async (req, res, next) => {
    const state = req.params.state;
    try {
        const data = await statesTotalService.getStateTotal(state);
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};
const nationalTimeline = async (req, res, next) => {
    const from = req.query.from;
    const to = req.query.to;
    try {
        const data = await nationalTimelineService.getTimelines(from, to);
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};
const stateTimelines = async (req, res, next) => {
    const date = req.query.date;
    try {
        const datas = await stateTimelineService.getTimelines(date);
        return res.json({
            data: datas,
        });
    } catch (error) {
        next(error);
    }
};

const timelineForState = async (req, res, next) => {
    const state = req.params.state;
    try {
        const data = await stateTimelineService.getTimelineForState(state);
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};

const getAllSubscriptions = async (req, res, next) => {
    try {
        const data = await notificationService.getAllNutSub();
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};

const saveSubscription = async (req, res, next) => {
    const sub = req.body;
    const url = `${req.protocol}://${req.get('host')}`;
    try {
        const data = await notificationService.saveSubDetails(sub);
        const payload = {
            url,
            title: 'Covid19 Nigeria',
            text:
                'You have successfully subscribe for COVID-19 Nigeria daily notification',
        };
        res.json({
            data,
        });
        return notificationService.sendWebPush(sub, payload);
    } catch (error) {
        next(error);
    }
};

const updateSubscription = async (req, res, next) => {
    const subId = req.params.id;
    const subData = req.body;
    try {
        const data = await notificationService.updateSubscription(
            subId,
            subData,
        );
        return res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNationalTotals,
    getAllStatesTotal,
    getStateTotal,
    nationalTimeline,
    stateTimelines,
    timelineForState,
    getAllSubscriptions,
    saveSubscription,
    updateSubscription,
};
