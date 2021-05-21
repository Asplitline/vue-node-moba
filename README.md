# vue-node-moba
wzry

# 项目构建
## 后台
```shell
vue create admin
vue add element

npm i axios
# 富文本
npm i vue2-editor
# 日期处理
npm i dayjs 
```

## 前台
```shell
vue create web
# 自动添加浏览器前缀
npm i postcss autoprefixer --save-dev 
# 安装8.0版本
npm i postcss-loader autoprefixer@8.0.0 -D
# swiper
npm i swiper@5.4.5 vue-awesome-swiper@3.1.3 --save
# axios
npm i axios
# 日期处理
npm i dayjs
```
`.postcss.config.js`配置autoprefixer
```js
module.exports = {
    plugins: {
        autoprefixer: {}
    }
}
```

## 服务器
```shell
cd server
npm init -y

npm i express mongoose
npm i cors

mongo # 进入mongo命令行
db.auth('root','root') # 认证权限
use vue-node-moba
db.createUser({user:'moba',pwd:'123456',roles:[{role:'readWrite'}]})

npm i inflection # 单词复数转类名
npm i multer # 文件
npm i bcrypt # 加密
npm i jsonwebtoken # jwt
npm i http-assert # http返回
```

```shell
"scripts": {
    "serve": "nodemon index.js",
    ...
},
```