const mongoose = require('mongoose')
const Schema = mongoose.Schema

const totalsSchema = new Schema({
    samplesTested: {
        type: Number
    },
    confirmedCases: {
        type: Number
    },
    activeCases: {
        type: Number
    },
    discharged: {
        type: Number
    },
    death: {
        type: Number
    }
}, { versionKey: false })

const totalsModel = mongoose.model('Totals', totalsSchema)

module.exports = totalsModel