const mongoose = require('mongoose')
const Schema = mongoose.Schema


const stateSchema = new Schema({
    state: {
        type: String
    },
    confiredCases: {
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

const stateModel = mongoose.model('State', stateSchema)

module.exports = stateModel