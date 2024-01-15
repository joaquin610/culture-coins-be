const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommunitySchema = new Schema({
    name : String,
   
})

module.exports = mongoose.model('Community', CommunitySchema); 