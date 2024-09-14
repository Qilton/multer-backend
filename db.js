const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const mongo_url =process.env.MONGO_CONN;;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    });
