
module.exports = options => {
    const inflection = require('inflection')
    return (req, res, next) => {
        const modelName = inflection.classify(req.params.resource)
        req.model = require(`../models/${modelName}`)
        next()
    }
}