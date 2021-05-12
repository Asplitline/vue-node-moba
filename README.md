# vue-node-moba
wzry

# 项目构建
## 后台
```shell
vue create admin
vue add element

npm i axios
```

## 前台
```shell
vue create web
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
```

```shell
"scripts": {
    "serve": "nodemon index.js",
    ...
},
```