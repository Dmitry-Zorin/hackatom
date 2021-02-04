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
        stage: {
            type: Number
        }
    }
)
