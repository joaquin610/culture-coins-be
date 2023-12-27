const mongoose = require('mongoose')
const {Schema} = mongoose

const SkillSchema = new Schema({
    name : String,
})

module.exports = mongoose.model('Skil', SkillSchema) 