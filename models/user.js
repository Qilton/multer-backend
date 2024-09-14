const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    url: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;