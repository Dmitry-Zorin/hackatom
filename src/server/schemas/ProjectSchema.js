const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        appArea: {
            type: String,
        },
        resources: {
            type: String,
        },
        stage: {
            type: Number
        },
        plan: {
            type: String
        },
        rating: {
            type: Object,
            default: []
        }
    }
)
