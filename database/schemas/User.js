const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    nickName : String,
    firstName : String,
    lastName : String,
    email : String,
    admin : Boolean,
    receiveSupportRequest : Boolean,
    password: String,
    communities : [String],
    teams:[String],
    points: {
        type: Number,
        default: 10
    }
    
})

module.exports = mongoose.model('User', UserSchema); 