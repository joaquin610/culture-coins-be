const mongoose = require('mongoose')
const {Schema} = mongoose

const SupportRequestSchema = new Schema({
    title : String,
    message : String,
    priority : String,
    userFrom : String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    status: {
        type: String,
        default: "Pending"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('SupportRequest', SupportRequestSchema) 