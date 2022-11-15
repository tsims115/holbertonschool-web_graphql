const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    title: String,
    weight: Number,
    description: String,
})

module.exports = mongoose.model('Project', ProjectSchema);
