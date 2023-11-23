const mongoose = require('mongoose')
const {Schema} = mongoose

const SupportRequestSchema = new Schema({
    title : String,
    message   : String,
    priority  : String,
    userFrom :String,
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SupportRequest', SupportRequestSchema) 