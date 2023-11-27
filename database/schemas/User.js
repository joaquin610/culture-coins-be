const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    birthday : Date,
    admin : Boolean,
    receiveSupportRequest : Boolean,
    communities : [String],
    points: Number,
    
})

module.exports = mongoose.model('User', UserSchema); 