const mongoose = require('mongoose')
const {Schema} = mongoose

const FeedbackSchema = new Schema({
    userToEmail : String,
    userToNickName: String,
    userFromNickName: String,
    message:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Feedback', FeedbackSchema) 