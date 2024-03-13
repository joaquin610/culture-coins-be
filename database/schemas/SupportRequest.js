const mongoose = require('mongoose')
const {Schema} = mongoose

const SupportRequestSchema = new Schema({
    title : String,
    message : String,
    priority : String,
    userFrom : String,
    community : String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        default: "Pending"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    colaborators: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('SupportRequest', SupportRequestSchema) 