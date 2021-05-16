const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        // notes 此字段不被选择
        select: false,
        set (val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', Schema)