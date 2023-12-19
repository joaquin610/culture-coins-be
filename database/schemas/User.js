const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    nickName : String,
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    birthday : Date,
    admin : Boolean,
    receiveSupportRequest : Boolean,
    communities : [String],
    skills:[String],
    points: {
        type: Number,
        default: 10
    }
    
})

module.exports = mongoose.model('User', UserSchema); 