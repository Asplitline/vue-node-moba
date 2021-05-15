
const inflection = require('inflection')
module.exports = app => {
    const express = require('express')
    const router = express.Router({
        // 合并路由参数，子级优先级高
        mergeParams: true
    })
    router.get('/', async (req, res) => {
        const queryOptions = {}
        // Model.prototype.modelName
        if (req.model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const model = await req.model.find().setOptions(queryOptions).limit(10)
        res.send(model)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.model.findById(req.params.id)
        res.send(model)
    })
    router.post('', async (req, res) => {
        const model = await req.model.create(req.body)
        res.send(model)
    })
    router.put('/:id', async (req, res) => {
        await req.model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            message: '更新成功'
        })
    })
    router.delete('/:id', async (req, res) => {
        await req.model.findByIdAndDelete(req.params.id)
        res.send({
            message: '删除成功'
        })
    })

    // base url
    app.use('/admin/api/reset/:resource', (req, res, next) => {
        const modelName = inflection.classify(req.params.resource)
        req.model = require(`../../models/${modelName}`)
        next()
    }, router)
}