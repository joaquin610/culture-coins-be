const mongoose = require('mongoose')
const {Schema} = mongoose

const TeamSchema = new Schema({
    name : String,
})

module.exports = mongoose.model('Team', TeamSchema) 