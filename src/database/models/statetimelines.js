const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateTimelineSchema = new Schema(
    {
        state: String,
        data: [
            {
                date: Date,
                confirmed: Number,
                totalConfirmed: Number,
            },
        ],
    },
    { versionKey: false },
);

const stateTimelineModel = mongoose.model('StateTimeline', stateTimelineSchema);

module.exports = stateTimelineModel;
