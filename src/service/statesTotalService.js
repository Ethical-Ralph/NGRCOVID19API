const { StateTotal } = require('../database');
const cheerio = require('cheerio');
const rp = require('request-promise');
const { clean } = require('../utils/utils');

/**
 * gets states data from database
 * @returns {object}  Data
 */
const getStateTotals = async () => {
    try {
        const stateTotals = await StateTotal.find({}).select('-_id');
        return stateTotals;
    } catch (error) {
        throw error;
    }
};

/**
 * gets a state data from database
 * @param {string} state name
 * @returns {object}  Data
 */
const getStateTotal = async (state) => {
    try {
        const stateTotal = await StateTotal.findOne({ state }).select('-_id');
        return stateTotal;
    } catch (error) {
        throw error;
    }
};

/**
 * Scraps new data from NCDC
 * @returns {object}
 */
const fetchNewStateData = async () => {
    const raw = await rp('https://covid19.ncdc.gov.ng/');
    const $ = cheerio.load(raw);

    let result = [];

    $('#custom1 > tbody')
        .find('tr')
        .each((i, e) => {
            const td = $(e).find('td');
            const data = {
                state: clean($(td[0]).text()),
                confirmedCases: clean($(td[1]).text()),
                activeCases: clean($(td[2]).text()),
                discharged: clean($(td[3]).text()),
                death: clean($(td[4]).text()),
            };
            result[i] = data;
        });

    const filter = result.filter((s) => s.state.length !== 0);

    return filter;
};

/**
 * Saves new totals
 * @param {object} - totals data
 * @return {object} Saved Data
 */
const saveNewData = async (params) => {
    try {
        const newTotals = await StateTotal.insertMany(params);
        return newTotals;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes totals in database
 */
const deleteOldTotals = async () => {
    return StateTotal.deleteMany({}, (err) => {
        if (err) return false;
        return true;
    });
};

module.exports = {
    getStateTotals,
    getStateTotal,
    fetchNewStateData,
    saveNewData,
    deleteOldTotals,
};
