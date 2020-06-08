const { StateTimeline } = require('../database');
const { filterByDate, removeId, filterData } = require('../utils/utils');

/**
 * Fetches all timeline data from database
 * @return {array} timeline data
 */
const getTimelines = async (date) => {
    try {
        const data = await StateTimeline.find({});
        if (!!date) {
            const byDate = filterByDate(data, date);
            return byDate;
        }
        if (!data.length) throw new Error('Not Found');
        return filterData(data);
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a state timeline data from database
 * @return {object} timeline data
 */
const getTimelineForState = async (state) => {
    state = String(state).toLowerCase();
    try {
        const data = await StateTimeline.find({ state }).select('data').exec();
        if (!data.length) throw new Error('Not Found');
        const cleaned = removeId(data[0].data);
        return cleaned;
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches the last timeline data from database
 * @return {object} timeline data
 */
const lastTimelineForState = async (state) => {
    try {
        const dataArr = await StateTimeline.find({ state }).select('data');
        const data = dataArr[0].data;
        return data[data.length - 1];
    } catch (error) {
        throw error;
    }
};

/**
 * Create a new timeline
 * @param {string} state state name
 * @param {object} data new timeline to be saved
 */
const createTimeline = async (state, data) => {
    try {
        const timeline = await StateTimeline.findOne({ state });
        if (!timeline) {
            const newStateTimeline = new StateTimeline();
            newStateTimeline.state = state;
            newStateTimeline.data.push(data);
            return await newStateTimeline.save();
        }
        const stateTimeline = await StateTimeline.findOneAndUpdate(
            { state },
            { $push: { data } },
        );
        return stateTimeline;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTimelines,
    getTimelineForState,
    createTimeline,
    lastTimelineForState,
};
