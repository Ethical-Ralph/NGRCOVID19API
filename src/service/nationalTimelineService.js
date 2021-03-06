const { NationalTimeline } = require('../database');
const { subtractDayFromDate, sortByDate } = require('../utils/utils');

/**
 * Fetches all timeline data from database
 * @param {object} from starting date
 * @param {object} to end date
 * @return {array} timeline data
 */
const getTimelines = async (from, to) => {
    const query = from && to ? { date: { $gte: from, $lte: to } } : {};
    try {
        const data = await NationalTimeline.find(query).select('-_id');
        return sortByDate(data);
    } catch (error) {
        throw error;
    }
};

/**
 * Get timeline by date
 * @param {date} date
 * @returns {object} Returns Timeline object
 */
const getTimelineByDate = async (date) => {
    try {
        const timeline = await NationalTimeline.findOne({ date }).select(
            '-_id',
        );
        return timeline;
    } catch (error) {
        throw error;
    }
};

/**
 * Create a new timeline
 * @param {object} previousTimeline Previously saved timeline
 * @param {object} previousTotal previous new totals
 */
const createTimeline = async (previousTimeline, newTotals) => {
    let newTimeline = {};
    newTimeline['date'] = subtractDayFromDate(1);
    newTimeline['total'] =
        newTotals.confirmedCases - previousTimeline.totalConfirmed;
    newTimeline['totalConfirmed'] = newTotals.confirmedCases;
    try {
        const data = await new NationalTimeline(newTimeline).save();
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTimelines,
    getTimelineByDate,
    createTimeline,
};
