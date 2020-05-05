const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timelineSchema = new Schema({
    dailyConfirmed: {
        type: Number
    },
    dailyDeceased: {
        type: Number
    },

    dailyRecovered: {
        type: Number
    },
    date: {
        type: Date
    },
    totalConfirmed: {
        type: Number
    },
    totalDeath: {
        type: Number
    },
    totalDischarged: {
        type: Number
    }
}, { versionKey: false })

const timelineModel = mongoose.model('Timeline', timelineSchema)

module.exports = timelineModel