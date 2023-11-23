const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    birthday : Date,
    admin : Boolean,
    support : Boolean,
    communities : [String]
    
})

module.exports = mongoose.model('User', UserSchema); 