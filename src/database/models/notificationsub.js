const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
    {
        userId: String,
        endpoint: String,
        auth: String,
        p256dh: String,
    },
    { versionKey: false },
);

const SubscriptionModel = mongoose.model('Notificationsub', SubscriptionSchema);

module.exports = SubscriptionModel;
