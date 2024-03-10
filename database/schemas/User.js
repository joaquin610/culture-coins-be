const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    nickName : { type: String, unique: true },
    firstName : String,
    lastName : String,
    email : { type: String, unique: true },
    admin : Boolean,
    receiveSupportRequest : Boolean,
    password: String,
    avatar: String,
    communities : [String],
    teams:[String],
    points: {
        type: Number,
        default: 10
    }
    
})

module.exports = mongoose.model('User', UserSchema); 