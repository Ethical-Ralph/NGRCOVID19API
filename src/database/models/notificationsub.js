const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
    {
        samplesTested: {
            type: Number,
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

const SubscriptionModel = mongoose.model('Notificationsub', SubscriptionSchema);

module.exports = SubscriptionModel;
