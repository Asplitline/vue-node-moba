const Category = require('../../models/Category')

module.exports = app => {
    const express = require('express')
    const router = express.Router()

    router.get('/categories', async (req, res) => {
        const model = await Category.find().populate('parent').limit(10)
        res.send(model)
    })
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.put('/categories/:id', async (req, res) => {
        await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            message: '更新成功'
        })
    })
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id)
        res.send({
            message: '删除成功'
        })
    })

    // notes path start '/admin/api' 
    app.use('/admin/api', router)
}