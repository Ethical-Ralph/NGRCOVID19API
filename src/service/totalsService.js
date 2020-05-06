const { Totals } = require('../database')
const cheerio = require('cheerio')
const rp = require('request-promise')
const { clean } = require('../utils/utils')

/**
 * gets latest data from database
 * @returns {object} Lastest Data
 */
const getTotals = async () => {
  try {
    const totals = await Totals.find({}).select('-_id')
    return totals[0]
  } catch (error) {
    throw error
  }
}

/**
 * Scraps new data from NCDC
 * @returns {object}
 */
const fetchNewLatest = async () => {
  const raw = await rp('https://covid19.ncdc.gov.ng/')

  const $ = cheerio.load(raw)

  let data = []

  const sampleTested = $('.pcoded-content .page-header .page-block .row')
    .find('.card-body span')
    .text()

  $('.pcoded-content .page-header div:nth-child(2) .card.order-card')
    .find('.card-body span')
    .each((i, e) => {
      data[i] = $(e).text()
    })
  data.push(sampleTested)
  data = data.map((val) => Number(clean(val)))

  const result = {
    confirmedCases: data[0],
    activeCases: data[1],
    discharged: data[2],
    death: data[3],
    samplesTested: data[4],
  }

  return result
}
/**
 * Saves new totals
 * @param {object} - totals data
 * @return {object} Saved Data
 */
const saveNewData = async (param) => {
  try {
    const newTotals = new Totals(param)
    const data = await newTotals.save()
    return data
  } catch (error) {
    throw error
  }
}

/**
 * Deletes old totals
 */
const deleteOldTotals = () => {
  return Totals.deleteMany({}, (err) => {
    if (err) return false
    return true
  })
}

module.exports = {
  getTotals,
  fetchNewLatest,
  saveNewData,
  deleteOldTotals,
}
