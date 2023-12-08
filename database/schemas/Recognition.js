const mongoose = require('mongoose')
const {Schema} = mongoose

const RecognitionSchema = new Schema({
    userTo : String,
    userFrom: String,
    message:String,
    category: String,
    subCategory: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Recognition', RecognitionSchema) 