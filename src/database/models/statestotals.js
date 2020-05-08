const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema(
    {
        state: {
            type: String,
        },
        confirmedCases: {
            type: Number,
        },

        activeCases: {
            type: Number,
        },
        discharged: {
            type: Number,
        },
        death: {
            type: Number,
        },
    },
    { versionKey: false },
);

const stateModel = mongoose.model('StateTotal', stateSchema);

module.exports = stateModel;
