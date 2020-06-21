const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timelineSchema = new Schema(
    {
        date: {
            type: Date,
        },
        total: {
            type: Number,
        },
        totalConfirmed: {
            type: Number,
        },
    },
    { versionKey: false },
);

const timelineModel = mongoose.model('NationalTimeline', timelineSchema);

module.exports = timelineModel;
