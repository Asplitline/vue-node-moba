const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: { type: String },
    items: [{
        cover: { type: String },
        url: { type: String }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Ad', Schema)