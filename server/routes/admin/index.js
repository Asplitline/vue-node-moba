module.exports = app => {
    const assert = require('http-assert')
    const imgURL = 'http://localhost:3000/uploads/'
    const path = require('path')
    const fs = require('fs')
    const jwt = require('jsonwebtoken');
    const express = require('express')
    const router = express.Router({
        // 合并路由参数，子级优先级高
        mergeParams: true
    })
    // 请求资源
    router.get('/', async (req, res) => {
        const queryOptions = {}
        // Model.prototype.modelName
        if (req.model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const model = await req.model.find().setOptions(queryOptions)
        // .limit(10)
        res.send(model)
    })
    // 根据id请求资源
    router.get('/:id', async (req, res) => {
        const model = await req.model.findById(req.params.id)
        res.send(model)
    })
    // 添加资源
    router.post('/', async (req, res) => {
        const model = await req.model.create(req.body)
        res.send(model)
    })
    // 修改资源
    router.put('/:id', async (req, res) => {
        await req.model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            message: '更新成功'
        })
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
        await req.model.findByIdAndDelete(req.params.id)
        res.send({
            message: '删除成功'
        })
    })
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    // base url
    app.use('/admin/api/reset/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })

    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), (req, res) => {
        const file = req.file
        const oldPath = file.path
        const newPath = path.parse(file.path).dir + '/' + file.originalname
        fs.renameSync(oldPath, newPath)
        file.url = imgURL + file.originalname
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res, next) => {
        const { username, password } = req.body
        const AdminUser = require('../../models/AdminUser')
        // 强制查询 password
        const user = await AdminUser.findOne({ username }).select('+password')
        try {
            assert(user, 422, '用户不存在')
        } catch (err) {
            next(err)
        }
        // compareSync(明文,加密)
        const isValid = require('bcrypt').compareSync(password, user.password)
        try {
            assert(isValid, 422, '密码不正确')
        } catch (err) {
            next(err)
        }
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
    app.use(async (err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message
        })
    })

}