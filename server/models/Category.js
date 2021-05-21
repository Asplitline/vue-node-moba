const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

/**
 * localField - primaryKey
 * foreignField - foreignKey
 * justOne - populate virtual will be an Array
 * ref - model instance or model name
 */
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: true,
    ref: 'Article'
})

module.exports = mongoose.model('Category', schema)