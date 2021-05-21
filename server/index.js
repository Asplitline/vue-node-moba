
const express = require('express')
const app = express()

app.set('secret', 'eqweaslkjljvc;xoioa[pqwe')
// 解决跨域问题
app.use(require('cors')())
// 基于body-parse 解析JSON数据
app.use(express.json())
// 处理静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 引入数据库
require('./plugins/db')(app)
// 引入后台路由
require('./routes/admin')(app)
// 引入前台路由
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})