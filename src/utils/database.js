const mongoose = require('mongoose');
const { NationalTimeline, StateTimeline } = require('../database');
// const {seed} = require('../../newseed')

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
            // StateTimeline.deleteMany({}, (err,doc)=>{
            //     console.log(doc)
            // })
            // StateTimeline.insertMany(seed,(err,doc)=>{
            //     console.log(doc)
            // })
            console.log('mongodb started');
        },
    );
};
