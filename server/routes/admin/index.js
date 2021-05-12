module.exports = app => {
    const express = require('express')
    const router = express.Router()
    router.post('/categories', async (req, res) => {
        const Category = require('../../models/Category')
        const model = await Category.create(req.body)
        res.send(model)
    })
    // notes path start '/admin/api' 
    app.use('/admin/api', router)
}