const mongoose = require('mongoose')
const {Schema} = mongoose

const ValuesBehaviorsSchema = new Schema({
    title : String,
    text: String,
})

module.exports = mongoose.model('ValuesBehaviors', ValuesBehaviorsSchema) 