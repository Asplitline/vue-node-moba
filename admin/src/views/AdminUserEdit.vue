<template>
  <div>
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form :model="model" label-width="120px" :rules="rule"
      @submit.native.prevent="save('model')" ref="model">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      rule: {
        name: [{ required: true, message: '请输入管理员名称', trigger: 'blur' }]
        // parent: [{ required: true, message: '请选择上级管理员', trigger: 'blur' }]
      },
      parentOptions: []
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (!this.id) {
          await this.$http.post('reset/admin_user', this[formName])
          this.$message.success('保存成功')
        } else {
          await this.$http.put(`reset/admin_user/${this.id}`, this[formName])
          this.$message.success('更新成功')
        }
        this.$router.push('/admin_user/list')
      })
    },
    async fetchData() {
      const { data } = await this.$http.get(`reset/admin_user/${this.id}`)
      this.model = data
    },
    async fetchParentOptions() {
      const { data } = await this.$http.get('reset/admin_user')
      this.parentOptions = data
    }
  },
  created() {
    this.id && this.fetchData()
    this.fetchParentOptions()
  }
}
</script>

<style>
</style>