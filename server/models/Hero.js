const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    scores: {
        difficult: { type: Number, default: 0 },
        skills: { type: Number, default: 0 },
        attack: { type: Number, default: 0 },
        survive: { type: Number, default: 0 },
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    usageTips: {
        title: { type: String },
        icon: { type: String },
        description: { type: String }
    },
    battleTips: {
        title: { type: String },
        icon: { type: String },
        description: { type: String }
    },
    teamTips: {
        title: { type: String },
        icon: { type: String },
        description: { type: String }
    },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

// 自定义集合名字
module.exports = mongoose.model('Hero', Schema, 'heroes')