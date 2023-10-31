const mongoose = require('mongoose')
const {Schema} = mongoose

const AcknowledgmentSchema = new Schema({
    userTo : String,
    userFrom: String,
    message:String
})

module.exports = AcknowledgmentSchema