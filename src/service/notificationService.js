const { Notificationsub } = require('../database');
const webpush = require('web-push');
const nationalTotalsService = require('./nationalTotalsService');

const getAllNutSub = async () => {
    try {
        const data = await Notificationsub.find({});
        const subscriptions = data.map((val) => {
            return {
                _id: val._id,
                endpoint: val.endpoint,
                keys: {
                    auth: val.auth,
                    p256dh: val.p256dh,
                },
            };
        });
        return subscriptions;
    } catch (error) {
        throw error;
    }
};

const sendWebPush = async (sub, payload) => {
    const privateKey = process.env.WEB_PUSH_PRIVKEY;
    const publicKey = process.env.WEB_PUSH_PRUBKEY;

    var options = {
        vapidDetails: {
            subject: 'mailto:rakinola90@gmail.com',
            publicKey: publicKey,
            privateKey: privateKey,
        },
        TTL: 54000,
    };

    try {
        return await webpush.sendNotification(
            sub,
            JSON.stringify(payload),
            options,
        );
    } catch (error) {
        throw error;
    }
};

const sendNotification = async () => {
    const allSub = await getAllNutSub();
    const nationalTotals = await nationalTotalsService.getTotals();
    const payload = {
        url: 'https://covid19.ethicalhub.tech',
        image:
            'https://res.cloudinary.com/eralphcloud/image/upload/v1593534116/logo_rethvw.png',
        title: 'New Covid19 stats for Nigeria',
        text: `Date: ${new Date().toDateString()}\nConfirmed Cases: ${
            nationalTotals.confirmedCases
        }\nActive Cases: ${nationalTotals.activeCases}\nDischarged: ${
            nationalTotals.discharged
        }\nDeath: ${nationalTotals.death}`,
    };

    allSub.forEach(async (sub) => {
        try {
            await sendWebPush(sub, payload);
        } catch (error) {
            if (error.name === 'WebPushError' && error.statusCode == 410) {
                await Notificationsub.findByIdAndDelete(sub._id, console.log);
            }
        }
    });
};

const saveSubDetails = async (data) => {
    try {
        const subscription = new Notificationsub();
        subscription.endpoint = data.endpoint;
        subscription.auth = data.keys.auth;
        subscription.p256dh = data.keys.p256dh;
        const subData = await subscription.save();
        return subData;
    } catch (error) {
        throw error;
    }
};

const updateSubscription = async (_id, subData) => {
    const sub = {
        endpoint: subData.endpoint,
        auth: subData.keys.auth,
        p256dh: subData.keys.p256dh,
    };
    try {
        const data = await Notificationsub.findByIdAndUpdate(
            {
                _id,
            },
            sub,
        );
        console.log;
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllNutSub,
    sendNotification,
    saveSubDetails,
    updateSubscription,
    sendWebPush,
};
