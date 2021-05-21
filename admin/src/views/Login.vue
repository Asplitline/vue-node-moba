<template>
  <div class="login">
    <div class="login-container">
      <h1>登录界面</h1>
      <el-form :model="model" :rules="rules" size="small" ref="model"
        @submit.prevent.native="login('model')">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="info" size="small" @click="reset('model')">重置</el-button>
          <el-button type="success" size="small" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  //  todo [verification code | register]
  data() {
    return {
      model: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const {
          data: { token }
        } = await this.$http.post('/login', this[formName])
        if (token) {
          localStorage.setItem('token', token)
          this.$router.push({ name: 'Main' })
          this.$message.success('登录成功')
        }
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login-container {
    padding: 2rem 3rem;
    border: 1px solid #eee;
    width: 20rem;
    height: 14rem;
    background-color: #fafafa;
    h1 {
      font-size: 20px;
      font-weight: 400;
      text-align: center;
      margin: 0;
    }
  }
}
</style>