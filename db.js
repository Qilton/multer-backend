const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const mongo_url ="mongodb+srv://Swayam:9832900366@cluster0.z7kyt.mongodb.net/multer"

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    });
