module.exports = app => {
    const mongoose = require('mongoose')
    // mongoose default port 27017
    // tag if auth is on |>> First , create a database
    mongoose.connect('mongodb://moba:123456@localhost:27017/vue-node-moba', { useUnifiedTopology: true, useNewUrlParser: true })
        .then(_ => console.log('mongoose connected'))
        .catch(_ => console.log(_))
}