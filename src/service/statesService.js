const { State } = require('../database')
const cheerio = require('cheerio')
const rp = require('request-promise')
const { clean } = require('../utils/utils')

/**
 * gets states latest data from database
 * @returns {object} Lastest Data
 */
const getStateTotals = async () => {
  try {
    const StateTotals = await State.find({}).select('-_id')
    return StateTotals
  } catch (error) {
    throw error
  }
}
const getStateTotal = async (state) => {
  try {
    const StateTotal = await State.findOne({ state }).select('-_id')
    return StateTotal
  } catch (error) {
    throw error
  }
}

/**
 * Scraps new data from NCDC
 * @returns {object}
 */
const fetchNewStateData = async () => {
  const raw = await rp('https://covid19.ncdc.gov.ng/')
  const $ = cheerio.load(raw)

  let result = []

  $('#custom1 > tbody')
    .find('tr')
    .each((i, e) => {
      const td = $(e).find('td')
      const data = {
        state: clean($(td[0]).text()),
        confirmedCases: clean($(td[1]).text()),
        activeCases: clean($(td[2]).text()),
        discharged: clean($(td[3]).text()),
        death: clean($(td[4]).text()),
      }
      result[i] = data
    })

  const filter = result.filter((s) => s.state.length !== 0)

  return filter
}

/**
 * Saves new totals
 * @param {object} - totals data
 * @return {object} Saved Data
 */
const saveNewData = async (params) => {
  try {
    const newTotals = await State.insertMany(params)
    return newTotals
  } catch (error) {
    throw error
  }
}

/**
 * Deletes totals
 */
const deleteOldTotals = async () => {
  return State.deleteMany({}, (err) => {
    if (err) return false
    return true
  })
}

module.exports = {
  getStateTotals,
  getStateTotal,
  fetchNewStateData,
  saveNewData,
  deleteOldTotals,
}
