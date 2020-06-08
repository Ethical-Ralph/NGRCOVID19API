const mongoose = require('mongoose');
const { NationalTimeline, StateTimeline } = require('../database');
const data = require('../../../aa/newData');

exports.database = (MONGODB_URL) => {
    mongoose.connect(
        MONGODB_URL,
        {
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, db) => {
            if (err) {
                console.log("MongoDb couldn't start");
                return process.exit(1);
            }
            console.log('mongodb started');
            // NationalTimeline.deleteMany({},(err,doc)=>{
            //     console.log(doc)
            // })
            // NationalTimeline.insertMany(data,(err,doc)=>{
            //     console.log(doc)
            // })
        },
    );
};
