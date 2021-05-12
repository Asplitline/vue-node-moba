
const express = require('express')
const app = express()

// 解决跨域问题
app.use(require('cors')())
// 基于body-parse 解析JSON数据
app.use(express.json())
// 引入数据库
require('./plugins/db')(app)
// 引入路由
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})