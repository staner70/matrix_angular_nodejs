const mongoose = require('mongoose');
require('dotenv').config();

const client = () => {

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB Connection Successful");

    })
    .catch(err => {
        console.log(err);
    })
};

module.exports = client;